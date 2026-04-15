export type Logo = {
  slug: string;
  name: string;
  image: string;
  category: "College";
};

export const collegeLogos: Logo[] = [
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
  {
    slug: "texas",
    name: "Texas",
    image: "/logos/texas.png",
    category: "College",
  },
];
