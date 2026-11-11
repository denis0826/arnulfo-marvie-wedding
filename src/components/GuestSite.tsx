"use client";

import { useEffect, useRef, useState } from "react";
import { MenuOverlay } from "@/components/MenuOverlay";
import { PhotoPanel } from "@/components/PhotoPanel";
import { AttireSection } from "@/components/sections/AttireSection";
import { EntourageSection } from "@/components/sections/EntourageSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { GiftsSection } from "@/components/sections/GiftsSection";
import { MenuSection } from "@/components/sections/MenuSection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { StaySection } from "@/components/sections/StaySection";
import { StorySection } from "@/components/sections/StorySection";
import { TransportSection } from "@/components/sections/TransportSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { couple } from "@/lib/wedding";

export const GuestSite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (id: string) => {
    const panel = panelRef.current;
    const target = panel?.querySelector<HTMLElement>(`#${id}`);
    if (panel && target) {
      const top =
        target.getBoundingClientRect().top -
        panel.getBoundingClientRect().top +
        panel.scrollTop;
      panel.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-ivory lg:flex lg:h-screen lg:overflow-hidden">
      <button
        type="button"
        onClick={handleOpenMenu}
        aria-label="Open menu"
        className="fixed top-5 left-5 z-40 inline-flex items-center gap-2 rounded-full border border-burgundy/30 bg-burgundy px-4 py-2 font-display text-[11px] tracking-[0.22em] text-ivory uppercase shadow-sm transition hover:bg-burgundy-deep"
      >
        <span aria-hidden="true">☰</span>
        Menu
      </button>
      <div className="min-w-0 lg:w-[54%] lg:shrink-0">
        <PhotoPanel />
      </div>
      <main
        ref={panelRef}
        className="panel-scroll paper relative min-w-0 overflow-x-hidden lg:w-[46%] lg:overflow-y-auto lg:border-l lg:border-burgundy/25"
      >
        <WelcomeSection
          onViewDetails={() => handleNavigate("schedule")}
          onRsvp={() => handleNavigate("rsvp")}
        />
        <StorySection />
        <ScheduleSection />
        <AttireSection />
        <StaySection />
        <TransportSection />
        <MenuSection />
        <GiftsSection />
        <EntourageSection />
        <RsvpSection />
        <FaqSection />
        <footer className="border-t border-burgundy/15 px-6 pt-8 pb-12 text-center md:px-10">
          <p className="font-script text-3xl text-burgundy">
            {couple.displayNames}
          </p>
          <p className="mt-2 font-display text-[10px] tracking-[0.28em] text-burgundy uppercase">
            Friday, April 23, 2027 · Bacolod
          </p>
          <p className="mt-3 font-serif text-sm text-burgundy/70">
            {couple.hashtag}
          </p>
        </footer>
      </main>
      {isMenuOpen ? (
        <MenuOverlay
          isOpen={isMenuOpen}
          onClose={handleCloseMenu}
          onNavigate={handleNavigate}
        />
      ) : null}
    </div>
  );
};
