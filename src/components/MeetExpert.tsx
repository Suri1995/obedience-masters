import Image from "next/image";
import { Award, PawPrint, ArrowRight, Quote } from "lucide-react";

const trainer = {
  name: "M. Solomon Brainord",
  role: "Founder & Lead Trainer",
  photo: "/trainer.png",
  years: "17+",
  yearsLabel: "Years of experience",
  trained: "2000+",
  trainedLabel: "Dogs trained",
  bio: "Solomon founded Obedience Masters and has spent over 17 years turning unruly, anxious, and reactive dogs into calm, confident companions. From a puppy's first \"sit\" to the hardest behavioural cases, his approach is built on patience, positive reinforcement, and a genuine read on what each dog needs.",
  pullQuote: "Every dog is trainable — you just have to speak their language.",
};

export function MeetExpert() {
  return (
    <section id="trainers" className="relative overflow-hidden bg-cream py-16 sm:py-24">
      {/* ambient accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-yellow/10 blur-3xl"
      />

      <div className="container-px relative mx-auto max-w-7xl">
        {/* ---------- Header ---------- */}
        <div className="mx-auto text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
            Meet the Trainer
          </p>
          <h2 className="mt-5 text-[32px] font-extrabold leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-[42px]">
            The expert behind{" "}
            <span className="text-yellow-dark">your dog&rsquo;s transformation.</span>
          </h2>
          <p className="mx-auto mt-4 text-[15px] leading-relaxed text-ink-muted">
            17+ years of hands-on experience, covering everything from a
            puppy&rsquo;s first &ldquo;sit&rdquo; to the hardest behavioural
            cases.
          </p>
        </div>

        {/* ---------- Profile card ---------- */}
        <div className="mx-auto mt-14 max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_35px_70px_-30px_rgba(0,0,0,0.3)] ring-1 ring-black/5 sm:grid sm:grid-cols-[0.9fr_1.1fr]">
            {/* Photo */}
            <div className="relative aspect-[4/5] sm:aspect-auto">
              <Image
                src={trainer.photo}
                alt={trainer.name}
                fill
                sizes="(min-width: 640px) 440px, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-black/5" />

              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-black/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-yellow backdrop-blur-sm">
                <PawPrint size={13} />
                {trainer.role}
              </span>

              <h3 className="absolute bottom-6 left-5 right-5 text-2xl font-extrabold leading-tight text-white sm:hidden">
                {trainer.name}
              </h3>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-7 sm:p-11">
              <h3 className="hidden text-[26px] font-extrabold leading-tight text-black sm:block">
                {trainer.name}
              </h3>

              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted sm:mt-4">
                {trainer.bio}
              </p>

              {/* Pull quote */}
              <div className="mt-6 flex gap-3 border-l-2 border-yellow pl-4">
                <Quote
                  size={16}
                  className="mt-0.5 shrink-0 text-yellow-dark"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <p className="text-[14.5px] font-medium italic leading-relaxed text-black/70">
                  {trainer.pullQuote}
                </p>
              </div>

              {/* Stat blocks */}
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-cream p-4 ring-1 ring-black/5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-black">
                    <Award size={16} className="text-yellow" strokeWidth={2.25} />
                  </span>
                  <p className="mt-3 text-2xl font-extrabold leading-none text-black">
                    {trainer.years}
                  </p>
                  <p className="mt-1 text-[12.5px] font-medium text-ink-muted">
                    {trainer.yearsLabel}
                  </p>
                </div>
                <div className="rounded-2xl bg-cream p-4 ring-1 ring-black/5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-black">
                    <PawPrint size={16} className="text-yellow" strokeWidth={2.25} />
                  </span>
                  <p className="mt-3 text-2xl font-extrabold leading-none text-black">
                    {trainer.trained}
                  </p>
                  <p className="mt-1 text-[12.5px] font-medium text-ink-muted">
                    {trainer.trainedLabel}
                  </p>
                </div>
              </div>

              <a
                href="#contact"
                className="group/link mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-yellow shadow-[0_12px_24px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-10px_rgba(0,0,0,0.5)]"
              >
                Connect with {trainer.name.split(" ")[0]}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}