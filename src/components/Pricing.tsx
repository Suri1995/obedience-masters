import { Check, Star } from "lucide-react";

const plans = [
  {
    eyebrow: "Puppies Training",
    name: "Puppy Starter",
    price: "\u20b92,999",
    features: [
      "4 Sessions",
      "Basic Commands",
      "Potty Guidance",
      "Socialisation",
      "Parent Guidance",
    ],
    highlight: false,
  },
  {
    eyebrow: "Behaviour & Obedience",
    name: "Dog Program",
    price: "\u20b95,999",
    features: [
      "8 Sessions",
      "Obedience",
      "Behaviour Correction",
      "Leash Training",
      "Personalised Plan",
    ],
    highlight: false,
  },
  {
    eyebrow: "Advanced Skills & Stronger Control",
    name: "Advanced Pro",
    price: "\u20b99,999",
    features: [
      "12 Sessions",
      "Advanced Obedience",
      "Off-Leash Training",
      "Focus & Agility",
      "Progress Tracking",
    ],
    highlight: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-black py-8 md:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="rounded-[2rem] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-black">
              Pricing Plans
            </p>
            <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
              Training That <span className="text-yellow">Fits Your Dog</span>
            </h2>
            <p className="mt-3 text-[15px] text-white/60">
              Simple plans for every training need.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-center">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl p-7 transition-all duration-300 ${
                  plan.highlight
                    ? "bg-yellow text-black shadow-[0_25px_50px_-16px_rgba(255,181,0,0.45)] md:-translate-y-3 md:scale-[1.05] md:p-8"
                    : "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/[0.06]"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-black px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-yellow">
                    <Star size={11} fill="currentColor" strokeWidth={0} />
                    Most Popular
                  </span>
                )}

                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    plan.highlight ? "text-black/60" : "text-white/45"
                  }`}
                >
                  {plan.eyebrow}
                </p>
                <h3
                  className={`mt-1.5 text-xl font-extrabold ${
                    plan.highlight ? "text-black" : "text-white"
                  }`}
                >
                  {plan.name}
                </h3>
                <p className="mt-3 text-3xl font-extrabold">{plan.price}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                          plan.highlight ? "bg-black" : "bg-yellow"
                        }`}
                      >
                        <Check
                          size={11}
                          className={plan.highlight ? "text-yellow" : "text-black"}
                          strokeWidth={3.5}
                        />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-7 rounded-full px-6 py-3 text-center text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    plan.highlight
                      ? "bg-black text-yellow shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)]"
                      : "bg-yellow text-black"
                  }`}
                >
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}