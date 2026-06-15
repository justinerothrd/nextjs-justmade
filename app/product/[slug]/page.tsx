"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getProductBySlug } from "@/lib/products";
import LogoPicker from "@/app/components/LogoPicker";
import { logos } from "@/app/data/logos";

const placementOptionsBySlug: Record<string, string[]> = {
  hoodie: ["Left Chest", "Full Front", "Back", "Sleeve"],
  crewneck: ["Left Chest", "Full Front", "Back", "Sleeve"],
  "quarter-zip": ["Left Chest", "Full Front", "Back", "Sleeve"],
  "tank-top": ["Full Front", "Left Chest", "Back"],
  "custom-tee": ["Full Front", "Left Chest", "Back", "Sleeve"],
  sweatpants: ["Left Leg", "Right Leg", "Hip"],
  "custom-shorts": ["Left Leg", "Right Leg", "Hip"],
  sleepwear: ["Left Leg", "Right Leg", "Hip"],
  sleeppants: ["Left Leg", "Right Leg", "Hip"],
  "sleepwear-set": ["Top Front", "Shorts Leg"],
  "accessories-slides": ["Top of Slides"],
  "accessories-socks": ["Outer Ankle"],
  "weekend-duffle": ["Front"],
  "sweatshirt-tote": ["Front"],
};

const productOptionsBySlug = {
  "tank-top": {
    type: ["Basic Tank", "Ribbed Tank"],
    style: ["Camisole", "Wide Strap"],
    length: ["Regular", "Cropped"],
  },

  "custom-tee": {
    neckline: ["Crewneck", "V-Neck"],
    fit: ["Fitted", "Relaxed"],
    length: ["Regular", "Cropped"],
  },

  sweatpants: {
    style: ["Open Bottom", "Closed Bottom"],
  },

  "custom-shorts": {
    style: ["Bike Shorts", "Soffee Shorts"],
  },

  "weekend-duffle": {
    sizeOption: ["Small", "Large"],
  },
};

const logoColors = [
  "Navy",
  "White",
  "Light Blue",
  "Pink",
  "Green",
  "Red",
  "Black",
];

