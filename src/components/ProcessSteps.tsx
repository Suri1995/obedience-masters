import Image from "next/image";

const steps = [
  {
    number: "01",
    eyebrow: "Consultation",
    title: "Let\u2019s Get to Know Your Dog",
    body: "Tell us what\u2019s wrong and you\u2019re struggling with, and what you\u2019d like to improve.",
  },
  {
    number: "02",
    eyebrow: "Assessment",
    title: "Understand Before We Train",
    body: "We understand your dog\u2019s behaviour, habits, and needs.",
  },
  {
    number: "03",
    eyebrow: "Personalised Plan",
    title: "A Training Plan Made for Them",
    body: "We create a practical plan tailored to your dog and goals.",
  },
  {
    number: "04",
    eyebrow: "Training & Progress",
    title: "Train, Practise & See the Change",
    body: "We guide your dog, track progress, and build skills for everyday life.",
  },
];

export function ProcessSteps() {
  return (
    <section id="story" className="bg-yellow py-12">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-center gap-10 rounded-[2rem] p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:p-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
              The Process
            </p>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-black sm:text-4xl">
              From First Conversation to Real Progress.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-black/70">
              A simple, personalised training journey designed around your
              dog, your goals, and everyday life — in four steps.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl bg-white p-5 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.3)] ring-1 ring-black/5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-lg font-extrabold text-yellow-dark">
                      {step.number}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      {step.eyebrow}
                    </p>
                  </div>
                  <h3 className="mt-2 text-[17px] font-bold text-black">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.4)] ring-4 ring-white/40">
              <Image
                src="https://placedog.net/700/700?id=142"
                alt="Labrador enjoying a warm, affectionate moment with its owner"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl bg-black px-5 py-4 shadow-[0_16px_32px_-10px_rgba(0,0,0,0.5)]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-yellow text-sm font-extrabold text-black">
                4
              </span>
              <p className="text-sm font-semibold text-white">
                Steps to a<br className="hidden sm:block" /> calmer, happier dog
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}