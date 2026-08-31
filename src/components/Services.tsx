import Image from "next/image";
import { ArrowRight } from "lucide-react";

const services = [
  {
    stage: "Stage 01",
    title: "Puppy Training",
    image: "/23.png",
    blurb: "Foundational socialisation, potty guidance, and early good habits.",
  },
  {
    stage: "Stage 02",
    title: "Obedience Training",
    image: "/24.png",
    blurb:
      "Sit, stay, come and reliable everyday commands, built with positive reinforcement.",
  },
  {
    stage: "Stage 03",
    title: "Behaviour Training",
    image: "/25.png",
    blurb: "Targeted correction for barking, leash pulling, and reactive behaviour.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-yellow-100 py-16 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        {/* ---------- Header ---------- */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
            Our Services
          </p>
          <h2 className="mt-5 text-[32px] font-extrabold leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-[42px]">
            Training for every paw{" "}
            <span className="text-yellow-dark">&amp; every stage.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            From puppy basics to advanced skills, we help your dog learn,
            grow, and thrive — one stage at a time.
          </p>
        </div>

        {/* ---------- Cards ---------- */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_45px_-22px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.06] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_60px_-20px_rgba(0,0,0,0.35)]"
            >
              {/* image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 380px, 90vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                {/* gradient for legibility */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />

                {/* stage badge */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/90 py-1.5 pl-1.5 pr-3.5 backdrop-blur-sm">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-yellow font-display text-[11px] font-extrabold text-black">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-yellow">
                    {service.stage}
                  </span>
                </div>

                {/* title overlaid at image bottom */}
                <h3 className="absolute inset-x-5 bottom-5 text-2xl font-extrabold leading-tight text-white drop-shadow-sm">
                  {service.title}
                </h3>
              </div>

              {/* content */}
              <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                <p className="flex-1 text-[14.5px] leading-relaxed text-ink-muted">
                  {service.blurb}
                </p>

                <a
                  href="#contact"
                  className="group/link mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-black"
                >
                  <span className="relative">
                    Book Now
                    <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-yellow transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
                  </span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                </a>
              </div>

              {/* accent edge on hover */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-yellow transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}