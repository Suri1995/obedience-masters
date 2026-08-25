import Image from "next/image";
import { Quote } from "lucide-react";

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
    <section className="bg-blush-100 py-24">
      <div className="container-px mx-auto max-w-[1200px] text-center">
        <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
          Happy Dogs. <span className="text-yellow-dark">Happier Parents.</span>
        </h2>
        <p className="mt-4 text-[15px] text-ink-muted">
          Real stories from pet parents who&rsquo;ve seen the difference training can make.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative flex flex-col rounded-3xl bg-white p-7 text-left shadow-[0_16px_40px_-20px_rgba(26,23,16,0.18)]"
            >
              <Quote size={28} className="text-yellow" fill="currentColor" strokeWidth={0} />
              <div className="mt-4 flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={`https://i.pravatar.cc/96?img=${t.avatar}`}
                    alt={`${t.name}, pet parent`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-yellow-dark">{t.name}</p>
                  <p className="text-sm font-medium text-black">{t.headline}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
