import type { Metadata } from "next";
import "@fontsource/baloo-2/500.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/baloo-2/700.css";
import "@fontsource/baloo-2/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Obedience Masters | Positive, Professional Dog Training",
  description:
    "Make training a happy experience for your dog. Build positive habits, grow their confidence, and strengthen your bond with guidance from trusted, certified professionals.",
  keywords: [
    "dog training",
    "puppy training",
    "obedience training",
    "behaviour training",
    "dog trainer near me",
  ],
  openGraph: {
    title: "Obedience Masters | Positive, Professional Dog Training",
    description:
      "Make training a happy experience for your dog. Build positive habits, grow their confidence, and strengthen your bond with guidance from trusted, certified professionals.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <WhatsAppButton
          phoneNumber="+919700030338"
          message="Hi Obedience Masters! I'd like to know more about your dog training programs."
        />
      </body>
    </html>
  );
}