"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Drop the five images below into /public/images/challenges/
// (already prepared for you — see the outputs folder).
const challenges = [
  {
    title: "Excessive Barking",
    blurb: "From alert barks to nonstop noise — we teach the quiet cue.",
    image: "/golden-retriever-barking-bw.png",
  },
  {
    title: "Aggression Issues",
    blurb: "Reactivity, guarding, snapping — rebuilt into calm confidence.",
    image: "/reactive-dog-snarling.png",
  },
  {
    title: "Leash Pulling",
    blurb: "Every walk turns from a tug-of-war into a loose-leash stroll.",
    image: "/rottweiler-leash-pulling.png",
  },
  {
    title: "Jumping Up",
    blurb: "Polite, four-on-the-floor greetings — every single time.",
    image: "/spitz-mix-happy-trick.png",
  },
  {
    title: "Separation Anxiety",
    blurb: "Home alone, worry-free — for your dog, and for you.",
    image: "/golden-retriever-calm-lying-down.png",
  },
];

export function BehaviorChallenges() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progress, setProgress] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const currentScroll = Math.round(el.scrollLeft);
    const maxScroll = Math.round(max);

    setCanScrollLeft(currentScroll > 5);
    setCanScrollRight(currentScroll < maxScroll - 5);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setThumbWidth(Math.min(1, el.clientWidth / el.scrollWidth));
  };

  useEffect(() => {
    const timer = setTimeout(updateScrollState, 100);

    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => updateScrollState();
    const onResize = () => updateScrollState();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length === 0) return;

    let step =
      cards.length > 1
        ? cards[1].offsetLeft - cards[0].offsetLeft
        : el.clientWidth;

    const gap = 24;
    step += gap;

    const currentScroll = el.scrollLeft;
    let targetScroll = currentScroll + dir * step;
    const maxScroll = el.scrollWidth - el.clientWidth;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

    el.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = false;
    setIsDragging(false);
    el.style.scrollSnapType = "";
    el.style.cursor = "";
  };

  return (
    <section className="relative overflow-hidden bg-cream py-24">
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-yellow/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-yellow/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-px relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow shadow-lg shadow-black/10">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow animate-pulse" />
            Common Challenges
          </p>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl">
            Love Your Dog,{" "}
            <span className="text-yellow-dark relative">
              But Struggling With Their Behavior?
            </span>
          </h2>
          <p className="mx-auto mt-4 text-[15px] leading-relaxed text-ink-muted/80">
            From barking to anxiety, the right training builds a calmer,
            happier dog — every card below fades from struggle to color, just
            like the dogs we work with.
          </p>
        </div>

        <div className="relative mt-14">
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            role="list"
            aria-label="Common behavior challenges"
            className={`no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-4 transition-all duration-300 ${
              isDragging ? "[cursor:grabbing]" : "[cursor:grab]"
            }`}
          >
            {challenges.map((item, index) => (
              <div
                key={item.title}
                data-card
                role="listitem"
                className="group relative aspect-[3/4] w-[85%] shrink-0 snap-start overflow-hidden rounded-[28px] bg-neutral-900 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_32px_64px_-20px_rgba(0,0,0,0.5)] sm:w-[60%] md:w-[calc((100%-3rem)/3)]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  draggable={false}
                  sizes="(min-width: 768px) 33vw, 85vw"
                  className="object-cover grayscale-[85%] transition-all duration-700 ease-out group-hover:scale-[1.08] group-hover:grayscale-0"
                  priority={index < 2}
                />

                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 via-35% to-black/0 transition-opacity duration-500 group-hover:from-black/95" />

                {/* Card badge */}
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-black shadow-lg shadow-black/20">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
                    Challenge
                  </span>
                  <span className="text-xs font-medium text-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Card content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/75 opacity-0 transition-all duration-500 ease-out group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
                    {item.blurb}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="mx-auto mt-10 flex max-w-xl items-center gap-6">
          <div className="relative flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full rounded-full bg-yellow transition-[width,transform] duration-200 ease-out"
                style={{
                  width: `${thumbWidth * 100}%`,
                  transform: `translateX(${progress * (100 / thumbWidth - 100)}%)`,
                }}
              />
            </div>
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-0.5">
              {challenges.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    i / (challenges.length - 1) <= progress
                      ? "scale-100 bg-yellow"
                      : "scale-75 bg-black/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`group relative grid size-12 place-items-center rounded-full transition-all duration-300 ${
                !canScrollLeft
                  ? "cursor-not-allowed bg-white/50 text-black/20 shadow-none"
                  : "bg-yellow text-black shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)] active:scale-95"
              }`}
            >
              <ChevronLeft
                size={20}
                className="transition-transform group-hover:scale-110"
              />
              {canScrollLeft && (
                <span className="absolute inset-0 rounded-full opacity-0 ring-2 ring-yellow/20 transition-opacity duration-300 group-hover:opacity-100" />
              )}
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`group relative grid size-12 place-items-center rounded-full transition-all duration-300 ${
                !canScrollRight
                  ? "cursor-not-allowed bg-white/50 text-black/20 shadow-none"
                  : "bg-yellow text-black shadow-[0_8px_24px_-12px_rgba(232,185,49,0.4)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_32px_-12px_rgba(232,185,49,0.6)] active:scale-95"
              }`}
            >
              <ChevronRight
                size={20}
                className="transition-transform group-hover:scale-110"
              />
              {canScrollRight && (
                <span className="absolute inset-0 rounded-full opacity-0 ring-2 ring-yellow/30 transition-opacity duration-300 group-hover:opacity-100" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}