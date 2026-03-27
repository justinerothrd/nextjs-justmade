"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const products = {
  "duke-crewneck": {
    name: "Duke Crewneck",
    college: "Duke",
    price: "$70",
    description: "A custom crewneck sweatshirt personalized with your name in Duke style.",
    image: "/duke-crewneck.jpeg",
    colors: ["Navy Blue", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "duke-hoodie": {
    name: "Duke Hoodie",
    college: "Duke",
    price: "$75",
    description: "A cozy custom hoodie personalized with your name in Duke style.",
    image: "/duke-hoodie.jpeg",
    colors: ["Navy Blue", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "duke-tee": {
    name: "Duke Tee",
    college: "Duke",
    price: "$40",
    description: "A classic custom tee personalized with your name in Duke style.",
    image: "/duke-tee.jpeg",
    colors: ["Navy Blue", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "penn-state-crewneck": {
    name: "Penn State Crewneck",
    college: "Penn State",
    price: "$70",
    description: "A custom crewneck sweatshirt personalized with your name in Penn State style.",
    image: "/penn-state-crewneck.jpeg",
    colors: ["Navy Blue", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "penn-state-hoodie": {
    name: "Penn State Hoodie",
    college: "Penn State",
    price: "$75",
    description: "A cozy custom hoodie personalized with your name in Penn State style.",
    image: "/penn-state-hoodie.jpeg",
    colors: ["Navy Blue", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "penn-state-tee": {
    name: "Penn State Tee",
    college: "Penn State",
    price: "$40",
    description: "A classic custom tee personalized with your name in Penn State style.",
    image: "/penn-state-tee.jpeg",
    colors: ["Navy Blue", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "usc-crewneck": {
    name: "USC Crewneck",
    college: "USC",
    price: "$70",
    description: "A custom crewneck sweatshirt personalized with your name in USC style.",
    image: "/usc-crewneck.jpeg",
    colors: ["Cardinal", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "usc-hoodie": {
    name: "USC Hoodie",
    college: "USC",
    price: "$75",
    description: "A cozy custom hoodie personalized with your name in USC style.",
    image: "/usc-hoodie.jpeg",
    colors: ["Cardinal", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "usc-tee": {
    name: "USC Tee",
    college: "USC",
    price: "$40",
    description: "A classic custom tee personalized with your name in USC style.",
    image: "/usc-tee.jpeg",
    colors: ["Cardinal", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "unc-crewneck": {
    name: "UNC Crewneck",
    college: "UNC",
    price: "$70",
    description: "A custom crewneck sweatshirt personalized with your name in UNC style.",
    image: "/unc-crewneck.jpeg",
    colors: ["Carolina Blue", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "unc-hoodie": {
    name: "UNC Hoodie",
    college: "UNC",
    price: "$75",
    description: "A cozy custom hoodie personalized with your name in UNC style.",
    image: "/unc-hoodie.jpeg",
    colors: ["Carolina Blue", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "unc-tee": {
    name: "UNC Tee",
    college: "UNC",
    price: "$40",
    description: "A classic custom tee personalized with your name in UNC style.",
    image: "/unc-tee.jpeg",
    colors: ["Carolina Blue", "White", "Heather Gray"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
} as const;

export default function CollegeProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = products[slug as keyof typeof products];

  const [name, setName] = useState("");
  const [size, setSize] = useState<string>(product?.sizes?.[1] ?? "Youth M");
  const [color, setColor] = useState<string>(product?.colors?.[0] ?? "Navy Blue");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-6 py-16 text-[#4B4B4B]">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-light">Product not found</h1>
          <a href="/college" className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]">
            Back to College Gear
          </a>
        </div>
      </main>
    );
  }

  const cartLink = `/cart?product=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&name=${encodeURIComponent(name)}&size=${encodeURIComponent(size)}&color=${encodeURIComponent(color)}&quantity=${encodeURIComponent(quantity.toString())}`;

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#4B4B4B] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <a href="/college" className="text-sm underline underline-offset-4 hover:text-[#6F879E]">
          Back to College Gear
        </a>
        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">

          {/* Image */}
          <div className="flex items-center justify-center overflow-hidden rounded-[28px] bg-white p-6">
            <img
              src={product.image}
              alt={product.name}
              className="h-auto max-h-[600px] w-full object-contain transition duration-500"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-widest text-[#6F879E]">{product.college}</p>
            <h1 className="mt-2 text-3xl font-light text-[#2F3A4A] sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-xl text-[#6F879E]">{product.price}</p>
            <p className="mt-4 text-base leading-7 text-gray-600">{product.description}</p>

            <div className="mt-6">
              <label className="text-sm">Name on item</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-lg border bg-white p-3"
              />
            </div>

            <div className="mt-5">
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

            <div className="mt-5">
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

            <div className="mt-5">
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
              className="mt-8 inline-block w-full rounded-full bg-[#6F879E] px-6 py-4 text-center text-white transition hover:opacity-90 sm:w-auto sm:py-3"
            >
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
