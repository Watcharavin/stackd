// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Stackd — Challenge your friends",
  description:
    "Create challenges with friends, set stakes, and track progress via realtime leaderboard. Social accountability — no excuses.",
  keywords: ["challenge", "accountability", "friends", "fitness", "goals"],
  authors: [{ name: "Stackd" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "Stackd — Challenge your friends",
    description: "Set stakes. Beat your friends. No excuses.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
