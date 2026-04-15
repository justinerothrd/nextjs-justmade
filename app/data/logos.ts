export type Logo = {
  slug: string;
  name: string;
  image: string;
  category: "Camp" | "College" | "Team" | "Custom";
};

export const logos: Logo[] = [
  {
    slug: "tyler-hill",
    name: "Tyler Hill",
    image: "/logos/camps/tyler-hill.png",
    category: "Camp",
  },
  {
    slug: "wesmont",
    name: "Camp Westmont",
    image: "/logos/camps/matoaka.png",
    category: "Camp",
  },
  {
    slug: "michigan",
    name: "Michigan",
    image: "/logos/colleges/michigan.png",
    category: "College",
  },
  {
    slug: "wisconsin",
    name: "Wisconsin",
    image: "/logos/colleges/wisconsin.png",
    category: "College",
  },
  {
    slug: "ski-club",
    name: "Ski Club",
    image: "/logos/custom/ski-club.png",
    category: "Custom",
  },
];