function getBlankImage(slug: string, color: string) {
  const colorKey = color?.toLowerCase().replace(/\s+/g, "-");

  if (!colorKey) return "";

  const colorMap: Record<string, string> = {
    "heather-gray": "grey",
    gray: "grey",
    grey: "grey",
    "light-blue": "lightblue",
  };

  const normalizedColor = colorMap[colorKey] || colorKey;

  if (slug === "hoodie") return `/blanks/hoodie-${normalizedColor}.png`;
  if (slug === "quarter-zip") return `/blanks/quarterzip-${normalizedColor}.png`;
  if (slug === "tank-top") return `/blanks/tank-${normalizedColor}.png`;
  if (slug === "custom-tee") return `/blanks/tee-${normalizedColor}.png`;
  if (slug === "custom-shorts") return `/blanks/shorts-${normalizedColor}.png`;
  if (slug === "sleepwear") return `/blanks/pajama-${normalizedColor}.png`;
  if (slug === "sleepwear-set") return `/blanks/pajamaset-${normalizedColor}.png`;

  return "";
}

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const safeSlug = slug || "";

  const product = safeSlug ? getProductBySlug(safeSlug) : null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedLogo, setSelectedLogo] = useState("");
  const [logoColor, setLogoColor] = useState("Navy");
  const [placement, setPlacement] = useState("");
  const [size, setSize] = useState("Youth M");
  const [color, setColor] = useState("Heather Gray");
  const [customDetails, setCustomDetails] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageZoomOpen, setImageZoomOpen] = useState(false);
  const [distressed, setDistressed] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState("Tyler Hill");

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const campLogos = useMemo(
    () => logos.filter((logo) => logo.category === "Camp"),
    []
  );

  const selectedLogoObject = useMemo(
    () => logos.find((logo) => logo.slug === selectedLogo),
    [selectedLogo]
  );

  useEffect(() => {
    if (!product) return;

    const placementOptions = placementOptionsBySlug[safeSlug] || ["Full Front"];

    setSelectedImage(0);

    setSize(
      safeSlug === "accessories-slides"
        ? "Youth 1"
        : safeSlug === "accessories-socks"
        ? "Youth S/M"
        : product.sizes?.[0] || "Youth M"
    );

    setColor(product.colors?.[0] || "Heather Gray");
    setPlacement(placementOptions[0]);

    setSelectedOptions({});
    setSelectedLogo("");
    setLogoColor("Navy");
    setSelectedCamp("Tyler Hill");
    setDistressed(false);
  }, [product, safeSlug]);

  if (!product) return <div>Product not found</div>;

  const currentImage =
    product.images?.[selectedImage] || product.images?.[0] || "";

  const blankImage = getBlankImage(safeSlug, color);

  // Main website preview should show the styled/mockup product image.
  const displayImage = currentImage;

  // Cart/order confirmation should use the clean blank PNG.
  const cartImage = blankImage || currentImage;

  const placementOptions =
    placementOptionsBySlug[safeSlug] || ["Full Front", "Left Chest", "Back"];

  const productOptions =
    productOptionsBySlug[safeSlug as keyof typeof productOptionsBySlug] || {};

  function handleAddToCart() {
    if (!product || !safeSlug) return;

    if (!selectedCamp || selectedCamp === "All") {
      alert("Please choose a camp before adding to cart.");
      return;
    }

    if (!selectedLogo) {
      alert("Please choose a design before adding to cart.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: Date.now(),
      slug: safeSlug,

      product: product.name,

      type: selectedOptions.type || "",
      style: selectedOptions.style || "",
      fit: selectedOptions.fit || "",
      length: selectedOptions.length || "",
      neckline: selectedOptions.neckline || "",
      sizeOption: selectedOptions.sizeOption || "",

      price: product.price,
      size,
      color,
      quantity,

      image: cartImage,

      logoSlug: selectedLogo,

      logoName:
        selectedLogo === "custom-logo"
          ? "Custom Design Request"
          : selectedLogoObject?.name || "",

      logoImage: selectedLogoObject?.image || "",
      logoColor,

      placement,

      distressed,

      campName: selectedCamp,

      customDetails: customDetails.trim(),
    };

    localStorage.setItem("cart", JSON.stringify([...existingCart, newItem]));

    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("openMiniCart"));

    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
  }

  const selectClass =
    "w-full rounded-full border border-[#E5E1DB] bg-[#FAF9F7] px-4 py-3 text-sm outline-none transition hover:border-[#CFC9C2] focus:border-[#6F879E]";

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-[#4B4B4B] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
        >
          Back
        </button>

        <div className="mt-8 grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <div className="flex gap-4">
            {product.images?.length > 1 && (
              <div className="flex flex-col gap-3 pt-1">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
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

            <button
              type="button"
              onClick={() => setImageZoomOpen(true)}
              className="group flex aspect-square w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-[28px] border border-[#F0ECE6] bg-[#FBFAF8] p-4 sm:p-6"
            >
              <img
                src={displayImage}
                alt={product.name}
                className="max-h-[94%] max-w-[94%] object-contain transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </button>
          </div>

          <div>
            <h1 className="text-[30px] font-light leading-tight text-[#2F2F2F] sm:text-[36px]">
              {product.name}
            </h1>

            <p className="mt-2 text-[18px] text-[#5F7A94]">
              ${product.price}
            </p>

            <div className="mt-8 rounded-[30px] border border-[#ECE7E1] bg-[#FBFAF8] p-5 sm:p-6">
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A8178]">
                  Product Options
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-[#8A8178]">
                    Size
                  </p>

                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className={selectClass}
                  >
                    {product.sizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-[#8A8178]">
                    Color
                  </p>

                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className={selectClass}
                  >
                    {product.colors.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {Object.entries(productOptions).map(([label, choices]) => (
                <div key={label} className="mt-6">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#8A8178]">
                    {label}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(choices as string[]).map((choice) => {
                      const active = selectedOptions[label] === choice;

                      return (
                        <button
                          key={choice}
                          type="button"
                          onClick={() =>
                            setSelectedOptions({
                              ...selectedOptions,
                              [label]: choice,
                            })
                          }
                          className={`rounded-full px-4 py-2 text-[13px] transition ${
                            active
                              ? "bg-[#2F3A4A] text-white"
                              : "border border-[#E5E1DB] bg-white text-[#2F2F2F]"
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

            <div className="mt-8 rounded-[30px] border border-[#ECE7E1] bg-[#FBFAF8] p-5 sm:p-6">
              <div className="mb-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A8178]">
                  Design
                </p>

                <p className="mt-2 text-sm leading-6 text-[#6B6762]">
                  Choose a camp and design below.
                </p>
              </div>

              <LogoPicker
                logos={campLogos}
                selectedLogo={selectedLogo}
                onSelectLogo={setSelectedLogo}
                distressed={distressed}
                onDistressedChange={setDistressed}
                onSelectGroup={setSelectedCamp}
              />

              <div className="mt-6">
                <label className="text-[11px] uppercase tracking-[0.16em] text-[#8A8178]">
                  Logo Color
                </label>

                <select
                  value={logoColor}
                  onChange={(e) => setLogoColor(e.target.value)}
                  className="mt-2 w-full rounded-full border border-[#E5E1DB] bg-white px-4 py-3 text-sm outline-none"
                >
                  {logoColors.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <label className="text-[11px] uppercase tracking-[0.16em] text-[#8A8178]">
                  Placement
                </label>

                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className="mt-2 w-full rounded-full border border-[#E5E1DB] bg-white px-4 py-3 text-sm outline-none"
                >
                  {placementOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label className="text-[11px] uppercase tracking-[0.16em] text-[#8A8178]">
                  Notes
                </label>

                <textarea
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  rows={3}
                  placeholder="Initials, custom requests, notes..."
                  className="mt-2 w-full resize-none rounded-[18px] border border-[#E5E1DB] bg-white px-4 py-3 text-sm leading-6 outline-none"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className={`${selectClass} mt-2`}
              />
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-5 w-full rounded-full bg-[#5F7A94] py-3.5 text-sm font-medium text-white transition hover:bg-[#536C84]"
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {imageZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5"
          onClick={() => setImageZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setImageZoomOpen(false)}
            className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm text-[#2F2F2F]"
          >
            Close
          </button>

          <img
            src={displayImage}
            alt={product.name}
            className="max-h-[88vh] max-w-[92vw] object-contain"
          />
        </div>
      )}
    </main>
  );
}
