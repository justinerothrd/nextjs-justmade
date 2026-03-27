"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const products = {
  "hoodie": {
    name: "Custom Hoodie",
    price: "$70",
    description: "A cozy custom hoodie for chilly camp nights.",
    image: "/hoodie.jpeg",
  },
  "quarter-zip": {
    name: "Custom 1/4 Zip",
    price: "$65",
    description: "A polished quarter zip for layering at camp.",
    image: "/quarterzip.jpeg",
  },
  "tank-top": {
    name: "Custom Tank Top",
    price: "$40",
    description: "A lightweight tank perfect for hot camp days.",
    image: "/Tank.jpeg",
  },
  "custom-tee": {
    name: "Custom Tee",
    price: "$35",
    description: "An easy everyday tee with a custom feel.",
    image: "/Tee.jpeg",
  },
  "custom-shorts": {
    name: "Custom Shorts",
    price: "$36",
    description: "Comfortable camp-ready shorts for everyday wear.",
    image: "/shorts.jpeg",
  },
  "sleepwear": {
    name: "Camp Pajama Shorts",
    price: "$32",
    description: "Soft sleepwear made for bunk life and bedtime.",
    image: "/sleepwear.jpg",
  },
  "sleepwear-set": {
    name: "Custom Sleep Set",
    price: "$65",
    description: "A matching set designed for comfort and style.",
    image: "/sleepwear-set.jpg",
  },
  "accessories-slides": {
    name: "Bunk Gift Slides",
    price: "$60",
    description: "Easy slides perfect for camp and everyday wear.",
    image: "/accessories.jpg",
  },
  "accessories-socks": {
    name: "Fuzzy Socks",
    price: "$22",
    description: "Cozy socks for relaxing after a long camp day.",
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
      <main className="min-h-screen flex items-center justify-center">
        <h1>Product not found</h1>
      </main>
    );
  }

  const cartLink = `/cart?product=${encodeURIComponent(
    product.name
  )}&price=${encodeURIComponent(
    product.price
  )}&name=${encodeURIComponent(name)}&size=${encodeURIComponent(
    size
  )}&color=${encodeURIComponent(color)}&quantity=${encodeURIComponent(
    quantity.toString()
  )}`;

  return (
    <main className="bg-white text-[#2F3A4A] min-h-screen">
      <div className="flex justify-between items-center px-6 py-5 border-b">
        <a href="/">
        </a>
        <a href="/shop">Back to Shop</a>
      </div>

      <div className="grid md:grid-cols-2 gap-12 px-6 py-16 max-w-6xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="h-[420px] w-full object-contain"
        />

        <div>
          <h1 className="text-3xl font-light">{product.name}</h1>

          <p className="mt-4 text-gray-500 leading-7">
            {product.description}
          </p>

          <p className="mt-4 text-xl">{product.price}</p>

          <div className="mt-8 space-y-6">
            <div>
              <label className="text-sm">Name on item</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg bg-white"
              >
                <option>Youth S</option>
                <option>Youth M</option>
                <option>Youth L</option>
                <option>Youth XL</option>
                <option>Adult S</option>
                <option>Adult M</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Color</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full mt-2 p-3 border rounded-lg bg-white"
              >
                <option>Heather Gray</option>
                <option>Light Blue</option>
                <option>Navy</option>
                <option>White</option>
                <option>Green</option>
                <option>Red</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24 mt-2 p-3 border rounded-lg"
              />
            </div>
          </div>

          <a
            href={cartLink}
            className="mt-10 inline-block bg-[#6F879E] text-white px-6 py-3 rounded-full"
          >
            Add to Cart
          </a>
        </div>
      </div>
    </main>
  );
}
