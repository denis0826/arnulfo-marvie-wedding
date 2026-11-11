import { SectionHeading } from "@/components/Flourish";
import { transport } from "@/lib/wedding";

export const TransportSection = () => {
  return (
    <section id="transport" className="px-6 py-20 md:px-10">
      <SectionHeading>Transportation</SectionHeading>
      <p className="mx-auto max-w-lg text-center font-serif text-lg leading-relaxed text-ink/80">
        {transport.intro}
      </p>
      <ul className="mt-10 space-y-4">
        {transport.items.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-burgundy/15 bg-ivory-soft p-6"
          >
            <h3 className="font-serif text-2xl text-burgundy">{item.title}</h3>
            <p className="mt-2 font-serif text-base leading-relaxed text-ink/80">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
