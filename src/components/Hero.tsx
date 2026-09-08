"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Check, CheckCircle2, ChevronDown } from "lucide-react"

// TODO: swap in your real problem list if this differs.
const PROBLEMS = [
  "Puppy Training",
  "Obedience Training",
  "Behavior Correction",
  "Aggression Management",
  "Leash & Walking Training",
]

/**
 * Premium custom dropdown used for the "Main Problem" field.
 */
function PremiumProblemSelect({
  name,
  placeholder,
  options,
}: {
  name: string
  placeholder: string
  options: string[]
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [mounted, setMounted] = useState(false)
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    width: 0,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  function updateCoords() {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()

    setCoords({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    })
  }

  function toggleOpen() {
    if (!open) {
      updateCoords()
    }

    setOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!open) return

    window.addEventListener("scroll", updateCoords, true)
    window.addEventListener("resize", updateCoords)

    return () => {
      window.removeEventListener("scroll", updateCoords, true)
      window.removeEventListener("resize", updateCoords)
    }
  }, [open])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node

      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const panel = (
    <div
      ref={panelRef}
      role="listbox"
      style={{
        position: "fixed",
        top: coords.top,
        left: coords.left,
        width: coords.width,
        zIndex: 9999,
      }}
      className={`origin-top overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/20 transition-[opacity,transform] duration-200 ease-out ${
        open
          ? "pointer-events-auto scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0"
      }`}
    >
      <ul className="max-h-64 overflow-y-auto py-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-track]:bg-transparent">
        {options.map((option) => {
          const active = option === value

          return (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setValue(option)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                  active
                    ? "bg-yellow/15 font-semibold text-black"
                    : "text-black/70 hover:bg-black/5"
                }`}
              >
                <span className="truncate">{option}</span>

                {active && (
                  <Check
                    aria-hidden="true"
                    className="size-4 shrink-0 text-black"
                  />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} />

      <button
        ref={buttonRef}
        type="button"
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between rounded-xl border bg-cream/40 px-4 py-2.5 text-sm shadow-sm transition-all duration-200 ${
          open
            ? "border-yellow ring-2 ring-yellow/30"
            : "border-black/10 hover:border-black/20"
        } ${value ? "text-black" : "text-black/40"}`}
      >
        <span className="truncate">
          {value || placeholder}
        </span>

        <ChevronDown
          aria-hidden="true"
          className={`ml-2 size-4 shrink-0 transition-transform duration-200 ${
            open
              ? "rotate-180 text-black"
              : "text-black/40"
          }`}
        />
      </button>

      {mounted ? createPortal(panel, document.body) : null}
    </div>
  )
}

function HeroAppointmentForm() {
  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle")

  const [submitting, setSubmitting] = useState(false)

  async function submit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setSubmitting(true)
    setStatus("idle")

    const form = event.currentTarget
    const values = new FormData(form)

    const problem = values.get("problem")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.get("name"),
          phone: values.get("phone"),
          email: values.get("email"),
          breed: values.get("breed"),
          age: values.get("age"),
          mainProblem: problem || "Not specified",
          remarks: values.get("remarks"),
          source: "hero",
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Submission failed"
        )
      }

      setStatus("success")

      form.reset()
    } catch (error) {
      console.error(
        "Hero form submission error:",
        error
      )

      setStatus("error")
    } finally {
      setSubmitting(false)
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-yellow/15 px-6 py-10 text-center text-black">
        <CheckCircle2
          className="size-10 text-black"
          aria-hidden="true"
        />

        <h3 className="text-lg font-bold">
          Request received
        </h3>

        <p className="text-sm leading-6 text-black/70">
          Thank you! Our team will call you shortly to
          discuss your dog's training requirements.
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-3.5"
    >
      {/* Name */}
      <input
        required
        name="name"
        placeholder="Enter your name"
        className="w-full rounded-xl border border-black/10 bg-cream/40 px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:border-yellow focus:outline-none focus:ring-2 focus:ring-yellow/30"
      />

      {/* Phone */}
      <input
        required
        name="phone"
        type="tel"
        inputMode="tel"
        placeholder="Enter your phone number"
        className="w-full rounded-xl border border-black/10 bg-cream/40 px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:border-yellow focus:outline-none focus:ring-2 focus:ring-yellow/30"
      />

      {/* Email */}
      <input
        required
        name="email"
        type="email"
        placeholder="Enter your email address"
        className="w-full rounded-xl border border-black/10 bg-cream/40 px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:border-yellow focus:outline-none focus:ring-2 focus:ring-yellow/30"
      />

      {/* Dog Breed */}
      <input
        name="breed"
        placeholder="Dog Breed"
        className="w-full rounded-xl border border-black/10 bg-cream/40 px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:border-yellow focus:outline-none focus:ring-2 focus:ring-yellow/30"
      />

      {/* Dog Age */}
      <input
        name="age"
        placeholder="Dog Age"
        className="w-full rounded-xl border border-black/10 bg-cream/40 px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:border-yellow focus:outline-none focus:ring-2 focus:ring-yellow/30"
      />

      {/* Main Problem */}
      <PremiumProblemSelect
        name="problem"
        placeholder="Main Problem"
        options={PROBLEMS}
      />

      {/* Remarks */}
      <textarea
        name="remarks"
        rows={3}
        placeholder="Anything else we should know?"
        className="w-full resize-none rounded-xl border border-black/10 bg-cream/40 px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:border-yellow focus:outline-none focus:ring-2 focus:ring-yellow/30"
      />

      {/* Error */}
      {status === "error" && (
        <p
          role="alert"
          className="text-sm text-red-600"
        >
          Unable to submit right now. Please try again.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="mt-1 h-12 w-full rounded-full bg-yellow text-sm font-bold text-black shadow-lg shadow-yellow/30 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Sending…" : "Submit"}
      </button>
    </form>
  )
}

