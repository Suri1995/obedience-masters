import { Phone, Globe } from "lucide-react";
import { WaveDivider } from "./WaveDivider";
import { Logo } from "./Logo";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-4 bg-yellow-light pb-10 pt-16">
      <WaveDivider color="var(--color-cream)" position="top" />

      <div className="container-px mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <img
          src='/logo.webp'
          alt="Obedience Masters Logo"
          width={220}
          height={73}
          className="h-auto w-[220px] object-contain"
          />
        </div>

        <div>
          <p className="text-sm font-bold text-black">Contact Us</p>
          <a
            href="tel:+919876543245"
            className="mt-2 flex items-center gap-2 text-[15px] font-medium text-black/80 hover:text-black"
          >
            <Phone size={16} /> +91 9876543245
          </a>
        </div>

        <div>
          <p className="text-sm font-bold text-black">Website</p>
          <a
            href="https://www.obediencemasters.com"
            className="mt-2 flex items-center gap-2 text-[15px] font-medium text-black/80 hover:text-black"
          >
            <Globe size={16} /> www.obediencemasters.com
          </a>
        </div>

        <div>
          <p className="text-sm font-bold text-black">Follow Us On</p>
          <div className="mt-3 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full bg-black/10 text-black transition-colors hover:bg-black hover:text-yellow"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="grid h-9 w-9 place-items-center rounded-full bg-black/10 text-black transition-colors hover:bg-black hover:text-yellow"
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="container-px mx-auto mt-12 max-w-7xl border-t border-black/10 pt-6 text-sm text-black/60">
        © {new Date().getFullYear()} Obedience Masters. All rights reserved.
      </div>
    </footer>
  );
}
