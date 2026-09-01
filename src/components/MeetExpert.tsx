"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Award, PawPrint, ArrowRight, Quote, X } from "lucide-react";

const trainer = {
  name: "M. Solomon Brainord",
  role: "Founder & Lead Trainer",
  photo: "/trainer.png",
  years: "17+",
  yearsLabel: "Years of experience",
  trained: "2000+",
  trainedLabel: "Dogs trained",
  bio: "Solomon is a professional canine trainer and behaviourist with 17-plus years of hands-on experience, having trained over 5000 dogs across a wide variety of breeds and behavioural challenges. His journey began early, inspired by his grandfather's service in the RPF Dog Squad, where disciplined training and working dog handling were part of everyday life. To further refine his skills, Solomon trained under internationally recognized canine professionals, including a World Champion trainer from Germany and an Obedience World Champion from the Netherlands. While he offers obedience training across all levels, his core specialization is behavioural modification, particularly cases involving aggression, reactivity, fear, and anxiety. His training method is practical and individualized, often conducted in the dog's home environment to encourage real-world learning and long-term results. Over the years, Solomon has earned the trust of thousands of pet owners by delivering calm, structured, results-driven training tailored to each dog's temperament and lifestyle.",
  pullQuote: "Understand the dog, build trust, and create lasting behavioural change.",
};

export function MeetExpert() {
  const [bioOpen, setBioOpen] = useState(false);

  // Lock page scroll and allow Escape to close while the popup is open.
  useEffect(() => {
    if (!bioOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBioOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [bioOpen]);

  return (
    <section id="trainers" className="relative overflow-hidden bg-cream py-16 sm:py-24">
      {/* ambient accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-yellow/10 blur-3xl"
      />

      <div className="container-px relative mx-auto max-w-7xl">
        {/* ---------- Header ---------- */}
        <div className="mx-auto text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
            Meet the Trainer
          </p>
          <h2 className="mt-5 text-[32px] font-extrabold leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-[42px]">
            The expert behind{" "}
            <span className="text-yellow-dark">your dog&rsquo;s transformation.</span>
          </h2>
          <p className="mx-auto mt-4 text-[15px] leading-relaxed text-ink-muted">
            17+ years of hands-on experience, covering everything from a
            puppy&rsquo;s first &ldquo;sit&rdquo; to the hardest behavioural
            cases.
          </p>
        </div>

        {/* ---------- Profile card ---------- */}
        <div className="mx-auto mt-14 max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_35px_70px_-30px_rgba(0,0,0,0.3)] ring-1 ring-black/5 sm:grid sm:grid-cols-[0.9fr_1.1fr]">
            {/* Photo */}
            <div className="relative aspect-[4/5] sm:aspect-auto">
              <Image
                src={trainer.photo}
                alt={trainer.name}
                fill
                sizes="(min-width: 640px) 440px, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-black/5" />

              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-black/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-yellow backdrop-blur-sm">
                <PawPrint size={13} />
                {trainer.role}
              </span>

              <h3 className="absolute bottom-6 left-5 right-5 text-2xl font-extrabold leading-tight text-white sm:hidden">
                {trainer.name}
              </h3>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-7 sm:p-11">
              <h3 className="hidden text-[26px] font-extrabold leading-tight text-black sm:block">
                {trainer.name}
              </h3>

              <p className="mt-3 line-clamp-5 text-[15px] leading-relaxed text-ink-muted sm:mt-4">
                {trainer.bio}
              </p>
              <button
                type="button"
                onClick={() => setBioOpen(true)}
                className="mt-1.5 w-fit text-[13.5px] font-semibold text-black underline hover:decoration-yellow decoration-2 underline-offset-2 hover:text-yellow-dark"
              >
                Read more
              </button>

              {/* Pull quote */}
              <div className="mt-6 flex gap-3 border-l-2 border-yellow pl-4">
                <Quote
                  size={16}
                  className="mt-0.5 shrink-0 text-yellow-dark"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <p className="text-[14.5px] font-medium italic leading-relaxed text-black/70">
                  {trainer.pullQuote}
                </p>
              </div>

              {/* Stat blocks */}
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="flex gap-3 rounded-2xl bg-cream p-4 ring-1 ring-black/5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-black">
                    <Award size={16} className="text-yellow" strokeWidth={2.25} />
                  </span>
                  <div>
                  <p className="text-2xl font-extrabold leading-none text-black">
                    {trainer.years}
                  </p>
                  <p className="mt-1 text-[12.5px] font-medium text-ink-muted">
                    {trainer.yearsLabel}
                  </p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl bg-cream p-4 ring-1 ring-black/5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-black">
                    <PawPrint size={16} className="text-yellow" strokeWidth={2.25} />
                  </span>
                  <div>
                  <p className="text-2xl font-extrabold leading-none text-black">
                    {trainer.trained}
                  </p>
                  <p className="mt-1 text-[12.5px] font-medium text-ink-muted">
                    {trainer.trainedLabel}
                  </p>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="group/link mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-yellow shadow-[0_12px_24px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-10px_rgba(0,0,0,0.5)]"
              >
                Connect with {trainer.name}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Full bio popup ---------- */}
      {bioOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="trainer-bio-heading"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setBioOpen(false)}
          />

          <div className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] bg-white p-7 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] sm:p-10">
            <button
              type="button"
              onClick={() => setBioOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-cream text-black transition-colors hover:bg-black hover:text-yellow"
            >
              <X size={16} />
            </button>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-black px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-yellow">
              <PawPrint size={13} />
              {trainer.role}
            </span>

            <h3 id="trainer-bio-heading" className="mt-4 text-2xl font-extrabold leading-tight text-black">
              {trainer.name}
            </h3>

            <div className="mt-5 flex gap-3 border-l-2 border-yellow pl-4">
              <Quote
                size={16}
                className="mt-0.5 shrink-0 text-yellow-dark"
                fill="currentColor"
                strokeWidth={0}
              />
              <p className="text-[14.5px] font-medium italic leading-relaxed text-black/70">
                {trainer.pullQuote}
              </p>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">
              {trainer.bio}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-cream p-4 ring-1 ring-black/5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-black">
                  <Award size={16} className="text-yellow" strokeWidth={2.25} />
                </span>
                <p className="mt-3 text-2xl font-extrabold leading-none text-black">
                  {trainer.years}
                </p>
                <p className="mt-1 text-[12.5px] font-medium text-ink-muted">
                  {trainer.yearsLabel}
                </p>
              </div>
              <div className="rounded-2xl bg-cream p-4 ring-1 ring-black/5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-black">
                  <PawPrint size={16} className="text-yellow" strokeWidth={2.25} />
                </span>
                <p className="mt-3 text-2xl font-extrabold leading-none text-black">
                  {trainer.trained}
                </p>
                <p className="mt-1 text-[12.5px] font-medium text-ink-muted">
                  {trainer.trainedLabel}
                </p>
              </div>
            </div>

            <a
              href="#contact"
              onClick={() => setBioOpen(false)}
              className="group/link mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-yellow shadow-[0_12px_24px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-10px_rgba(0,0,0,0.5)]"
            >
              Connect with {trainer.name}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover/link:translate-x-1"
              />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}