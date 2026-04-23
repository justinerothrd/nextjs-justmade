export type Product = {
  name: string;
  price: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
};

export const collegeProducts = {
  "college-crewneck": {
    name: "Custom College Crewneck",
    price: "$70",
    description:
      "A classic custom college crewneck designed for campus, camp, and everyday wear.",
    images: ["/tulanecrewneck-green.png", "/pennstate-crewneck.png", "/ohiocrewneck-grey.png", "/ohiocrewneck-red.png"],
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
  },
  "college-hoodie": {
    name: "Custom College Hoodie",
    price: "$75",
    description:
      "A cozy custom college hoodie for cool nights, travel, and everyday style.",
    images: ["/Ohiohoodie.png", "/ucla-hoodie.png", "/uncornowhere-hoodie.png"],
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
  },
  "college-tee": {
    name: "Custom College Tee",
    price: "$40",
    description:
      "A lightweight custom college tee perfect for warm weather and easy everyday wear.",
    images: ["/college.tee.jpg", "/TUgrey-tshirt.png", "/UNCblue-tshirt.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
  },
  "college-tank": {
    name: "Custom College Tank Top",
    price: "$40",
    description: "A custom college tank top with an easy summer feel.",
    images: ["/tulane-tank.jpeg", "/marylandcrop-tank.png", "/ohiocrop-tank.png"],
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
  },
 "college-sweatpants": {
  name: "Custom College Sweatpants",
  price: "$48",
  description:
    "Comfortable custom sweatpants designed for everyday wear and relaxed campus style.",
  images: ["/ucla-sweatpants.png", "/unc-sweatpants.png", "/udel-sweatpants.png", "/udelgrey-sweatpants.png", "/tulane.sweatpants.png"],
  colors: ["Heather Gray", "Navy", "Green", "Red"],
  sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
  },
  "college-shorts": {
  name: "Custom College Shorts",
  price: "$36",
  description:
    "Comfortable custom shorts made for campus, camp, and relaxed everyday style.",
  images: ["/texas.shorts.png", "/collegeshorts.png", "/ucla-shorts.png"],
  colors: ["Heather Gray", "Navy", "Green", "Red"],
  sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
},
  "college-sleepwear": {
    name: "College Pajama Shorts",
    price: "$32",
    description: "Soft college pajama shorts made for easy comfort.",
    images: ["/tulane-sleepshorts.png", "/unc-pjpants.png"], 
    colors: ["Light Blue", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
  },
  "college-sleepwear-set": {
    name: "Custom College Sleep Set",
    price: "$65",
    description:
      "A personalized sleep set with a cozy feel and college-inspired look.",
    images: ["/college.sleepwearset.jpg", "/unc-sleepset.png"],
    colors: ["Light Blue", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
  },
  "college-slides": {
    name: "College Gift Slides",
    price: "$60",
    description:
      "A fun personalized college gift that feels special and easy to wear.",
    images: ["/slides-preview.png"],
    colors: ["White", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
  },
  "college-socks": {
    name: "College Fuzzy Socks",
    price: "$22",
    description: "Soft fuzzy socks that make a cozy college extra.",
    images: ["/college.fuzzysocks.jpeg"],
    colors: ["White", "Light Blue", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
  },
} as const;

export type CollegeProductSlug = keyof typeof collegeProducts;

export function getCollegeProductBySlug(slug: string) {
  return collegeProducts[slug as CollegeProductSlug];
}
