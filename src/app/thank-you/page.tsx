import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock3, HeartHandshake, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Thank You | Obedience Masters",
  description: "Your dog training enquiry has been received by Obedience Masters.",
};

const nextSteps = [
  {
    icon: Check,
    title: "Your enquiry is with us",
    description: "We have safely received your details and your dog’s training goals.",
  },
  {
    icon: Clock3,
    title: "We’ll be in touch soon",
    description: "A member of our team will contact you within 24 hours to talk next steps.",
  },
  {
    icon: HeartHandshake,
    title: "A plan made for your dog",
    description: "We’ll help you find practical, positive guidance that fits your everyday life.",
  },
];

export default function ThankYouPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-yellow" />

      <header className="container-px relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between py-6 md:py-8">
        <Logo />
        <span className="hidden items-center gap-2 text-sm font-semibold text-ink-muted sm:flex">
          <ShieldCheck size={17} className="text-yellow-dark" aria-hidden="true" />
          Positive guidance. Real progress.
        </span>
      </header>

      <section className="container-px relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center py-12 md:py-20">
        <div className="grid w-full gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div className="max-w-2xl">
            <div className="mb-7 grid size-16 place-items-center rounded-[1.5rem] bg-yellow text-black shadow-[0_18px_40px_-18px_rgba(226,158,0,0.8)]">
              <Check size={32} strokeWidth={3} aria-hidden="true" />
            </div>

            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-yellow-dark">
              Enquiry received
            </p>
            <h1 className="mt-4 max-w-xl text-balance text-5xl font-extrabold leading-[0.98] text-black sm:text-6xl lg:text-7xl">
              You’ve taken the first step.
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ink-muted md:text-xl">
              Thank you for trusting Obedience Masters. We’re excited to learn more about your dog and help make training feel simpler, happier, and more rewarding.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-bold text-yellow shadow-[0_14px_30px_-14px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5"
              >
                Back to home
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a
                href="tel:+919999999999"
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-bold text-black transition-colors hover:border-yellow-dark hover:bg-yellow-soft"
              >
                Need us sooner? Call us
              </a>
            </div>
          </div>

          <div className="relative rounded-[2rem] bg-black p-6 text-white shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)] sm:p-8 lg:p-10">
            <div className="absolute right-7 top-7 size-3 rounded-full bg-yellow" aria-hidden="true" />
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-yellow">What happens next</p>
            <div className="mt-8 flex flex-col gap-7">
              {nextSteps.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-yellow text-black">
                    <Icon size={19} strokeWidth={2.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-9 rounded-2xl bg-yellow-soft p-5 text-black">
              <p className="text-sm font-bold leading-relaxed">
                “Small, consistent steps create the biggest changes.”
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">The Obedience Masters approach</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="container-px mx-auto w-full max-w-7xl pb-7 text-xs text-ink-muted md:pb-9">
        © {new Date().getFullYear()} Obedience Masters · Training with patience and purpose.
      </footer>
    </main>
  );
}
