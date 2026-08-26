import Image from "next/image";
import { PawPrint, Target, Award, ArrowRight } from "lucide-react";

const trainers = [
  {
    name: "Meera Nair",
    role: "Founder & Lead Trainer",
    icon: PawPrint,
    photo: 65,
    years: "8+ yrs experience",
    trained: "900+ dogs trained",
    bio: "Meera founded Obedience Masters after a decade working with rescue shelters, and specialises in puppy foundations and everyday obedience — building calm, confident dogs through positive reinforcement.",
  },
  {
    name: "Arjun Verma",
    role: "Behaviour Specialist",
    icon: Target,
    photo: 12,
    years: "5+ yrs experience",
    trained: "600+ dogs trained",
    bio: "Arjun focuses on the harder cases — reactivity, anxiety, and leash aggression — working one-on-one with families to turn stressful walks and greetings into manageable, teachable moments.",
  },
];

export function MeetExpert() {
  return (
    <section className="bg-cream py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
            Meet The Team
          </p>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-black sm:text-4xl">
            The Experts Behind{" "}
            <span className="text-yellow-dark">Your Dog&rsquo;s Transformation.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            Two trainers, two specialities — together they cover everything
            from a puppy&rsquo;s first &ldquo;sit&rdquo; to the hardest
            behavioural cases.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {trainers.map((trainer) => {
            const Icon = trainer.icon;
            return (
              <div
                key={trainer.name}
                className="group overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={`https://i.pravatar.cc/600?img=${trainer.photo}`}
                    alt={trainer.name}
                    fill
                    sizes="(min-width: 640px) 460px, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-black px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-yellow">
                    <Icon size={13} />
                    {trainer.role}
                  </span>
                  <h3 className="absolute bottom-5 left-5 text-2xl font-extrabold text-white">
                    {trainer.name}
                  </h3>
                </div>

                <div className="p-7">
                  <p className="text-[15px] leading-relaxed text-ink-muted">
                    {trainer.bio}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-cream px-3 py-1.5 text-xs font-semibold text-black">
                      <Award size={13} className="text-yellow-dark" />
                      {trainer.years}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-cream px-3 py-1.5 text-xs font-semibold text-black">
                      <PawPrint size={13} className="text-yellow-dark" />
                      {trainer.trained}
                    </span>
                  </div>

                  <a
                    href="#contact"
                    className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-black"
                  >
                    <span className="relative">
                      Connect with {trainer.name.split(" ")[0]}
                      <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-yellow transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
                    </span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}