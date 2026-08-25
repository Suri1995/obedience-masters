"use client";

import { useRef } from "react";
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

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="relative bg-blush-100 py-20">
      <div className="container-px mx-auto max-w-[1200px]">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl">
            Love Your Dog, <span className="text-yellow-dark">But Struggling With Their Behavior?</span>
          </h2>
          <p className="mt-4 text-[15px] text-ink-muted">
            From barking to anxiety, the right training builds a calmer, happier dog.
          </p>
        </div>

        <div className="relative mt-12">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform hover:scale-105 sm:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
          >
            {challenges.map((item) => (
              <div
                key={item.title}
                className="relative aspect-[3/4] w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl shadow-[0_10px_30px_-12px_rgba(26,23,16,0.3)] sm:w-[260px]"
              >
                <Image
                  src={`https://placedog.net/500/650?id=${item.id}`}
                  alt={item.title}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                <span className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-yellow text-black shadow-md transition-transform hover:scale-105 sm:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
