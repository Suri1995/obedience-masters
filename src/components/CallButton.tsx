// CallButton.tsx
"use client";

import FabButton from "./FabButton";

interface CallButtonProps {
  phoneNumber: string; // e.g. "+919700030338"
  label?: string;
  entranceDelay?: number;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const phoneIcon = (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white drop-shadow-sm" aria-hidden="true">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
  </svg>
);

export default function CallButton({
  phoneNumber,
  label = "Call us",
  entranceDelay = 750,
  isOpen,
  onToggle,
  onClose,
}: CallButtonProps) {
  return (
    <FabButton
      ariaLabel="Call Obedience Masters"
      label={label}
      icon={phoneIcon}
      gradientFrom="#4F46E5"
      gradientTo="#3730A3"
      shadowColor="rgba(49,46,129,0.5)"
      ringColor="rgba(79,70,229,0.28)"
      entranceDelay={entranceDelay}
      peekDelay={1300}
      peekDuration={2600}
      isOpen={isOpen}
      onToggle={onToggle}
      onClose={onClose}
      popoverTitle="Call us"
      popoverContent={
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-between gap-3 rounded-xl border border-black/[0.06] bg-[#EEF2FF] px-3.5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#E0E7FF]"
        >
          <span className="flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
              style={{
                background: "linear-gradient(135deg, #4F46E5, #3730A3)",
              }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
              </svg>
            </span>
            {phoneNumber}
          </span>

          <span className="shrink-0 text-[11px] font-medium text-neutral-500">
            Tap to call
          </span>
        </a>
      }
    />
  );
}