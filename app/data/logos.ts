export type Logo = {
  slug: string;
  name: string;
  image: string;
  category: "Camp" | "College" | "Team" | "Custom";
  group: string;
  style: "Varsity" | "Minimal" | "Script" | "Classic" | "Icon";
};
export const logos: Logo[] = [

  // CAMP — TYLER HILL
  {
    slug: "tyler-hill-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THCvarsityarch.png",
    category: "Camp",
    group: "Tyler Hill",
    style: "Varsity",
  },
  {
    slug: "tyler-hill-varsity-date",
    name: "Varsity with Date",
    image: "/logos/THCvarsitydate.png",
    category: "Camp",
    group: "Tyler Hill",
    style: "Varsity",
  },
  {
    slug: "tyler-hill-minimal",
    name: "Minimal",
    image: "/logos/THCminimal.png",
    category: "Camp",
    group: "Tyler Hill",
    style: "Minimal",
  },

  // COLLEGE — MICHIGAN
  {
    slug: "michigan-varsity",
    name: "Varsity Arch",
    image: "/logos/michigan.png",
    category: "College",
    group: "Michigan",
    style: "Varsity",
  },
];
