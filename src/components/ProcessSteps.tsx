import Image from "next/image";

const steps = [
  {
    number: "01",
    eyebrow: "Consultation",
    title: "Get to know your dog",
    body: "Tell us what’s going on and what you’d like to see change.",
  },
  {
    number: "02",
    eyebrow: "Assessment",
    title: "Understand before we train",
    body: "We read your dog’s behaviour, habits, and needs.",
  },
  {
    number: "03",
    eyebrow: "Personalised plan",
    title: "A plan made for them",
    body: "A practical programme built around your dog and your goals.",
  },
  {
    number: "04",
    eyebrow: "Training & progress",
    title: "Train, practise, see it stick",
    body: "We guide, track progress, and build skills for everyday life.",
  },
];

export function ProcessSteps() {
  return (
    <section id="story" className="relative overflow-hidden bg-yellow py-16 sm:py-24">
      {/* ambient texture on the yellow field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, black 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="container-px relative mx-auto max-w-7xl">
        {/* ---------- Header ---------- */}
        <div className="">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
            The Process
          </p>

          <h2 className="mt-5 text-[32px] font-extrabold leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-5xl">
            From first conversation to real progress.
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-black/65">
            A simple, personalised training journey designed around your
            dog, your goals, and everyday life in four steps.
          </p>
        </div>

        {/* ---------- Body: 2x2 step grid + tall image ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-stretch lg:gap-2">
          {/* 2x2 step grid */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.title}
                className="group flex flex-col rounded-2xl border border-black/10 bg-black/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/[0.07]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black font-display text-sm font-extrabold text-yellow transition-transform duration-300 group-hover:scale-105">
                  {step.number}
                </span>

                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-black/50">
                  {step.eyebrow}
                </p>
                <h3 className="mt-1 text-[16px] font-bold leading-snug text-black">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-black/60">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* tall image, matches the grid's height */}
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl shadow-[0_25px_50px_-18px_rgba(0,0,0,0.4)] ring-1 ring-black/15 sm:min-h-[380px] lg:min-h-0">
            <Image
              src="/happy-calmer-dog.png"
              alt="A calm, happy white fluffy dog resting contentedly on the grass"
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
              priority
            />
            {/* legibility gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

            {/* caption */}
            {/* <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="text-sm font-semibold text-white">
                Real progress looks like this
              </p>
              <p className="mt-0.5 text-[13px] text-white/75">
                Calmer, more confident, every day.
              </p>
            </div> */}

            {/* floating badge, anchored to the image */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-black px-4 py-3 shadow-[0_16px_32px_-10px_rgba(0,0,0,0.55)] ring-1 ring-white/10 sm:bottom-5 sm:left-5 sm:px-5 sm:py-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-yellow font-display text-sm font-extrabold text-black">
                4
              </span>
              <p className="text-[13px] font-semibold leading-snug text-white sm:text-sm">
                Steps to a<br className="hidden sm:block" /> calmer, happier dog
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}