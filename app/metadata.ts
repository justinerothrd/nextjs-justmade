import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Just Made Custom",

  description:
    "Personalized gear for camp, college, and everyday.",

  icons: {
    icon: "/icon.png",
  },

  openGraph: {
    title: "Just Made Custom",

    description:
      "Personalized gear for camp, college, and everyday.",

    url: "https://www.justmadecustom.com",

    siteName: "Just Made Custom",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Just Made Custom",
      },
    ],

    type: "website",
  },
};
