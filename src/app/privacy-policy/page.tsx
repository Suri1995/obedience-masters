import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import PrivacyPolicyClient from "@/components/PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Obedience Masters",
  description: "Read the Obedience Masters privacy policy and learn how we collect, use and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main id="top" className="overflow-hidden">
        <section className="container-px mx-auto max-w-7xl pb-12 pt-16 sm:pt-24 lg:pb-16 lg:pt-28">
          <div className="mb-10 flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-ink-muted transition hover:text-black"><ArrowLeft size={16} /> Back to website</Link>
            <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted sm:flex"><ShieldCheck size={15} className="text-yellow-dark" /> Privacy &amp; trust</div>
          </div>
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-yellow-dark">Obedience Masters</p>
            <h1 className="max-w-3xl text-balance text-5xl font-extrabold leading-[0.98] tracking-tight text-black sm:text-7xl">Privacy, made clear.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-muted sm:text-xl">Your trust matters. This policy explains how we collect, use and protect information when you visit our website or use our services.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-ink-muted"><span className="rounded-full bg-yellow-soft px-4 py-2 text-black">Last updated · September 08, 2026</span><span>13 sections · Plain-language guide</span></div>
          </div>
        </section>
        <section className="container-px mx-auto max-w-7xl pb-20"><PrivacyPolicyClient /></section>
      </main>
      <Footer />
    </>
  );
}
