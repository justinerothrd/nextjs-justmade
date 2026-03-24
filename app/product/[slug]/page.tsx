"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const products = {
  "tank-top": {
    name: "Custom Tank Top",
    price: "$32",
    description: "A lightweight tank perfect for hot camp days.",
    image: "/Tank.jpeg",
  },
  "hoodie": {
    name: "Custom Hoodie",
    price: "$60",
    description: "A cozy custom hoodie for chilly camp nights.",
    image: "/hoodie.jpeg",
  },
  "quarter-zip": {
    name: "Custom 1/4 Zip",
    price: "$58",
    description: "A stylish quarter zip for layering at camp.",
    image: "/quarterzip.jpeg",
  },
  "custom-shorts": {
    name: "Custom Shorts",
    price: "$36",
    description: "Comfortable personalized shorts for everyday wear.",
    image: "/shorts.jpeg",
  },
  "custom-tee": {
    name: "Custom Tee",
    price: "$28",
    description: "A classic custom t-shirt for camp and beyond.",
    image: "/Tee.jpeg",
  },
};

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = products[slug];

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
    <main className="bg-[#F7F7F5] text-[#4B4B4B] min-h-screen">
      <div className="flex justify-between items-center px-6 py-5 border-b">
        <a href="/">
          <img src="/logo.png" alt="logo" className="h-10" />
        </a>
        <a href="/shop">Back to Shop</a>
      </div>

      <div className="grid md:grid-cols-2 gap-10 px-6 py-16 max-w-6xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="h-[420px] w-full object-cover rounded-xl"
        />

        <div>
          <h1 className="text-3xl font-light">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-4 text-xl">{product.price}</p>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg"
            />
          </div>

          <a
            href={cartLink}
            className="mt-8 inline-block bg-[#6F879E] text-white px-6 py-3 rounded-full"
          >
            Add to Cart
          </a>
        </div>
      </div>
    </main>
  );
}
