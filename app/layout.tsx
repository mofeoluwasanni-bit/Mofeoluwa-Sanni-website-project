import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "SANNI -- Made For Every Moment",
    description: "The magnetic bottle designed for hydration, hands-free viewing, and life in motion.",
    icons: { icon: "/images/sanni-logo.png", shortcut: "/images/sanni-logo.png" },
    openGraph: {
      title: "SANNI | Quiet Colors. Strong Presence.",
      description: "The magnetic bottle made for every moment.",
      type: "website",
      images: [{ url: `${origin}/og-v2.png`, width: 1731, height: 909, alt: "The SANNI magnetic bottle collection" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "SANNI | Quiet Colors. Strong Presence.",
      description: "The magnetic bottle made for every moment.",
      images: [`${origin}/og-v2.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={kanit.variable}>{children}</body></html>;
}
