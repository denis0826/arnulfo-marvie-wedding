import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { get, list, put } from "@vercel/blob";
import type { RsvpRecord } from "@/lib/rsvp-types";

export type { RsvpRecord };

const localFile = path.join(process.cwd(), "data", "rsvps.json");
const blobPrefix = "rsvps/";

const hasBlobStore = () =>
  Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

const createId = () =>
  `${Date.now()}-${randomUUID().slice(0, 8)}`;

const readLocalRsvps = async (): Promise<RsvpRecord[]> => {
  try {
    const raw = await readFile(localFile, "utf8");
    const parsed = JSON.parse(raw) as RsvpRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLocalRsvps = async (records: RsvpRecord[]) => {
  await mkdir(path.dirname(localFile), { recursive: true });
  await writeFile(localFile, JSON.stringify(records, null, 2));
};

const streamToText = async (stream: ReadableStream<Uint8Array>) => {
  return new Response(stream).text();
};

const parseRecord = (value: unknown): RsvpRecord | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Partial<RsvpRecord>;
  if (!record.name || !record.email) {
    return null;
  }

  return {
    id: record.id ?? createId(),
    name: record.name,
    email: record.email,
    attending: record.attending === "no" ? "no" : "yes",
    guests: record.guests ?? "0",
    events: Array.isArray(record.events) ? record.events : [],
    meal: record.meal ?? "",
    dietary: record.dietary ?? "",
    message: record.message ?? "",
    submittedAt: record.submittedAt ?? new Date().toISOString(),
  };
};

const listBlobRsvps = async (): Promise<RsvpRecord[]> => {
  const records: RsvpRecord[] = [];
  let cursor: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const page = await list({
      prefix: blobPrefix,
      cursor,
      limit: 1000,
    });

    for (const blob of page.blobs) {
      const result = await get(blob.pathname, {
        access: "private",
        useCache: false,
      });

      if (!result?.stream) {
        continue;
      }

      const parsed = parseRecord(JSON.parse(await streamToText(result.stream)));
      if (parsed) {
        records.push(parsed);
      }
    }

    hasMore = page.hasMore;
    cursor = page.cursor;
  }

  return records.sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
};

export const saveRsvp = async (
  input: Omit<RsvpRecord, "id" | "submittedAt">,
): Promise<RsvpRecord> => {
  const record: RsvpRecord = {
    ...input,
    id: createId(),
    submittedAt: new Date().toISOString(),
  };

  if (hasBlobStore()) {
    await put(`${blobPrefix}${record.id}.json`, JSON.stringify(record), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    return record;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "RSVP storage is not connected. Add a Vercel Blob store to this project.",
    );
  }

  const existing = await readLocalRsvps();
  existing.push(record);
  await writeLocalRsvps(existing);
  return record;
};

export const listRsvps = async (): Promise<RsvpRecord[]> => {
  if (hasBlobStore()) {
    return listBlobRsvps();
  }

  const records = await readLocalRsvps();
  return records.sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
};

const csvCell = (value: string) => {
  if (/[",\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
};

export const rsvpsToCsv = (records: RsvpRecord[]) => {
  const header = [
    "Submitted at",
    "Name",
    "Email",
    "Attending",
    "Guests",
    "Events",
    "Meal",
    "Dietary notes",
    "Message",
  ];

  const rows = records.map((record) =>
    [
      record.submittedAt,
      record.name,
      record.email,
      record.attending === "yes" ? "Yes" : "No",
      record.guests,
      record.events.join("; "),
      record.meal,
      record.dietary,
      record.message,
    ]
      .map(csvCell)
      .join(","),
  );

  return [header.join(","), ...rows].join("\n");
};

export const summarizeRsvps = (records: RsvpRecord[]) => {
  const attending = records.filter((record) => record.attending === "yes");
  const declined = records.filter((record) => record.attending === "no");
  const guestCount = attending.reduce((total, record) => {
    const count = Number.parseInt(record.guests, 10);
    return total + (Number.isFinite(count) ? count : 1);
  }, 0);

  return {
    total: records.length,
    attending: attending.length,
    declined: declined.length,
    guestCount,
  };
};
