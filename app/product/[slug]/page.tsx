"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getProductBySlug } from "@/lib/products";
import LogoPicker from "@/app/components/LogoPicker";
import { logos } from "@/app/data/logos";

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

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const safeSlug = slug || "";

  const product = safeSlug ? getProductBySlug(safeSlug) : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedLogo, setSelectedLogo] = useState("");
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
  }, [product, safeSlug]);

  if (!product) return <div>Product not found</div>;

  const currentImage =
    product.images?.[selectedImage] || product.images?.[0] || "";

  const placementOptions =
    placementOptionsBySlug[safeSlug] || ["Full Front", "Left Chest", "Back"];

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
          className="text-sm underline underline-offset-4 hover:text-[#6F879E]"
        >
          Back
        </button>

        <div className="mt-8 grid items-start gap-10 md:grid-cols-2">

          {/* LEFT: PRODUCT IMAGES */}
          <div className="flex gap-4">
            {product.images.length > 1 && (
              <div className="flex flex-col gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(i)}
                    className={`rounded-lg border p-1 ${
                      selectedImage === i
                        ? "border-[#6F879E]"
                        : "border-gray-200"
                    }`}
                  >
                    <img src={img} className="h-16 w-16 object-contain" />
                  </button>
                ))}
              </div>
            )}

            <div className="w-full rounded-2xl border bg-[#FBFAF8] p-6 flex items-center justify-center">
              <img
                src={currentImage}
                alt={product.name}
                className="max-h-[400px] object-contain"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <h1 className="text-3xl font-light">{product.name}</h1>
            <p className="mt-2 text-lg text-[#5F7A94]">{product.price}</p>

            {/* OPTIONS */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="rounded-full border px-4 py-2"
              >
                {product.sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="rounded-full border px-4 py-2"
              >
                {product.colors.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="rounded-full border px-4 py-2"
              >
                {placementOptions.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* LOGO PICKER */}
            <div className="mt-8">
              <LogoPicker
                logos={campLogos}
                selectedLogo={selectedLogo}
                onSelectLogo={setSelectedLogo}
              />
            </div>

            {/* CUSTOM DETAILS */}
            <textarea
              value={customDetails}
              onChange={(e) => setCustomDetails(e.target.value)}
              placeholder="Add custom details"
              className="mt-6 w-full rounded-lg border p-3"
            />

            {/* QUANTITY */}
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value)))
              }
              className="mt-4 w-full rounded-full border px-4 py-2"
            />

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="mt-6 w-full rounded-full bg-[#5F7A94] py-3 text-white"
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
