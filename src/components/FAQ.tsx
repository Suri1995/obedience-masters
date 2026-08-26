"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does training take?",
    a: "Most dogs show noticeable change within 4\u20138 sessions, though this depends on age, breed, and the specific behaviours we\u2019re working on. We\u2019ll give you a realistic timeline after the first assessment.",
  },
  {
    q: "Do you train all dog breeds?",
    a: "Yes \u2014 we work with every breed and mixed breed, from small toy breeds to large working dogs, adapting our methods to their temperament and energy level.",
  },
  {
    q: "How do I choose the right training for my dog?",
    a: "Tell us your dog\u2019s age and what you\u2019re struggling with during the free consultation, and we\u2019ll recommend the plan \u2014 Puppy Starter, Dog Program, or Advanced Pro \u2014 that fits best.",
  },
  {
    q: "What will my dog learn during training?",
    a: "Depending on the plan, your dog will learn core obedience commands, leash manners, impulse control, socialisation skills, and behaviour-specific corrections like reducing barking or reactivity.",
  },
  {
    q: "Is the training safe and positive?",
    a: "Always. We use reward-based, positive reinforcement methods exclusively \u2014 no harsh corrections \u2014 so your dog builds confidence and trust throughout the process.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-cream py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
            Got Questions?
          </p>
          <h2 className="mt-5 text-3xl font-extrabold text-black sm:text-4xl">
            Frequently Asked <span className="text-yellow-dark">Questions</span>
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl bg-white transition-shadow duration-300 ${
                  isOpen
                    ? "shadow-[0_16px_36px_-16px_rgba(0,0,0,0.25)] ring-1 ring-black/10"
                    : "shadow-[0_8px_20px_-14px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span
                    className={`text-[15px] font-semibold transition-colors ${
                      isOpen ? "text-black" : "text-black/85"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                      isOpen ? "bg-yellow text-black" : "bg-black text-yellow"
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-black/5 px-6 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-ink-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}