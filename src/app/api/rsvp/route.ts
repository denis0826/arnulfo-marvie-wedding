import { NextResponse } from "next/server";
import { saveRsvp } from "@/lib/rsvps";

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

  try {
    await saveRsvp({
      name,
      email,
      attending,
      guests: attending === "yes" ? body.guests ?? "1" : "0",
      events: attending === "yes" ? body.events ?? [] : [],
      meal: attending === "yes" ? body.meal ?? "" : "",
      dietary: body.dietary?.trim() ?? "",
      message: body.message?.trim() ?? "",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to save your RSVP right now.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
