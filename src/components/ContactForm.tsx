"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Field, TextInput } from "@/components/calc/fields";

type Status = "idle" | "loading" | "sent" | "error";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hadesanoye01@gmail.com";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        throw new Error(payload.error || "Could not send your message.");
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        className="rounded-lg border border-teal-800/20 bg-white px-6 py-10 text-center shadow-sm"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-2xl font-semibold text-teal-950">
          Message sent
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          Thanks — your note is in the inbox. Expect a reply within a day or
          two.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-teal-800 underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name">
          <TextInput name="name" required autoComplete="name" />
        </Field>
        <Field label="Email">
          <TextInput
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </Field>
      </div>
      <Field label="Subject">
        <TextInput name="subject" placeholder="Feedback, partnership, bug…" />
      </Field>
      <Field label="Message">
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 shadow-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
        />
      </Field>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" ? (
        <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900" role="alert">
          {error}{" "}
          You can also email{" "}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-11 items-center justify-center rounded-md bg-teal-900 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
