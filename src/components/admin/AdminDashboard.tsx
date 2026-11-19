"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Flourish, SectionHeading } from "@/components/Flourish";
import { SplitLayout } from "@/components/SplitLayout";
import { couple } from "@/lib/wedding";
import type { RsvpRecord } from "@/lib/rsvp-types";

type Summary = {
  total: number;
  attending: number;
  declined: number;
  guestCount: number;
};

type DashboardPayload = {
  records: RsvpRecord[];
  summary: Summary;
};

const emptySummary: Summary = {
  total: 0,
  attending: 0,
  declined: 0,
  guestCount: 0,
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const eventLabel = (events: string[]) => {
  if (events.length === 0) {
    return "—";
  }

  return events
    .map((event) => {
      if (event === "ceremony") return "Ceremony";
      if (event === "cocktail") return "Cocktail";
      if (event === "reception") return "Reception";
      return event;
    })
    .join(", ");
};

export const AdminDashboard = () => {
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [records, setRecords] = useState<RsvpRecord[]>([]);
  const [summary, setSummary] = useState<Summary>(emptySummary);

  const loadRsvps = async () => {
    const response = await fetch("/api/admin/rsvps", { cache: "no-store" });
    if (response.status === 401) {
      setIsSignedIn(false);
      return false;
    }

    if (!response.ok) {
      throw new Error("Unable to load RSVPs.");
    }

    const payload = (await response.json()) as DashboardPayload;
    setRecords(payload.records);
    setSummary(payload.summary);
    setIsSignedIn(true);
    return true;
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        await loadRsvps();
      } catch {
        setErrorMessage("Unable to load RSVPs.");
      } finally {
        setIsChecking(false);
      }
    };

    void checkSession();
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to sign in.");
      }

      setPassword("");
      await loadRsvps();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to sign in.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsSignedIn(false);
    setRecords([]);
    setSummary(emptySummary);
  };

  const handleDownloadCsv = () => {
    window.location.href = "/api/admin/rsvps?format=csv";
  };

  const rightPanel = () => {
    if (isChecking) {
      return (
        <div className="flex min-h-full items-center justify-center px-6 py-16">
          <p className="font-display text-[11px] tracking-[0.28em] text-burgundy uppercase">
            Opening the ledger
          </p>
        </div>
      );
    }

    if (!isSignedIn) {
      return (
        <section className="flex min-h-full flex-col items-center justify-center px-6 py-16 text-center md:px-10">
          <Flourish className="mb-10 h-12 w-56 text-burgundy/75" />
          <p className="font-display text-xs tracking-[0.28em] text-burgundy uppercase">
            For the couple
          </p>
          <h1 className="mt-4 font-script text-5xl text-burgundy">Guest replies</h1>
          <p className="mt-3 max-w-sm font-serif text-lg leading-relaxed text-ink/75">
            Enter the password to see who has replied.
          </p>
          <form onSubmit={handleLogin} className="mt-10 w-full max-w-sm text-left">
            <label className="block">
              <span className="mb-2 block font-display text-[10px] tracking-[0.22em] text-burgundy uppercase">
                Password
              </span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-parchment bg-ivory-soft px-4 py-3 font-serif text-lg outline-none ring-burgundy/30 focus:ring-2"
              />
            </label>
            {errorMessage ? (
              <p className="mt-4 font-serif text-sm text-burgundy-soft">
                {errorMessage}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isSaving}
              className="mt-6 w-full rounded-full bg-burgundy px-5 py-3 font-display text-[11px] tracking-[0.24em] text-ivory uppercase transition hover:bg-burgundy-deep disabled:opacity-60"
            >
              {isSaving ? "Opening" : "View replies"}
            </button>
          </form>
          <Link
            href="/"
            className="mt-8 font-display text-[11px] tracking-[0.22em] text-burgundy uppercase underline-offset-4 hover:underline"
          >
            Back to invitation
          </Link>
          <Flourish className="mt-12 h-12 w-56 text-burgundy/75" />
        </section>
      );
    }

    return (
      <div className="px-6 py-16 md:px-10">
        <SectionHeading eyebrow="Guest replies">RSVPs</SectionHeading>
        <p className="mx-auto max-w-lg text-center font-serif text-lg leading-relaxed text-ink/80">
          {couple.displayNames}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="rounded-full bg-burgundy px-5 py-2.5 font-display text-[10px] tracking-[0.2em] text-ivory uppercase transition hover:bg-burgundy-deep"
          >
            Download CSV
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-burgundy/30 px-5 py-2.5 font-display text-[10px] tracking-[0.2em] text-burgundy uppercase transition hover:bg-burgundy hover:text-ivory"
          >
            Sign out
          </button>
        </div>
        <section className="mt-10 grid grid-cols-2 gap-3">
          {[
            { label: "Replies", value: summary.total },
            { label: "Attending", value: summary.attending },
            { label: "Regrets", value: summary.declined },
            { label: "Guests", value: summary.guestCount },
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-burgundy/15 bg-ivory-soft px-4 py-5 text-center"
            >
              <p className="font-display text-[10px] tracking-[0.22em] text-burgundy uppercase">
                {item.label}
              </p>
              <p className="mt-2 font-serif text-4xl normal-nums text-burgundy">
                {item.value}
              </p>
            </article>
          ))}
        </section>
        {records.length === 0 ? (
          <p className="mt-12 text-center font-serif text-lg text-ink/70">
            No RSVPs yet. When guests reply, they will appear here.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {records.map((record) => (
              <li
                key={record.id}
                className="rounded-2xl border border-burgundy/15 bg-ivory-soft p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 break-words font-serif text-xl text-burgundy">
                    {record.name}
                  </p>
                  <span className="shrink-0 rounded-full bg-burgundy/10 px-3 py-1 font-display text-[10px] tracking-[0.16em] text-burgundy uppercase">
                    {record.attending === "yes" ? "Yes" : "No"}
                  </span>
                </div>
                <p className="mt-1 font-serif text-sm text-ink/70">
                  {formatDate(record.submittedAt)}
                </p>
                <p className="mt-3 break-words font-serif text-base">{record.email}</p>
                <p className="mt-2 font-serif text-base text-ink/80">
                  {record.guests} guest{record.guests === "1" ? "" : "s"} ·{" "}
                  {eventLabel(record.events)}
                </p>
                {record.meal ? (
                  <p className="mt-1 font-serif text-base capitalize text-ink/80">
                    Meal: {record.meal}
                  </p>
                ) : null}
                {record.dietary ? (
                  <p className="mt-1 font-serif text-base text-ink/80">
                    Dietary: {record.dietary}
                  </p>
                ) : null}
                {record.message ? (
                  <p className="mt-2 font-serif text-base italic text-ink/75">
                    {record.message}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-12 text-center">
          <Link
            href="/"
            className="font-display text-[11px] tracking-[0.22em] text-burgundy uppercase underline-offset-4 hover:underline"
          >
            Back to invitation
          </Link>
        </p>
      </div>
    );
  };

  return <SplitLayout>{rightPanel()}</SplitLayout>;
};
