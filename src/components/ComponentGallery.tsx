"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Images live at the root of /public — paths below match that.
const galleryItems = [
  {
    id: "leash-walk",
    eyebrow: "Out and about",
    title: "Good manners everywhere",
    image: "/golden-retriever-leash-walk.png",
  },
  {
    id: "calm-lying-down",
    eyebrow: "Everyday wins",
    title: "Calm starts here",
    image: "/golden-retriever-calm-lying-down.png",
  },
  {
    id: "paw-shake",
    eyebrow: "Real connection",
    title: "Training that brings you closer",
    image: "/beagle-paw-shake-trust.png",
  },
  {
    id: "treat-training",
    eyebrow: "Positive reinforcement",
    title: "Treats, timing, trust",
    image: "/beagle-treat-training.png",
  },
  {
    id: "sit-focus",
    eyebrow: "Focus & obedience",
    title: "Sit. Stay. Succeed.",
    image: "/golden-retriever-sit-focus.png",
  },
  {
    id: "high-five",
    eyebrow: "Everyday wins",
    title: "Small moments, big wins",
    image: "/senior-man-high-five-dog.png",
  },
  {
    id: "leash-training",
    eyebrow: "Leash manners",
    title: "Walking without the pull",
    image: "/black-lab-leash-training.png",
  },
  {
    id: "calm-petting",
    eyebrow: "Real connection",
    title: "Trust, built gently",
    image: "/saluki-calm-petting.png",
  },
  {
    id: "hug",
    eyebrow: "Real connection",
    title: "The bond that lasts",
    image: "/woman-hugging-golden-retriever.png",
  },
  {
    id: "happy-trick",
    eyebrow: "Puppy foundations",
    title: "Small steps, big confidence",
    image: "/spitz-mix-happy-trick.png",
  },
  {
    id: "reactive-barking",
    eyebrow: "Behaviour guidance",
    title: "Reactivity doesn't have to last",
    image: "/reactive-barking-fluffy-dog.png",
  },
  {
    id: "reactive-snarling",
    eyebrow: "Behaviour guidance",
    title: "We meet fear and frustration with a plan",
    image: "/reactive-dog-snarling.png",
  },
  {
    id: "leash-pulling",
    eyebrow: "Leash manners",
    title: "From pulling to walking in step",
    image: "/rottweiler-leash-pulling.png",
  },
  {
    id: "barking-bw",
    eyebrow: "Behaviour guidance",
    title: "Every bark has a reason — we find it",
    image: "/golden-retriever-barking-bw.png",
  },
];

const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD = 50;

export function ComponentGallery() {
  const total = galleryItems.length;

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
  // total - visibleCount so the track never overshoots empty space.
  const maxIndex = Math.max(0, total - visibleCount);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  // Manual navigation (buttons, dots, swipe, keyboard) — clamped, not
  // wrapped. It stops dead at the first/last card.
  const goTo = useCallback(
    (i: number) => {
      setIndex(Math.min(Math.max(i, 0), maxIndex));
    },
    [maxIndex]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay only — this one DOES wrap back to the start once it passes
  // the last card, independent of the clamped manual nav above.
  const autoAdvance = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const isStart = index <= 0;
  const isEnd = index >= maxIndex;

  const [paused, setPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);

  // Only autoplay while the gallery is actually on screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Autoplay — restarts its timer whenever the slide changes and pauses on
  // hover/touch/focus/off-screen/reduced-motion. Unlike the buttons, it
  // loops back to the first card after the last one instead of stopping.
  useEffect(() => {
    if (paused || !isInView) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;
    const t = setTimeout(autoAdvance, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, isInView, autoAdvance]);

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
    <section id="blogs" ref={sectionRef} className="bg-yellow-light py-24">
      <div className="container-px mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
            The gallery
          </p>
          <h2 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-[2.75rem]">
            A better bond, one <span className="text-yellow-dark">moment</span> at a time.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
            See the confidence, focus, and joy that positive training brings into everyday life.
          </p>
        </div>

        {/* Carousel: 1 card on mobile, 3 from sm up */}
        <div
          className="relative mt-12"
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
              aria-label="Photo gallery"
              tabIndex={0}
              className="flex gap-6 transition-transform duration-500 ease-out focus:outline-none"
              style={{ transform: `translateX(-${index * step}px)` }}
            >
              {galleryItems.map((item, i) => (
                <article
                  key={item.id}
                  data-card
                  role="listitem"
                  aria-label={`${i + 1} of ${total}`}
                  className="group relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-[28px] bg-neutral-900 ring-1 ring-black/5 transition-all duration-500 ease-out hover:-translate-y-1.5 sm:w-[calc((100%-3rem)/3)]"
                >
                  <Image
                    src={item.image}
                    alt={`${item.title} — Obedience Masters dog training`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    priority={i < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/0 transition-opacity duration-500 group-hover:from-black/90" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div className="min-w-0">
                      <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-yellow backdrop-blur-sm">
                        {item.eyebrow}
                      </span>
                      <h3 className="mt-3 text-balance text-xl font-bold leading-tight text-white sm:text-2xl">
                        {item.title}
                      </h3>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-yellow text-black shadow-lg transition-transform duration-300 group-hover:rotate-45 group-hover:scale-105">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* controls row: prev arrow — progress dots — next arrow, beneath the grid */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              disabled={isStart}
              aria-label="Previous photo"
              aria-disabled={isStart}
              className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-amber-950 bg-yellow text-black shadow-[0_8px_20px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_26px_-10px_rgba(0,0,0,0.5)] active:scale-95 disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="hidden md:flex items-center gap-2">
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
              disabled={isEnd}
              aria-label="Next photo"
              aria-disabled={isEnd}
              className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-amber-950 bg-yellow text-black shadow-[0_8px_20px_-10px_rgba(232,185,49,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_26px_-10px_rgba(232,185,49,0.6)] active:scale-95 disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none"
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