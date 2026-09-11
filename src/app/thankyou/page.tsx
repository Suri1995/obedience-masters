import Link from "next/link";
import { CheckCircle2, PhoneCall, ArrowLeft, PawPrint } from "lucide-react";

// File location: app/thankyou/page.tsx

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const name = resolvedSearchParams?.name?.trim();

  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50 px-4 py-16">
      <div className="w-full max-w-lg rounded-[2rem] border border-black/5 bg-white p-8 text-center shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow shadow-[0_16px_32px_-12px_rgba(255,181,0,0.6)]">
          <CheckCircle2 size={32} className="text-black" />
        </div>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-semibold text-yellow">
          <PawPrint size={14} />
          Request received
        </span>

        <h1 className="mt-5 text-3xl font-extrabold leading-tight text-black sm:text-4xl">
          {name ? `Thanks, ${name}.` : "Thanks for reaching out."}
        </h1>

        <p className="mt-4 text-[15px] leading-6 text-ink-muted">
          Your enquiry has been sent to the Obedience Masters team. A trainer
          will call you within 24 hours to schedule your dog&rsquo;s first
          session.
        </p>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-cream p-5 text-left sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-yellow">
              <PhoneCall size={16} className="text-black" />
            </span>
            <div>
              <p className="text-sm font-semibold text-black">
                Need to reach us sooner?
              </p>
              <p className="text-sm text-ink-muted">
                Call or WhatsApp anytime.
              </p>
            </div>
          </div>

          <a
            href="tel:+910000000000"
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-yellow transition-transform hover:-translate-y-0.5"
          >
            Call now
          </a>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-black/60 transition-colors hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    </main>
  );
}