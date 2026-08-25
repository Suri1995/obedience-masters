import Image from "next/image";
import { WaveDivider } from "./WaveDivider";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-cream pb-24 pt-14 lg:pb-32 lg:pt-20">
      <div className="container-px mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-2 lg:gap-8">
        <div className="max-w-xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-soft px-4 py-1.5 text-sm font-semibold text-yellow-dark">
            🐾 Trusted dog training studio
          </p>
          <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-black sm:text-6xl">
            &ldquo;Oh No!&rdquo; to{" "}
            <span className="text-yellow-dark">&ldquo;That&rsquo;s My Dog!&rdquo;</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            Make training a happy experience for your dog. Build positive habits,
            grow their confidence, and strengthen your bond with guidance from
            trusted professionals.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-yellow px-7 py-3.5 text-[15px] font-semibold text-black shadow-[0_10px_24px_-6px_rgba(255,181,0,0.6)] transition-transform hover:-translate-y-0.5"
            >
              Train My Dog
            </a>
            <a
              href="#services"
              className="rounded-full border-2 border-yellow px-7 py-3.5 text-[15px] font-semibold text-black transition-colors hover:bg-yellow-soft"
            >
              Our Services
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
          <div className="absolute -left-6 top-4 h-56 w-56 rounded-full bg-mint blur-0 sm:h-72 sm:w-72" />
          <div className="absolute -right-4 bottom-10 h-40 w-40 rounded-full bg-lavender sm:h-56 sm:w-56" />
          <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-[0_30px_60px_-20px_rgba(26,23,16,0.35)]">
            <Image
              src="https://placedog.net/900/1100?id=59"
              alt="Happy, well-trained golden retriever sitting calmly outdoors"
              fill
              priority
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <WaveDivider color="var(--color-blush-50)" position="bottom" />
    </section>
  );
}
