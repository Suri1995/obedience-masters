import Image from "next/image";
import { GraduationCap, Sparkles, Compass, Heart } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section className="bg-cream py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
            Why Choose Us?
          </p>
          <h2 className="mt-5 text-3xl font-extrabold text-black sm:text-4xl">
            Because Every Dog Deserves the Right Approach.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2">
          <div className="rounded-3xl bg-white p-8 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-black">
              <GraduationCap size={20} className="text-yellow" strokeWidth={2.25} />
            </span>
            <h3 className="mt-5 text-xl font-bold text-black">
              Experienced Trainers
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
              Our experienced trainers understand that every dog learns
              differently. We work with your dog&rsquo;s personality, behavior,
              and needs to create meaningful progress.
            </p>
            <div className="mt-6 h-1 w-16 rounded-full bg-yellow" />
          </div>

          <div className="rounded-3xl bg-yellow p-8 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.3)]">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-black">
              <Sparkles size={20} className="text-yellow" strokeWidth={2.25} />
            </span>
            <h3 className="mt-5 text-xl font-bold text-black">
              Personalised Plans
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-black/70">
              Every dog has their own personality, habits, and quirks. Our
              personalised training plans focus on their age, behavior,
              lifestyle, and goals — with positive training for happier
              progress.
            </p>
          </div>

          <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_16px_40px_-20px_rgba(0,0,0,0.18)] ring-1 ring-black/5 md:row-span-2">
            <div className="p-8 pb-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-black">
                <Compass size={20} className="text-yellow" strokeWidth={2.25} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-black">
                Practical Guidance
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                Training shouldn&rsquo;t stop when the session ends. We give
                you practical guidance you can use at home, on walks, around
                guests, and in everyday situations.
              </p>
            </div>
            <div className="relative mt-auto h-56 w-full">
              <Image
                src="https://placedog.net/500/500?id=104"
                alt="Puppy looking attentively, mid-training"
                fill
                sizes="(min-width: 768px) 380px, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          <div className="flex items-center gap-6 overflow-hidden rounded-3xl bg-white p-8 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.18)] ring-1 ring-black/5 md:col-span-2">
            <div className="flex-1">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-black">
                <Heart size={20} className="text-yellow" strokeWidth={2.25} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-black">
                Positive Training
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                We use positive, reward-based methods that encourage good
                behavior, build confidence, and strengthen the bond between
                you and your dog.
              </p>
            </div>
            <div className="relative hidden h-32 w-40 shrink-0 overflow-hidden rounded-2xl sm:block">
              <Image
                src="https://placedog.net/320/260?id=118"
                alt="Dog lying calmly, well trained and relaxed"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}