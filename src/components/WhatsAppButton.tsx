// WhatsAppButton.tsx
"use client";

import FabButton from "./FabButton";

interface WhatsAppButtonProps {
  phoneNumber: string; // e.g. "919700030338" (no + needed for wa.me)
  message?: string;
  label?: string;
  /** Set false to hide the small "online" dot if you're not staffing live chat. */
  showOnlineDot?: boolean;
  entranceDelay?: number;
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Hi! I'd like to know more.",
  label = "Chat with us",
  showOnlineDot = true,
  entranceDelay = 500,
}: WhatsAppButtonProps) {
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <FabButton
      href={href}
      external
      ariaLabel="Chat with Obedience Masters on WhatsApp"
      label={label}
      gradientFrom="#2FD968"
      gradientTo="#1DAE50"
      shadowColor="rgba(20,140,64,0.5)"
      ringColor="rgba(37,211,102,0.28)"
      showOnlineDot={showOnlineDot}
      entranceDelay={entranceDelay}
      peekDelay={900}
      peekDuration={2600}
      icon={
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white drop-shadow-sm" aria-hidden="true">
          <path d="M16.004 3C9.375 3 4 8.373 4 15c0 2.34.686 4.518 1.87 6.35L4 29l7.86-1.83A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.7c-1.98 0-3.85-.55-5.44-1.5l-.39-.23-4.66 1.09 1.11-4.53-.25-.4A9.65 9.65 0 0 1 5.7 15c0-5.13 4.17-9.3 9.3-9.3s9.3 4.17 9.3 9.3-4.17 9.7-9.3 9.7Zm5.3-6.93c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.75.95-.92 1.14-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5-.17-.01-.37-.01-.56-.01-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.43 1.04 2.82 1.19 3.01.15.2 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
        </svg>
      }
    />
  );
}