"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getProductBySlug } from "@/lib/products";
import LogoPicker from "@/app/components/LogoPicker";
import { logos } from "@/app/data/logos";

const logoColorMap: Record<string, string> = {
  Navy: "#1F2A44",
  White: "#FFFFFF",
  "Light Blue": "#9DB7D4",
  Pink: "#F4A7B9",
  Green: "#3F6F4F",
  Red: "#B23A3A",
  Black: "#111111",
};

const placementOptionsBySlug: Record<string, string[]> = {
  hoodie: ["Left Chest", "Full Front", "Back", "Sleeve"],
  "quarter-zip": ["Left Chest", "Full Front", "Back", "Sleeve"],
  "tank-top": ["Full Front", "Left Chest", "Back"],
  "custom-tee": ["Full Front", "Left Chest", "Back", "Sleeve"],
  sweatpants: ["Left Leg", "Right Leg", "Hip"],
  "custom-shorts": ["Left Leg", "Right Leg", "Hip"],
  sleepwear: ["Left Leg", "Right Leg", "Hip"],
  "sleepwear-set": ["Top Front", "Shorts Leg"],
  "accessories-slides": ["Top of Slides"],
  "accessories-socks": ["Outer Ankle"],
};

const previewImageBySlugAndColor: Record<string, Record<string, string>> = {
  hoodie: {
    "Heather Gray": "/blanks/hoodie-grey.png",
    Navy: "/blanks/hoodie-navy.png",
    White: "/blanks/hoodie-white.png",
    Green: "/blanks/hoodie-green.png",
    Black: "/blanks/hoodie-black.png",
  },
  "quarter-zip": {
    "Heather Gray": "/blanks/quarterzip-grey.png",
    Navy: "/blanks/quarterzip-navy.png",
    White: "/blanks/quarterzip-white.png",
    Green: "/blanks/quarterzip-green.png",
  },
  "tank-top": {
    White: "/blanks/tank-white.png",
    "Heather Gray": "/blanks/tank-grey.png",
    Navy: "/blanks/tank-navy.png",
    "Light Blue": "/blanks/tank-lightblue.png",
  },
  "custom-tee": {
    White: "/blanks/tee-white.png",
    "Heather Gray": "/blanks/grey-tee.png",
    Navy: "/blanks/navy-tee.png",
    "Light Blue": "/blanks/lightblue-tee.png",
    Green: "/blanks/green-tee.png",
    Red: "/blanks/red-tee.png",
    Black: "/blanks/tee-black.png",
  },
  "custom-shorts": {
    "Heather Gray": "/blanks/bikeshort-grey.png",
    Navy: "/blanks/bikeshort-navy.png",
    Black: "/blanks/bikeshort-black.png",
  },
  sweatpants: {
    "Heather Gray": "/blanks/sweatpantsgrey-open.png",
    Navy: "/blanks/sweatpants-open-navy.png",
    White: "/blanks/sweatpantswhite-closed.png",
    "Royal Blue": "/blanks/sweatpants-royalblue-closed.png",
  },
};

const placementStyles: Record<string, string> = {
  "Full Front": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%]",
  "Left Chest": "top-[38%] left-[42%] -translate-x-1/2 -translate-y-1/2 w-[12%]",
  Back: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%]",
  Sleeve: "top-[45%] left-[72%] -translate-x-1/2 -translate-y-1/2 w-[10%]",
  "Left Leg": "top-[60%] left-[40%] -translate-x-1/2 w-[14%]",
  "Right Leg": "top-[60%] left-[60%] -translate-x-1/2 w-[14%]",
  Hip: "top-[50%] left-[45%] -translate-x-1/2 w-[12%]",
  "Top Front": "top-[34%] left-1/2 -translate-x-1/2 w-[24%]",
  "Shorts Leg": "top-[70%] left-[60%] -translate-x-1/2 w-[15%]",
  "Top of Slides": "top-[42%] left-1/2 -translate-x-1/2 w-[22%]",
  "Outer Ankle": "top-[70%] left-[55%] -translate-x-1/2 w-[14%]",
};

export default function ProductPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug;

  const product = slug ? getProductBySlug(slug) : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedLogo, setSelectedLogo] = useState("");
  const [logoColor, setLogoColor] = useState("Navy");
  const [placement, setPlacement] = useState("");
  const [size, setSize] = useState("Youth M");
  const [color, setColor] = useState("Heather Gray");

  const selectedLogoObject = logos.find(
    (logo) => logo.slug === selectedLogo
  );

  useEffect(() => {
    if (!product || !slug) return;

    const options = placementOptionsBySlug[slug] || ["Full Front"];

    setSelectedImage(0);
    setSize(product.sizes?.[0]);
    setColor(product.colors?.[0]);
    setPlacement(options[0]);
  }, [product, slug]);

  if (!product) return <div>Product not found</div>;

  const currentImage = product.images[selectedImage];

  const previewImage =
    previewImageBySlugAndColor[slug]?.[color] ||
    currentImage;

  return (
    <main className="p-6">
      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT IMAGE */}
        <div>
          <img src={currentImage} className="w-full" />
        </div>

        {/* RIGHT SIDE */}
        <div>

          {/* PREVIEW */}
          <div className="border rounded-2xl p-6 mb-6 text-center">
            <p className="text-xs tracking-widest mb-4">PREVIEW</p>

            <div className="relative h-[300px] flex items-center justify-center">
              <img
                src={previewImage}
                className="max-h-full object-contain"
              />

              {selectedLogoObject && (
                <div
                  className={`absolute ${
                    placementStyles[placement]
                  }`}
                  style={{
                    backgroundColor:
                      logoColorMap[logoColor] || "#1F2A44",
                    WebkitMaskImage: `url(${selectedLogoObject.image})`,
                    maskImage: `url(${selectedLogoObject.image})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    aspectRatio: "1 / 1",
                  }}
                />
              )}
            </div>
          </div>

          {/* LOGO PICKER */}
          <LogoPicker
            logos={logos}
            selectedLogo={selectedLogo}
            onSelectLogo={setSelectedLogo}
          />

        </div>
      </div>
    </main>
  );
}
