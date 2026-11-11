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
import { couple, navItems } from "@/lib/wedding";

export const GuestSite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("welcome");
  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const nodes = navItems
      .map((item) => panel.querySelector<HTMLElement>(`#${item.id}`))
      .filter((node): node is HTMLElement => Boolean(node));

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: isDesktop ? panel : null,
        threshold: [0.2, 0.4, 0.65],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

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
    setActiveSection(id);
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
        className="fixed top-5 left-5 z-40 inline-flex items-center gap-2 rounded-full border border-ivory/40 bg-ivory/90 px-4 py-2 font-display text-[11px] tracking-[0.22em] text-burgundy uppercase shadow-sm backdrop-blur-sm transition hover:bg-ivory lg:border-burgundy/20"
      >
        <span aria-hidden="true">☰</span>
        Menu
      </button>
      <div className="lg:w-[54%] lg:shrink-0">
        <PhotoPanel sectionId={activeSection} />
      </div>
      <main
        ref={panelRef}
        className="panel-scroll paper relative lg:w-[46%] lg:overflow-y-auto"
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
        <footer className="px-8 pt-4 pb-12 text-center">
          <p className="font-script text-3xl text-burgundy">{couple.displayNames}</p>
          <p className="mt-2 font-display text-[10px] tracking-[0.28em] text-olive uppercase">
            Friday, April 23, 2027 · Bacolod
          </p>
          <p className="mt-3 font-serif text-sm text-ink/60">{couple.hashtag}</p>
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
