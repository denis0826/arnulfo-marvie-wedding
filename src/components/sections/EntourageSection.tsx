import { SectionHeading } from "@/components/Flourish";
import { entourage } from "@/lib/wedding";

export const EntourageSection = () => {
  return (
    <section id="entourage" className="px-8 py-20 md:px-14">
      <SectionHeading>Entourage</SectionHeading>
      <p className="mx-auto max-w-lg text-center font-serif text-lg leading-relaxed text-ink/80">
        {entourage.note}
      </p>
      <ul className="mt-10 grid gap-4">
        {entourage.groups.map((group) => (
          <li
            key={group.title}
            className="rounded-2xl border border-parchment bg-ivory-soft p-6 text-center"
          >
            <h3 className="font-display text-[11px] tracking-[0.28em] text-olive uppercase">
              {group.title}
            </h3>
            {group.names.map((name) => (
              <p key={name} className="mt-2 font-script text-3xl text-burgundy">
                {name}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
};
