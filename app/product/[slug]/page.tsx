"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getProductBySlug } from "@/lib/products";
import LogoPicker from "@/app/components/LogoPicker";
import { logos } from "@/app/data/logos";

const productImageClassesByView: Record<string, string[]> = {
  hoodie: [
    "max-h-[94%] max-w-[94%]",
    "max-h-[88%] max-w-[88%]",
    "max-h-[90%] max-w-[90%]",
    "max-h-[92%] max-w-[92%]",
  ],
  "quarter-zip": [
    "max-h-[94%] max-w-[94%]",
    "max-h-[88%] max-w-[88%]",
  ],
  "tank-top": [
    "max-h-[88%] max-w-[88%]",
    "max-h-[88%] max-w-[88%]",
    "max-h-[88%] max-w-[88%]",
  ],
  "custom-tee": [
    "max-h-[88%] max-w-[88%]",
    "max-h-[96%] max-w-[96%]",
    "max-h-[88%] max-w-[88%]",
    "max-h-[90%] max-w-[90%]",
  ],
  "custom-shorts": [
    "max-h-[90%] max-w-[90%]",
  ],
  sweatpants: [
    "max-h-[96%] max-w-[96%]",
  ],
  sleepwear: [
    "max-h-[100%] max-w-[100%]",
  ],
  "sleepwear-set": [
    "max-h-[96%] max-w-[96%]",
    "max-h-[96%] max-w-[96%]",
  ],
  "accessories-slides": [
    "max-h-[86%] max-w-[86%]",
  ],
  "accessories-socks": [
    "max-h-[92%] max-w-[92%]",
  ],
};

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const product = slug ? getProductBySlug(slug) : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [customDetails, setCustomDetails] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");
  const [placement, setPlacement] = useState("Left Chest");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState("Youth M");
  const [color, setColor] = useState("Heather Gray");

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSize(product.sizes?.[1] ?? product.sizes?.[0] ?? "Youth M");
      setColor(product.colors?.[0] ?? "Heather Gray");
    }
  }, [product]);

  const selectedLogoObject = useMemo(() => {
    return logos.find((l) => l.slug === selectedLogo);
  }, [selectedLogo]);

  if (!slug || !product) {
    return (
      <main className="min-h-screen bg-white px-6 py-16 text-[#4B4B4B]">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-light">Product not found</h1>
          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]"
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  const currentImage =
    product.images?.[selectedImage] ?? product.images?.[0] ?? "";

  const currentImageClass =
    productImageClassesByView[slug]?.[selectedImage] ??
    productImageClassesByView[slug]?.[0] ??
    "max-h-[94%] max-w-[94%]";
  function handleAddToCart() {
    if (!product || !slug) return;

    if (!selectedLogo) {
      alert("Please select a design");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: Date.now(),
      slug,
      product: product.name,
      price: product.price,
      campName: customDetails,
      size,
      color,
      quantity,
      image: currentImage,
      logoSlug: selectedLogo,
      logoName: selectedLogoObject?.name || "",
      placement,
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
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`overflow-hidden rounded-[14px] border transition ${
                      selectedImage === i
                        ? "border-[#6F879E]"
                        : "border-transparent hover:border-[#D9D4CE]"
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

            <div className="flex aspect-square w-full items-center justify-center rounded-[24px] border border-[#F0ECE6] bg-white p-4 sm:p-6">
  {currentImage ? (
    <img
      src={currentImage}
      alt={product.name}
      className={`${currentImageClass} object-contain`}
    />
  ) : (
    <div className="text-sm text-gray-400">No image available</div>
  )}
</div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-[28px] font-light text-[#2F2F2F] sm:text-[34px]">
              {product.name}
            </h1>

            <p className="mt-2 text-[18px] text-[#5F7A94]">{product.price}</p>

            <p className="mt-5 max-w-md text-[14px] leading-6 text-[#6B7280]">
              {product.description}
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-[13px] uppercase tracking-[0.12em] text-[#6B7280]">
                  Customization
                </label>
                <input
                  type="text"
                  placeholder="Camp name, number, etc."
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  className="mt-2 w-full rounded-full border border-[#D8D3CD] px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-[13px] uppercase tracking-[0.12em] text-[#6B7280]">
                    Size
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="mt-2 w-full rounded-full border border-[#D8D3CD] px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                  >
                    {product.sizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[13px] uppercase tracking-[0.12em] text-[#6B7280]">
                    Color
                  </label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="mt-2 w-full rounded-full border border-[#D8D3CD] px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                  >
                    {product.colors.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <LogoPicker
                logos={logos}
                selectedLogo={selectedLogo}
                onSelectLogo={setSelectedLogo}
              />

              <a
                href="/designs"
                className="text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
              >
                View all designs
              </a>

              <div>
                <label className="text-[13px] uppercase tracking-[0.12em] text-[#6B7280]">
                  Placement
                </label>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className="mt-2 w-full rounded-full border border-[#D8D3CD] px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                >
                  <option>Left Chest</option>
                  <option>Full Front</option>
                  <option>Back</option>
                  <option>Sleeve</option>
                </select>
              </div>

              <div>
                <label className="text-[13px] uppercase tracking-[0.12em] text-[#6B7280]">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-2 w-24 rounded-full border border-[#D8D3CD] px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-6 w-full rounded-full bg-[#5F7A94] py-3.5 text-[14px] font-medium text-white transition hover:bg-[#536C84]"
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>

              {added && (
                <div className="flex gap-5 text-sm">
                  <a
                    href="/cart"
                    className="underline underline-offset-4 transition hover:text-[#6F879E]"
                  >
                    View Cart
                  </a>
                  <a
                    href="/shop"
                    className="underline underline-offset-4 transition hover:text-[#6F879E]"
                  >
                    Continue Shopping
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
