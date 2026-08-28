"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#story" },
  { label: "Training courses", href: "#services" },
  { label: "Services", href: "#services" },
  { label: "Trainers", href: "#trainers" },
  { label: "Blogs", href: "#blogs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-cream/85 backdrop-blur-md">
      <nav className="container-px mx-auto flex max-w-7xl items-center justify-between py-3 lg:py-4">
        <a
          href="#home"
          aria-label="Obedience Masters home"
          onClick={() => setOpen(false)}
          className="shrink-0"
        >
          <Image
            src="/logo.webp"
            alt="Obedience Masters — Professional Dog Trainers"
            width={1080}
            height={218}
            priority
            className="h-9 w-auto sm:h-10 lg:h-11"
          />
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group relative py-1 text-[15px] font-medium tracking-wide text-ink"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-yellow transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="tel:+919700030338"
          className="hidden items-center gap-2 rounded-full bg-black px-6 py-2.5 text-[14px] font-semibold uppercase tracking-[0.08em] text-yellow shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.6)] lg:inline-flex"
        >
          Call: 97000 30338
          <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-black text-yellow transition-transform duration-300 active:scale-90 lg:hidden"
        >
          <span
            className={`absolute transition-all duration-300 ${
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          >
            <X size={18} />
          </span>
          <span
            className={`absolute transition-all duration-300 ${
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          >
            <Menu size={18} />
          </span>
        </button>
      </nav>

      <div
        className={`grid overflow-hidden bg-black transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <ul className="flex flex-col divide-y divide-white/10 px-5">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-base font-medium text-white/90 transition-colors hover:text-yellow"
                >
                  {link.label}
                  <span className="text-yellow">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="px-5 pb-6 pt-2">
            <a
              href="tel:+919700030338"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-yellow px-6 py-3 text-center text-[14px] font-semibold uppercase tracking-[0.08em] text-black"
            >
              Call: 97000 30338
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
