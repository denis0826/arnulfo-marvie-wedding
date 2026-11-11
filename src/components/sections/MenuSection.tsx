import { SectionHeading } from "@/components/Flourish";
import { menuCourses } from "@/lib/wedding";

export const MenuSection = () => {
  return (
    <section id="menu" className="px-6 py-20 md:px-10">
      <SectionHeading>Wedding Menu</SectionHeading>
      <p className="mx-auto max-w-lg text-center font-serif text-lg leading-relaxed text-ink/80">
        A seated dinner will be served at Anyag Leisure Farm. Kindly share any
        dietary notes when you RSVP.
      </p>
      <div className="relative mx-auto mt-10 max-w-md border border-burgundy/20 bg-ivory-soft px-8 py-10">
        <div className="pointer-events-none absolute inset-2 border border-burgundy/20" />
        <p className="text-center font-display text-[11px] tracking-[0.32em] text-burgundy uppercase">
          Dinner at Anyag
        </p>
        <ul className="relative mt-8 space-y-6">
          {menuCourses.map((item) => (
            <li key={item.course} className="text-center">
              <p className="font-display text-[10px] tracking-[0.28em] text-burgundy uppercase">
                {item.course}
              </p>
              <p className="mt-1 font-serif text-lg text-ink">{item.dish}</p>
            </li>
          ))}
        </ul>
        <p className="relative mt-8 text-center font-serif text-sm italic text-ink/60">
          Final dishes will be confirmed closer to April. Beef, chicken, fish, and
          a vegetarian plate will be offered.
        </p>
      </div>
    </section>
  );
};
