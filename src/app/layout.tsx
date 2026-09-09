import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://www.winebesties.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wine Besties | Halvico — Wine & Cheese Pairings",
    template: "%s | Wine Besties",
  },
  description:
    "Elegant wine and cheese pairings without the snobbery. Discover pours and plates that actually love each other — from Wine Besties by Halvico.",
  keywords: [
    "wine and cheese pairings",
    "Wine Besties",
    "Halvico",
    "cheese board",
    "wine pairing guide",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Wine Besties",
    title: "Wine Besties | Wine & Cheese Pairings",
    description:
      "Elegant pairings without the snobbery. Sip. Nibble. Bestie energy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wine Besties | Wine & Cheese Pairings",
    description:
      "Elegant pairings without the snobbery. Sip. Nibble. Bestie energy.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
