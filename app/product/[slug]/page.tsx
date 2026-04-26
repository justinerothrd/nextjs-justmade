"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getProductBySlug } from "@/lib/products";
import LogoPicker from "@/app/components/LogoPicker";
import { logos } from "@/app/data/logos";

const logoColorMap: Record<string, string> = {
  Navy: "#1F2A44",
  White: "#FFFFFF",
  "Light Blue": "#9DB7D4",
  Pink: "#F4A7B9",
  Green: "#3F6F4F",
  Red: "#B23A3A",
  Black: "#111111",
};

const productImageClassesByView: Record<string, string[]> = {
  hoodie: ["max-h-[94%] max-w-[94%]", "max-h-[88%] max-w-[88%]", "max-h-[90%] max-w-[90%]", "max-h-[92%] max-w-[92%]"],
  "quarter-zip": ["max-h-[94%] max-w-[94%]", "max-h-[88%] max-w-[88%]"],
  "tank-top": ["max-h-[88%] max-w-[88%]", "max-h-[88%] max-w-[88%]", "max-h-[88%] max-w-[88%]"],
  "custom-tee": ["max-h-[88%] max-w-[88%]", "max-h-[96%] max-w-[96%]", "max-h-[88%] max-w-[88%]", "max-h-[90%] max-w-[90%]"],
  "custom-shorts": ["max-h-[90%] max-w-[90%]"],
  sweatpants: ["max-h-[96%] max-w-[96%]"],
  sleepwear: ["max-h-[100%] max-w-[100%]"],
  "sleepwear-set": ["max-h-[96%] max-w-[96%]", "max-h-[96%] max-w-[96%]"],
  "accessories-slides": ["max-h-[86%] max-w-[86%]"],
  "accessories-socks": ["max-h-[92%] max-w-[92%]"],
};

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const product = slug ? getProductBySlug(slug) : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [customDetails, setCustomDetails] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");
  const [logoColor, setLogoColor] = useState("Navy");
  const [placement, setPlacement] = useState("Left Chest");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState("Youth M");
  const [color, setColor] = useState("Heather Gray");
  const [zoomOpen, setZoomOpen] = useState(false);

  const campLogos = useMemo(
    () => logos.filter((logo) => logo.category === "Camp"),
    []
  );

  const selectedLogoObject = useMemo(
    () => logos.find((logo) => logo.slug === selectedLogo),
    [selectedLogo]
  );

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSize(product.sizes?.[1] ?? product.sizes?.[0] ?? "Youth M");
      setColor(product.colors?.[0] ?? "Heather Gray");
      setSelectedLogo("");
      setLogoColor("Navy");
      setZoomOpen(false);
    }
  }, [product]);

  useEffect(() => {
    if (customDetails.trim().length > 3 && !selectedLogo) {
      setSelectedLogo("custom-logo");
    }
  }, [customDetails, selectedLogo]);

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

  const showLogoOverlay = Boolean(hasLogoOverlay);

