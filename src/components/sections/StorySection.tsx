import { SectionHeading } from "@/components/Flourish";
import { invitation } from "@/lib/wedding";

export const StorySection = () => {
  return (
    <section id="story" className="px-6 py-20 md:px-10">
      <SectionHeading>Our Story</SectionHeading>
      <p className="px-1 text-center font-script text-[1.85rem] leading-[1.35] text-balance break-words text-burgundy">
        {invitation.storyLead}
      </p>
      <div className="mx-auto mt-8 max-w-lg space-y-5 text-center font-serif text-lg leading-relaxed text-ink/80">
        <p>{invitation.story}</p>
        <p>{invitation.storyClose}</p>
      </div>
    </section>
  );
};
