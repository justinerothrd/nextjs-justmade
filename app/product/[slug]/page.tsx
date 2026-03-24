"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const products: Record<
  string,
  {
    name: string;
    price: string;
    description: string;
    image: string;
  }
> = {
  "tank-top": {
    name: "Custom Tank Top",
    price: "$32",
    description: "A lightweight tank perfect for hot camp days.",
    image: "/tank.jpg",
  },
  "hoodie": {
    name: "Custom Hoodie",
    price: "$60",
    description: "A cozy custom hoodie for chilly camp nights.",
    image: "/hoodie.jpg",
  },
  "quarter-zip": {
    name: "Custom 1/4 Zip",
    price: "$58",
    description: "A stylish quarter zip for layering at camp.",
    image: "/quarterzip.jpg",
  },
  "custom-shorts": {
    name: "Custom Shorts",
    price: "$36",
    description: "Comfortable personalized shorts for everyday wear.",
    image: "/shorts.jpg",
  },
  "custom-tee": {
    name: "Custom Tee",
    price: "$28",
    description: "A classic custom t-shirt for camp and beyond.",
    image: "/tee.jpg",
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
      <main className="bg-[#F7F7F5] text-[#4B4B4B] min-h-screen">
        <div className="flex justify-between items-center px-6 py-5 border-b">
          <a href="/">
            <img src="/logo.png" alt="logo" className="h-10" />
          </a>
          <a href="/shop" className="text-sm hover:text-[#6F879E]">
            Back to Shop
          </a>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-light">Product not found</h1>
        </div>
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
        <a href="/shop" className="text-sm hover:text-[#6F879E]">
          Back to Shop
        </a>
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
            <label className="text-sm">Name on item</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="w-full mt-2 p-3 border rounded-lg bg-white"
            />
          </div>

          <div className="mt-6">
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

          <div className="mt-6">
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
            </select>
          </div>

          <div className="mt-6">
            <label className="text-sm">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 mt-2 p-3 border rounded-lg bg-white"
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
