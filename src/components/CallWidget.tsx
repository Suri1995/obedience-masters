"use client"

import { useEffect, useRef } from "react"
import { Phone, PhoneCall, X } from "lucide-react"

const PHONE = {
  tel: "9700030338",
  display: "97000 30338",
  label: "Talk to our trainers",
}

type CallWidgetProps = {
  /** Controlled from FloatingWidgets so only one widget is open at a time. */
  open: boolean
  onToggle: () => void
  onClose: () => void
}

/**
 * Floating "Call Us" widget for a single-number business. Positioning
 * (fixed/bottom/right/z-index) lives on the shared <FloatingWidgets>
 * wrapper, which also owns the open/closed state — this component just
 * renders what it's told and reports interactions back up, so opening
 * WhatsApp auto-closes this one and vice versa.
 *
 * The panel below stays mounted at all times (for a smooth fade/scale
 * transition) but collapses to h-0 while closed so it never reserves
 * extra space in the flex column and throws off the stack.
 */
export default function CallWidget({ open, onToggle, onClose }: CallWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, onClose])

  return (
    <div ref={containerRef} className="flex flex-col items-end gap-3">
      {/* Expandable call panel — h-0 when closed so it takes no space */}
      <div
        role="menu"
        aria-hidden={!open}
        className={`w-[280px] max-w-[calc(100vw-3rem)] origin-bottom-right overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-2xl shadow-amber-900/15 transition-[opacity,transform] duration-200 ease-out ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none h-0 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-[#D9772E] to-[#F0A63A] px-5 py-4">
          <div>
            <p className="text-sm font-extrabold text-white">Obedience Masters</p>
            <p className="text-xs text-white/85">Give us a call</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close call menu"
            className="rounded-full p-1 text-white/85 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-3">
          <a
            href={`tel:${PHONE.tel}`}
            role="menuitem"
            className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-150 hover:bg-gradient-to-r hover:from-[#D9772E]/8 hover:to-[#F0A63A]/8"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D9772E] to-[#F0A63A] text-white shadow-md shadow-[#D9772E]/25 transition-transform duration-150 group-hover:scale-105">
              <PhoneCall className="size-4" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-sm font-semibold tracking-wide text-slate-800">
                {PHONE.display}
              </span>
              <span className="text-[11px] text-slate-400">{PHONE.label}</span>
            </span>
          </a>
        </div>
      </div>

      {/* Trigger button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? "Close call menu" : "Call us"}
        className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#D9772E] to-[#F0A63A] text-white shadow-xl shadow-[#D9772E]/35 transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {!open && (
          <span
            className="absolute inset-0 animate-ping rounded-full bg-[#D9772E]/40"
            aria-hidden="true"
          />
        )}
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <Phone className="size-6" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}