const overlayImage = hasLogoOverlay
  ? product.blankImages?.[color]
  : currentImage;

  const currentImageClass =
    productImageClassesByView[slug]?.[selectedImage] ??
    productImageClassesByView[slug]?.[0] ??
    "max-h-[94%] max-w-[94%]";

  const showLogoOverlay =
    selectedLogoObject &&
    selectedLogoObject.slug !== "custom-logo" &&
    product.blankImages?.[color];

  function handleAddToCart() {
    if (!product || !slug) return;

    if (!selectedLogo && !customDetails.trim()) {
      alert("Please select a design or add custom details.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: Date.now(),
      slug,
      product: product.name,
      price: product.price,
      campName: customDetails,
      size,
      color,
      quantity,
      image: overlayImage,
      logoSlug: selectedLogo || "custom-logo",
      logoName: selectedLogoObject?.name || (customDetails.trim() ? "Custom Logo" : ""),
      logoColor,
      placement,
    };

    localStorage.setItem("cart", JSON.stringify([...existingCart, newItem]));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("openMiniCart"));

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function LogoOverlay() {
  if (!showLogoOverlay || !selectedLogoObject) return null;

  const overlayPositionBySlug: Record<string, string> = {
    hoodie: "top-[31%] left-1/2 -translate-x-1/2",
    "quarter-zip": "top-[30%] left-1/2 -translate-x-1/2",
    "tank-top": "top-[28%] left-1/2 -translate-x-1/2",
    "custom-tee": "top-[30%] left-1/2 -translate-x-1/2",
  };

  const overlaySizeBySlug: Record<string, string> = {
    hoodie: "h-[22%] w-[30%]",
    "quarter-zip": "h-[20%] w-[28%]",
    "tank-top": "h-[18%] w-[30%]",
    "custom-tee": "h-[20%] w-[32%]",
  };

  return (
    <div
      className={`pointer-events-none absolute ${
        overlayPositionBySlug[slug] || "top-[30%] left-1/2 -translate-x-1/2"
      }`}
    >
      <div
        className={overlaySizeBySlug[slug] || "h-[20%] w-[30%]"}
        style={{
          backgroundColor: logoColorMap[logoColor] || "#1F2A44",
          WebkitMaskImage: `url(${selectedLogoObject.image})`,
          maskImage: `url(${selectedLogoObject.image})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </div>
  );
}

    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[38%] w-[38%]"
          style={{
            backgroundColor: logoColorMap[logoColor] || "#1F2A44",
            WebkitMaskImage: `url(${selectedLogoObject.image})`,
            maskImage: `url(${selectedLogoObject.image})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-[#4B4B4B] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => window.history.back()}
          className="text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
        >
          Back
        </button>

        <div className="mt-8 grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <div className="flex gap-4">
            {product.images.length > 1 && (
              <div className="flex flex-col gap-3 pt-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`overflow-hidden rounded-[14px] border bg-white transition ${
                      selectedImage === i
                        ? "border-[#6F879E]"
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

            <div className="group flex aspect-square w-full items-center justify-center overflow-hidden rounded-[28px] border border-[#F0ECE6] bg-[#FBFAF8] p-4 sm:p-6">
              {overlayImage ? (
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="relative flex h-full w-full cursor-zoom-in items-center justify-center"
                >
                  <img
                    src={overlayImage}
                    alt={product.name}
                    className={`${currentImageClass} object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]`}
                  />

                  <LogoOverlay />
                </button>
              ) : (
                <div className="text-sm text-gray-400">No image available</div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-[30px] font-light leading-tight text-[#2F2F2F] sm:text-[36px]">
              {product.name}
            </h1>

            <p className="mt-2 text-[18px] text-[#5F7A94]">{product.price}</p>

            {product.description && (
              <p className="mt-5 max-w-md text-[14px] leading-6 text-[#6B7280]">
                {product.description}
              </p>
            )}

            <div className="mt-7 space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
                    Size
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                  >
                    {product.sizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
                    Clothing Color
                  </label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                  >
                    {product.colors.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#EEEAE4] bg-white p-5">
                <LogoPicker
                  logos={campLogos}
                  selectedLogo={selectedLogo}
                  onSelectLogo={setSelectedLogo}
                />

                <div className="mt-5">
                  <label className="text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
                    Logo Color
                  </label>

                  <select
                    value={logoColor}
                    onChange={(e) => setLogoColor(e.target.value)}
                    className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                  >
                    <option>Navy</option>
                    <option>White</option>
                    <option>Light Blue</option>
                    <option>Pink</option>
                    <option>Green</option>
                    <option>Red</option>
                    <option>Black</option>
                    <option>Custom / Add in details</option>
                  </select>
                </div>

                {selectedLogoObject && selectedLogoObject.slug !== "custom-logo" && (
                  <div className="mt-4 rounded-[18px] border border-[#EEEAE4] bg-[#FBFAF8] p-4">
                    <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-[#6B7280]">
                      Logo Preview
                    </p>

                    <div className="flex items-center gap-4">
                      <div
                        className="h-20 w-20 bg-center bg-contain bg-no-repeat"
                        style={{
                          backgroundColor: logoColorMap[logoColor] || "#1F2A44",
                          WebkitMaskImage: `url(${selectedLogoObject.image})`,
                          maskImage: `url(${selectedLogoObject.image})`,
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          maskPosition: "center",
                          WebkitMaskSize: "contain",
                          maskSize: "contain",
                        }}
                      />

                      <div>
                        <p className="text-sm text-[#2F2F2F]">
                          {selectedLogoObject.name}
                        </p>
                        <p className="text-xs text-[#8A8178]">
                          Logo color: {logoColor}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 rounded-[20px] border border-[#EEEAE4] bg-[#FBFAF8] p-4">
                  <label className="text-[11px] uppercase tracking-[0.14em] text-[#6B7280]">
                    Custom Details (optional)
                  </label>

                  <textarea
                    placeholder="Add camp, initials, custom logo request, or special notes"
                    value={customDetails}
                    onChange={(e) => setCustomDetails(e.target.value)}
                    rows={2}
                    className="mt-2 w-full resize-none rounded-[14px] border border-[#D8D3CD] bg-white px-3 py-2 text-sm outline-none transition placeholder:text-[#A8A29E] focus:border-[#6F879E]"
                  />
                </div>

                <p className="mt-4 text-sm text-[#8A8178]">
                  Don’t see your camp or logo? Add it in the custom details box.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
                    Placement
                  </label>
                  <select
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value)}
                    className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                  >
                    <option>Left Chest</option>
                    <option>Full Front</option>
                    <option>Back</option>
                    <option>Sleeve</option>
                  </select>
                </div>

                <div>
                  <label className="text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="mt-2 w-full rounded-full border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#6F879E]"
                  />
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-2 w-full rounded-full bg-[#5F7A94] py-3.5 text-[14px] font-medium text-white transition hover:bg-[#536C84]"
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>

              {added && (
                <div className="flex gap-5 text-sm">
                  <a href="/cart" className="underline underline-offset-4 transition hover:text-[#6F879E]">
                    View Cart
                  </a>
                  <a href="/shop" className="underline underline-offset-4 transition hover:text-[#6F879E]">
                    Continue Shopping
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {zoomOpen && overlayImage && (
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

          <div
            className="relative flex h-[90vh] w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={overlayImage}
              alt={product.name}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            {showLogoOverlay && selectedLogoObject && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div
                  className="h-[38%] w-[38%]"
                  style={{
                    backgroundColor: logoColorMap[logoColor] || "#1F2A44",
                    WebkitMaskImage: `url(${selectedLogoObject.image})`,
                    maskImage: `url(${selectedLogoObject.image})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
