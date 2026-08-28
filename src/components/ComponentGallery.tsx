"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

export function ComponentGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isSyncingRef = useRef(false);

  const total = galleryItems.length;

  // Only autoplay while the gallery is actually on screen — otherwise a
  // background tick has nothing good to do and just feels like a jolt
  // when it fires.
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

  const goTo = (index: number) => {
    const track = trackRef.current;
    const clamped = (index + total) % total;
    const target = slideRefs.current[clamped];
    if (!track || !target) return;
    // scrollTo on the track itself — unlike scrollIntoView, this can never
    // bleed out and move the page's vertical scroll position.
    isSyncingRef.current = true;
    track.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    setActiveIndex(clamped);
    window.setTimeout(() => {
      isSyncingRef.current = false;
    }, 500);
  };

  // Derive the active slide from actual scroll position — exact, and can
  // never get "stuck" the way visibility-ratio tracking can with peeking
  // cards.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const handleScroll = () => {
      if (isSyncingRef.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const first = slideRefs.current[0];
        const second = slideRefs.current[1];
        if (!first || !second) return;
        const step = second.offsetLeft - first.offsetLeft;
        if (!step) return;
        const idx = Math.round(track.scrollLeft / step);
        setActiveIndex(Math.min(Math.max(idx, 0), total - 1));
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [total]);

  // Gentle autoplay — pauses on hover/touch/focus and respects reduced-motion.
  useEffect(() => {
    if (typeof window === "undefined" || isPaused || !isInView) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => goTo(activeIndex + 1), AUTOPLAY_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isPaused, isInView]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  return (
    <section id="blogs" ref={sectionRef} className="bg-yellow-light py-24">
      <div className="container-px mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
              The gallery
            </p>
            <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-[2.75rem]">
              A better bond, one <span className="text-yellow-dark">moment</span> at a time.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">
              See the confidence, focus, and joy that positive training brings into everyday life.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous photo"
              className="grid size-12 place-items-center rounded-full border border-black/10 bg-white text-black shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-yellow active:translate-y-0"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next photo"
              className="grid size-12 place-items-center rounded-full border border-black/10 bg-white text-black shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-yellow active:translate-y-0"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Track */}
        <div className="relative mt-12">
          <div
            ref={trackRef}
            role="region"
            aria-label="Photo gallery"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 pr-6 [-ms-overflow-style:none] [scrollbar-width:none] focus:outline-none [&::-webkit-scrollbar]:hidden"
          >
            {galleryItems.map((item, index) => (
              <article
                key={item.id}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${total}`}
                className="group relative aspect-[4/5] w-[80%] shrink-0 snap-start overflow-hidden rounded-[28px] bg-neutral-900 shadow-[0_25px_60px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/5 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.5)] sm:w-[46%] lg:w-[340px]"
              >
                <Image
                  src={item.image}
                  alt={`${item.title} — Obedience Masters dog training`}
                  fill
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 46vw, 80vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  priority={index < 3}
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

          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-yellow-light to-transparent lg:block" />
        </div>

        {/* Progress + counter */}
        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-sm tabular-nums text-ink-muted">
            <span className="font-semibold text-black">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(total).padStart(2, "0")}
          </span>
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-black transition-[width] duration-500 ease-out"
              style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}