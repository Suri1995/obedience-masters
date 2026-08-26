"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onHandlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const onHandlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const endDrag = (e: React.PointerEvent) => {
    setDragging(false);
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onTrackPointerDown = (e: React.PointerEvent) => {
    updateFromClientX(e.clientX);
  };

  const onHandleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container-px mx-auto max-w-7xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
          Before &amp; After
        </p>
        <h2 className="mt-5 text-3xl font-extrabold text-black sm:text-4xl">
          See the Transformation
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-ink-muted">
          Drag the slider — or use your arrow keys — to compare the same dog
          before and after training.
        </p>

        <div
          ref={containerRef}
          onPointerDown={onTrackPointerDown}
          className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-3xl touch-none select-none overflow-hidden rounded-3xl shadow-[0_25px_60px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
        >
          <Image
            src="https://placedog.net/1400/790?id=169"
            alt="Dog before training — restless and reactive"
            fill
            draggable={false}
            priority
            sizes="(min-width: 1280px) 1280px, 95vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src="https://placedog.net/1400/790?id=200"
              alt="Dog after training — calm and settled"
              fill
              draggable={false}
              priority
              sizes="(min-width: 1280px) 1280px, 95vw"
              className="object-cover"
            />
          </div>

          <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-black px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-yellow shadow-md">
            After
          </span>
          <span className="pointer-events-none absolute right-5 top-5 rounded-full bg-yellow px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-black shadow-md">
            Before
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-[3px] -translate-x-1/2 bg-yellow shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
            style={{ left: `${position}%` }}
          />

          <div
            role="slider"
            tabIndex={0}
            aria-label="Drag to compare before and after training"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-orientation="horizontal"
            onPointerDown={onHandlePointerDown}
            onPointerMove={onHandlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={onHandleKeyDown}
            style={{ left: `${position}%` }}
            className="absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full bg-black text-yellow shadow-[0_8px_20px_-4px_rgba(0,0,0,0.5)] outline-none ring-4 ring-white transition-transform focus-visible:ring-yellow/60 active:scale-95"
          >
            <MoveHorizontal size={18} />
          </div>
        </div>
      </div>
    </section>
  );
}