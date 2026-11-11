import type { ReactNode } from "react";

type FlourishProps = {
  className?: string;
};

export const Flourish = ({ className = "h-12 w-56" }: FlourishProps) => {
  return (
    <svg
      viewBox="0 0 480 80"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M20 40h132"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.7"
      />
      <path
        d="M328 40h132"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.7"
      />
      <path
        d="M152 40c18-22 42-22 52 0 10 22 34 22 52 0 10-22 34-22 44 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M204 40c8-18 24-18 36 0 12 18 28 18 36 0"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.85"
      />
      <circle cx="240" cy="40" r="4.5" fill="currentColor" />
      <circle cx="240" cy="40" r="9" stroke="currentColor" strokeWidth="1" />
      <path
        d="M228 28c8-10 16-10 24 0M228 52c8 10 16 10 24 0"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const SectionHeading = ({
  children,
  eyebrow,
}: {
  children: ReactNode;
  eyebrow?: string;
}) => {
  return (
    <header className="mb-10 text-center">
      <Flourish className="mx-auto mb-5 h-10 w-48 text-burgundy/80" />
      {eyebrow ? (
        <p className="mb-3 font-display text-[11px] tracking-[0.35em] text-burgundy uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="px-2 font-script text-[2.5rem] leading-[1.15] break-words text-burgundy md:text-[2.75rem]">
        {children}
      </h2>
      <div className="mx-auto mt-5 h-px w-16 bg-burgundy/35" />
    </header>
  );
};
