export type Product = {
  name: string;
  price: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  logoGroup?: string;
  blankImages?: Record<string, string>;
};

export const products: Record<string, Product> = {
  hoodie: {
    name: "Custom Hoodie",
    price: "$60",
    description: "",
    images: [
      "/skims hoodie front.png",
      "/timberlake-hoodie.png",
      "/THChoodie.png",
      "/skims hoodie back.png",
      "/hoodie.center-preview.png",
    ],
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      "Heather Gray": "/blanks/hoodie-grey.png",
    },
  },

  crewneck: {
    name: "Custom Crewneck",
    price: "$60",
    description: "",
    images: ["/thc-monogram-crew.png", "/laurel-arch-crewneck.png"],
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      "Heather Gray": "/blanks/crewneck-grey.png",
      Navy: "/blanks/crewneck-navy.png",
      White: "/blanks/crewneck-white.png",
      Green: "/blanks/crewneck-green.png",
    },
  },

  "quarter-zip": {
    name: "Custom 1/4 Zip",
    price: "$65",
    description: "",
    images: ["/THCquarterzipgrey.png", "/THCquarterzipnavy.png"],
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      "Heather Gray": "/blanks/quarterzip-grey.png",
    },
  },

  "tank-top": {
    name: "Custom Tank Top",
    price: "$40",
    description: "",
    images: ["/timberlake-tank.png", "/WM81tank.png", "/THC-tankgrey.png", "/tank with script.png", "/tank-preview.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      White: "/blanks/tank-white.png",
      "Heather Gray": "/blanks/tank-grey.png",
      Navy: "/blanks/tank-navy.png",
    },
  },

  "custom-tee": {
    name: "Custom Tee",
    price: "$38",
    description: "",
    images: ["/THbeartee.png", "/hotel westmont.png", "/THCsuperpufftee.png", "/timberlaketee.jpg"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      White: "/blanks/white-tee.png",
    },
  },

  sweatpants: {
    name: "Custom Sweatpants",
    price: "$48",
    description: "",
    images: ["/PCsweatpants.jpg", "/WMsweatpants.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      White: "/blanks/sweatpantsgrey-open.png",
    },
  },

  "custom-shorts": {
    name: "Custom Shorts",
    price: "$36",
    description: "",
    images: ["/THCbikeshorts.png", "/shorts-preview.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      White: "/blanks/bikeshort-black.png",
    },
  },

  sleepwear: {
    name: "Camp Pajama Shorts",
    price: "$32",
    description: "",
    images: ["/timberlake-sleepshorts.png", "/thcsleeppants.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      White: "/blanks/sleepshorts-blank.png",
    },
  },

  sleeppants: {
    name: "Custom Sleep Pants",
    price: "$40",
    description: "",
    images: ["/thcsleeppants.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      White: "/blanks/sleeppants-blank.png",
    },
  },

  "sleepwear-set": {
    name: "Custom Sleep Set",
    price: "$65",
    description: "",
    images: ["/THCsleepset.png", "/WMsleepset.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      White: "/blanks/sleepset-blank.png",
    },
  },

  "accessories-slides": {
    name: "Bunk Gift Slides",
    price: "$60",
    description: "",
    images: ["/THCslides.png", "/customsocks.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      White: "/blanks/slides-blank.png",
    },
  },

  "accessories-socks": {
    name: "Fuzzy Socks",
    price: "$22",
    description: "",
    images: ["/customsocks.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      White: "/blanks/socks-blank.png",
    },
  },
};

export type ProductSlug = keyof typeof products;

export function getProductBySlug(slug: string) {
  return products[slug as ProductSlug] ?? null;
}
