import "./globals.css";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import SiteShell from "./SiteShell";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: "Just Made Custom",
  description: "Personalized gear for camp, college, and everyday.",

  icons: {
    icon: "/icon.png",
  },

  openGraph: {
    title: "Just Made Custom",
    description: "Personalized gear for camp, college, and everyday.",
    url: "https://www.justmadecustom.com",
    siteName: "Just Made Custom",
    images: [
      {
        url: "https://www.justmadecustom.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Just Made Custom",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Just Made Custom",
    description: "Personalized gear for camp, college, and everyday.",
    images: ["https://www.justmadecustom.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={josefin.variable}>
      <body className={`${josefin.className} bg-white text-[#4B4B4B]`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
