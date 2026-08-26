"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const challenges = [
  { title: "Excessive Barking", id: 3 },
  { title: "Aggression Issues", id: 26 },
  { title: "Leash Pulling", id: 46 },
  { title: "Jumping Up", id: 68 },
  { title: "Separation Anxiety", id: 91 },
];

export function BehaviorChallenges() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progress, setProgress] = useState(0); // 0–1, how far through the track
  const [thumbWidth, setThumbWidth] = useState(1); // 0–1, visible portion of track

  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setThumbWidth(Math.min(1, el.clientWidth / el.scrollWidth));
  };

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => updateScrollState();
    const onResize = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Desktop click-and-drag scrolling (touch keeps its native momentum scroll)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.style.scrollSnapType = "none";
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
    el.style.scrollSnapType = "";
  };

  return (
    <section className="relative bg-cream py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
            Common Challenges
          </p>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-black sm:text-4xl">
            Love Your Dog,{" "}
            <span className="text-yellow-dark">But Struggling With Their Behavior?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-ink-muted">
            From barking to anxiety, the right training builds a calmer,
            happier dog.
          </p>
        </div>

        <div className="relative mt-12">
          {/* Edge fades signal there's more to scroll */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-cream to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-cream to-transparent sm:w-16" />

          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="absolute left-0 top-[42%] z-20 hidden h-11 w-11 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-black text-yellow shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-105 hover:bg-yellow hover:text-black disabled:pointer-events-none disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-black disabled:hover:text-yellow sm:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            role="list"
            aria-label="Common behavior challenges"
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2 [cursor:grab] active:[cursor:grabbing]"
          >
            {challenges.map((item) => (
              <div
                key={item.title}
                data-card
                role="listitem"
                className="group relative aspect-[3/4] w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-14px_rgba(0,0,0,0.45)] sm:w-[260px]"
              >
                <Image
                  src={`https://placedog.net/500/650?id=${item.id}`}
                  alt={item.title}
                  fill
                  draggable={false}
                  sizes="260px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute left-4 right-4 top-4 inline-flex w-fit items-center rounded-full bg-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-black">
                  Challenge
                </span>
                <span className="absolute bottom-4 left-4 right-4 text-lg font-bold leading-snug text-white">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="absolute right-0 top-[42%] z-20 hidden h-11 w-11 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-black text-yellow shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-105 hover:bg-yellow hover:text-black disabled:pointer-events-none disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-black disabled:hover:text-yellow sm:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Scroll progress indicator */}
        <div className="mx-auto mt-6 h-1 w-full max-w-xs overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-yellow transition-[width,transform] duration-150 ease-out"
            style={{
              width: `${thumbWidth * 100}%`,
              transform: `translateX(${progress * (100 / thumbWidth - 100)}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}