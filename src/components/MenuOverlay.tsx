"use client";

import type { KeyboardEvent } from "react";
import { couple, navItems, rsvp } from "@/lib/wedding";
import { Flourish } from "@/components/Flourish";

type MenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
};

export const MenuOverlay = ({
  isOpen,
  onClose,
  onNavigate,
}: MenuOverlayProps) => {
  const handleNavigate = (id: string) => {
    onClose();
    window.setTimeout(() => {
      onNavigate(id);
    }, 80);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigate(id);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Close menu backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-burgundy-deep/45"
      />
      <aside
        className={`absolute top-0 left-0 flex h-full w-[min(92vw,380px)] flex-col paper grain p-8 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-script text-4xl leading-tight text-burgundy">
              {couple.shortNames}
            </p>
            <p className="mt-1 font-display text-[10px] tracking-[0.28em] text-olive uppercase">
              April 23, 2027
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-burgundy/25 text-burgundy transition hover:bg-burgundy hover:text-ivory"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
        <Flourish className="mt-6 h-8 w-40 text-olive/70" />
        <nav className="mt-8 flex flex-1 flex-col gap-1 overflow-y-auto pr-2" aria-label="Guest pages">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => handleNavigate(item.id)}
              onKeyDown={(event) => handleKeyDown(event, item.id)}
              className="rounded-full px-3 py-2.5 text-left font-serif text-burgundy/90 transition hover:bg-parchment hover:text-burgundy"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => handleNavigate("rsvp")}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-burgundy px-5 py-3 font-display text-xs tracking-[0.22em] text-burgundy uppercase transition hover:bg-burgundy hover:text-ivory"
        >
          RSVP by {rsvp.deadlineLabel}
        </button>
      </aside>
    </div>
  );
};
