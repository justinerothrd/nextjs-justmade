"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { getCollegeProductBySlug } from "@/lib/college-products";

export default function CollegeProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getCollegeProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const mainImageClass = [
    "h-auto max-h-[760px] w-full object-contain transition duration-500",
    slug === "college-crewneck" ? "scale-[1.06]" : "",
    slug === "college-hoodie" ? "scale-[1.06]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8">
      <div className="mx-auto max-w-6xl">

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}>
                  <img
                    src={img}
                    className="h-20 w-20 object-contain bg-white p-2"
                  />
                </button>
              ))}
            </div>

            <div className="flex flex-1 items-center justify-center bg-white p-6 rounded-[28px]">
              <img
                src={product.images[selectedImage]}
                className={mainImageClass}
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-light">
              {product.name}
            </h1>

            <p className="mt-2 text-xl text-[#6F879E]">
              {product.price}
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
