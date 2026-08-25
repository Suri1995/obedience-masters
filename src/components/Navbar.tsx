"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Story", href: "#story" },
  { label: "Blogs", href: "#blogs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/90 backdrop-blur-md">
      <nav className="container-px mx-auto flex max-w-[1440px] items-center justify-between py-4">
        <a href="#home" aria-label="Obedience Masters home" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[15px] font-medium text-ink transition-colors hover:text-yellow-dark"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-yellow px-6 py-2.5 text-[15px] font-semibold text-black shadow-[0_6px_16px_-4px_rgba(255,181,0,0.6)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-4px_rgba(255,181,0,0.7)] lg:inline-block"
        >
          Reach Us
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-full border border-black/10 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-cream px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-yellow-soft"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-yellow px-6 py-3 text-center text-[15px] font-semibold text-black"
          >
            Reach Us
          </a>
        </div>
      )}
    </header>
  );
}
