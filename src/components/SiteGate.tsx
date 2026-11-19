"use client";

import { useState, type FormEvent } from "react";
import { Flourish } from "@/components/Flourish";
import { SplitLayout } from "@/components/SplitLayout";
import { couple, weddingDate } from "@/lib/wedding";

export const SiteGate = () => {
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/site-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "That code is not correct.");
      }

      window.location.reload();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "That code is not correct.",
      );
      setIsSaving(false);
    }
  };

  return (
    <SplitLayout>
      <section className="flex min-h-full flex-col items-center justify-center px-6 py-16 text-center md:px-10">
        <Flourish className="mb-10 h-12 w-56 text-burgundy/75" />
        <p className="font-display text-xs tracking-[0.28em] text-burgundy uppercase">
          {weddingDate.longLabel}
        </p>
        <h1 className="mt-4 font-script text-5xl leading-tight text-burgundy">
          {couple.shortNames}
        </h1>
        <p className="mt-4 max-w-sm font-serif text-lg leading-relaxed text-ink/80">
          Enter the invitation code to open our wedding details.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-sm text-left"
        >
          <label className="block">
            <span className="mb-2 block font-display text-[10px] tracking-[0.22em] text-burgundy uppercase">
              Invitation code
            </span>
            <input
              type="text"
              name="password"
              inputMode="numeric"
              autoComplete="off"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-parchment bg-ivory-soft px-4 py-3 text-center font-serif text-2xl tracking-[0.28em] text-burgundy outline-none ring-burgundy/30 focus:ring-2"
            />
          </label>
          {errorMessage ? (
            <p className="mt-4 text-center font-serif text-sm text-burgundy-soft">
              {errorMessage}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isSaving}
            className="mt-6 w-full rounded-full bg-burgundy px-5 py-3 font-display text-[11px] tracking-[0.24em] text-ivory uppercase transition hover:bg-burgundy-deep disabled:opacity-60"
          >
            {isSaving ? "Opening" : "Open invitation"}
          </button>
        </form>
        <Flourish className="mt-12 h-12 w-56 text-burgundy/75" />
      </section>
    </SplitLayout>
  );
};
