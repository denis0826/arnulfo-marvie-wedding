"use client";

import type { ReactNode, Ref } from "react";
import { PhotoPanel } from "@/components/PhotoPanel";

type SplitLayoutProps = {
  children: ReactNode;
  mainRef?: Ref<HTMLElement>;
};

export const SplitLayout = ({ children, mainRef }: SplitLayoutProps) => {
  return (
    <div className="min-h-screen bg-ivory lg:flex lg:h-screen lg:overflow-hidden">
      <div className="min-w-0 lg:w-[54%] lg:shrink-0">
        <PhotoPanel />
      </div>
      <main
        ref={mainRef}
        className="panel-scroll paper relative min-w-0 overflow-x-hidden lg:w-[46%] lg:overflow-y-auto lg:border-l lg:border-burgundy/25"
      >
        {children}
      </main>
    </div>
  );
};
