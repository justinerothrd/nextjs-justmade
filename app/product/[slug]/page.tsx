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
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const safeSlug = slug || "";

  const product = safeSlug ? getProductBySlug(safeSlug) : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedLogo, setSelectedLogo] = useState("");
  const [logoColor, setLogoColor] = useState("Navy");
  const [placement, setPlacement] = useState("");
  const [size, setSize] = useState("Youth M");
  const [color, setColor] = useState("Heather Gray");
  const [customDetails, setCustomDetails] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const campLogos = useMemo(
    () => logos.filter((logo) => logo.category === "Camp"),
    []
  );

  const selectedLogoObject = useMemo(
    () => logos.find((logo) => logo.slug === selectedLogo),
    [selectedLogo]
  );

  useEffect(() => {
    if (!product) return;

    const options = placementOptionsBySlug[safeSlug] || ["Full Front"];

    setSelectedImage(0);
    setSize(product.sizes?.[0] || "Youth M");
    setColor(product.colors?.[0] || "Heather Gray");
    setPlacement(options[0]);
    setSelectedLogo("");
    setLogoColor("Navy");
  }, [product, safeSlug]);

  if (!product) return <div>Product not found</div>;

  const currentImage = product.images?.[selectedImage] || product.images?.[0] || "";

  const placementOptions =
    placementOptionsBySlug[safeSlug] || ["Full Front", "Left Chest", "Back"];

  const previewImage =
    previewImageBySlugAndColor[safeSlug]?.[color] || currentImage;

  function handleAddToCart() {
    if (!product || !safeSlug) return;

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: Date.now(),
      slug: safeSlug,
      product: product.name,
      price: product.price,
      size,
      color,
      quantity,
      image: currentImage,
      logoSlug: selectedLogo,
      logoName: selectedLogoObject?.name || "",
      logoColor,
      placement,
      customDetails,
    };

    localStorage.setItem("cart", JSON.stringify([...existingCart, newItem]));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("openMiniCart"));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-[#4B4B4B] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => window.history.back()}
          className="text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
        >
          Back
        </button>

        <div className="mt-8 grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <div className="flex gap-4">
            {product.images.length > 1 && (
              <div className="flex flex-col gap-3 pt-1">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`overflow-hidden rounded-[14px] border bg-white transition ${
                      selectedImage === i
                        ? "border-[#6F879E]"
                        : "border-[#EEEAE4] hover:border-[#D9D4CE]"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="h-16 w-16 object-contain p-2 sm:h-20 sm:w-20"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[28px] border border-[#F0ECE6] bg-[#FBFAF8] p-4 sm:p-6">
              <img
                src={currentImage}
                alt={product.name}
                className="max-h-[94%] max-w-[94%] object-contain"
              />
            </div>
          </div>

          <div>
            <h1 className="text-[30px] font-light leading-tight text-[#2F2F2F] sm:text-[36px]">
              {product.name}
            </h1>

            <p className="mt-2 text-[18px] text-[#5F7A94]">{product.price}</p>

            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none"
              >
                {product.sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none"
              >
                {product.colors.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none"
              >
                {placementOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="mt-5 rounded-[28px] border border-[#EEEAE4] bg-[#FBFAF8] p-6 text-center">
              <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-[#8A8178]">
                Preview
              </p>

              <div className="relative mx-auto flex h-[260px] max-w-[360px] items-center justify-center">
                <img
                  src={previewImage}
                  alt={`${product.name} preview`}
                  className="max-h-full max-w-full object-contain"
                />

                {selectedLogoObject &&
                  selectedLogoObject.slug !== "custom-logo" && (
                    <div
                      className={`absolute ${
                        placementStyles[placement] ||
                        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%]"
                      }`}
                      style={{
                        backgroundColor: logoColorMap[logoColor] || "#1F2A44",
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

              <p className="mt-4 text-xs text-[#8A8178]">
                Final placement and sizing will be confirmed before production.
              </p>
            </div>

            <div className="mt-8 rounded-[24px] border border-[#EEEAE4] bg-white p-5">
              <LogoPicker
                logos={campLogos}
                selectedLogo={selectedLogo}
                onSelectLogo={setSelectedLogo}
              />

              <div className="mt-5">
                <label className="text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
                  Logo Color
                </label>
                <select
                  value={logoColor}
                  onChange={(e) => setLogoColor(e.target.value)}
                  className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none"
                >
                  {Object.keys(logoColorMap).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="mt-5 rounded-[20px] border border-[#EEEAE4] bg-[#FBFAF8] p-4">
                <label className="text-[11px] uppercase tracking-[0.14em] text-[#6B7280]">
                  Custom Details (optional)
                </label>
                <textarea
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  rows={2}
                  placeholder="Add camp, initials, custom logo request, or special notes"
                  className="mt-2 w-full resize-none rounded-[14px] border border-[#D8D3CD] bg-white px-3 py-2 text-sm outline-none placeholder:text-[#A8A29E]"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-5 w-full rounded-full bg-[#5F7A94] py-3.5 text-sm font-medium text-white transition hover:bg-[#536C84]"
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
