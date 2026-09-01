import { Phone } from "lucide-react";
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

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 8.5h2V5.5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.2l.8-3H13v-2c0-.55.45-1 1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Training courses", href: "#services" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/obediencemasters", icon: InstagramIcon },
  { label: "YouTube", href: "https://www.youtube.com/@obediencemasters", icon: YoutubeIcon },
  { label: "Facebook", href: "https://www.facebook.com/obediencemasters", icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="relative mt-4 bg-yellow-soft pb-10 pt-16">
      <WaveDivider color="var(--color-cream)" position="top" />

      <div className="container-px mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <img
            src="/footer-logo.png"
            alt="Obedience Masters Logo"
            width={75}
            height={75}
            className="h-auto w-[170px] object-contain"
          />
        </div>

        <div>
          <p className="text-sm font-bold text-black">Quick Links</p>
          <nav className="mt-3 flex flex-col gap-2">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-black/80 transition-colors hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-bold text-black">Contact Us</p>
          <a
            href="tel:+919700030338"
            className="mt-3 flex items-center gap-2 text-[15px] font-medium text-black/80 hover:text-black"
          >
            <Phone size={16} /> 97000 30338
          </a>
        </div>

        <div>
          <p className="text-sm font-bold text-black">Follow Us On</p>
          <div className="mt-3 flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                target="_blank"
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full bg-black/10 text-black transition-colors hover:bg-black hover:text-yellow"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-px mx-auto mt-12 max-w-7xl border-t border-black/10 pt-6 text-sm text-black/60">
        © {new Date().getFullYear()} Obedience Masters. All rights reserved.
      </div>
    </footer>
  );
}