export type Product = {
  name: string;
  price: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  logoGroup?: string;
};

export const products: Record<string, Product> = {
  hoodie: {
    name: "Custom Hoodie",
    price: "$70",
    description: "A cozy custom hoodie designed for camp, travel, and everyday wear.",
    images: ["/hoodie.jpeg"],
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
  },

  "quarter-zip": {
    name: "Custom 1/4 Zip",
    price: "$65",
    description: "A polished custom quarter-zip made for layering.",
    images: ["/quarterzip.jpeg"],
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
  },

  "tank-top": {
    name: "Custom Tank Top",
    price: "$40",
    description: "A lightweight custom tank for warm camp days.",
    images: ["/Tank.jpeg"],
    colors: ["Heather Gray", "White", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
    logoGroup: "Tyler Hill",
  },

  "custom-tee": {
    name: "Custom Tee",
    price: "$35",
    description: "A classic custom tee for camp, color war, and everyday wear.",
    images: ["/Tee.jpeg"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L"],
    logoGroup: "Tyler Hill",
  },

  "custom-shorts": {
    name: "Custom Shorts",
    price: "$36",
    description: "Easy custom shorts for camp days and lounge wear.",
    images: ["/shorts.jpeg"],
    colors: ["Heather Gray", "Navy", "White", "Light Blue", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
    logoGroup: "Tyler Hill",
  },

  sleepwear: {
    name: "Camp Pajama Shorts",
    price: "$32",
    description: "Soft camp pajama shorts made for bunk nights.",
    images: ["/sleepwear.jpg"],
    colors: ["Heather Gray", "White", "Light Blue", "Navy"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
    logoGroup: "Tyler Hill",
  },

  "sleepwear-set": {
    name: "Custom Sleep Set",
    price: "$65",
    description: "A matching custom sleep set for camp nights.",
    images: ["/sleepwear-set.jpg"],
    colors: ["Heather Gray", "White", "Light Blue", "Navy"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
    logoGroup: "Tyler Hill",
  },

  "accessories-slides": {
    name: "Bunk Gift Slides",
    price: "$60",
    description: "Custom slides made for camp, bunk gifts, and everyday wear.",
    images: ["/accessories.jpg"],
    colors: ["White", "Navy", "Light Blue"],
    sizes: ["Youth 1", "Youth 2", "Youth 3", "Youth 4", "Adult 5", "Adult 6", "Adult 7", "Adult 8"],
    logoGroup: "Tyler Hill",
  },

  "accessories-socks": {
    name: "Fuzzy Socks",
    price: "$22",
    description: "Cozy custom socks for camp, gifting, and lounge days.",
    images: ["/customsocks.jpg"],
    colors: ["White", "Heather Gray", "Light Blue"],
    sizes: ["Youth", "Adult"],
    logoGroup: "Tyler Hill",
  },
};

export function getProductBySlug(slug: string) {
  return products[slug as ProductSlug] ?? null;
}
