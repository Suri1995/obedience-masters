import Image from "next/image";

export function WhyChooseUs() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-cream py-12 sm:py-16">
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

        {/* ---------- Bento grid, explicit heights so nothing stretches ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {/* Experienced Trainers */}
          <div className="flex min-h-[240px] flex-col rounded-[1.75rem] bg-neutral-100 p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 lg:min-h-[270px]">
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
          <div className="flex min-h-[240px] flex-col rounded-[1.75rem] bg-yellow p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 lg:min-h-[270px]">
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

          {/* Practical Guidance — tall card, image flush to the bottom */}
          <div className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-neutral-100 transition-transform duration-300 hover:-translate-y-1 sm:row-span-2 lg:min-h-[306px]">
            <div className="p-6 sm:p-7">
              <h3 className="text-lg font-extrabold text-yellow-dark sm:text-xl">
                Practical Guidance
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-black/70">
                Training shouldn&rsquo;t stop when the session ends. We give
                you practical guidance you can use at home, on walks, around
                guests, and in everyday situations.
              </p>
            </div>
            <div className="relative mt-auto min-h-[220px] w-full flex-1">
              <Image
                src="/practical-guidance.png"
                alt="Golden retriever puppy sitting attentively"
                fill
                sizes="(min-width: 1024px) 340px, 90vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>

          {/* Positive Training — wide card, image flush on the right */}
          <div className="group flex min-h-[240px] flex-col overflow-hidden rounded-[1.75rem] bg-neutral-100 transition-transform duration-300 hover:-translate-y-1 sm:col-span-2 sm:flex-row lg:min-h-[276px]">
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
              <h3 className="text-lg font-extrabold text-yellow-dark sm:text-xl">
                Positive Training
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-black/70">
                We use positive, reward-based methods that encourage good
                behavior, build confidence, and strengthen the bond between
                you and your dog.
              </p>
            </div>
            <div className="relative h-52 w-full shrink-0 sm:h-auto sm:w-2/5">
              <Image
                src="/golden-retriever.png"
                alt="Golden retriever lying down calmly, well trained"
                fill
                sizes="(min-width: 640px) 40vw, 90vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}