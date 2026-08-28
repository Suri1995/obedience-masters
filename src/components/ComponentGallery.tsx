import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const galleryItems = [
  {
    id: 21,
    eyebrow: "Everyday wins",
    title: "Calm starts here",
    className: "sm:col-span-2",
  },
  {
    id: 42,
    eyebrow: "Puppy foundations",
    title: "Small steps, big confidence",
    className: "",
  },
  {
    id: 63,
    eyebrow: "Real connection",
    title: "Training that brings you closer",
    className: "",
  },
  {
    id: 84,
    eyebrow: "Out and about",
    title: "Good manners everywhere",
    className: "sm:col-span-2",
  },
];

export function ComponentGallery() {
  return (
    <section id="blogs" className="bg-cream py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
              The gallery
            </p>
            <h2 className="mt-5 max-w-xl text-3xl font-extrabold leading-tight text-black sm:text-4xl">
              A better bond, one <span className="text-yellow-dark">moment</span> at a time.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-muted md:pb-1">
            See the confidence, focus, and joy that positive training brings into everyday life.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-2 sm:auto-rows-[260px] lg:grid-cols-4 lg:auto-rows-[230px]">
          {galleryItems.map((item) => (
            <article
              key={item.id}
              className={`group relative overflow-hidden rounded-3xl bg-black shadow-[0_16px_40px_-18px_rgba(0,0,0,0.28)] ${item.className}`}
            >
              <Image
                src={`https://placedog.net/900/650?id=${item.id}`}
                alt={`${item.title} — Obedience Masters dog training`}
                fill
                sizes="(min-width: 1024px) 450px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-yellow">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-1 text-xl font-bold leading-tight text-white sm:text-2xl">
                    {item.title}
                  </h3>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-yellow text-black transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
