import Image from "next/image";
import { WaveDivider } from "./WaveDivider";

const stats = [
  { value: "500+", label: "Dogs trained" },
  { value: "10+ yrs", label: "In practice" },
  { value: "100%", label: "Positive reinforcement" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-cream pb-24 pt-14 lg:pb-32 lg:pt-20"
    >
      <div className="container-px mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
            <span aria-hidden className="text-sm">🐾</span>
            Trusted Dog Training Studio
          </p>

          <h1 className="font-display text-[2.75rem] font-extrabold leading-[1.06] tracking-tight text-black sm:text-6xl">
            &ldquo;Oh No!&rdquo; to{" "}
            <span className="relative inline-block text-yellow-dark">
              &ldquo;That&rsquo;s My Dog!&rdquo;
              <svg
                aria-hidden
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-yellow"
              >
                <path
                  d="M2 10.5C60 3 150 2 298 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 text-lg leading-relaxed text-ink-muted">
            Make training a happy experience for your dog. Build positive
            habits, grow their confidence, and strengthen your bond with
            guidance from trusted professionals.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-black px-7 py-3.5 text-[15px] font-semibold text-yellow shadow-[0_10px_24px_-6px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.5)]"
            >
              Train My Dog
            </a>
            <a
              href="#services"
              className="rounded-full border-2 border-black px-7 py-3.5 text-[15px] font-semibold text-black transition-colors duration-300 hover:bg-black hover:text-yellow"
            >
              Our Services
            </a>
          </div>

          <dl className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-black/10 pt-7">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                <div>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-extrabold text-black">
                    {stat.value}
                  </dd>
                  <dd className="text-[13px] font-medium text-ink-muted">
                    {stat.label}
                  </dd>
                </div>
                {i < stats.length - 1 && (
                  <span aria-hidden className="hidden h-9 w-px bg-black/10 sm:block" />
                )}
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:h-[70vh] lg:w-auto lg:max-w-full">
          {/* Halo arc — echoes the mark in the logo */}
          <svg
            aria-hidden
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -left-10 -top-10 h-[110%] w-[110%] max-w-none text-yellow sm:-left-14 sm:-top-14"
          >
            <path
              d="M40 260 A160 160 0 1 1 340 200"
              stroke="currentColor"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
          </svg>

          <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
            <Image
              src="https://placedog.net/900/1100?id=59"
              alt="Happy, well-trained golden retriever sitting calmly outdoors"
              fill
              priority
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
          </div>

          {/* Floating credential card */}
          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-black px-5 py-4 shadow-[0_16px_32px_-10px_rgba(0,0,0,0.5)] sm:-left-8">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-yellow text-lg">
              🐾
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">
                Certified &amp; Insured
              </p>
              <p className="text-[13px] text-white/60">Professional trainers</p>
            </div>
          </div>
        </div>
      </div>

      <WaveDivider color="var(--color-cream)" position="bottom" />
    </section>
  );
}