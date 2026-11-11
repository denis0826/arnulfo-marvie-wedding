import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

type RsvpPayload = {
  name?: string;
  email?: string;
  attending?: "yes" | "no" | "";
  guests?: string;
  events?: string[];
  meal?: string;
  dietary?: string;
  message?: string;
};

const dataDirectory = path.join(process.cwd(), "data");
const rsvpFile = path.join(dataDirectory, "rsvps.json");

const readRsvps = async () => {
  try {
    const raw = await readFile(rsvpFile, "utf8");
    return JSON.parse(raw) as unknown[];
  } catch {
    return [];
  }
};

export async function POST(request: Request) {
  const body = (await request.json()) as RsvpPayload;
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const attending = body.attending;

  if (!name || !email || (attending !== "yes" && attending !== "no")) {
    return NextResponse.json(
      { error: "Please share your name, email, and whether you can attend." },
      { status: 400 },
    );
  }

  await mkdir(dataDirectory, { recursive: true });
  const existing = await readRsvps();
  existing.push({
    name,
    email,
    attending,
    guests: attending === "yes" ? body.guests ?? "1" : "0",
    events: attending === "yes" ? body.events ?? [] : [],
    meal: attending === "yes" ? body.meal ?? "" : "",
    dietary: body.dietary?.trim() ?? "",
    message: body.message?.trim() ?? "",
    submittedAt: new Date().toISOString(),
  });
  await writeFile(rsvpFile, JSON.stringify(existing, null, 2));

  return NextResponse.json({ ok: true });
}
