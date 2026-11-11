import { SectionHeading } from "@/components/Flourish";
import { gifts } from "@/lib/wedding";

export const GiftsSection = () => {
  return (
    <section id="gifts" className="px-8 py-20 md:px-14">
      <SectionHeading>Tokens of Love</SectionHeading>
      <div className="mx-auto max-w-lg text-center">
        <p className="font-serif text-lg leading-relaxed text-ink/80">
          {gifts.intro}
        </p>
        <p className="mt-5 font-serif text-lg leading-relaxed text-ink/80">
          {gifts.body}
        </p>
        <div className="mt-10 inline-flex flex-col items-center rounded-2xl border border-burgundy/20 bg-ivory-soft px-8 py-6">
          <p className="font-display text-[10px] tracking-[0.28em] text-olive uppercase">
            Wedding gift envelope
          </p>
          <p className="mt-2 font-script text-3xl text-burgundy">
            Your presence is the gift
          </p>
          <p className="mt-2 max-w-xs font-serif text-sm leading-relaxed text-ink/70">
            Monetary blessings may be placed in the envelope at the reception,
            should you wish to honor us in that way.
          </p>
        </div>
      </div>
    </section>
  );
};
