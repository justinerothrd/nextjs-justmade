export type Product = {
  name: string;
  price: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  logoGroup?: string;
  blankImages?: Record<string, string>; // ✅ NEW
};

export const products: Record<string, Product> = {
  hoodie: {
    name: "Custom Hoodie",
    price: "$70",
    description: "A cozy custom hoodie for chilly camp nights and cool mornings.",
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
      "Heather Gray": "/hoodie-grey.png",
    },
  },

  "quarter-zip": {
    name: "Custom 1/4 Zip",
    price: "$65",
    description: "A polished quarter zip that layers easily for camp, travel, and everyday wear.",
    images: ["/THCquarterzipgrey.png", "/THCquarterzipnavy.png"],
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      "Heather Gray": "/quarterzip-grey.png",
    },
  },

  "tank-top": {
    name: "Custom Tank Top",
    price: "$40",
    description: "A lightweight custom tank perfect for hot summer days.",
    images: [
      "/timberlake-tank.png",
      "/WM81tank.png",
      "/THC-tankgrey.png",
      "/tank with script.png",
      "/tank-preview.png",
    ],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      White: "/tank-white.png",
      "Heather Gray": "/tank-grey.png",
      Navy: "/tank-navy.png",
    },
  },

  "custom-tee": {
    name: "Custom Tee",
    price: "$35",
    description: "A classic custom tee designed for camp, travel, and summer memories.",
    images: [
      "/THbeartee.png",
      "/hotel westmont.png",
      "/THCsuperpufftee.png",
      "/timberlaketee.jpg",
    ],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
    blankImages: {
      White: "/white-tee.png",
    },
  },

  sweatpants: {
    name: "Custom Sweatpants",
    price: "$48",
    description: "Cozy custom sweatpants designed for camp, travel, and everyday wear.",
    images: ["/PCsweatpants.jpg", "/WMsweatpants.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
  },

  "custom-shorts": {
    name: "Custom Shorts",
    price: "$36",
    description: "Comfortable personalized shorts for everyday camp wear and relaxed summer style.",
    images: ["/THCbikeshorts.png", "/shorts-preview.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
  },

  sleepwear: {
    name: "Camp Pajama Shorts",
    price: "$32",
    description: "Soft camp-ready pajama shorts made for bunk life, bedtime, and easy summer comfort.",
    images: ["/timberlake-sleepshorts.png", "/thcsleeppants.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
  },

  "sleepwear-set": {
    name: "Custom Sleep Set",
    price: "$65",
    description: "A personalized sleep set with a cozy feel that makes camp nights extra special.",
    images: ["/THCsleepset.png", "/WMsleepset.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
  },

  "accessories-slides": {
    name: "Bunk Gift Slides",
    price: "$60",
    description: "A fun personalized camp gift that feels special, practical, and easy to wear.",
    images: ["/THCslides.png", "/customsocks.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
  },

  "accessories-socks": {
    name: "Fuzzy Socks",
    price: "$22",
    description: "Soft fuzzy socks that make a perfect bunk gift or cozy camp extra.",
    images: ["/customsocks.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
  },
} satisfies Record<string, Product>;

export type ProductSlug = keyof typeof products;

export function getProductBySlug(slug: string) {
  return products[slug as ProductSlug] ?? null;
}
