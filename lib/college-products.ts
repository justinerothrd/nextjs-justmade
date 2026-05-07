export type Product = {
  name: string;
  price: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  logoGroup?: string;
  blankImages?: Record<string, string>;
  options?: {
    label: string;
    choices: string[];
  }[];
};

export const collegeProducts: Record<string, Product> = {
  "college-crewneck": {
    name: "Custom College Crewneck",
    price: "$70",
    description: "",
    images: [
      "/tulanecrewneck-green.png",
      "/pennstate-crewneck.png",
      "/ohiocrewneck-grey.png",
      "/ohiocrewneck-red.png",
    ],
    colors: ["Heather Gray", "Black", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
    logoGroup: "College",
    blankImages: {
      "Heather Gray": "/blanks/crewneck-grey.png",
      Navy: "/blanks/crewneck-navy.png",
      White: "/blanks/crewneck-white.png",
    },
  },

  "college-hoodie": {
    name: "Custom College Hoodie",
    price: "$75",
    description: "",
    images: [
      "/Ohiohoodie.png",
      "/ucla-hoodie.png",
      "/uncornowhere-hoodie.png",
    ],
    colors: ["Heather Gray", "Black", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
    logoGroup: "College",
    blankImages: {
      "Heather Gray": "/blanks/hoodie-grey.png",
      Navy: "/blanks/hoodie-navy.png",
      White: "/blanks/hoodie-white.png",
    },
  },

  "college-tee": {
    name: "Custom College Tee",
    price: "$40",
    description: "",
    images: ["/college.tee.jpg", "/TUgrey-tshirt.png", "/uncblue-tshirt.png"],
    colors: ["White", "Heather Gray", "Black", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
    logoGroup: "College",
    blankImages: {
      White: "/blanks/white-tee.png",
    },
    options: [
      {
        label: "Tee Style",
        choices: ["Crewneck", "Cropped", "V-neck", "Oversized"],
      },
    ],
  },

  "college-tank": {
    name: "Custom College Tank Top",
    price: "$40",
    description: "",
    images: [
      "/tulane-tank.jpeg",
      "/marylandcrop-tank.png",
      "/ohiocrop-tank.png",
    ],
    colors: ["White", "Heather Gray", "Black", "Light Blue", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
    logoGroup: "College",
    blankImages: {
      White: "/blanks/tank-white.png",
      "Heather Gray": "/blanks/tank-grey.png",
      Navy: "/blanks/tank-navy.png",
    },
    options: [
      {
        label: "Tank Style",
        choices: ["Ribbed Reg", "Rib Cropped", "Scoop neck", "Malibu Sugar"],
      },
    ],
  },

  "college-sweatpants": {
    name: "Custom College Sweatpants",
    price: "$48",
    description: "",
    images: [
      "/ucla-sweatpants.png",
      "/unc-sweatpants.png",
      "/udel-sweatpants.png",
      "/udelgrey-sweatpants.png",
      "/tulane-sweatpants.png",
    ],
    colors: ["Heather Gray", "Black", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
    logoGroup: "College",
    blankImages: {
      "Heather Gray": "/blanks/sweatpantsgrey-open.png",
    },
    options: [
      {
        label: "Bottom Style",
        choices: ["Open Bottom", "Jogger"],
      },
    ],
  },

  "college-sweatshorts": {
    name: "Custom College Sweatshorts",
    price: "$36",
    description: "",
    images: ["/texas-shorts.png", "/ucla-shorts.png"],
    colors: ["Heather Gray", "Black", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
    logoGroup: "College",
    blankImages: {
      "Heather Gray": "/blanks/soffee-grey.png",
    },
    options: [
      {
        label: "Short Style",
        choices: ["Sweatshorts", "Soffe Shorts", "Mesh Shorts"],
      },
    ],
  },

  "college-bikeshorts": {
    name: "Custom College Bike Shorts",
    price: "$36",
    description: "",
    images: ["/collegeshorts.png"],
    colors: ["Heather Gray", "Black", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
    logoGroup: "College",
    blankImages: {
      Black: "/blanks/bikeshort-black.png",
    },
    options: [
      {
        label: "Short Style",
        choices: ["Bike Shorts", "Foldover Shorts"],
      },
    ],
  },

  "college-sleepwear": {
    name: "College Pajama Bottoms",
    price: "$44",
    description: "",
    images: ["/tulane-sleepshorts.png", "/unc-pjpants.png"],
    colors: ["Light Blue", "Black", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
    logoGroup: "College",
    blankImages: {
      Blank: "/blanks/sleepshorts-blank.png",
    },
    options: [
      {
        label: "Sleep Style",
        choices: ["Pajama Shorts", "Pajama Pants"],
      },
    ],
  },

  "college-sleepwear-set": {
    name: "Custom College Sleep Set",
    price: "$65",
    description: "",
    images: ["/ohiostate-sleepset.png", "/unc-sleepset.png"],
    colors: ["Light Blue", "Black", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
    logoGroup: "College",
    blankImages: {
      Blank: "/blanks/sleepset-blank.png",
    },
  },

  "college-slides": {
    name: "College Gift Slides",
    price: "$60",
    description: "",
    images: ["/slides-preview.png"],
    colors: ["White", "Black", "Navy", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
    logoGroup: "College",
    blankImages: {
      Blank: "/blanks/slides-blank.png",
    },
  },

  "college-socks": {
    name: "College Fuzzy Socks",
    price: "$22",
    description: "",
    images: ["/college.fuzzysocks.jpeg"],
    colors: ["White", "Light Blue", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
    logoGroup: "College",
    blankImages: {
      Blank: "/blanks/socks-blank.png",
    },
  },

  // ✅ BAGS

  "college-sweatshirt-tote": {
    name: "College Sweatshirt Tote",
    price: "$45",
    description: "",
    images: ["/timberlake-tote.png"],
    colors: ["Heather Gray", "Light Blue"],
    sizes: ["One Size"],
    logoGroup: "College",
    blankImages: {
      "Heather Gray": "/blanks/tote-grey.png",
    },
  },

  "college-weekend-duffle": {
    name: "College Weekend Duffle",
    price: "$68",
    description: "",
    images: ["/thc-duffle-large.png"],
    colors: ["Navy", "Black", "White"],
    sizes: ["One Size"],
    logoGroup: "College",
    blankImages: {
      Navy: "/blanks/duffle-navy.png",
    },
  },
};

export type CollegeProductSlug = keyof typeof collegeProducts;

export function getCollegeProductBySlug(slug: string) {
  return collegeProducts[slug] ?? null;
}
