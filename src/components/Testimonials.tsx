import Image from "next/image";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Anabella",
    headline: "We finally understand our dog!",
    quote:
      "Our dog used to bark at almost everyone who came home. The training helped us understand what was triggering him and how to respond calmly. The change has been amazing!",
    avatar: 47,
  },
  {
    name: "Priya",
    headline: "Walks are enjoyable again!",
    quote:
      "Our walks used to be stressful because of constant pulling. With simple techniques and regular practice, he now walks beside us so much more calmly.",
    avatar: 5,
  },
  {
    name: "Rahul",
    headline: "Such a confident little pup now!",
    quote:
      "We were struggling with basic commands and unwanted habits. The trainer was patient, gentle, and made learning fun for our puppy. We saw progress from the very beginning.",
    avatar: 33,
  },
];

export function Testimonials() {
  return (
    <section className="bg-yellow-light py-8 md:py-20">
      <div className="container-px mx-auto max-w-7xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
          Testimonials
        </p>
        <h2 className="mt-5 text-3xl font-extrabold text-black sm:text-4xl">
          Happy Dogs. <span className="text-yellow-dark">Happier Parents.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-ink-muted">
          Real stories from pet parents who&rsquo;ve seen the difference
          training can make.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-center">
          {testimonials.map((t, i) => {
            const featured = i === 1;
            return (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-3xl p-7 text-left transition-all duration-300 ${
                  featured
                    ? "bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] md:-translate-y-3 md:scale-[1.04] md:p-8"
                    : "bg-white shadow-[0_16px_40px_-20px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
                }`}
              >
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full ${
                    featured ? "bg-yellow" : "bg-black"
                  }`}
                >
                  <Quote
                    size={18}
                    className={featured ? "text-black" : "text-yellow"}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </span>

                <div className="mt-5 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className="text-yellow"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                <p
                  className={`mt-4 text-[15px] leading-relaxed ${
                    featured ? "text-white/90" : "text-ink-muted"
                  }`}
                >
                  {t.quote}
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-black/10 pt-5">
                  <div
                    className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ${
                      featured ? "ring-yellow" : "ring-black/10"
                    }`}
                  >
                    <Image
                      src={`https://i.pravatar.cc/96?img=${t.avatar}`}
                      alt={`${t.name}, pet parent`}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className={`font-bold ${featured ? "text-white" : "text-black"}`}>
                      {t.name}
                    </p>
                    <p className={`text-[13px] ${featured ? "text-white/60" : "text-ink-muted"}`}>
                      {t.headline}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}