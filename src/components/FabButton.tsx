// FabButton.tsx
"use client";

import { useEffect, useState, type ReactNode } from "react";

interface FabButtonProps {
  href: string;
  external?: boolean;
  ariaLabel: string;
  label: string;
  icon: ReactNode;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string; // rgba(...) for the contact shadow
  ringColor: string; // rgba(...) for the hairline ring, tinted to this button's brand
  showOnlineDot?: boolean;
  /** ms before the button fades/slides into view */
  entranceDelay?: number;
  /** ms after entrance before the label auto-peeks open */
  peekDelay?: number;
  /** how long the auto-peek stays open before collapsing */
  peekDuration?: number;
}

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/**
 * Shared floating-action-button primitive. Both CallButton and
 * WhatsAppButton render through this so they always stay visually
 * consistent — same shadow language, same motion curve, same tooltip
 * behavior. Only the icon, gradient, and copy differ per button.
 *
 * Motion sequence: fade/slide in -> pause -> label auto-peeks open once
 * (so the action is discoverable without a hover, including on touch
 * devices) -> collapses back to icon-only -> label re-opens on hover
 * from then on. No looping ambient animation — one clean moment, then still.
 */
export default function FabButton({
  href,
  external,
  ariaLabel,
  label,
  icon,
  gradientFrom,
  gradientTo,
  shadowColor,
  ringColor,
  showOnlineDot,
  entranceDelay = 500,
  peekDelay = 900,
  peekDuration = 2600,
}: FabButtonProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [peeking, setPeeking] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), entranceDelay);
    return () => clearTimeout(t);
  }, [entranceDelay]);

  useEffect(() => {
    if (!visible) return;
    const open = setTimeout(() => setPeeking(true), peekDelay);
    const close = setTimeout(() => setPeeking(false), peekDelay + peekDuration);
    return () => {
      clearTimeout(open);
      clearTimeout(close);
    };
  }, [visible, peekDelay, peekDuration]);

  const labelShown = hovered || peeking;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group flex items-center gap-3 outline-none transition-all duration-500 ${EASE} motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {/* Label pill with connecting caret, anchored to the button rather than floating free */}
      <span
        className={`relative flex items-center whitespace-nowrap rounded-[14px] border border-black/[0.06] bg-white px-4 py-2.5 text-[13px] font-semibold tracking-[-0.01em] text-neutral-800 shadow-[0_2px_6px_rgba(15,15,15,0.04),0_14px_28px_-12px_rgba(15,15,15,0.24)] transition-all duration-300 ${EASE} motion-reduce:transition-none ${
          labelShown
            ? "translate-x-0 scale-100 opacity-100"
            : "pointer-events-none translate-x-1.5 scale-[0.97] opacity-0"
        }`}
      >
        {label}
        <span
          className="absolute right-[-5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r border-t border-black/[0.06] bg-white"
          aria-hidden="true"
        />
      </span>

      {/* Icon button */}
      <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
        {/* hairline brand-tinted ring, sits just outside the disc for separation from busy backgrounds */}
        <span
          className="absolute -inset-[3px] rounded-full transition-shadow duration-300"
          style={{ boxShadow: `0 0 0 1.5px ${ringColor}` }}
          aria-hidden="true"
        />
        <span
          className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full text-white transition-transform duration-300 ${EASE} group-hover:scale-[1.07] group-focus-visible:scale-[1.07] group-active:scale-95 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            boxShadow: `0 2px 4px -1px ${shadowColor}, 0 18px 32px -10px ${shadowColor}`,
          }}
        >
          {/* glossy top highlight — subtle, single light source, not a gradient wash */}
          <span
            className="pointer-events-none absolute inset-x-1 top-1 h-6 rounded-full bg-white/25 blur-[6px]"
            aria-hidden="true"
          />
          <span className="relative">{icon}</span>
        </span>

        {showOnlineDot && (
          <span
            className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm"
            aria-hidden="true"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </span>
        )}
      </span>
    </a>
  );
}