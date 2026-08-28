import { Star, PawPrint, ShieldCheck, BadgeCheck } from "lucide-react";

const stats = [
  {
    icon: Star,
    value: "4.9/5",
    label: "1500+ Happy Reviews",
  },
  {
    icon: PawPrint,
    value: "2000+",
    label: "Dogs Trained",
  },
  {
    icon: ShieldCheck,
    value: "17+ Years",
    label: "Training Experience",
  },
  {
    icon: BadgeCheck,
    value: "Certified",
    label: "Professional Trainer",
  },
];

export function TrustStats() {
  return (
    <section className="relative bg-yellow-soft pb-20 pt-16 lg:pt-24">
      <div className="container-px mx-auto max-w-7xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-yellow">
          Trust &amp; Credibility
        </p>
        <h2 className="mt-5 text-3xl font-extrabold leading-tight text-black sm:text-4xl">
          Trusted by Pet Parents.{" "}
          <span className="text-yellow-dark">Proven by Results.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          We are passionate about dogs and committed to delivering training
          that&rsquo;s safe, effective, and backed by experience.
        </p>

        <div className="mt-12 overflow-hidden rounded-3xl bg-black shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col items-center gap-3 border-white/10 px-6 py-9 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left ${
                  i % 2 === 0 ? "border-r" : ""
                } ${i < 2 ? "border-b md:border-b-0" : ""} ${
                  i >= 2 ? "md:border-l" : ""
                } ${i === 1 ? "md:border-r" : ""}`}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-yellow">
                  <Icon size={22} className="text-black" strokeWidth={2.25} />
                </span>
                <span>
                  <span className="block text-xl font-extrabold text-white">
                    {value}
                  </span>
                  <span className="block text-sm text-white/60">{label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}