export type Product = {
  name: string;
  price: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
};

export const products = {
  hoodie: {
    name: "Custom Hoodie",
    price: "$70",
    description: "A cozy custom hoodie for chilly camp nights and cool mornings.",
    images: [
      "/hoodie.jpeg",
      "/skims hoodie front.png",
      "/skims hoodie back.png",
      "/hoodie.center-preview.png",
    ],
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
  },

  "quarter-zip": {
    name: "Custom 1/4 Zip",
    price: "$65",
    description: "A polished quarter zip that layers easily for camp, travel, and everyday wear.",
    images: ["/quarterzip.jpeg", "/quarterzip-preview.png"],
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
  },

  "tank-top": {
    name: "Custom Tank Top",
    price: "$40",
    description: "A lightweight custom tank perfect for hot camp days and summer activities.",
    images: ["/Tank.jpeg", "/PCTank.jpeg", "/tank with script.png", "/tank-preview.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
  },

  "custom-tee": {
    name: "Custom Tee",
    price: "$35",
    description: "A classic custom tee designed for camp, travel, and summer memories.",
    images: ["/THbeartee.png", "/tee-preview.png", "/Tee.jpeg", "/timberlaketee.jpg"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
  },

  sweatpants: {
    name: "Custom Sweatpants",
    price: "$48",
    description: "Cozy custom sweatpants designed for camp, travel, and everyday wear.",
    images: ["/PCsweatpants.jpg", "/sweatpants-preview.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
  },

  "custom-shorts": {
    name: "Custom Shorts",
    price: "$36",
    description: "Comfortable personalized shorts for everyday camp wear and relaxed summer style.",
    images: ["/shorts.jpeg", "/shorts-preview.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
  },

  sleepwear: {
    name: "Camp Pajama Shorts",
    price: "$32",
    description: "Soft camp-ready pajama shorts made for bunk life, bedtime, and easy summer comfort.",
    images: ["/sleepwear.jpg", "/tulane.sleepshorts.jpg"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
  },

  "sleepwear-set": {
    name: "Custom Sleep Set",
    price: "$65",
    description: "A personalized sleep set with a cozy feel that makes camp nights extra special.",
    images: ["/sleepwear-set.jpg", "/college.sleepwearset.jpg"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
  },

  "accessories-slides": {
    name: "Bunk Gift Slides",
    price: "$60",
    description: "A fun personalized camp gift that feels special, practical, and easy to wear.",
    images: ["/slides-preview.png", "/accessories.jpg"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
  },

  "accessories-socks": {
    name: "Fuzzy Socks",
    price: "$22",
    description: "Soft fuzzy socks that make a perfect bunk gift or cozy camp extra.",
    images: ["/customsocks.jpg", "/college.fuzzysocks.jpeg"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult XS", "Adult S", "Adult M", "Adult L"],
  },
} as const;

export type ProductSlug = keyof typeof products;

export function getProductBySlug(slug: string) {
  return products[slug as ProductSlug];
}
