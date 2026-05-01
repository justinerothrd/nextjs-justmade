"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getCollegeProductBySlug } from "@/lib/college-products";
import LogoPicker from "@/app/components/LogoPicker";
import { logos } from "@/app/data/logos";

const placementOptionsBySlug: Record<string, string[]> = {
  "college-crewneck": ["Left Chest", "Full Front", "Back", "Sleeve"],
  "college-hoodie": ["Left Chest", "Full Front", "Back", "Sleeve"],
  "college-tee": ["Full Front", "Left Chest", "Back", "Sleeve"],
  "college-tank": ["Full Front", "Left Chest", "Back"],
  "college-sweatpants": ["Left Leg", "Right Leg", "Hip"],
  "college-sweatshorts": ["Left Leg", "Right Leg", "Hip"],
  "college-bikeshorts": ["Left Leg", "Right Leg", "Hip"],
  "college-sleepwear": ["Left Leg", "Right Leg", "Hip"],
  "college-sleepwear-set": ["Top Front", "Shorts Leg", "Pants Leg"],
  "college-slides": ["Top of Slides"],
  "college-socks": ["Outer Ankle"],
  "college-sweatshirt-tote": ["Front"],
  "college-weekend-duffle": ["Front"],
};

const logoColors = ["Navy", "White", "Light Blue", "Pink", "Green", "Red", "Black"];

function getBlankImage(slug: string, color: string, style?: string) {
  const c = color.toLowerCase();

  const map: Record<string, string> = {
    "heather gray": "grey",
    gray: "grey",
    grey: "grey",
    navy: "navy",
    white: "white",
    black: "black",
    green: "green",
    "light blue": "lightblue",
    red: "red",
  };

  const colorKey = map[c];
  if (!colorKey) return "";

  if (slug === "college-hoodie") return `/blanks/hoodie-${colorKey}.png`;
  if (slug === "college-crewneck") return `/blanks/crewneck-${colorKey}.png`;
  if (slug === "college-tee") return `/blanks/tee-${colorKey}.png`;
  if (slug === "college-tank") return `/blanks/tank-${colorKey}.png`;

  if (slug === "college-sweatpants") {
    const type = style === "Jogger" || style === "Closed Bottom" ? "closed" : "open";
    return `/blanks/sweatpants-${type}-${colorKey}.png`;
  }

  if (slug === "college-sweatshorts") {
    const type = style === "Soffe Shorts" ? "soffee" : "sweatshorts";
    return `/blanks/shorts-${type}-${colorKey}.png`;
  }

  if (slug === "college-bikeshorts") return `/blanks/bikeshort-${colorKey}.png`;

  if (slug === "college-sleepwear") {
    if (style === "Pajama Pants") return "/blanks/sleeppants-blank.png";
    return "/blanks/pajamashorts-blank.png";
  }

  if (slug === "college-sleepwear-set") return "/blanks/sleepset-blank.png";
  if (slug === "college-slides") return "/blanks/slides-blank.png";
  if (slug === "college-socks") return "/blanks/socks-blank.png";
  if (slug === "college-sweatshirt-tote") return "/blanks/tote-grey.png";
  if (slug === "college-weekend-duffle") return "/blanks/duffle-navy.png";

  return "";
}

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const safeSlug = slug || "";

  const product = safeSlug ? getCollegeProductBySlug(safeSlug) : null;

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
  const [imageZoomOpen, setImageZoomOpen] = useState(false);
  const [distressed, setDistressed] = useState(false);

  const collegeLogos = useMemo(
    () => logos.filter((logo) => logo.category === "College"),
    []
  );

  const selectedLogoObject = useMemo(
    () => logos.find((logo) => logo.slug === selectedLogo),
    [selectedLogo]
  );

  const styleOptions = product?.options?.[0]?.choices || [];

  useEffect(() => {
    if (!product) return;

    const placementOptions = placementOptionsBySlug[safeSlug] || ["Full Front"];
    const firstStyle = product.options?.[0]?.choices?.[0] || "";

    setSelectedImage(0);
    setSize(product.sizes?.[0] || "Youth M");
    setColor(product.colors?.[0] || "Heather Gray");
    setPlacement(placementOptions[0]);
    setItemStyle(firstStyle);
    setSelectedLogo("");
    setLogoColor("Navy");
    setDistressed(false);
  }, [product, safeSlug]);

  if (!product) return <div>Product not found</div>;

  const currentImage = product.images?.[selectedImage] || product.images?.[0] || "";
  const displayImage = getBlankImage(safeSlug, color, itemStyle) || currentImage;

  const placementOptions =
    placementOptionsBySlug[safeSlug] || ["Full Front", "Left Chest", "Back"];

  function handleAddToCart() {
    if (!product || !safeSlug) return;

    if (!selectedLogo) {
      alert("Please choose a design or select Use Custom Design before adding to cart.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: Date.now(),
      slug: safeSlug,
      product: product.name,
      price: product.price,
      size,
      color,
      style: itemStyle,
      distressed,
      quantity,
      image: displayImage,
      logoSlug: selectedLogo,
      logoName:
        selectedLogo === "custom-logo"
          ? "Custom Design Request"
          : selectedLogoObject?.name || "",
      logoImage: selectedLogoObject?.image || "",
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
              aria-label={`Zoom ${product.name}`}
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

            <p className="mt-2 text-[18px] text-[#5F7A94]">{product.price}</p>

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
                logos={collegeLogos}
                selectedLogo={selectedLogo}
                onSelectLogo={setSelectedLogo}
                distressed={distressed}
                onDistressedChange={setDistressed}
              />

              <div className="mt-6">
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

              <div className="mt-5">
                <label className="text-[11px] uppercase tracking-[0.16em] text-[#8A8178]">
                  Notes
                </label>

                <textarea
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  rows={3}
                  placeholder="School name, mascot, initials, custom logo request, or special notes"
                  className="mt-2 w-full resize-none rounded-[18px] border border-[#E5E1DB] bg-white px-4 py-3 text-sm leading-6 outline-none placeholder:text-[#A8A29E] transition hover:border-[#CFC9C2] focus:border-[#6F879E]"
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

      {imageZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/70 p-5"
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
