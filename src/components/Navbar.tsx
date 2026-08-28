"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#story" },
  { label: "Training courses", href: "#services" },
  { label: "Trainers", href: "#trainers" },
  { label: "Blogs", href: "#blogs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => link.href);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setOpen(false);
  };

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
            className="h-11 w-auto sm:h-12 lg:h-14"
          />
        </a>

        {/* Desktop navigation - hidden below 1080px */}
        <ul className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`group relative py-1 text-[15px] font-medium tracking-wide transition-colors duration-300 ${
                  activeLink === link.href
                    ? "text-black"
                    : "text-ink hover:text-black"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-yellow transition-transform duration-300 ease-out ${
                    activeLink === link.href
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop call button - hidden below 1080px */}
        <a
          href="tel:+919700030338"
          className="hidden items-center justify-center gap-2 rounded-full bg-black px-5 py-2.5 text-[14px] font-semibold uppercase tracking-[0.08em] text-yellow shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.6)] xl:inline-flex"
          aria-label="Call us at 97000 30338"
        >
          <Phone size={18} className="text-yellow" />
          <span>97000 30338</span>
        </a>

        {/* Mobile menu button - visible below 1080px */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-black text-yellow transition-transform duration-300 active:scale-90 xl:hidden"
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

      {/* Mobile menu - visible below 1080px */}
      <div
        className={`grid overflow-hidden bg-black transition-[grid-template-rows] duration-300 ease-out xl:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <ul className="flex flex-col divide-y divide-white/10 px-5">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`flex items-center justify-between py-4 text-base font-medium transition-colors ${
                    activeLink === link.href
                      ? "text-yellow"
                      : "text-white/90 hover:text-yellow"
                  }`}
                >
                  {link.label}
                  <span className={`${
                    activeLink === link.href ? "text-yellow" : "text-yellow/50"
                  }`}>
                    {activeLink === link.href ? "●" : "→"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="px-5 pb-6 pt-2">
            <a
              href="tel:+919700030338"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3 text-center text-[14px] font-semibold uppercase tracking-[0.08em] text-black"
            >
              <Phone size={18} />
              <span>97000 30338</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}