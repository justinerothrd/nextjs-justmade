export type Logo = {
  slug: string;
  name: string;
  image: string;
  category: "Camp" | "College" | "Team" | "Custom";
  group: string;
  style: "Varsity" | "Minimal" | "Script" | "Classic" | "Icon" | "Custom";
};

export const logos: Logo[] = [
  {
    slug: "custom-logo",
    name: "Custom Logo",
    image: "",
    category: "Custom",
    group: "All",
    style: "Custom",
  },

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
    slug: "thc-bear",
    name: "THC Bear",
    image: "/logos/THC-bear.png",
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
  // CAMP — PONTIAC
  {
    slug: "pontiac-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/pontiac-varsity.png",
    category: "Camp",
    group: "Pontiac",
    style: "Varsity",
  },
  {
    slug: "pontiac-varsity-date",
    name: "Varsity with Date",
    image: "/logos/pontiac-varsitydate.png",
    category: "Camp",
    group: "Pontiac",
    style: "Varsity",
  },
  {
    slug: "pontiac-running-club",
    name: "Running Club",
    image: "/logos/pontiac-running-club.png",
    category: "Camp",
    group: "Pontiac",
    style: "Icon",
  },
  {
    slug: "camp-pontiac",
    name: "Camp Pontiac",
    image: "/logos/camp-pontiac.png",
    category: "Camp",
    group: "Pontiac",
    style: "Minimal",
  },
  {
    slug: "pontiac-varsity-solid",
    name: "Varsity Solid",
    image: "/logos/pontiac-varisty-solid.png",
    category: "Camp",
    group: "Pontiac",
    style: "Varsity",
  },
  {
    slug: "pontiac-bubble",
    name: "Bubble",
    image: "/logos/Pontiac-bubble.png",
    category: "Camp",
    group: "Pontiac",
    style: "Minimal",
  },
  {
    slug: "pontiac-runner-22",
    name: "Runner ’22",
    image: "/logos/pontiac-runner22.png",
    category: "Camp",
    group: "Pontiac",
    style: "Icon",
  },
  {
    slug: "pontiac-sport-mascot",
    name: "Sport Mascot",
    image: "/logos/pontiac-sporty-circle.png",
    category: "Camp",
    group: "Pontiac",
    style: "Varsity",
  },
  {
    slug: "pontiac-mascot",
    name: "Pontiac Mascot",
    image: "/logos/pontiac-mascot.png",
    category: "Camp",
    group: "Pontiac",
    style: "Varsity",
  },
  {
    slug: "pontiac-script",
    name: "Script",
    image: "/logos/pontiac-script.png",
    category: "Camp",
    group: "Pontiac",
    style: "Script",
  },
  
  

  // CAMP — WESTMONT
  {
    slug: "westmont-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THC-varsityarch.png",
    category: "Camp",
    group: "Westmont",
    style: "Varsity",
  },

  // CAMP — CANADENSIS
  {
    slug: "canadensis-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THC-varsityarch.png",
    category: "Camp",
    group: "Canadensis",
    style: "Varsity",
  },

  // CAMP — CAMP LAUREL
  {
    slug: "camp-laurel-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THC-varsityarch.png",
    category: "Camp",
    group: "Camp Laurel",
    style: "Varsity",
  },

  // CAMP — CHENAWANDA
  {
    slug: "chenawanda-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THC-varsityarch.png",
    category: "Camp",
    group: "Chenawanda",
    style: "Varsity",
  },

  // CAMP — TIMBERLAKE
  {
    slug: "timberlake-varsity-arch",
    name: "Varsity Arch",
    image: "/logos/THC-varsityarch.png",
    category: "Camp",
    group: "Timberlake",
    style: "Varsity",
  },
];
