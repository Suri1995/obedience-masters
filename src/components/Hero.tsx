import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WaveDivider } from "./WaveDivider";

const stats = [
  { value: "17+ yrs", label: "In practice" },
  { value: "100%", label: "Professional Dog Trainer" },
  { value: "2000+", label: "Dogs trained" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-black"
    >
      {/* Full-bleed photo — art-directed per breakpoint:
          portrait crop below 640px, landscape crop from 640px up. */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 sm:hidden">
          <Image
            src="/trainer-husky-hero-portrait.png"
            alt="Trainer kneeling beside a calm, well-trained husky on a leash"
            fill
            priority
            sizes="calc(100vw - 17px)"
            className="object-cover object-[center_20%]"
          />
        </div>
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/trainer-husky-hero-landscape.png"
            alt="Trainer kneeling beside a calm, well-trained husky on a leash"
            fill
            priority
            sizes="calc(100vw - 17px)"
            className="object-cover object-[70%_center]"
          />
        </div>
        {/* Mobile: full dark wash so text stays legible over the whole photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/45 to-black/35 lg:hidden" />
        {/* Desktop: photo stays crisp on the right, fades to solid black on the left for the text column */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/75 via-black/50 to-white/15 lg:block" />
      </div>

      {/* Subtle brand glow, echoes the yellow arc in the logo without competing with the photo */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-yellow/10 blur-3xl" />

      <div className="container-px relative mx-auto flex min-h-[560px] max-w-7xl items-center py-20 lg:min-h-[680px]">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-black">
            <span aria-hidden className="text-sm">🐾</span>
            Trusted Dog Training Experts
          </p>

          <h1 className="font-display mt-6 text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
            &ldquo;Oh No!&rdquo; to{" "}
            <span className="text-yellow">&ldquo;That&rsquo;s My Dog!&rdquo;</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Expert-led training that transforms untruly habits into lasting obedience. Build confidence, trust, and a stronger connection with your dog guided by professionals who know what works.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-yellow px-7 py-3.5 text-[15px] font-semibold text-black shadow-[0_10px_24px_-6px_rgba(255,181,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-6px_rgba(255,181,0,0.6)]"
            >
              Schedule dog training
            </a>
            {/* <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-black shadow-[0_10px_24px_-6px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Our Services
              <ArrowRight size={16} />
            </a> */}
          </div>

          <dl className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-7">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                <div>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-extrabold text-white">
                    {stat.value}
                  </dd>
                  <dd className="text-[13px] font-medium text-white/60">
                    {stat.label}
                  </dd>
                </div>
                {i < stats.length - 1 && (
                  <span aria-hidden className="hidden h-9 w-px bg-white/15 sm:block" />
                )}
              </div>
            ))}
          </dl>
        </div>

        {/* Floating credential card, anchored over the photo on larger screens */}
        <div className="absolute bottom-10 right-6 hidden items-center gap-3 rounded-2xl bg-yellow px-5 py-4 shadow-[0_16px_32px_-10px_rgba(0,0,0,0.4)] sm:right-10 lg:flex">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-black text-lg">
            🐾
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-black">Certified &amp; Insured</p>
            <p className="text-[13px] text-black/60">Professional trainers</p>
          </div>
        </div>
      </div>

      <WaveDivider color="var(--color-cream)" position="bottom" />
    </section>
  );
}