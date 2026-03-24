
"use client";

import { useState } from "react";

export default function ProductPage() {
  const [name, setName] = useState("");
  const [size, setSize] = useState("Youth M");
  const [color, setColor] = useState("Heather Gray");
  const [quantity, setQuantity] = useState(1);

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
        <div className="h-[420px] bg-gray-200 rounded-xl"></div>

        <div>
          <h1 className="text-3xl font-light">Personalized Camp Sweatshirt</h1>

          <p className="mt-4 text-gray-600">
            Soft, cozy sweatshirt customized with your child’s name for camp.
          </p>

          <p className="mt-4 text-xl">$48</p>

          <div className="mt-6">
            <label className="text-sm">Name on sweatshirt</label>
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

          <button className="mt-8 bg-[#6F879E] text-white px-6 py-3 rounded-full">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
