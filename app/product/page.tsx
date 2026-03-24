"use client";

import { useState } from "react";

export default function ProductPage() {
  const [name, setName] = useState("");

  return (
    <main className="bg-[#F7F7F5] text-[#4B4B4B] min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b">
        <a href="/">
          <img src="/logo.png" alt="logo" className="h-10" />
        </a>
        <div className="text-sm">Cart (0)</div>
      </div>

      {/* Product */}
      <div className="grid md:grid-cols-2 gap-10 px-6 py-16 max-w-6xl mx-auto">

        {/* Image */}
        <div className="h-[400px] bg-gray-200 rounded-xl"></div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-light">
            Personalized Camp Sweatshirt
          </h1>

          <p className="mt-4 text-gray-600">
            Soft, cozy sweatshirt customized with your child’s name for camp.
          </p>

          <p className="mt-4 text-xl">$48</p>

          {/* Customization */}
          <div className="mt-6">
            <label className="text-sm">Name on sweatshirt</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="w-full mt-2 p-3 border rounded-lg"
            />
          </div>

          {/* Button */}
          <button className="mt-6 bg-[#6F879E] text-white px-6 py-3 rounded-full">
            Add to Cart
          </button>
        </div>

      </div>
    </main>
  );
}
