import type { ScheduleEvent } from "@/lib/wedding";

const toUtcStamp = (iso: string) => {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
};

export const toGoogleCalendarUrl = (event: ScheduleEvent) => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} — Arnulfo Jr & Marvie Dane`,
    dates: `${toUtcStamp(event.startIso)}/${toUtcStamp(event.endIso)}`,
    location: `${event.venue}, ${event.address}`,
    details: event.note,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const toIcs = (event: ScheduleEvent) => {
  const stamp = toUtcStamp(event.startIso);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Arnulfo and Marvie Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `DTSTAMP:${stamp}`,
    `DTSTART:${toUtcStamp(event.startIso)}`,
    `DTEND:${toUtcStamp(event.endIso)}`,
    `SUMMARY:${event.title} — Arnulfo Jr & Marvie Dane`,
    `LOCATION:${event.venue}, ${event.address}`,
    `DESCRIPTION:${event.note}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
};
