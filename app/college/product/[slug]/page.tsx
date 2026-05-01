"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getCollegeProductBySlug } from "@/lib/college-products";
import LogoPicker from "@/app/components/LogoPicker";
import { logos } from "@/app/data/logos";

const productImageClassesByView: Record<string, string[]> = {
  "college-crewneck": ["max-h-[94%] max-w-[94%]"],
  "college-hoodie": ["max-h-[94%] max-w-[94%]"],
  "college-tee": ["max-h-[90%] max-w-[90%]"],
  "college-tank": ["max-h-[88%] max-w-[88%]"],
  "college-sweatpants": ["max-h-[96%] max-w-[96%]"],
  "college-sweatshorts": ["max-h-[90%] max-w-[90%]"],
  "college-bikeshorts": ["max-h-[90%] max-w-[90%]"],
  "college-sleepwear": ["max-h-[96%] max-w-[96%]"],
  "college-sleepwear-set": ["max-h-[96%] max-w-[96%]"],
  "college-slides": ["max-h-[86%] max-w-[86%]"],
  "college-socks": ["max-h-[92%] max-w-[92%]"],
  "college-sweatshirt-tote": ["max-h-[92%] max-w-[92%]"],
  "college-weekend-duffle": ["max-h-[92%] max-w-[92%]"],
};

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const product = slug ? getCollegeProductBySlug(slug) : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [customDetails, setCustomDetails] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");
  const [placement, setPlacement] = useState("Full Front");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState("Youth M");
  const [color, setColor] = useState("Heather Gray");
  const [zoomOpen, setZoomOpen] = useState(false);
  const [distressed, setDistressed] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const collegeLogos = useMemo(() => {
    return logos.filter((logo) => logo.category === "College");
  }, []);

  const selectedLogoObject = useMemo(() => {
    return logos.find((logo) => logo.slug === selectedLogo);
  }, [selectedLogo]);

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSize(product.sizes?.[0] ?? "Youth M");
      setColor(product.colors?.[0] ?? "Heather Gray");
      setSelectedLogo("");
      setZoomOpen(false);
      setSelectedOptions({});
    }
  }, [product]);

  if (!slug || !product) {
    return (
      <main className="min-h-screen bg-white px-6 py-16 text-[#4B4B4B]">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-light">Product not found</h1>
          <button
            onClick={() => window.history.back()}
            className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]"
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  const currentImage =
    product.images?.[selectedImage] ?? product.images?.[0] ?? "";

  const currentImageClass =
    productImageClassesByView[slug]?.[selectedImage] ??
    productImageClassesByView[slug]?.[0] ??
    "max-h-[94%] max-w-[94%]";

  function handleOptionChange(label: string, choice: string) {
    setSelectedOptions((prev) => ({
      ...prev,
      [label]: choice,
    }));
  }

  function handleAddToCart() {
    if (!product || !slug) return;

    if (!selectedLogo) {
      alert("Please select a design");
      return;
    }

    const finalOptions: Record<string, string> = {};

    product.options?.forEach((opt) => {
      finalOptions[opt.label] = selectedOptions[opt.label] || opt.choices[0];
    });

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: Date.now(),
      slug,
      product: product.name,
      price: product.price,
      collegeName: customDetails,
      size,
      color,
      quantity,
      image: currentImage,
      logoSlug: selectedLogo,
      logoName: selectedLogoObject?.name || "",
      placement,
      distressed,
      options: finalOptions,
    };

    localStorage.setItem("cart", JSON.stringify([...existingCart, newItem]));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("openMiniCart"));

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-[#4B4B4B] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => window.history.back()}
          className="text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
        >
          Back
        </button>

        <div className="mt-8 grid items-start gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div className="flex gap-4">
            {product.images.length > 1 && (
              <div className="flex flex-col gap-3 pt-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`overflow-hidden rounded-[14px] border bg-white transition ${
                      selectedImage === i
                        ? "border-[#5F7A94]"
                        : "border-[#EEEAE4] hover:border-[#D9D4CE]"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="h-16 w-16 object-contain p-2 sm:h-20 sm:w-20"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="group flex aspect-square w-full items-center justify-center overflow-hidden rounded-[28px] border border-[#EEEAE4] bg-[#FBFAF8] p-4 sm:p-6">
              {currentImage ? (
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="flex h-full w-full cursor-zoom-in items-center justify-center"
                >
                  <img
                    src={currentImage}
                    alt={product.name}
                    className={`${currentImageClass} object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]`}
                  />
                </button>
              ) : (
                <div className="text-sm text-gray-400">No image available</div>
              )}
            </div>
          </div>

          <div className="flex flex-col pt-1">
            <h1 className="text-[34px] font-light leading-tight tracking-[0.02em] text-[#2F2F2F] sm:text-[42px]">
              {product.name}
            </h1>

            <p className="mt-3 text-[19px] text-[#5F7A94]">{product.price}</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <div>
                <label className="text-[12px] uppercase tracking-[0.18em] text-[#8A8178]">
                  Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-[#FBFAF8] px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                >
                  {product.sizes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[12px] uppercase tracking-[0.18em] text-[#8A8178]">
                  Color
                </label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-[#FBFAF8] px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                >
                  {product.colors.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[12px] uppercase tracking-[0.18em] text-[#8A8178]">
                  Placement
                </label>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-[#FBFAF8] px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                >
                  <option>Left Chest</option>
                  <option>Full Front</option>
                  <option>Back</option>
                  <option>Sleeve</option>
                </select>
              </div>
            </div>

            {product.options && product.options.length > 0 && (
              <div className="mt-7 space-y-5">
                {product.options.map((opt) => (
                  <div key={opt.label}>
                    <p className="text-[12px] uppercase tracking-[0.18em] text-[#8A8178]">
                      {opt.label.replace("Tank Style", "Style")}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {opt.choices.map((choice) => {
                        const active =
                          (selectedOptions[opt.label] || opt.choices[0]) === choice;

                        return (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => handleOptionChange(opt.label, choice)}
                            className={`rounded-full border px-5 py-2.5 text-sm transition ${
                              active
                                ? "border-[#2F3A48] bg-[#2F3A48] text-white"
                                : "border-[#DDD6CE] bg-white text-[#4B4B4B] hover:border-[#6F879E]"
                            }`}
                          >
                            {choice}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 rounded-[28px] border border-[#EEEAE4] bg-white p-6">
              <p className="text-[12px] uppercase tracking-[0.18em] text-[#8A8178]">
                Custom Design
              </p>

              <p className="mt-4 text-sm leading-6 text-[#6B625C]">
                Choose a design below, or add a custom request and we’ll help finalize the artwork.
              </p>

              <div className="mt-5">
                <LogoPicker
                  logos={collegeLogos}
                  selectedLogo={selectedLogo}
                  onSelectLogo={setSelectedLogo}
                  defaultGroup="All"
                  distressed={distressed}
                  onDistressedChange={setDistressed}
                />
              </div>

              <div className="mt-6 border-t border-[#EEEAE4] pt-6">
                <label className="text-[12px] uppercase tracking-[0.18em] text-[#8A8178]">
                  Customization Details
                </label>
                <textarea
                  placeholder="School name, mascot, player name, number, special request, etc."
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  rows={3}
                  className="mt-3 w-full resize-none rounded-[18px] border border-[#D8D3CD] bg-[#FBFAF8] px-4 py-3 text-sm outline-none transition placeholder:text-[#A8A29E] focus:border-[#6F879E]"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_2fr]">
              <div>
                <label className="text-[12px] uppercase tracking-[0.18em] text-[#8A8178]">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-[#FBFAF8] px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="self-end rounded-full bg-[#5F7A94] py-3.5 text-[14px] font-medium text-white transition hover:bg-[#536C84]"
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
            </div>

            {added && (
              <div className="mt-4 flex gap-5 text-sm">
                <a
                  href="/cart"
                  className="underline underline-offset-4 transition hover:text-[#6F879E]"
                >
                  View Cart
                </a>
                <a
                  href="/college"
                  className="underline underline-offset-4 transition hover:text-[#6F879E]"
                >
                  Continue Shopping
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {zoomOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute right-6 top-6 text-[12px] uppercase tracking-[0.18em] text-white"
          >
            Close
          </button>

          <img
            src={currentImage}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
