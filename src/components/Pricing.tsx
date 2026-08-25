import { Check } from "lucide-react";

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
    <section id="blogs" className="bg-cream py-24">
      <div className="container-px mx-auto max-w-[1100px]">
        <div className="rounded-[2rem] bg-blush-100 p-8 shadow-[0_20px_60px_-30px_rgba(26,23,16,0.3)] sm:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
              Training That <span className="text-yellow-dark">Fits Your Dog</span>
            </h2>
            <p className="mt-3 text-[15px] text-ink-muted">Simple plans for every training need.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-3xl p-7 ${
                  plan.highlight
                    ? "bg-yellow text-black shadow-[0_20px_40px_-16px_rgba(255,181,0,0.6)]"
                    : "bg-white text-black shadow-[0_16px_36px_-20px_rgba(26,23,16,0.2)]"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    plan.highlight ? "text-black/60" : "text-ink-muted"
                  }`}
                >
                  {plan.eyebrow}
                </p>
                <h3 className={`mt-1 text-xl font-extrabold ${plan.highlight ? "text-black" : "text-yellow-dark"}`}>
                  {plan.name}
                </h3>
                <p className="mt-3 text-3xl font-extrabold">{plan.price}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check size={16} className={plan.highlight ? "text-black" : "text-yellow-dark"} strokeWidth={3} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-7 rounded-full px-6 py-3 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                    plan.highlight ? "bg-white text-black" : "bg-yellow text-black"
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
