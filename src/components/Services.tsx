import Image from "next/image";

const services = [
  {
    title: "Puppy Training",
    id: 12,
    blurb: "Foundational socialisation, potty guidance, and early good habits.",
  },
  {
    title: "Obedience Training",
    id: 34,
    blurb: "Sit, stay, come and reliable everyday commands, built with positive reinforcement.",
  },
  {
    title: "Behaviour Training",
    id: 76,
    blurb: "Targeted correction for barking, leash pulling, and reactive behaviour.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-blush-100 pb-24">
      <div className="container-px mx-auto max-w-[1200px]">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl">
            Training for <span className="text-yellow-dark">Every Paw &amp; Every Stage.</span>
          </h2>
          <p className="mt-4 text-[15px] text-ink-muted">
            From puppy basics to advanced skills, we help your dog learn, grow, and thrive.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl bg-white p-4 pb-7 text-center shadow-[0_16px_40px_-18px_rgba(26,23,16,0.25)] transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={`https://placedog.net/600/450?id=${service.id}`}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 text-xl font-bold text-black">{service.title}</h3>
              <p className="mx-auto mt-2 max-w-[26ch] text-sm text-ink-muted">{service.blurb}</p>
              <a
                href="#contact"
                className="mt-5 inline-block rounded-full bg-yellow px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
