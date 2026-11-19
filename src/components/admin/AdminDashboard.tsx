"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Flourish } from "@/components/Flourish";
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

  if (isChecking) {
    return (
      <main className="paper flex min-h-screen items-center justify-center px-6">
        <p className="font-display text-[11px] tracking-[0.28em] text-burgundy uppercase">
          Opening the ledger
        </p>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="paper flex min-h-screen items-center justify-center px-6 py-16">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl border border-burgundy/15 bg-ivory-soft/90 px-8 py-10 text-center shadow-[0_16px_40px_rgba(74,18,28,0.08)]"
        >
          <Flourish className="mx-auto mb-6 h-10 w-44 text-burgundy/75" />
          <h1 className="font-script text-5xl text-burgundy">RSVP Admin</h1>
          <p className="mt-3 font-serif text-lg text-ink/75">
            Arnulfo Jr & Marvie Dane
          </p>
          <label className="mt-8 block text-left">
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
              className="w-full rounded-xl border border-parchment bg-ivory px-4 py-3 font-serif text-lg outline-none ring-burgundy/30 focus:ring-2"
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
            {isSaving ? "Signing in" : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="paper min-h-screen px-5 py-10 md:px-10">
      <header className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-[10px] tracking-[0.28em] text-burgundy uppercase">
            Guest replies
          </p>
          <h1 className="mt-2 font-script text-5xl text-burgundy">RSVP Admin</h1>
          <p className="mt-2 font-serif text-lg text-ink/75">
            Arnulfo Jr & Marvie Dane · April 23, 2027
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
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
      </header>

      <section className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Replies", value: summary.total },
          { label: "Attending", value: summary.attending },
          { label: "Regrets", value: summary.declined },
          { label: "Guest count", value: summary.guestCount },
        ].map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-burgundy/15 bg-ivory-soft px-5 py-6"
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
        <p className="mx-auto mt-16 max-w-6xl text-center font-serif text-lg text-ink/70">
          No RSVPs yet. When guests reply, they will appear here.
        </p>
      ) : (
        <>
          <div className="mx-auto mt-10 hidden max-w-6xl overflow-hidden rounded-2xl border border-burgundy/15 bg-ivory-soft lg:block">
            <table className="w-full text-left">
              <thead className="bg-burgundy/10 font-display text-[10px] tracking-[0.18em] text-burgundy uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Attending</th>
                  <th className="px-4 py-3 font-medium">Guests</th>
                  <th className="px-4 py-3 font-medium">Events</th>
                  <th className="px-4 py-3 font-medium">Meal</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr
                    key={record.id}
                    className="border-t border-burgundy/10 font-serif text-sm text-ink"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-ink/70">
                      {formatDate(record.submittedAt)}
                    </td>
                    <td className="px-4 py-3">{record.name}</td>
                    <td className="px-4 py-3">{record.email}</td>
                    <td className="px-4 py-3">
                      {record.attending === "yes" ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3">{record.guests}</td>
                    <td className="px-4 py-3">{eventLabel(record.events)}</td>
                    <td className="px-4 py-3 capitalize">{record.meal || "—"}</td>
                    <td className="px-4 py-3">
                      {[record.dietary, record.message]
                        .filter(Boolean)
                        .join(" · ") || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mx-auto mt-8 grid max-w-6xl gap-4 lg:hidden">
            {records.map((record) => (
              <li
                key={record.id}
                className="rounded-2xl border border-burgundy/15 bg-ivory-soft p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-serif text-xl text-burgundy">{record.name}</p>
                  <span className="rounded-full bg-burgundy/10 px-3 py-1 font-display text-[10px] tracking-[0.16em] text-burgundy uppercase">
                    {record.attending === "yes" ? "Yes" : "No"}
                  </span>
                </div>
                <p className="mt-1 font-serif text-sm text-ink/70">
                  {formatDate(record.submittedAt)}
                </p>
                <p className="mt-3 font-serif text-base">{record.email}</p>
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
        </>
      )}
    </main>
  );
};
