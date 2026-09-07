"use client"

import { useState } from "react"

/** Single number for the whole business — no branch selection needed. */
const WHATSAPP_NUMBER = "9700030338" // no +91, no spaces
const DEFAULT_MESSAGE =
  "Hi Obedience Masters! I'd like to know more about your dog training programs."

const GREETING = "🐾 Hi! Welcome to Obedience Masters. How can we help your pup today?"

type ChatMessage = {
  from: "bot" | "user"
  text: string
}

type WhatsAppWidgetProps = {
  /** Controlled from FloatingWidgets so only one widget is open at a time. */
  open: boolean
  onOpen: () => void
  onClose: () => void
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.032 2.002c-5.514 0-10 4.486-10 10 0 1.79.475 3.553 1.375 5.094l-1.459 5.326 5.459-1.427c1.483.818 3.158 1.25 4.875 1.25 5.514 0 10-4.486 10-10s-4.486-10-10-10zm0 18.5c-1.482 0-2.94-.365-4.24-1.057l-.305-.181-3.24.846.864-3.157-.196-.318C4.125 15.08 3.782 13.557 3.782 12c0-4.554 3.696-8.25 8.25-8.25s8.25 3.696 8.25 8.25-3.696 8.25-8.25 8.25z" />
      <path d="M16.234 14.598c-.238-.119-1.406-.693-1.624-.772-.218-.08-.376-.119-.535.119-.159.238-.619.773-.759.931-.14.16-.28.18-.518.06-.238-.119-1.005-.37-1.914-1.18-.707-.63-1.184-1.408-1.323-1.646-.14-.238-.015-.367.105-.486.108-.108.24-.282.36-.422.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.535-1.29-.734-1.766-.193-.462-.39-.4-.535-.408-.14-.008-.3-.008-.46-.008-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.37.51.58.19 1.11.16 1.53.1.47-.06 1.45-.59 1.66-1.16.21-.57.21-1.06.15-1.16-.06-.1-.22-.16-.46-.26z" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 6l4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function WhatsAppWidget({ open, onOpen, onClose }: WhatsAppWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: "bot", text: GREETING }])
  const [sent, setSent] = useState(false)

  // NOTE: the open/closed state lives in the parent <FloatingWidgets> —
  // this component just renders whatever `open` it's given and reports
  // user interactions back up via onOpen/onClose so the Call widget can
  // be closed automatically whenever this one opens (and vice versa).

  function handleStartChat() {
    if (!sent) {
      setMessages((prev) => [
        ...prev,
        { from: "user", text: "I'd like to chat 👋" },
        { from: "bot", text: "Opening WhatsApp now…" },
      ])
      setSent(true)
    }

    const url = `https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`
    window.open(url, "_blank", "noopener,noreferrer")
    // Panel stays open so the customer can see the conversation.
  }

  return (
    <div className="flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Obedience Masters on WhatsApp"
          className="w-[300px] overflow-hidden rounded-2xl border border-[#e6edf6] bg-white shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#25D366] px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <WhatsAppIcon size={20} />
              <span className="text-sm font-semibold">Obedience Masters</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Collapse chat"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <ChevronDownIcon />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[380px] overflow-y-auto bg-[#e5ded8] px-3 py-4">
            <div className="flex flex-col gap-2">
              {messages.map((m, i) =>
                m.from === "bot" ? (
                  <div
                    key={i}
                    className="max-w-[85%] self-start rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[13px] leading-[1.5] text-[#2a3f6f] shadow-sm"
                  >
                    {m.text}
                  </div>
                ) : (
                  <div
                    key={i}
                    className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-3.5 py-2.5 text-[13px] leading-[1.5] text-[#1f3a1f] shadow-sm"
                  >
                    {m.text}
                  </div>
                ),
              )}
            </div>

            {/* Single start-chat action — no branch picker needed */}
            <div className="mt-3">
              <button
                onClick={handleStartChat}
                className="flex w-full items-center justify-between rounded-xl border border-[#25D366] bg-white px-3.5 py-2.5 text-left text-[13px] font-medium text-[#128C7E] shadow-sm transition-colors hover:bg-[#25D366] hover:text-white"
              >
                <span>{sent ? "Open WhatsApp again" : "Start chat on WhatsApp"}</span>
                <WhatsAppIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button — only shown when the panel is closed */}
      {!open && (
        <button
          onClick={onOpen}
          aria-label="Chat with us on WhatsApp"
          aria-expanded={false}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
          <span className="relative">
            <WhatsAppIcon size={26} />
          </span>
        </button>
      )}
    </div>
  )
}