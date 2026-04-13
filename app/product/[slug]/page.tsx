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
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const mainImageClass = [
    "h-auto max-h-[760px] w-full object-contain transition duration-500",
    slug === "quarter-zip" ? "scale-[1.2]" : "",
    slug === "hoodie" ? "scale-[1.06]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#4B4B4B] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => window.history.back()}
          className="text-sm underline underline-offset-4 hover:text-[#6F879E]"
        >
          Back
        </button>

        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex gap-4">
            {product.images.length > 1 && (
              <div className="flex flex-col gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`overflow-hidden rounded-[14px] border-2 transition ${
                      selectedImage === i ? "border-[#6F879E]" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="h-20 w-20 object-contain bg-white p-2 sm:h-24 sm:w-24"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-1 items-center justify-center overflow-hidden rounded-[28px] bg-white p-6 sm:p-8">
              <img
                src={currentImage}
                alt={product.name}
                className={mainImageClass}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-light text-[#2F3A4A] sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-3 text-xl text-[#6F879E]">{product.price}</p>

            <p className="mt-4 text-base leading-7 text-gray-600">
              {product.description}
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <div>
                <label className="text-sm">Camp Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-lg border bg-white p-3"
                />
              </div>

              <div>
                <label className="text-sm">Size</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="mt-2 w-full rounded-lg border bg-white p-3"
                >
                  {product.sizes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm">Color</label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="mt-2 w-full rounded-lg border bg-white p-3"
                >
                  {product.colors.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-2 w-24 rounded-lg border bg-white p-3"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-2 w-full rounded-full bg-[#6F879E] px-6 py-4 text-center text-sm text-white transition hover:opacity-90 sm:w-auto sm:py-3"
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>

              {added && (
                <div className="flex gap-4 text-sm">
                  <a
                    href="/cart"
                    className="underline underline-offset-4 hover:text-[#6F879E]"
                  >
                    View Cart
                  </a>
                  <a
                    href="/shop"
                    className="underline underline-offset-4 hover:text-[#6F879E]"
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
