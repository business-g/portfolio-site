import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { UiInteractionSounds } from "@/components/UiInteractionSounds";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-site.lamborazer.workers.dev"),
  title: "Bogdan — Product designer",
  description: "End-to-end product designer",
  openGraph: {
    title: "Bogdan — Product designer",
    description: "End-to-end product designer",
    url: "https://portfolio-site.lamborazer.workers.dev",
    siteName: "Bogdan — Product designer",
    images: [
      {
        url: "/social-preview-portfolio.png",
        width: 2400,
        height: 1280,
        alt: "Bogdan portfolio social preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bogdan — Product designer",
    description: "End-to-end product designer",
    images: ["/social-preview-portfolio.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          fontFamily:
            "var(--font-geist), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          background: "#ffffff",
        }}
      >
        {children}
        <UiInteractionSounds />
      </body>
    </html>
  );
}
