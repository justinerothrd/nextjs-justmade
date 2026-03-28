"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const products = {
  hoodie: {
    name: "Custom Hoodie",
    price: "$70",
    description: "A cozy custom hoodie for chilly camp nights and cool mornings.",
    image: "/hoodie.jpeg",
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
  },
  "quarter-zip": {
    name: "Custom 1/4 Zip",
    price: "$65",
    description: "A polished quarter zip that layers easily for camp, travel, and everyday wear.",
    image: "/quarterzip.jpeg",
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
  },
  "tank-top": {
    name: "Custom Tank Top",
    price: "$40",
    description: "A lightweight custom tank perfect for hot camp days and summer activities.",
    image: "/Tank.jpeg",
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
  },
  "custom-tee": {
    name: "Custom Tee",
    price: "$35",
    description: "A classic custom tee designed for camp, travel, and summer memories.",
    image: "/Tee.jpeg",
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
  },
  "custom-shorts": {
    name: "Custom Shorts",
    price: "$36",
    description: "Comfortable personalized shorts for everyday camp wear and relaxed summer style.",
    image: "/shorts.jpeg",
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
  },
  sleepwear: {
    name: "Camp Pajama Shorts",
    price: "$32",
    description: "Soft camp-ready pajama shorts made for bunk life, bedtime, and easy summer comfort.",
    image: "/sleepwear.jpg",
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
  },
  "sleepwear-set": {
    name: "Custom Sleep Set",
    price: "$65",
    description: "A personalized sleep set with a cozy feel that makes camp nights extra special.",
    image: "/sleepwear-set.jpg",
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"],
  },
  "accessories-slides": {
    name: "Bunk Gift Slides",
    price: "$60",
    description: "A fun personalized camp gift that feels special, practical, and easy to wear.",
    image: "/accessories.jpg",
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
  },
  "accessories-socks": {
    name: "Fuzzy Socks",
    price: "$22",
    description: "Soft fuzzy socks that make a perfect bunk gift or cozy camp extra.",
    image: "/customsocks.jpg",
    colors: ["Heather Gray", "Light Blue", "Navy", "White", "Green", "Red"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M"],
  },
} as const;

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = products[slug as keyof typeof products];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState<string>(product?.sizes?.[1] ?? "Youth M");
  const [color, setColor] = useState<string>(product?.colors?.[0] ?? "Heather Gray");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-6 py-16 text-[#4B4B4B]">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-light">Product not found</h1>
          <a href="/shop" className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]">
            Back to Shop
          </a>
        </div>
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mlgoglny", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: product.name,
          price: product.price,
          camp_name: name,
          email,
          size,
          color,
          quantity,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-4 py-16 text-[#4B4B4B]">
        <div className="mx-auto max-w-lg text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className="text-3xl font-light text-[#2F3A4A]">Order Received!</h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Thanks for your order! We'll be in touch shortly to confirm your personalized {product.name} and arrange payment.
          </p>
          <a href="/shop" className="mt-8 inline-block rounded-full bg-[#6F879E] px-6 py-3 text-sm text-white transition hover:opacity-90">
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#4B4B4B] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <a href="/shop" className="text-sm underline underline-offset-4 hover:text-[#6F879E]">
          Back to Shop
        </a>
        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">

          {/* Image */}
          <div className="flex items-center justify-center overflow-hidden rounded-[28px] bg-white p-6">
            <img
              src={product.image}
              alt={product.name}
              className={`h-auto max-h-[600px] w-full object-contain transition duration-500 ${slug === "quarter-zip" ? "scale-125" : ""}`}
            />
          </div>

          {/* Order form */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-light text-[#2F3A4A] sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-xl text-[#6F879E]">{product.price}</p>
            <p className="mt-4 text-base leading-7 text-gray-600">{product.description}</p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
              <div>
                <label className="text-sm">Camp Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border bg-white p-3"
                />
              </div>

              <div>
                <label className="text-sm">Your Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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

              {status === "error" && (
                <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 w-full rounded-full bg-[#6F879E] px-6 py-4 text-center text-sm text-white transition hover:opacity-90 disabled:opacity-50 sm:w-auto sm:py-3"
              >
                {status === "sending" ? "Submitting..." : "Submit Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
