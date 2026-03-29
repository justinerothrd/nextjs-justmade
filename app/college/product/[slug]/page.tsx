"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const products = {
  "college-crewneck": {
    name: "College Crewneck",
    price: "$70",
    description: "A custom college crewneck personalized with your school name and style.",
    image: "/hoodie.jpeg",
    colors: ["Heather Gray", "Navy", "White", "Black", "Red", "Green", "Royal Blue"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "college-quarter-zip": {
    name: "College 1/4 Zip",
    price: "$65",
    description: "A polished college quarter zip personalized with your school name.",
    image: "/quarterzip.jpeg",
    colors: ["Heather Gray", "Navy", "White", "Black", "Red", "Green", "Royal Blue"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "college-tank": {
    name: "College Tank Top",
    price: "$40",
    description: "A lightweight custom tank personalized with your college.",
    image: "/college-tank.jpeg",
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Red", "Green"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "college-tee": {
    name: "College Tee",
    price: "$35",
    description: "A classic custom tee personalized with your college name and style.",
    image: "/collegetee.jpg",
    colors: ["White", "Heather Gray", "Light Blue", "Navy", "Red", "Green"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "college-shorts": {
    name: "College Shorts",
    price: "$36",
    description: "Comfortable personalized shorts with your college style.",
    image: "/shorts.jpeg",
    colors: ["Heather Gray", "Navy", "Black", "Red", "Green"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "college-pajama-shorts": {
    name: "College Pajama Shorts",
    price: "$32",
    description: "Soft college pajama shorts personalized with your school.",
    image: "/sleepwear.jpg",
    colors: ["Light Blue", "White", "Navy", "Red", "Green"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "college-sleep-set": {
    name: "College Sleep Set",
    price: "$65",
    description: "A cozy personalized sleep set with your college name.",
    image: "/college.sleepwear-set.jpg",
    colors: ["Light Blue", "White", "Navy", "Red", "Green"],
    sizes: ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "college-totebag": {
    name: "College Totebag",
    price: "$60",
    description: "Blanket tote bag with your college name.",
    image: "/tulane.tote.jpeg",
    colors: ["White", "Navy", "Black", "Red", "Green"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
  "college-socks": {
    name: "College Socks",
    price: "$22",
    description: "Soft cozy socks personalized with your college.",
    image: "/college.fuzzysocks.jpeg",
    colors: ["White", "Light Blue", "Navy", "Red", "Green"],
    sizes: ["Youth S", "Youth M", "Youth L", "Adult S", "Adult M", "Adult L", "Adult XL"],
  },
} as const;

export default function CollegeProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = products[slug as keyof typeof products];

  const [college, setCollege] = useState("");
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
          <a href="/college" className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]">
            Back to College Gear
          </a>
        </div>
      </main>
    );
  }

  function handleAddToCart() {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newItem = {
      id: Date.now(),
      product: `${college ? college + " " : ""}${product.name}`,
      price: product.price,
      campName: name,
      size,
      color,
      quantity,
    };
    localStorage.setItem("cart", JSON.stringify([...existingCart, newItem]));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

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
            <h1 className="text-3xl font-light text-[#2F3A4A] sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-xl text-[#6F879E]">{product.price}</p>
            <p className="mt-4 text-base leading-7 text-gray-600">{product.description}</p>

            <div className="mt-6 flex flex-col gap-5">
              <div>
                <label className="text-sm">College</label>
                <input
                  type="text"
                  placeholder="e.g. Duke, Penn State, UNC..."
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="mt-2 w-full rounded-lg border bg-white p-3"
                />
              </div>

              <div>
                <label className="text-sm">Name on item</label>
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
                  <a href="/cart" className="underline underline-offset-4 hover:text-[#6F879E]">View Cart</a>
                  <a href="/college" className="underline underline-offset-4 hover:text-[#6F879E]">Continue Shopping</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
