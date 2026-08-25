import Image from "next/image";

const steps = [
  {
    eyebrow: "Consultation",
    title: "Let\u2019s Get to Know Your Dog",
    body: "Tell us what\u2019s wrong and you\u2019re struggling with, and what you\u2019d like to improve.",
  },
  {
    eyebrow: "Assessment",
    title: "Understand Before We Train",
    body: "We understand your dog\u2019s behaviour, habits, and needs.",
  },
  {
    eyebrow: "Personalised Plan",
    title: "A Training Plan Made for Them",
    body: "We create a practical plan tailored to your dog and goals.",
  },
  {
    eyebrow: "Training & Progress",
    title: "Train, Practise & See the Change",
    body: "We guide your dog, track progress, and build skills for everyday life.",
  },
];

export function ProcessSteps() {
  return (
    <section id="story" className="bg-cream py-12">
      <div className="container-px mx-auto max-w-[1200px]">
        <div className="grid items-center gap-10 rounded-[2rem] bg-yellow p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:p-16">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              From First Conversation to <span className="text-black">Real Progress.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-black/70">
              A simple, personalised training journey designed around your
              dog, your goals, and everyday life.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <div key={step.title} className="rounded-2xl bg-white p-5 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.3)]">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    {step.eyebrow}
                  </p>
                  <h3 className="mt-1.5 text-[17px] font-bold text-yellow-dark">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[1.75rem] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.4)]">
            <Image
              src="https://placedog.net/700/700?id=142"
              alt="Labrador enjoying a warm, affectionate moment with its owner"
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
