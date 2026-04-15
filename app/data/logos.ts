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
    image: "/logos/tyler-hill.png",
    category: "Camp",
  },
  {
    slug: "westmont",
    name: "Westmont",
    image: "/logos/westmont.png",
    category: "Camp",
  },
  {
    slug: "michigan",
    name: "Michigan",
    image: "/logos/michigan.png",
    category: "College",
  },
  {
    slug: "wisconsin",
    name: "Wisconsin",
    image: "/logos/wisconsin.png",
    category: "College",
  },
];
