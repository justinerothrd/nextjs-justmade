"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getCollegeProductBySlug } from "@/lib/college-products";
import LogoPicker from "@/app/components/LogoPicker";
import { logos } from "@/app/data/logos";

export default function CollegeProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const product = slug ? getCollegeProductBySlug(slug) : null;

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
      <main className="min-h-screen bg-[#F7F7F5] px-6 py-16 text-[#4B4B4B]">
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

  const currentImage = product.images?.[selectedImage] ?? product.images?.[0] ?? "";

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
      college: customDetails,
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

  const mainImageClass = [
    "h-auto w-full object-contain transition duration-500",
    slug === "college-crewneck" ? "max-h-[760px] scale-[1.06]" : "",
    slug === "college-hoodie" ? "max-h-[760px] scale-[1.06]" : "",
    slug === "college-tee" ? "max-h-[520px]" : "",
    slug === "college-tank" ? "max-h-[420px]" : "",
    slug === "college-shorts" ? "max-h-[420px]" : "",
    slug === "college-sleepwear" ? "max-h-[460px]" : "",
    slug === "college-sleepwear-set" ? "max-h-[520px]" : "",
    slug === "college-slides" ? "max-h-[420px]" : "",
    slug === "college-socks" ? "max-h-[360px]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const imageBoxClass = [
    "flex items-center justify-center overflow-hidden rounded-[32px] border border-[#ECE7E1] bg-white px-6 py-6 shadow-[0_12px_32px_rgba(0,0,0,0.035)] sm:px-8 sm:py-8",
    slug === "college-crewneck" ? "h-[620px]" : "",
    slug === "college-hoodie" ? "h-[620px]" : "",
    slug === "college-tee" ? "h-[520px]" : "",
    slug === "college-tank" ? "h-[440px]" : "",
    slug === "college-shorts" ? "h-[420px]" : "",
    slug === "college-sleepwear" ? "h-[460px]" : "",
    slug === "college-sleepwear-set" ? "h-[520px]" : "",
    slug === "college-slides" ? "h-[420px]" : "",
    slug === "college-socks" ? "h-[360px]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#4B4B4B] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => window.history.back()}
          className="text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
        >
          Back
        </button>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="flex gap-4">
            {product.images.length > 1 && (
              <div className="flex flex-col gap-3 pt-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`overflow-hidden rounded-[16px] border-2 bg-white transition ${
                      selectedImage === i
                        ? "border-[#6F879E] shadow-[0_10px_24px_rgba(0,0,0,0.06)]"
                        : "border-transparent hover:border-[#D9D4CE]"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="h-20 w-20 object-contain p-2 sm:h-24 sm:w-24"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className={imageBoxClass}>
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={product.name}
                  className={mainImageClass}
                />
              ) : (
                <div className="text-sm text-gray-400">No image available</div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.24em] text-[#6F879E]">
              Just Made Custom
            </p>

            <h1 className="mt-3 text-3xl font-light tracking-[0.01em] text-[#2F3A4A] sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-light text-[#6F879E]">
              {product.price}
            </p>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-gray-600 sm:text-base">
              {product.description}
            </p>

            <div className="mt-8 flex flex-col gap-5">
              <div>
                <label className="text-sm font-medium text-[#3F3F3F]">
                  College / Customization Details
                </label>
                <input
                  type="text"
                  placeholder="School name, mascot, player name, number, special request, etc."
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-[#3F3F3F]">
                    Size
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                  >
                    {product.sizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#3F3F3F]">
                    Color
                  </label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
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
                <label className="text-sm font-medium text-[#3F3F3F]">
                  Logo Placement
                </label>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                >
                  <option>Left Chest</option>
                  <option>Full Front</option>
                  <option>Back</option>
                  <option>Sleeve</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-[#3F3F3F]">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-2 w-24 rounded-xl border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[#6F879E] px-8 py-4 text-sm font-medium text-white transition-all duration-200 hover:opacity-95 hover:shadow-[0_12px_24px_rgba(111,135,158,0.25)]"
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
                    href="/college"
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
