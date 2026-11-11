"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/Flourish";
import { faqs, rsvp } from "@/lib/wedding";

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="px-6 py-20 md:px-10">
      <SectionHeading>Q&A</SectionHeading>
      <p className="mx-auto mb-8 max-w-lg text-center font-serif text-lg leading-relaxed text-ink/80">
        If you have any questions, please begin here. For anything else, message{" "}
        {rsvp.contactName} on WhatsApp.
      </p>
      <div className="space-y-3">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <article
              key={item.question}
              className="rounded-2xl border border-burgundy/15 bg-ivory-soft"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => handleToggle(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-serif text-lg text-burgundy">
                  {item.question}
                </span>
                <span className="font-display text-burgundy" aria-hidden="true">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
              {isOpen ? (
                <p className="border-t border-parchment px-5 py-4 font-serif text-base leading-relaxed text-ink/80">
                  {item.answer}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
};
