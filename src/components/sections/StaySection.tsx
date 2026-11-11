import { SectionHeading } from "@/components/Flourish";
import { hotels } from "@/lib/wedding";

export const StaySection = () => {
  return (
    <section id="stay" className="px-6 py-20 md:px-10">
      <SectionHeading>Where to Stay</SectionHeading>
      <p className="mx-auto max-w-lg text-center font-serif text-lg leading-relaxed text-ink/80">
        To assist with your travel, we have gathered a few recommended stays near
        Granada. If you plan to remain the evening, we warmly encourage booking
        early.
      </p>
      <ul className="mt-10 space-y-6">
        {hotels.map((hotel) => (
          <li
            key={hotel.name}
            className="overflow-hidden rounded-2xl border border-burgundy/15 bg-ivory-soft shadow-[0_10px_30px_rgba(74,21,32,0.08)]"
          >
            <div
              className="h-36 bg-cover bg-center"
              style={{ backgroundImage: `url(${hotel.image})` }}
              role="img"
              aria-label={hotel.name}
            />
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-serif text-2xl text-burgundy">{hotel.name}</h3>
                <span className="rounded-full bg-burgundy/10 px-3 py-1 font-display text-[10px] tracking-[0.16em] text-burgundy uppercase">
                  {hotel.distance}
                </span>
              </div>
              <p className="mt-3 font-serif text-base leading-relaxed text-ink/80">
                {hotel.note}
              </p>
              <p className="mt-2 font-serif text-sm text-ink/60">{hotel.address}</p>
              <a
                href={hotel.link}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full border border-burgundy px-4 py-2 font-display text-[10px] tracking-[0.18em] text-burgundy uppercase transition hover:bg-burgundy hover:text-ivory"
              >
                View Stay
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
