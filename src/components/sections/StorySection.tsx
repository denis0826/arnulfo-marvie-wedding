import { SectionHeading } from "@/components/Flourish";
import { invitation } from "@/lib/wedding";

export const StorySection = () => {
  return (
    <section id="story" className="px-8 py-20 md:px-14">
      <SectionHeading>Our Story</SectionHeading>
      <p className="text-center font-script text-3xl text-olive">
        {invitation.storyLead}
      </p>
      <div className="mx-auto mt-8 max-w-lg space-y-5 text-center font-serif text-lg leading-relaxed text-ink/80">
        <p>{invitation.story}</p>
        <p>{invitation.storyClose}</p>
      </div>
    </section>
  );
};
