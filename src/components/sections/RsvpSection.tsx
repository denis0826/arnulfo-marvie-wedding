"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { SectionHeading } from "@/components/Flourish";
import { rsvp } from "@/lib/wedding";

type FormState = {
  name: string;
  email: string;
  attending: "yes" | "no" | "";
  guests: string;
  events: string[];
  meal: string;
  dietary: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  attending: "",
  guests: "1",
  events: ["ceremony", "cocktail", "reception"],
  meal: "chicken",
  dietary: "",
  message: "",
};

const eventOptions = [
  { id: "ceremony", label: "Ceremony" },
  { id: "cocktail", label: "Cocktail Hour" },
  { id: "reception", label: "Dinner & Reception" },
];

export const RsvpSection = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleEventToggle = (eventId: string) => {
    setForm((current) => {
      const exists = current.events.includes(eventId);
      return {
        ...current,
        events: exists
          ? current.events.filter((item) => item !== eventId)
          : [...current.events, eventId],
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");
    setErrorMessage("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to save your RSVP.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  return (
    <section id="rsvp" className="px-6 py-20 md:px-10">
      <SectionHeading>RSVP</SectionHeading>
      <p className="mx-auto max-w-lg text-center font-serif text-lg leading-relaxed text-ink/80">
        Kindly reply by {rsvp.deadlineLabel}. You may also message{" "}
        {rsvp.contactName} on WhatsApp at {rsvp.phoneDisplay}.
      </p>
      <div className="mt-6 text-center">
        <a
          href={rsvp.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full border border-burgundy px-4 py-2 font-display text-[10px] tracking-[0.18em] text-burgundy uppercase transition hover:bg-burgundy hover:text-ivory"
        >
          Message on WhatsApp
        </a>
      </div>
      {status === "success" ? (
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-burgundy/20 bg-burgundy/[0.04] p-8 text-center">
          <p className="font-script text-4xl text-burgundy">Thank you</p>
          <p className="mt-3 font-serif text-lg leading-relaxed text-ink/80">
            Your reply has been received. We look forward to celebrating with you.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-md space-y-5"
        >
          <label className="block">
            <span className="mb-2 block font-display text-[10px] tracking-[0.22em] text-burgundy uppercase">
              Full name
            </span>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              className="w-full rounded-xl border border-parchment bg-ivory-soft px-4 py-3 font-serif text-lg outline-none ring-burgundy/30 focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-display text-[10px] tracking-[0.22em] text-burgundy uppercase">
              Email
            </span>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full rounded-xl border border-parchment bg-ivory-soft px-4 py-3 font-serif text-lg outline-none ring-burgundy/30 focus:ring-2"
            />
          </label>
          <fieldset>
            <legend className="mb-2 font-display text-[10px] tracking-[0.22em] text-burgundy uppercase">
              Will you attend?
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "yes", label: "Joyfully yes" },
                { value: "no", label: "Regretfully no" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-xl border px-4 py-3 text-center font-serif ${
                    form.attending === option.value
                      ? "border-burgundy bg-burgundy text-ivory"
                      : "border-parchment bg-ivory-soft text-ink"
                  }`}
                >
                  <input
                    required
                    type="radio"
                    name="attending"
                    value={option.value}
                    checked={form.attending === option.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
          {form.attending === "yes" ? (
            <>
              <label className="block">
                <span className="mb-2 block font-display text-[10px] tracking-[0.22em] text-burgundy uppercase">
                  Number of guests
                </span>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-parchment bg-ivory-soft px-4 py-3 font-serif text-lg outline-none"
                >
                  {["1", "2", "3", "4", "5", "6"].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </label>
              <fieldset>
                <legend className="mb-2 font-display text-[10px] tracking-[0.22em] text-burgundy uppercase">
                  Events
                </legend>
                <div className="space-y-2">
                  {eventOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 rounded-xl border border-parchment bg-ivory-soft px-4 py-3 font-serif"
                    >
                      <input
                        type="checkbox"
                        checked={form.events.includes(option.id)}
                        onChange={() => handleEventToggle(option.id)}
                        className="accent-burgundy"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className="mb-2 block font-display text-[10px] tracking-[0.22em] text-burgundy uppercase">
                  Meal preference
                </span>
                <select
                  name="meal"
                  value={form.meal}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-parchment bg-ivory-soft px-4 py-3 font-serif text-lg outline-none"
                >
                  <option value="beef">Beef</option>
                  <option value="chicken">Chicken</option>
                  <option value="fish">Fish</option>
                  <option value="vegetarian">Vegetarian</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block font-display text-[10px] tracking-[0.22em] text-burgundy uppercase">
                  Dietary notes
                </span>
                <input
                  name="dietary"
                  value={form.dietary}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-parchment bg-ivory-soft px-4 py-3 font-serif text-lg outline-none ring-burgundy/30 focus:ring-2"
                />
              </label>
            </>
          ) : null}
          <label className="block">
            <span className="mb-2 block font-display text-[10px] tracking-[0.22em] text-burgundy uppercase">
              Note for the couple
            </span>
            <textarea
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-xl border border-parchment bg-ivory-soft px-4 py-3 font-serif text-lg outline-none ring-burgundy/30 focus:ring-2"
            />
          </label>
          {status === "error" ? (
            <p className="font-serif text-sm text-burgundy-soft">{errorMessage}</p>
          ) : null}
          <button
            type="submit"
            disabled={status === "saving"}
            className="w-full rounded-full bg-burgundy px-5 py-3 font-display text-[11px] tracking-[0.24em] text-ivory uppercase transition hover:bg-burgundy-deep disabled:opacity-60"
          >
            {status === "saving" ? "Sending" : "Send RSVP"}
          </button>
        </form>
      )}
    </section>
  );
};
