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

const colorFileMap: Record<string, string> = {
  White: "white",
  "Heather Gray": "grey",
  Gray: "grey",
  Grey: "grey",
  Navy: "navy",
  Black: "black",
  Green: "green",
  "Light Blue": "lightblue",
  Red: "red",
};

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const product = slug ? getProductBySlug(slug) : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [customDetails, setCustomDetails] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");
  const [logoColor, setLogoColor] = useState("Navy");
  const [placement, setPlacement] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState("Youth M");
  const [color, setColor] = useState("Heather Gray");

  const campLogos = useMemo(
    () => logos.filter((logo) => logo.category === "Camp"),
    []
  );

  const selectedLogoObject = useMemo(
    () => logos.find((logo) => logo.slug === selectedLogo),
    [selectedLogo]
  );

  const productTypeMap: Record<string, string> = {
    hoodie: "hoodie",
    "quarter-zip": "quarterzip",
    "tank-top": "tank",
    "custom-tee": "tee",
    "custom-shorts": "bikeshort",
    sweatpants: "sweatpants",
    sleepwear: "pajama",
    "sleepwear-set": "pajama",
    "accessories-slides": "slides",
    "accessories-socks": "socks",
  };

  const placementOptionsBySlug: Record<string, string[]> = {
    hoodie: ["Left Chest", "Full Front", "Back", "Sleeve"],
    "quarter-zip": ["Left Chest", "Full Front", "Back", "Sleeve"],
    "tank-top": ["Full Front", "Left Chest", "Back"],
    "custom-tee": ["Full Front", "Left Chest", "Back", "Sleeve"],
    sweatpants: ["Left Leg", "Right Leg", "Hip", "Pocket Area"],
    "custom-shorts": ["Left Leg", "Right Leg", "Hip"],
    sleepwear: ["Left Leg", "Right Leg", "Hip"],
    "sleepwear-set": ["Top Front", "Shorts Leg", "Top + Shorts"],
    "accessories-slides": ["Top of Slides", "Side of Slides"],
    "accessories-socks": ["Outer Ankle", "Top of Sock"],
  };

  const safeSlug = slug || "";
  const productType = productTypeMap[safeSlug] || "";
  const placementOptions =
    placementOptionsBySlug[safeSlug] || ["Full Front", "Left Chest", "Back"];

  const currentImage = product?.images?.[selectedImage] ?? "";

  const inferredBlankImage =
    productType && colorFileMap[color]
      ? `/blanks/${productType}-${colorFileMap[color]}.png`
      : "";

  const previewImage =
    product?.blankImages?.[color] || inferredBlankImage || currentImage;

  const placementStyles: Record<string, string> = {
    "Full Front":
      "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%]",
    "Left Chest":
      "top-[38%] left-[43%] -translate-x-1/2 -translate-y-1/2 w-[13%]",
    Back: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%]",
    Sleeve: "top-[45%] left-[72%] -translate-x-1/2 -translate-y-1/2 w-[10%]",
    "Left Leg": "top-[62%] left-[42%] -translate-x-1/2 w-[16%]",
    "Right Leg": "top-[62%] left-[58%] -translate-x-1/2 w-[16%]",
    Hip: "top-[48%] left-[43%] -translate-x-1/2 w-[14%]",
    "Pocket Area": "top-[48%] left-[43%] -translate-x-1/2 w-[14%]",
    "Top Front": "top-[34%] left-1/2 -translate-x-1/2 w-[24%]",
    "Shorts Leg": "top-[68%] left-[58%] -translate-x-1/2 w-[16%]",
    "Top + Shorts": "top-[34%] left-1/2 -translate-x-1/2 w-[24%]",
    "Top of Slides": "top-[42%] left-1/2 -translate-x-1/2 w-[22%]",
    "Side of Slides": "top-[50%] left-[62%] -translate-x-1/2 w-[18%]",
    "Outer Ankle": "top-[70%] left-[55%] -translate-x-1/2 w-[14%]",
    "Top of Sock": "top-[25%] left-1/2 -translate-x-1/2 w-[14%]",
  };

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSize(product.sizes?.[1] ?? product.sizes?.[0] ?? "Youth M");
      setColor(product.colors?.[0] ?? "Heather Gray");
      setSelectedLogo("");
      setLogoColor("Navy");
    }
  }, [product]);

  useEffect(() => {
    if (placementOptions.length > 0) {
      setPlacement(placementOptions[0]);
    }
  }, [safeSlug]);

  if (!slug || !product) {
    return <div>Product not found</div>;
  }

  function handleAddToCart() {
    if (!product || !slug) return;

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: Date.now(),
      slug,
      product: product.name,
      price: product.price,
      size,
      color,
      quantity,
      image: currentImage,
      logoSlug: selectedLogo,
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
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div className="flex justify-center">
          <img src={currentImage} className="max-h-[500px] object-contain" />
        </div>

        <div>
          <h1 className="text-2xl">{product.name}</h1>
          <p className="text-lg">{product.price}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              {product.sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <select value={color} onChange={(e) => setColor(e.target.value)}>
              {product.colors.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
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

          <div className="mt-8">
            <LogoPicker
              logos={campLogos}
              selectedLogo={selectedLogo}
              onSelectLogo={setSelectedLogo}
              productType={productType}
              selectedColor={color}
            />
          </div>

          <div className="mt-5">
            <label className="text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
              Logo Color
            </label>
            <select
              value={logoColor}
              onChange={(e) => setLogoColor(e.target.value)}
              className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
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
              className="mt-2 w-full resize-none rounded-[14px] border border-[#D8D3CD] bg-white px-3 py-2 text-sm outline-none transition placeholder:text-[#A8A29E] focus:border-[#6F879E]"
            />
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
              className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-5 w-full rounded-full bg-[#5F7A94] py-3.5 text-sm font-medium text-white transition hover:bg-[#536C84]"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
