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
      </body>
    </html>
  );
}
