import type { Metadata } from "next";
import { Press_Start_2P, Caveat } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const handFont = Caveat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LoveOS — For Anvi ❤️",
  description: "A handcrafted National Girlfriend's Day experience. Made with infinite love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixelFont.variable} ${handFont.variable}`}>
      <body className="bg-loveos-bg font-[family-name:var(--font-pixel)] text-loveos-dark antialiased overflow-hidden w-screen h-screen">
        {children}
        <div className="grain-overlay" />
        <div className="crt-overlay" />
      </body>
    </html>
  );
}
