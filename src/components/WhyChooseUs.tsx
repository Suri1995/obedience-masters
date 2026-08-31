export function WhyChooseUs() {
  return (
    <section className="bg- py-8 sm:py-20">
      <div className="container-px mx-auto w-full max-w-7xl">
        {/* ---------- Header ---------- */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
            Why Choose Us?
          </p>
          <h2 className="mt-5 text-[28px] font-extrabold leading-[1.15] tracking-tight text-black sm:text-4xl lg:text-[42px]">
            Because every dog deserves the right approach.
          </h2>
        </div>

        {/* ---------- Cards ---------- */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {/* Experienced Trainers */}
          <div className="flex h-full flex-col rounded-[1.75rem] bg-neutral-100 p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
            <h3 className="text-lg font-extrabold text-yellow-dark sm:text-xl">
              Experienced Trainers
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-black/70">
              Our experienced trainers understand that every dog learns
              differently. We work with your dog&rsquo;s personality,
              behavior, and needs to create meaningful progress.
            </p>
          </div>

          {/* Personalised Plans */}
          <div className="flex h-full flex-col rounded-[1.75rem] bg-yellow p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
            <h3 className="text-lg font-extrabold text-black sm:text-xl">
              Personalised Plans
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-black/70">
              Every dog has their own personality, habits, and quirks. Our
              personalised training plans focus on their age, behavior,
              lifestyle, and goals — with positive training for happier
              progress.
            </p>
          </div>

          {/* Practical Guidance */}
          <div className="flex h-full flex-col rounded-[1.75rem] bg-neutral-100 p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
            <h3 className="text-lg font-extrabold text-yellow-dark sm:text-xl">
              Practical Guidance
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-black/70">
              Training shouldn&rsquo;t stop when the session ends. We give
              you practical guidance you can use at home, on walks, around
              guests, and in everyday situations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}