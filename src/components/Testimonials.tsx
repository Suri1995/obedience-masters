"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Shikha Venugopal",
    headline: "Turned into the most friendly dog",
    quote:
      "Solomon was excellent with my rottweiler pup. He was 4 months when we started his training. The patience required for a dog who has a mind of his own was amazing. Has turned into the most friendly dog, obeys most commands and is still very fond of Solomon. Though we got an e collar, we haven't had to use it after the training was over.",
    rating: 5,
  },
  {
    name: "dmuppala Daya",
    headline: "Impressive way of training",
    quote:
      "Very good training. Treating the pets in impressive way. While hand covering, good care is taken and good suggestions are given. Overall I felt good and I can recommend him to my friends.",
    rating: 5,
  },
  {
    name: "Vamshi Putta",
    headline: "From aggressive to fully obedient",
    quote:
      "Recently I bought a Tyson, when I bought this to our home it was very aggressive and we were not able to control it and we were very afraid to go near it. At that time we came to know about Obedience Masters from my friend and I approached them. Trainer Solomon gave training to Tyson and after training it was obeying whatever we command. We are very thankful to Solomon.",
    rating: 5,
  },
  {
    name: "K Vinay Kumar",
    headline: "Now follows every command",
    quote:
      "Pre-training, my dog would tune me out, yet after the sessions with Solomon he's now following every command.",
    rating: 5,
  },
];

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 50;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const count = testimonials.length;

  // 1 card visible below 640px, 3 cards visible at 640px and up.
  const [visibleCount, setVisibleCount] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setVisibleCount(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Sliding window: index is the leftmost visible card, and can go up to
  // count - visibleCount so the track never overshoots empty space.
  const maxIndex = Math.max(0, count - visibleCount);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (i: number) => {
      const span = maxIndex + 1;
      setIndex(((i % span) + span) % span);
    },
    [maxIndex]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  // Autoplay — restarts its timer whenever the slide changes (manually or
  // automatically) and pauses entirely on hover/focus.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  // Measure the real pixel distance between cards (accounts for the gap
  // automatically) so the track slides exactly one card at a time,
  // regardless of how many cards are visible per breakpoint.
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const measureStep = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length > 1) {
      setStep(cards[1].offsetLeft - cards[0].offsetLeft);
    } else if (cards.length === 1) {
      setStep(cards[0].offsetWidth);
    }
  }, []);

  useEffect(() => {
    measureStep();
    window.addEventListener("resize", measureStep);
    return () => window.removeEventListener("resize", measureStep);
  }, [measureStep, visibleCount]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
    touchX.current = null;
  };

  return (
    <section className="relative overflow-hidden bg-yellow-light py-16 sm:py-24">
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-yellow/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-yellow/10 blur-3xl" />

      <div className="container-px relative z-10 mx-auto max-w-7xl">
        {/* ---------- Header ---------- */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
            Testimonials
          </p>
          <h2 className="mt-5 text-[32px] font-extrabold leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-[42px]">
            Happy dogs. <span className="text-yellow-dark">Happier parents.</span>
          </h2>
          <p className="mx-auto mt-4 text-[15px] leading-relaxed text-ink-muted">
            Real stories from pet parents who&rsquo;ve seen the difference
            training can make.
          </p>
        </div>

        {/* ---------- Carousel: 1 card on mobile, 3 from sm up ---------- */}
        <div
          className="relative mt-12 sm:mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={onKeyDown}
        >
          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              ref={trackRef}
              role="list"
              aria-label="Customer testimonials"
              className="flex items-stretch gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * step}px)` }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  data-card
                  role="listitem"
                  className="group flex h-full w-full shrink-0 flex-col rounded-[1.75rem] bg-white p-7 text-left shadow-[0_16px_40px_-20px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-20px_rgba(0,0,0,0.28)] sm:w-[calc((100%-3rem)/3)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-black">
                      <Quote size={18} className="text-yellow" fill="currentColor" strokeWidth={0} />
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={14}
                          className={s < t.rating ? "text-yellow" : "text-black/15"}
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-6 flex-1 text-[14.5px] leading-relaxed text-ink-muted">
                    {t.quote}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-black/10 pt-5">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black/5 text-sm font-bold text-black ring-2 ring-black/10">
                      {initials(t.name)}
                    </div>
                    <div>
                      <p className="font-bold text-black">{t.name}</p>
                      <p className="text-[13px] text-ink-muted">{t.headline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* controls row: prev arrow — progress dots — next arrow, all beneath the card grid */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-black shadow-[0_8px_20px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_26px_-10px_rgba(0,0,0,0.5)] active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className="h-1.5 w-8 overflow-hidden rounded-full bg-black/10 transition-colors duration-300 sm:w-10"
                >
                  <span
                    className="block h-full rounded-full bg-yellow"
                    style={
                      i === index
                        ? {
                            width: "100%",
                            animation: paused
                              ? "none"
                              : `fillBar ${AUTOPLAY_MS}ms linear forwards`,
                          }
                        : i < index
                        ? { width: "100%" }
                        : { width: "0%" }
                    }
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-yellow text-black shadow-[0_8px_20px_-10px_rgba(232,185,49,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_26px_-10px_rgba(232,185,49,0.6)] active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fillBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}