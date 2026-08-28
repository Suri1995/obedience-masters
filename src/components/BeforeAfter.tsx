"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BEFORE_IMAGE = "/golden-retriever-barking-bw.png";
const AFTER_IMAGE = "/golden-retriever-sit-focus.png";

// Tiny inline noise texture — no asset file needed.
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  // Single source of truth for pointer handling, bound to the container
  // itself (not the handle). Pointer capture is set on the container, so
  // dragging tracks smoothly no matter where on the frame you press down,
  // and keeps tracking even if the cursor slides outside the frame.
  const onPointerDown = (e: React.PointerEvent) => {
    containerRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
    setHasInteracted(true);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    if (containerRef.current?.hasPointerCapture?.(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const onHandleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    setHasInteracted(true);
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

  // Gentle one-time nudge so first-time visitors register it's draggable.
  // Skipped entirely for reduced-motion users.
  useEffect(() => {
    if (hasInteracted) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const t1 = setTimeout(() => setPosition(58), 700);
    const t2 = setTimeout(() => setPosition(50), 1250);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [hasInteracted]);

  const showChip = dragging || hovering;

  return (
    <section className="relative overflow-hidden bg-cream py-8 md:py-20">
      {/* ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(250,209,21,0.16) 0%, rgba(250,209,21,0) 70%)",
        }}
      />

      <div className="container-px relative mx-auto max-w-7xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
          Before &amp; After
        </p>

        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-black sm:text-4xl md:text-[2.75rem]">
          See the{" "}
          <span className="relative inline-block font-serif italic font-medium">
            transformation
            <svg
              aria-hidden
              viewBox="0 0 220 14"
              className="absolute -bottom-1.5 left-0 h-3 w-full text-yellow"
              preserveAspectRatio="none"
            >
              <path
                d="M2 9.5C40 2.5 90 2 110 6.5C130 11 180 3 218 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
        <p className="mx-auto mt-4 text-[15px] leading-relaxed text-ink-muted">
          Drag the slider — or use your arrow keys — to compare the same dog
          before and after training.
        </p>

        {/* Framed comparison card */}
        <div className="relative mx-auto mt-12 max-w-md">
          <div
            className={[
              "rounded-[2rem] p-[1.5px] transition-all duration-500 ease-out",
              "motion-safe:hover:-translate-y-1.5",
              dragging
                ? "shadow-[0_45px_90px_-30px_rgba(0,0,0,0.55),0_0_50px_-15px_rgba(250,209,21,0.5)]"
                : "shadow-[0_35px_80px_-30px_rgba(0,0,0,0.45)] motion-safe:hover:shadow-[0_45px_90px_-28px_rgba(0,0,0,0.5),0_0_45px_-18px_rgba(250,209,21,0.45)]",
            ].join(" ")}
            style={{
              background:
                "linear-gradient(155deg, rgba(250,209,21,0.9), rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.08) 65%, rgba(250,209,21,0.6))",
            }}
          >
            <div
              ref={containerRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="group relative aspect-[4/5] w-full touch-none select-none overflow-hidden rounded-[calc(2rem-1.5px)] bg-black ring-1 ring-black/5"
            >
              {/* AFTER (base layer, full color) */}
              <Image
                src={AFTER_IMAGE}
                alt="Dog after training — calm and settled"
                fill
                draggable={false}
                priority
                sizes="(min-width: 768px) 448px, 90vw"
                className="object-cover object-top"
              />

              {/* BEFORE (clipped overlay, desaturated for contrast even if source isn't pure b/w) */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${position}% 0 0)` }}
              >
                <Image
                  src={BEFORE_IMAGE}
                  alt="Dog before training — restless and reactive"
                  fill
                  draggable={false}
                  priority
                  sizes="(min-width: 768px) 448px, 90vw"
                  className="object-cover object-top grayscale contrast-[1.05]"
                />
              </div>

              {/* photographic vignette, sits above both photos, below UI */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[5]"
                style={{
                  background:
                    "radial-gradient(120% 120% at 50% 28%, transparent 55%, rgba(0,0,0,0.32) 100%)",
                }}
              />
              {/* fine film grain for a shot-on-location feel */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[5] opacity-[0.05] mix-blend-overlay"
                style={{ backgroundImage: GRAIN_BG }}
              />

              {/* legibility scrims for badges */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-24 bg-gradient-to-b from-black/45 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-20 bg-gradient-to-t from-black/35 to-transparent" />

              {/* Labels */}
              <div className="pointer-events-none absolute left-4 top-4 z-[7] flex flex-col gap-1">
                <span className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-md">
                  Before
                </span>
                <span className="pl-1 text-left text-[11px] font-medium text-white/70">
                  Restless &amp; reactive
                </span>
              </div>
              <div className="pointer-events-none absolute right-4 top-4 z-[7] flex flex-col items-end gap-1">
                <span className="w-fit rounded-full bg-yellow px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black shadow-sm">
                  After
                </span>
                <span className="pr-1 text-right text-[11px] font-medium text-white/70">
                  Calm &amp; settled
                </span>
              </div>

              {/* Divider line */}
              <div
                className="pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2"
                style={{
                  left: `${position}%`,
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.9) 8%, rgba(255,255,255,0.9) 92%, rgba(255,255,255,0))",
                  boxShadow: "0 0 16px 1px rgba(250,209,21,0.55)",
                }}
              />

              {/* Live percentage chip */}
              <div
                aria-hidden
                className={[
                  "pointer-events-none absolute z-20 -translate-x-1/2 rounded-full bg-black px-2.5 py-1 text-[11px] font-bold tabular-nums text-yellow shadow-lg transition-all duration-200 ease-out",
                  showChip
                    ? "opacity-100 -translate-y-[74px]"
                    : "opacity-0 -translate-y-[64px]",
                ].join(" ")}
                style={{ left: `${position}%` }}
              >
                {Math.round(position)}%
              </div>

              {/* Handle */}
              <div
                role="slider"
                tabIndex={0}
                aria-label="Drag to compare before and after training"
                aria-valuenow={Math.round(position)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={`${Math.round(position)}% before`}
                aria-orientation="horizontal"
                onKeyDown={onHandleKeyDown}
                style={{ left: `${position}%` }}
                className={[
                  "absolute top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full",
                  "border border-white/30 bg-black/70 text-yellow shadow-[0_10px_30px_-6px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.15),0_0_0_1px_rgba(250,209,21,0.25)] backdrop-blur-md",
                  "outline-none transition-transform duration-150 ease-out",
                  "focus-visible:ring-2 focus-visible:ring-yellow/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                  dragging ? "scale-[0.92]" : "scale-100 group-hover:scale-[1.07]",
                ].join(" ")}
              >
                <ChevronLeft size={14} className="-mr-0.5" strokeWidth={2.5} />
                <ChevronRight size={14} className="-ml-0.5" strokeWidth={2.5} />
              </div>

              {/* corner brackets — viewfinder / certificate framing detail */}
              {(
                [
                  ["left-3 top-3", "border-l border-t"],
                  ["right-3 top-3", "border-r border-t"],
                  ["left-3 bottom-3", "border-l border-b"],
                  ["right-3 bottom-3", "border-r border-b"],
                ] as const
              ).map(([pos, borders]) => (
                <span
                  key={pos}
                  aria-hidden
                  className={`pointer-events-none absolute z-[6] ${pos} h-4 w-4 rounded-[3px] ${borders} border-white/35`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}