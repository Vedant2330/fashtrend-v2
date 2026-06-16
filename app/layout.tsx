import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fashtrend-v2.vercel.app"),
  title: "Fashtrend — The Studio",
  description: "Premium custom apparel. Print it. Wear it. Flaunt it. Made in Pune, shipped worldwide.",
  keywords: ["custom tees", "oversized tees", "premium fashion", "Pune fashion", "print on demand"],
  authors: [{ name: "Fashtrend" }],
  openGraph: {
    type: "website",
    title: "Fashtrend — The Studio",
    description: "Premium custom apparel. Print it. Wear it. Flaunt it.",
    siteName: "Fashtrend",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashtrend — The Studio",
    description: "Premium custom apparel.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}