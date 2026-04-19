"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductBySlug } from "@/lib/products";
import LogoPicker from "@/app/components/LogoPicker";
import { logos } from "@/app/data/logos";

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const product = slug ? getProductBySlug(slug) : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [customDetails, setCustomDetails] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");
  const [size, setSize] = useState("Youth M");
  const [color, setColor] = useState("White");

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSize(product.sizes?.[1] ?? product.sizes?.[0] ?? "Youth M");
      setColor(product.colors?.[0] ?? "White");
    }
  }, [product]);

  if (!slug || !product) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-6 py-16 text-[#4B4B4B]">
        <div className="text-center">
          <h1 className="text-3xl font-light">Product not found</h1>
        </div>
      </main>
    );
  }

  const currentImage =
    product.images?.[selectedImage] ?? product.images?.[0] ?? "";

  // ✅ IMAGE SIZING (MATCHES COLLEGE)
  const mainImageClass = [
    "h-auto w-full object-contain transition duration-500",
    slug === "hoodie" ? "max-h-[760px] scale-[1.06]" : "",
    slug === "quarter-zip" ? "max-h-[760px] scale-[1.06]" : "",
    slug === "custom-tee" ? "max-h-[520px]" : "",
    slug === "tank-top" ? "max-h-[420px]" : "",
    slug === "custom-shorts" ? "max-h-[420px]" : "",
    slug === "sweatpants" ? "max-h-[520px]" : "",
    slug === "sleepwear" ? "max-h-[460px]" : "",
    slug === "sleepwear-set" ? "max-h-[520px]" : "",
    slug === "accessories-slides" ? "max-h-[420px]" : "",
    slug === "accessories-socks" ? "max-h-[360px]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const imageBoxClass = [
    "flex items-center justify-center overflow-hidden rounded-[32px] border border-[#ECE7E1] bg-white px-6 py-6 shadow-[0_12px_32px_rgba(0,0,0,0.035)] sm:px-8 sm:py-8",
    slug === "hoodie" ? "h-[620px]" : "",
    slug === "quarter-zip" ? "h-[620px]" : "",
    slug === "custom-tee" ? "h-[520px]" : "",
    slug === "tank-top" ? "h
