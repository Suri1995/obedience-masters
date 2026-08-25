"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";

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
    <section className="bg-blush-100 py-24">
      <div className="container-px mx-auto max-w-[820px]">
        <h2 className="text-center text-3xl font-extrabold text-yellow-dark sm:text-4xl">FAQ&rsquo;s</h2>

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_26px_-16px_rgba(26,23,16,0.2)]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-[15px] font-semibold text-black"
                >
                  {item.q}
                  <ChevronUp
                    size={18}
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-ink-muted">{item.a}</p>
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
