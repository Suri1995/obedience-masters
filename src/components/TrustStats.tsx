import { Star, PawPrint, ShieldCheck, BadgeCheck } from "lucide-react";

const stats = [
  {
    icon: Star,
    iconBg: "bg-yellow-soft",
    iconColor: "text-yellow-dark",
    value: "4.9/5",
    label: "200+ Happy Reviews",
  },
  {
    icon: PawPrint,
    iconBg: "bg-yellow",
    iconColor: "text-black",
    value: "1,500+",
    label: "Dogs Trained",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-yellow",
    iconColor: "text-black",
    value: "8+ Years",
    label: "Training Experience",
  },
  {
    icon: BadgeCheck,
    iconBg: "bg-yellow",
    iconColor: "text-black",
    value: "Certified",
    label: "Professional Trainers",
  },
];

export function TrustStats() {
  return (
    <section className="relative bg-gradient-to-b from-blush-50 to-blush-100 pb-20 pt-16 lg:pt-24">
      <div className="container-px mx-auto max-w-[1200px] text-center">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-yellow-dark">
          Trust &amp; Credibility
        </p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-black sm:text-4xl">
          Trusted by Pet Parents. <span className="text-yellow-dark">Proven by Results.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          We are passionate about dogs and committed to delivering training
          that&rsquo;s safe, effective, and backed by experience.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 rounded-3xl bg-white p-8 shadow-[0_20px_50px_-20px_rgba(26,23,16,0.15)] sm:p-10 md:grid-cols-4">
          {stats.map(({ icon: Icon, iconBg, iconColor, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:text-left">
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${iconBg}`}>
                <Icon size={22} className={iconColor} strokeWidth={2.25} />
              </span>
              <span>
                <span className="block text-xl font-extrabold text-black">{value}</span>
                <span className="block text-sm text-ink-muted">{label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
