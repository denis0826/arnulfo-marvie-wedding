import { SectionHeading } from "@/components/Flourish";
import { toGoogleCalendarUrl, toIcs } from "@/lib/calendar";
import { events, weddingDate } from "@/lib/wedding";

export const ScheduleSection = () => {
  return (
    <section id="schedule" className="px-6 py-20 md:px-10">
      <SectionHeading>Schedule & Venues</SectionHeading>
      <p className="mb-8 text-center font-display text-[11px] tracking-[0.32em] text-burgundy uppercase">
        {weddingDate.longLabel}
      </p>
      <ol className="relative space-y-8 before:absolute before:top-3 before:bottom-3 before:left-[11px] before:w-px before:bg-burgundy/25 lg:before:hidden">
        {events.map((event) => (
          <li
            key={event.id}
            className="relative rounded-2xl border border-burgundy/15 bg-ivory-soft/80 p-6 shadow-[0_10px_30px_rgba(74,21,32,0.08)] lg:pl-6"
          >
            <span className="absolute top-7 left-0 h-2.5 w-2.5 rounded-full bg-burgundy lg:hidden" />
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-serif text-2xl text-burgundy">{event.title}</h3>
              <span className="rounded-full bg-burgundy/10 px-3 py-1 font-display text-[10px] tracking-[0.18em] text-burgundy uppercase">
                {event.time} – {event.endTime}
              </span>
            </div>
            <p className="mt-3 font-serif text-base text-ink">
              {event.venue}
            </p>
            <p className="mt-1 font-serif text-sm leading-relaxed text-ink/70">
              {event.address}
            </p>
            <p className="mt-4 font-serif text-base leading-relaxed text-ink/80">
              {event.note}
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-parchment">
              <iframe
                title={`Map for ${event.venue}`}
                src={event.mapEmbed}
                className="h-44 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={toGoogleCalendarUrl(event)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-burgundy/30 px-4 py-2 font-display text-[10px] tracking-[0.16em] text-burgundy uppercase transition hover:bg-burgundy hover:text-ivory"
              >
                Add to Calendar
              </a>
              <a
                href={toIcs(event)}
                download={`${event.id}.ics`}
                className="rounded-full border border-burgundy/30 px-4 py-2 font-display text-[10px] tracking-[0.16em] text-burgundy uppercase transition hover:bg-burgundy hover:text-ivory"
              >
                Download ICS
              </a>
              <a
                href={event.directionsLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-burgundy/20 px-4 py-2 font-display text-[10px] tracking-[0.16em] text-burgundy uppercase transition hover:bg-parchment"
              >
                Directions
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};
