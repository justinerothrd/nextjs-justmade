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

const productImageClassesByView: Record<string, string[]> = {
  hoodie: ["max-h-[94%] max-w-[94%]"],
  "quarter-zip": ["max-h-[94%] max-w-[94%]"],
  "tank-top": ["max-h-[88%] max-w-[88%]"],
  "custom-tee": ["max-h-[88%] max-w-[88%]"],
  "custom-shorts": ["max-h-[90%] max-w-[90%]"],
  sleepwear: ["max-h-[100%] max-w-[100%]"],
  "sleepwear-set": ["max-h-[96%] max-w-[96%]"],
  "accessories-slides": ["max-h-[86%] max-w-[86%]"],
  "accessories-socks": ["max-h-[92%] max-w-[92%]"],
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

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSize(product.sizes?.[1] ?? product.sizes?.[0] ?? "Youth M");
      setColor(product.colors?.[0] ?? "Heather Gray");
      setSelectedLogo("");
      setLogoColor("Navy");
    }
  }, [product]);

  if (!slug || !product) {
    return <div>Product not found</div>;
  }

  const currentImage = product.images?.[selectedImage] ?? "";

  // 🔥 PRODUCT TYPE MAP (YOU ALREADY HAD)
  const productTypeMap: Record<string, string> = {
    hoodie: "hoodie",
    "quarter-zip": "quarterzip",
    "tank-top": "tank",
    "custom-tee": "tee",
    "custom-shorts": "bikeshort",
    sleepwear: "pajama",
    "sleepwear-set": "pajama",
    "accessories-slides": "slides",
    "accessories-socks": "socks",
  };

  // ✅ NEW: PLACEMENT OPTIONS
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

  const placementOptions =
    placementOptionsBySlug[slug] || ["Full Front", "Left Chest", "Back"];

  // ✅ set default placement when product changes
  useEffect(() => {
    if (placementOptions.length > 0) {
      setPlacement(placementOptions[0]);
    }
  }, [slug]);

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
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={currentImage}
            className="max-h-[400px] object-contain"
          />
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-2xl">{product.name}</h1>
          <p className="text-lg">{product.price}</p>

          {/* SIZE */}
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            {product.sizes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          {/* COLOR */}
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            {product.colors.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* ✅ NEW: PLACEMENT DROPDOWN */}
          <select
            value={placement}
            onChange={(e) => setPlacement(e.target.value)}
          >
            {placementOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          {/* LOGO PICKER */}
          <LogoPicker
            logos={campLogos}
            selectedLogo={selectedLogo}
            onSelectLogo={setSelectedLogo}
            productType={productTypeMap[slug]}
            selectedColor={color}
          />

          {/* LOGO COLOR */}
          <select
            value={logoColor}
            onChange={(e) => setLogoColor(e.target.value)}
          >
            {Object.keys(logoColorMap).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* CUSTOM */}
          <textarea
            value={customDetails}
            onChange={(e) => setCustomDetails(e.target.value)}
          />

          {/* ADD */}
          <button onClick={handleAddToCart}>
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
}
