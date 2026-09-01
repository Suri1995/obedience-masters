"use client";

import { useEffect, useState } from "react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Hi! I'd like to know more.",
}: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Obedience Masters on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {/* Tooltip / expanding label */}
      <span
        className={`hidden sm:flex items-center rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-neutral-800 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm ring-1 ring-black/5 transition-all duration-300 ease-out ${
          hovered
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-3 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        Chat with us
      </span>

      {/* Button */}
      <span className="relative flex h-14 w-14 items-center justify-center">
        {/* Ambient pulse ring, brand gold */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping-slow" />
        {/* Static outer ring for premium depth */}
        <span className="absolute inset-0 rounded-full ring-2 ring-[#F2A93B]/40" />

        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#1EBE5A] shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform duration-300 ease-out group-hover:scale-105 hover:scale-110 active:scale-95">
          <svg
            viewBox="0 0 32 32"
            className="h-7 w-7 fill-white drop-shadow-sm"
            aria-hidden="true"
          >
            <path d="M16.004 3C9.375 3 4 8.373 4 15c0 2.34.686 4.518 1.87 6.35L4 29l7.86-1.83A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.7c-1.98 0-3.85-.55-5.44-1.5l-.39-.23-4.66 1.09 1.11-4.53-.25-.4A9.65 9.65 0 0 1 5.7 15c0-5.13 4.17-9.3 9.3-9.3s9.3 4.17 9.3 9.3-4.17 9.7-9.3 9.7Zm5.3-6.93c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.75.95-.92 1.14-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5-.17-.01-.37-.01-.56-.01-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.43 1.04 2.82 1.19 3.01.15.2 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
          </svg>
        </span>
      </span>
    </a>
  );
}