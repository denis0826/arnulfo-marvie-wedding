import { Countdown } from "@/components/Countdown";
import { Flourish } from "@/components/Flourish";
import { couple, invitation, verse, weddingDate } from "@/lib/wedding";

type WelcomeSectionProps = {
  onViewDetails: () => void;
  onRsvp: () => void;
};

export const WelcomeSection = ({
  onViewDetails,
  onRsvp,
}: WelcomeSectionProps) => {
  return (
    <section
      id="welcome"
      className="flex min-h-full flex-col items-center justify-center px-8 py-16 text-center md:px-14"
    >
      <Flourish className="mb-10 h-12 w-56 text-burgundy/75" />
      <p className="font-display text-xs tracking-[0.28em] text-burgundy uppercase">
        {weddingDate.longLabel}
      </p>
      <p className="mt-4 max-w-sm font-serif text-lg leading-relaxed text-ink/80">
        {weddingDate.city}
        <br />
        {weddingDate.region}
      </p>
      <div className="mt-8">
        <Countdown />
      </div>
      <blockquote className="mt-10 max-w-md">
        <p className="font-script text-3xl leading-snug text-burgundy">
          “{verse.text}”
        </p>
        <cite className="mt-3 block font-display text-[11px] tracking-[0.28em] text-olive not-italic uppercase">
          {verse.citation}
        </cite>
      </blockquote>
      <p className="mt-8 font-script text-4xl text-olive">{invitation.kicker}</p>
      <p className="mt-3 font-serif text-lg text-ink/75">{couple.displayNames}</p>
      <div className="mt-10 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onRsvp}
          className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-burgundy px-6 py-3 font-display text-[11px] tracking-[0.24em] text-burgundy uppercase transition hover:bg-burgundy hover:text-ivory"
        >
          RSVP
        </button>
        <button
          type="button"
          onClick={onViewDetails}
          className="font-display text-[11px] tracking-[0.22em] text-olive uppercase underline-offset-4 hover:underline"
        >
          View Details
        </button>
      </div>
      <Flourish className="mt-12 h-12 w-56 text-burgundy/75" />
    </section>
  );
};
