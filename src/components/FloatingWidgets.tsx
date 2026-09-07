"use client";

import CallButton from "./CallButton";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Fixed bottom-right stack for the site's two contact actions.
 * Replaces standalone <WhatsAppButton> + <CallButton> placement in
 * layout.tsx — this owns the positioning and gap between them so
 * nothing needs a manual bottom-24 offset.
 */
export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <CallButton phoneNumber="+919700030338" entranceDelay={750} />
      <WhatsAppButton
        phoneNumber="919700030338"
        message="Hi Obedience Masters! I'd like to know more about your dog training programs."
        entranceDelay={500}
      />
    </div>
  );
}