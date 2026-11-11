"use client";

import { useEffect, useState } from "react";
import { weddingDate } from "@/lib/wedding";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getTimeLeft = (): TimeLeft => {
  const diff = Math.max(0, new Date(weddingDate.target).getTime() - Date.now());

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
};

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <p className="font-display text-[11px] tracking-[0.28em] text-olive uppercase">
        Counting the days
      </p>
    );
  }

  const parts = [
    { label: "days", value: timeLeft.days },
    { label: "hrs", value: timeLeft.hours },
    { label: "mins", value: timeLeft.minutes },
    { label: "secs", value: timeLeft.seconds },
  ];

  return (
    <p className="font-display text-[11px] tracking-[0.22em] text-olive uppercase">
      {parts.map((part) => `${part.value} ${part.label}`).join("  ")}
    </p>
  );
};
