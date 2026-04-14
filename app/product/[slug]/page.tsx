"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { getProductBySlug } from "@/lib/products";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [name, setName] = useState("");
  const [size, setSize] = useState<string>(product?.sizes?.[1] ?? "Youth M");
  const [color, setColor] = useState<string>(product?.colors?.[0] ?? "Heather Gray");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
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

  const currentImage = product.images[selectedImage];

  function handleAddToCart() {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: Date.now(),
      slug,
      product: product.name,
      price: product.price,
      campName: name,
      size,
      color,
      quantity,
      image: currentImage,
    };

    localStorage.setItem("cart", JSON.stringify([...existingCart, newItem]));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("openMiniCart"));

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const mainImageClass = [
    "h-auto max-h-[780px] w-full object-contain transition duration-500",
    slug === "quarter-zip" ? "scale-[1.12]" : "",
    slug === "hoodie" ? "scale-[1.04]" : "",
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

            <div className="flex flex-1 items-center justify-center overflow-hidden rounded-[32px] border border-[#ECE7E1] bg-white p-8 shadow-[0_12px_32px_rgba(0,0,0,0.035)] sm:p-10">
              <img
                src={currentImage}
                alt={product.name}
                className={mainImageClass}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.24em] text-[#6F879E]">
              Just Made Custom
            </p>

            <h1 className="mt-3 text-3xl font-light tracking-[0.01em] text-[#2F3A4A] sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-light text-[#6F879E]">{product.price}</p>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-gray-600 sm:text-base">
              {product.description}
            </p>

            <div className="mt-8 flex flex-col gap-5">
              <div>
                <label className="text-sm font-medium text-[#3F3F3F]">Camp Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-[#3F3F3F]">Size</label>
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
                  <label className="text-sm font-medium text-[#3F3F3F]">Color</label>
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

              <div>
                <label className="text-sm font-medium text-[#3F3F3F]">Quantity</label>
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
