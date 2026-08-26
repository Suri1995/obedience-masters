"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function CTAForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [accepted, setAccepted] = useState(true);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accepted) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-gray-500 py-8 md:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-center rounded-[2rem] bg-black p-8 sm:p-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-black">
              Get Started
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Your Dog Is Ready.{" "}
              <span className="text-yellow">Are You?</span> 🐶
            </h2>
            <p className="mt-4 text-[15px] text-white/60">
              Let&rsquo;s turn everyday challenges into happy moments, one
              step at a time.
            </p>

            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-yellow p-5 shadow-[0_16px_32px_-16px_rgba(255,181,0,0.5)]">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black">
                <Sparkles size={14} className="text-yellow" />
              </span>
              <p className="text-[15px] font-semibold text-black">
                Your dog doesn&rsquo;t need to be perfect. They just need the
                right guidance.
              </p>
            </div>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] ring-1 ring-white/10">
              <Image
                src="https://placedog.net/900/560?id=95"
                alt="Content, well-trained family dog relaxing at home"
                fill
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.3)] ring-1 ring-black/5 sm:p-10">
            <h3 className="text-xl font-bold text-black">Your Pet Details</h3>
            <p className="mt-1 text-sm text-ink-muted">
              Tell us a bit about your dog and we&rsquo;ll follow up to
              schedule your first session.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <Field label="Full Name" name="fullName" placeholder="Name" required />
              <Field label="Owner Phone Number" name="phone" placeholder="Number" type="tel" required />
              <Field label="Breed" name="breed" placeholder="e.g. Golden Retriever" required />
              <Field label="Dog's Age" name="age" placeholder="Age of dog" required />
              <Field label="Email" name="email" placeholder="you@email.com" type="email" required />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  Schedule Date
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="month"
                    defaultValue="Sep"
                    className="rounded-xl border border-black/10 bg-cream px-4 py-2.5 text-sm text-ink transition-colors focus:border-black focus:outline-none focus:ring-2 focus:ring-yellow/50"
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    name="year"
                    defaultValue="2026"
                    className="rounded-xl border border-black/10 bg-cream px-4 py-2.5 text-sm text-ink transition-colors focus:border-black focus:outline-none focus:ring-2 focus:ring-yellow/50"
                  >
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>

              <label className="mt-1 flex items-start gap-2.5 text-sm text-ink-muted">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-black"
                />
                <span>
                  I accept the terms{" "}
                  <a
                    href="#"
                    className="font-medium text-black underline decoration-yellow decoration-2 underline-offset-2 hover:text-yellow-dark"
                  >
                    Read our T&amp;Cs
                  </a>
                </span>
              </label>

              <button
                type="submit"
                disabled={status === "loading" || !accepted}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-[15px] font-semibold text-yellow shadow-[0_12px_28px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-10px_rgba(0,0,0,0.55)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {status === "loading" && (
                  <Loader2 size={18} className="animate-spin" />
                )}
                {status === "success" ? "Request Sent!" : "Submit"}
              </button>

              {status === "success" && (
                <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-sm font-medium text-emerald-700">
                  <CheckCircle2 size={16} className="shrink-0" />
                  Thanks! We&rsquo;ll reach out within 24 hours.
                </p>
              )}
              {status === "error" && (
                <p className="flex items-center gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600">
                  <AlertCircle size={16} className="shrink-0" />
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-black/10 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 transition-colors focus:border-black focus:outline-none focus:ring-2 focus:ring-yellow/50"
      />
    </div>
  );
}