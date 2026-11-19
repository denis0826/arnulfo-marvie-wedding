import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin-auth";
import { listRsvps, rsvpsToCsv, summarizeRsvps } from "@/lib/rsvps";

export async function GET(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  }

  const records = await listRsvps();
  const format = new URL(request.url).searchParams.get("format");

  if (format === "csv") {
    return new NextResponse(rsvpsToCsv(records), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="arnulfo-marvie-rsvps.csv"',
      },
    });
  }

  return NextResponse.json({
    records,
    summary: summarizeRsvps(records),
  });
}
