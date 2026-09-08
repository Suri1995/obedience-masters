// FabButton.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FabButtonProps {
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
  /** popover open state — lifted to the parent so only one FAB is open at a time */
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  /** heading shown at the top of the popover panel (used when popoverHeader isn't provided) */
  popoverTitle: string;
  /**
   * Optional full-bleed colored header (brand icon + name), like a chat
   * widget's title bar. When provided this replaces the plain text title.
   */
  popoverHeader?: ReactNode;
  /** actual actionable content (tel:/wa.me links, message preview, etc.) */
  popoverContent: ReactNode;
}

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/**
 * Shared floating-action-button primitive. Both CallButton and
 * WhatsAppButton render through this so they always stay visually
 * consistent — same shadow language, same motion curve, same tooltip
 * and popover behavior. Only the icon, gradient, copy, and popover
 * content differ per button.
 *
 * Interaction model (matches the amma-eye-care-style FAB stack):
 * - Entrance: fade/slide in on mount.
 * - Discovery: label auto-peeks open once shortly after entrance, then
 *   collapses back to icon-only. No looping ambient animation.
 * - Click/tap the icon: toggles a small popup panel above the button
 *   containing the actual action (call number, WhatsApp chat starter).
 *   Clicking outside the panel, pressing Escape, or toggling the other
 *   FAB closes it.
 */
export default function FabButton({
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
  isOpen,
  onToggle,
  onClose,
  popoverTitle,
  popoverHeader,
  popoverContent,
}: FabButtonProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [peeking, setPeeking] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

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

  // Close the popover on outside click / Escape while it's open.
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Hide the hover/peek label tooltip whenever the popover itself is open.
  const labelShown = !isOpen && (hovered || peeking);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center gap-3 transition-all duration-500 ${EASE} motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {/* Popover panel — the actual action lives here, anchored above the icon */}
      <div
        role="dialog"
        aria-label={popoverTitle}
        aria-hidden={!isOpen}
        className={`absolute bottom-[calc(100%+14px)] right-0 w-[280px] origin-bottom-right overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_6px_rgba(15,15,15,0.04),0_20px_40px_-14px_rgba(15,15,15,0.28)] transition-all duration-300 ${EASE} motion-reduce:transition-none ${
          isOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {popoverHeader ?? (
          <p className="px-4 pt-4 text-[13px] font-bold tracking-[-0.01em] text-neutral-900">
            {popoverTitle}
          </p>
        )}

        <div className={popoverHeader ? "p-4" : "px-4 pb-4 pt-2.5"}>
          {popoverContent}
        </div>

        <span
          className="absolute -bottom-[6px] right-6 h-3 w-3 rotate-45 border-b border-r border-black/[0.06] bg-white"
          aria-hidden="true"
        />
      </div>

      {/* Label pill — hover/peek tooltip, hidden while the popover is open */}
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

      {/* Icon button — toggles the popover open/closed */}
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group relative flex h-14 w-14 shrink-0 items-center justify-center outline-none"
      >
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
          <span
            className={`relative transition-transform duration-300 ${EASE} ${
              isOpen ? "rotate-90 scale-90" : "rotate-0 scale-100"
            }`}
          >
            {icon}
          </span>
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
      </button>
    </div>
  );
}