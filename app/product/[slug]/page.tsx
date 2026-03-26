"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const products = {
  "tank-top": {
    name: "Custom Tank Top",
    price: "$40",
    description: "A lightweight custom tank perfect for hot camp days.",
    image: "/Tank.jpeg",
  },
  hoodie: {
    name: "Custom Hoodie",
    price: "$70",
    description: "A cozy custom hoodie for chilly camp nights and cool mornings.",
    image: "/hoodie.jpeg",
  },
  "quarter-zip": {
    name: "Custom 1/4 Zip",
    price: "$65",
    description: "A polished quarter zip that layers easily for camp and beyond.",
    image: "/quarterzip.jpeg",
  },
  "custom-shorts": {
    name: "Custom Shorts",
    price: "$36",
    description: "Comfortable personalized shorts for everyday camp wear.",
    image: "/shorts.jpeg",
  },
  "custom-tee": {
    name: "Custom Tee",
    price: "$35",
    description: "A classic custom tee designed for camp, travel, and summer memories.",
    image: "/Tee.jpeg",
  },
  sleepwear: {
    name: "Camp Pajama Shorts",
    price: "$32",
    description: "Soft camp-ready pajama shorts made for bunk life and bedtime.",
    image: "/sleepwear.jpg",
  },
  "sleepwear-set": {
    name: "Custom Sleep Set",
    price: "$65",
    description: "A personalized sleep set with a soft, cozy feel for camp nights.",
    image: "/sleepwear-set.jpg",
  },
  "accessories-slides": {
    name: "Bunk Gift Slides",
    price: "$60",
    description: "A fun personalized camp gift that feels special and easy to wear.",
    image: "/accessories.jpg",
  },
  "accessories-socks": {
    name: "Fuzzy Socks",
    price: "$22",
    description: "Soft fuzzy socks that make a perfect bunk gift or camp extra.",
    image: "/customsocks.jpg",
  },
};

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = products[slug as keyof typeof products];

  const [name, setName] = useState("");
  const [size, setSize] = useState("Youth M");
  const [color, setColor] = useState("Heather Gray");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-6 py-16 text-[#4B4B4B]">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-light">Product not found</h1>
          <a
            href="/shop"
            className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]"
          >
            Back to Shop
          </a>
        </div>
      </main>
    );
  }

  const cartLink = `/cart?product=${encodeURIComponent(
    product.name
  )}&price=${encodeURIComponent(product.price)}&name=${encodeURIComponent(
    name
  )}&size=${encodeURIComponent(size)}&color=${encodeURIComponent(
    color
  )}&quantity=${encodeURIComponent(quantity.toString())}`;

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 py-16 text-[#4B4B4B]">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-[28px] bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-[520px] w-full object-cover"
          />
        </div>

        <div>
          <a
            href="/shop"
            className="text-sm underline underline-offset-4 hover:text-[#6F879E]"
          >
            Back to Shop
          </a>

          <h1 className="mt-5 text-4xl font-light text-[#2F3A4A]">
            {product.name}
          </h1>

          <p className="mt-4 text-xl text-[#6F879E]">{product.price}</p>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600">
            {product.description}
          </p>

          <div className="mt-8">
            <label className="text-sm">Name on item</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-lg border bg-white p-3"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-2 w-full rounded-lg border bg-white p-3"
            >
              <option>Youth S</option>
              <option>Youth M</option>
              <option>Youth L</option>
              <option>Youth XL</option>
              <option>Adult S</option>
              <option>Adult M</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="text-sm">Color</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-2 w-full rounded-lg border bg-white p-3"
            >
              <option>Heather Gray</option>
              <option>Light Blue</option>
              <option>Navy</option>
              <option>White</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="text-sm">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-2 w-24 rounded-lg border bg-white p-3"
            />
          </div>

          <a
            href={cartLink}
            className="mt-8 inline-block rounded-full bg-[#6F879E] px-6 py-3 text-white transition hover:opacity-90"
          >
            Add to Cart
          </a>
        </div>
      </div>
    </main>
  );
}
