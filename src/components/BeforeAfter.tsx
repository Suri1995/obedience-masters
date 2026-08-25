"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <section className="bg-blush-100 py-20">
      <div className="container-px mx-auto max-w-[1000px] text-center">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-yellow-dark">
          Before &amp; After
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-black sm:text-4xl">
          See the Transformation
        </h2>

        <div
          ref={containerRef}
          className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-3xl touch-none select-none overflow-hidden rounded-3xl shadow-[0_20px_50px_-20px_rgba(26,23,16,0.3)]"
          onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
        >
          <Image
            src="https://placedog.net/900/500?id=169"
            alt="Dog before training — restless and reactive"
            fill
            sizes="(min-width: 1024px) 768px, 90vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src="https://placedog.net/900/500?id=200"
              alt="Dog after training — calm and settled"
              fill
              sizes="(min-width: 1024px) 768px, 90vw"
              className="object-cover"
            />
          </div>

          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
            After
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
            Before
          </span>

          <div
            className="absolute inset-y-0 z-10 flex w-0.5 -translate-x-1/2 cursor-ew-resize items-center justify-center bg-white"
            style={{ left: `${position}%` }}
            onMouseDown={() => (dragging.current = true)}
            onTouchStart={() => (dragging.current = true)}
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow-lg">
              <MoveHorizontal size={18} />
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-label="Drag to compare before and after training"
            className="absolute inset-x-0 bottom-3 z-20 mx-auto w-[92%] accent-yellow opacity-70 sm:hidden"
          />
        </div>
      </div>
    </section>
  );
}
