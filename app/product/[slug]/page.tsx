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
  "sleepwear-set": ["Top Front", "Shorts Leg"],
  "accessories-slides": ["Top of Slides"],
  "accessories-socks": ["Outer Ankle"],
};

const styleOptionsBySlug: Record<string, string[]> = {
  "custom-tee": ["Crewneck", "Cropped", "V-Neck"],
  "tank-top": ["Ribbed Reg", "Ribbed Crop", "Scoop Neck", "Malibu Sugar"],
  "sweatpants": ["Open Bottom", "Closed Bottom"],
};

const logoColors = ["Navy", "White", "Light Blue", "Pink", "Green", "Red", "Black"];
function getBlankImage(slug: string, color: string, style?: string) {
  const c = color.toLowerCase();

  if (slug === "sweatpants") {
    if (c.includes("gray")) {
      return style === "Closed Bottom"
        ? "/blanks/grey-closed-sweatpants.png"
        : "/blanks/sweatpantsgrey-open.png";
    }

    if (c.includes("navy")) {
      return style === "Closed Bottom"
        ? "/blanks/sweatpantsnavy-closed.png"
        : "/blanks/sweatpants-open-navy.png";
    }

    if (c.includes("white")) {
      return "/blanks/sweatpantswhite-closed.png";
    }
  }

  // fallback for everything else (your existing logic)
  const map: any = {
    hoodie: "hoodie",
    "quarter-zip": "quarterzip",
    "crew-neck": "crewneck",
    "tank-top": "tank",
    "custom-tee": "tee",
    "custom-shorts": "bikeshort",
  };

  const colorMap: any = {
    "heather gray": "grey",
    gray: "grey",
    navy: "navy",
    white: "white",
    black: "black",
    green: "green",
    "light blue": "lightblue",
    red: "red",
  };

  const p = map[slug];
  const col = colorMap[c];

  if (!p || !col) return "";

  return `/blanks/${p}-${col}.png`;
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
  const [itemStyle, setItemStyle] = useState("");
  const [size, setSize] = useState("Youth M");
  const [color, setColor] = useState("Heather Gray");
  const [customDetails, setCustomDetails] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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
    const styleOptions = styleOptionsBySlug[safeSlug] || [];

    setSelectedImage(0);
    setSize(product.sizes?.[0] || "Youth M");
    setColor(product.colors?.[0] || "Heather Gray");
    setPlacement(placementOptions[0]);
    setItemStyle(styleOptions[0] || "");
    setSelectedLogo("");
    setLogoColor("Navy");
  }, [product, safeSlug]);

  if (!product) return <div>Product not found</div>;

  const currentImage =
    product.images?.[selectedImage] || product.images?.[0] || "";

  const placementOptions =
    placementOptionsBySlug[safeSlug] || ["Full Front", "Left Chest", "Back"];

  const styleOptions = styleOptionsBySlug[safeSlug] || [];

  function handleAddToCart() {
    if (!product || !safeSlug) return;

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
  id: Date.now(),
  slug: safeSlug,
  product: product.name,
  price: product.price,
  size,
  color,
  style: itemStyle,
  quantity,
  image: getBlankImage(safeSlug, color, itemStyle) || currentImage,

  logoSlug: selectedLogo,
  logoName: selectedLogoObject?.name || "",
  logoImage: selectedLogoObject?.image || "",   // 👈 ADD THIS LINE

  logoColor,
  placement,
  customDetails,
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
            {product.images.length > 1 && (
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

            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[28px] border border-[#F0ECE6] bg-[#FBFAF8] p-4 sm:p-6">
              <img
                src={currentImage}
                alt={product.name}
                className="max-h-[94%] max-w-[94%] object-contain transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>

          <div>
            <h1 className="text-[30px] font-light leading-tight text-[#2F2F2F] sm:text-[36px]">
              {product.name}
            </h1>

            <p className="mt-2 text-[18px] text-[#5F7A94]">{product.price}</p>

            {product.description && (
              <p className="mt-5 max-w-md text-[14px] leading-6 text-[#6B7280]">
                {product.description}
              </p>
            )}

            <div className="mt-7 grid gap-5 sm:grid-cols-3">
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

              <div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-[#8A8178]">
                  Placement
                </p>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className={selectClass}
                >
                  {placementOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {styleOptions.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#8A8178]">
                  Style
                </p>

                <div className="flex flex-wrap gap-2">
                  {styleOptions.map((option) => {
                    const active = itemStyle === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setItemStyle(option)}
                        className={`rounded-full px-4 py-2 text-[13px] transition ${
                          active
                            ? "bg-[#2F3A4A] text-white"
                            : "border border-[#E5E1DB] bg-white text-[#2F2F2F] hover:border-[#CFC9C2]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 rounded-[30px] border border-[#ECE7E1] bg-[#FBFAF8] p-5 sm:p-6">
  <div className="mb-5">
    <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A8178]">
      Custom Design
    </p>
    <p className="mt-2 text-sm leading-6 text-[#6B6762]">
      Choose a design below, or add a custom request and we’ll help finalize the artwork.
    </p>
  </div>

  <LogoPicker
    logos={campLogos}
    selectedLogo={selectedLogo}
    onSelectLogo={setSelectedLogo}
  />

  <div className="mt-6 grid gap-5 sm:grid-cols-2">
    <div>
      <label className="text-[11px] uppercase tracking-[0.16em] text-[#8A8178]">
        Logo Color
      </label>

      <select
        value={logoColor}
        onChange={(e) => setLogoColor(e.target.value)}
        className="mt-2 w-full rounded-full border border-[#E5E1DB] bg-white px-4 py-3 text-sm outline-none transition hover:border-[#CFC9C2] focus:border-[#6F879E]"
      >
        {logoColors.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>

    <div>
      <label className="text-[11px] uppercase tracking-[0.16em] text-[#8A8178]">
        Notes
      </label>

      <input
        value={customDetails}
        onChange={(e) => setCustomDetails(e.target.value)}
        placeholder="Camp name, initials, special request"
        className="mt-2 w-full rounded-full border border-[#E5E1DB] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#A8A29E] transition hover:border-[#CFC9C2] focus:border-[#6F879E]"
      />
    </div>
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
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
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
    </main>
  );
}
