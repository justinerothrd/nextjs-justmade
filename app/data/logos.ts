export type Logo = {
  slug: string;
  name: string;
  image: string;
  category: "Camp" | "College" | "Team" | "Custom";
};

export const logos: Logo[] = [
  {
    slug: "tyler-hill",
    name: "Tyler Hill Varsity",
    image: "/logos/THCvarsityarch.png",
    category: "Camp",
  },
  {
    slug: "michigan",
    name: "Michigan",
    image: "/logos/placeholder.png",
    category: "College",
  },
  {
    slug: "wisconsin",
    name: "Wisconsin",
    image: "/logos/placeholder.png",
    category: "College",
  },
];
