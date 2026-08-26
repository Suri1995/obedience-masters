import Image from "next/image";
import { ArrowRight } from "lucide-react";

const services = [
  {
    stage: "Stage 01",
    title: "Puppy Training",
    id: 12,
    blurb: "Foundational socialisation, potty guidance, and early good habits.",
  },
  {
    stage: "Stage 02",
    title: "Obedience Training",
    id: 34,
    blurb:
      "Sit, stay, come and reliable everyday commands, built with positive reinforcement.",
  },
  {
    stage: "Stage 03",
    title: "Behaviour Training",
    id: 76,
    blurb: "Targeted correction for barking, leash pulling, and reactive behaviour.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-yellow-100 py-8 md:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
            Our Services
          </p>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-black sm:text-4xl">
            Training for{" "}
            <span className="text-yellow-dark">Every Paw &amp; Every Stage.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-ink-muted">
            From puppy basics to advanced skills, we help your dog learn,
            grow, and thrive — one stage at a time.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl bg-white p-4 pb-7 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.2)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-18px_rgba(0,0,0,0.3)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={`https://placedog.net/600/450?id=${service.id}`}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-yellow">
                  {service.stage}
                </span>
              </div>

              <div className="px-2 text-center">
                <h3 className="mt-5 text-xl font-bold text-black">
                  {service.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[28ch] text-sm leading-relaxed text-ink-muted">
                  {service.blurb}
                </p>

                <a
                  href="#contact"
                  className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-black"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}