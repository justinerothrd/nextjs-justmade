export type Logo = {
  {
  slug: "custom-logo",
  name: "Custom Logo",
  image: "/logos/THCvarsityarch.png", // temporary placeholder
  category: "Camp",
  group: "All",
  style: "Custom",
},
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
  slug: "thc-country-club",
  name: "Country Club",
  image: "/logos/THC-countryclub.png",
  category: "Camp",
  group: "Tyler Hill",
  style: "Classic",
},
{
  slug: "thc-essentials",
  name: "Essentials",
  image: "/logos/THC-essentials.png",
  category: "Camp",
  group: "Tyler Hill",
  style: "Minimal",
},
{
  slug: "thc-script",
  name: "Script",
  image: "/logos/THC-script.png",
  category: "Camp",
  group: "Tyler Hill",
  style: "Script",
},
{
  slug: "thc-sporty-bear",
  name: "Sporty Bear",
  image: "/logos/THC-sportybear.png",
  category: "Camp",
  group: "Tyler Hill",
  style: "Icon",
},
{
  slug: "thc-varsity-arch-date",
  name: "Varsity Arch with Date",
  image: "/logos/THC-varsityarch-date.png",
  category: "Camp",
  group: "Tyler Hill",
  style: "Varsity",
},
{
  slug: "thc-varsity-arch",
  name: "Varsity Arch",
  image: "/logos/THC-varsityarch.png",
  category: "Camp",
  group: "Tyler Hill",
  style: "Varsity",
},
{
  slug: "thc-hotel",
  name: "Hotel",
  image: "/logos/thc-hotel.png",
  category: "Camp",
  group: "Tyler Hill",
  style: "Classic",
},
{
  slug: "thc-running-club",
  name: "Running Club",
  image: "/logos/thc-runningclub.png",
  category: "Camp",
  group: "Tyler Hill",
  style: "Classic",
},

  // PONTIAC
  {
    slug: "pontiac-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THCvarsityarch.png",
    category: "Camp",
    group: "Pontiac",
    style: "Varsity",
  },

  // WESTMONT
  {
    slug: "westmont-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THCvarsityarch.png",
    category: "Camp",
    group: "Westmont",
    style: "Varsity",
  },

  // CANADENSIS
  {
    slug: "canadensis-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THCvarsityarch.png",
    category: "Camp",
    group: "Canadensis",
    style: "Varsity",
  },

  // CAMP LAUREL
  {
    slug: "camp-laurel-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THCvarsityarch.png",
    category: "Camp",
    group: "Camp Laurel",
    style: "Varsity",
  },

  // CHENAWANDA
  {
    slug: "chenawanda-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THCvarsityarch.png",
    category: "Camp",
    group: "Chenawanda",
    style: "Varsity",
  },

  // TIMBERLAKE
  {
    slug: "timberlake-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THCvarsityarch.png",
    category: "Camp",
    group: "Timberlake",
    style: "Varsity",
  },
];