function AppointmentFormCard() {
  return (
    <div className="flex h-full flex-col justify-center rounded-3xl border-t-4 border-yellow bg-white p-6 shadow-2xl shadow-black/20 lg:p-7">
      <p className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-yellow px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-black">
        🐾 Book Appointment
      </p>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto md:pr-1">
        <HeroAppointmentForm />
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="home"
      role="region"
      aria-label="Obedience Masters — book a training session"
      className="relative w-full bg-amber-50"
    >
      {/* ===================== MOBILE (< 768px) ===================== */}

      <div
        className="relative w-full md:hidden"
        style={{ aspectRatio: "9 / 13" }}
      >
        <Image
          src="/hero-916.png"
          alt="Professional dog trainer with a well-trained husky in Hyderabad"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 0px"
          className="object-cover object-top"
        />
      </div>

      <div className="relative z-10 -mt-16 px-4 pb-10 sm:-mt-24 sm:px-6 md:hidden">
        <div className="mx-auto w-full max-w-md">
          <AppointmentFormCard />
        </div>
      </div>

      {/* ===================== DESKTOP (>= 768px) ===================== */}

      <div
        className="relative hidden w-full md:block"
        style={{
          height:
            "min(56.25vw, calc(100vh - 88px))",
        }}
      >
        <Image
          src="/hero-16-9.png"
          alt="Professional dog trainer with a well-trained husky in Hyderabad"
          fill
          priority
          sizes="(min-width: 768px) 100vw, 0px"
          className="object-cover object-[left_bottom]"
        />

        <div className="absolute right-8 top-1/2 z-10 h-[90%] w-[300px] max-w-md -translate-y-1/2 lg:right-16 md:w-[250px] lg:h-[90%] lg:w-[300px] xl:h-auto xl:w-[420px]">
          <AppointmentFormCard />
        </div>
      </div>
    </section>
  )
}