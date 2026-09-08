import { Mail, Phone } from "lucide-react";
import { WaveDivider } from "./WaveDivider";
import { Logo } from "./Logo";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-gradient" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="10%" stopColor="#FFDD55" />
          <stop offset="50%" stopColor="#FD1D1D" />
          <stop offset="100%" stopColor="#833AB4" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-gradient)" />
      <circle cx="12" cy="12" r="4.6" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="17.15" cy="6.85" r="1.15" fill="white" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="5" width="21" height="14" rx="4.5" fill="#FF0000" />
      <path d="M10.3 9.3v5.4l4.9-2.7-4.9-2.7Z" fill="white" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path
        d="M15 8.5h1.5V5.7h-1.9c-2 0-3.3 1.5-3.3 3.6v1.7H9v3.1h2.3V18.3h3.1v-4.2h2.2l.4-3.1h-2.6v-1.4c0-.6.2-1.1.9-1.1Z"
        fill="white"
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
          <a
            href="mailto:msolomonmoony@gmail.com"
            className="mt-2 flex items-center gap-2 text-[15px] font-medium text-black/80 hover:text-black"
          >
            <Mail size={16} /> obediencemasters@gmail.com
          </a>
        </div>

        <div>
          <p className="text-sm font-bold text-black">Follow Us On</p>
          <div className="mt-3 flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                target="_blank"
                rel="noopener noreferrer"
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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