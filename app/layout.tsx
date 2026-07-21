import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sanni-bottles.mofeoluwasanni.chatgpt.site"),
  title: "SANNI -- Made For Every Moment",
  description: "The magnetic bottle designed for hydration, hands-free viewing, and life in motion.",
  icons: { icon: "/images/sanni-logo.png", shortcut: "/images/sanni-logo.png" },
  openGraph: {
    title: "SANNI | Quiet Colors. Strong Presence.",
    description: "The magnetic bottle made for every moment.",
    type: "website",
    images: [{ url: "/og-v2.png", width: 1731, height: 909, alt: "The SANNI magnetic bottle collection" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SANNI | Quiet Colors. Strong Presence.",
    description: "The magnetic bottle made for every moment.",
    images: ["/og-v2.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={kanit.variable}>{children}</body></html>;
}
