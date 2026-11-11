import { SectionHeading } from "@/components/Flourish";
import { attire } from "@/lib/wedding";

export const AttireSection = () => {
  return (
    <section id="attire" className="px-6 py-20 md:px-10">
      <SectionHeading eyebrow={attire.theme}>Wedding Attire</SectionHeading>
      <p className="mx-auto max-w-lg text-center font-serif text-lg leading-relaxed text-ink/80">
        {attire.intro}
      </p>
      <div className="mt-10 grid gap-4">
        <article className="rounded-2xl border border-burgundy/15 bg-ivory-soft p-6">
          <p className="font-display text-[10px] tracking-[0.28em] text-burgundy uppercase">
            Ladies
          </p>
          <p className="mt-2 font-serif text-lg text-ink">{attire.ladies}</p>
        </article>
        <article className="rounded-2xl border border-burgundy/15 bg-ivory-soft p-6">
          <p className="font-display text-[10px] tracking-[0.28em] text-burgundy uppercase">
            Gentlemen
          </p>
          <p className="mt-2 font-serif text-lg text-ink">{attire.gentlemen}</p>
        </article>
      </div>
      <div className="mt-10">
        <p className="mb-4 text-center font-display text-[11px] tracking-[0.28em] text-burgundy uppercase">
          Palette for guests
        </p>
        <div className="flex justify-center gap-6">
          {attire.palette.map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-2">
              <span
                className="h-14 w-14 rounded-full border border-ink/10 shadow-inner"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <span className="font-serif text-sm text-ink/80">{color.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="mb-4 text-center font-display text-[11px] tracking-[0.28em] text-burgundy uppercase">
          Please avoid
        </p>
        <div className="flex justify-center gap-6">
          {attire.avoid.map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-2">
              <span
                className="relative h-14 w-14 overflow-hidden rounded-full border border-ink/15"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -rotate-45 bg-burgundy/70" />
              </span>
              <span className="font-serif text-sm text-ink/80">{color.name}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-md text-center font-serif text-base leading-relaxed text-ink/70">
        {attire.shoes}
      </p>
    </section>
  );
};
