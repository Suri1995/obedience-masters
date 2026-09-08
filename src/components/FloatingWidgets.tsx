"use client";

import { useState } from "react";
import CallButton from "./CallButton";
import WhatsAppButton from "./WhatsAppButton";

type ActiveFab = "call" | "whatsapp" | null;

/**
 * Fixed bottom-right stack for the site's two contact actions.
 * Replaces standalone <WhatsAppButton> + <CallButton> placement in
 * layout.tsx — this owns the positioning and gap between them so
 * nothing needs a manual bottom-24 offset.
 *
 * Each button toggles a small popup panel (like the call/chat FAB on
 * ammaeyecarehospital.com) instead of navigating away immediately.
 * Only one panel can be open at a time — opening one closes the other.
 */
export default function FloatingContactButtons() {
  const [active, setActive] = useState<ActiveFab>(null);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <CallButton
        phoneNumber="+919700030338"
        entranceDelay={750}
        isOpen={active === "call"}
        onToggle={() =>
          setActive((prev) => (prev === "call" ? null : "call"))
        }
        onClose={() =>
          setActive((prev) => (prev === "call" ? null : prev))
        }
      />
      <WhatsAppButton
        phoneNumber="919700030338"
        message="Hi Obedience Masters! I'd like to know more about your dog training programs."
        entranceDelay={500}
        isOpen={active === "whatsapp"}
        onToggle={() =>
          setActive((prev) => (prev === "whatsapp" ? null : "whatsapp"))
        }
        onClose={() =>
          setActive((prev) => (prev === "whatsapp" ? null : prev))
        }
      />
    </div>
  );
}