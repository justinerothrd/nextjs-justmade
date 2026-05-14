```tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getCollegeProductBySlug } from "@/lib/college-products";
import LogoPicker from "@/app/components/LogoPicker";
import { logos } from "@/app/data/logos";

const logoColors = [
  "Navy",
  "White",
  "Light Blue",
  "Pink",
  "Green",
  "Red",
  "Black",
];

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const product = slug
    ? getCollegeProductBySlug(slug)
    : null;

  const [selectedImage, setSelectedImage] = useState(0);

  const [customDetails, setCustomDetails] = useState("");

  const [selectedLogo, setSelectedLogo] = useState("");

  const [selectedSchool, setSelectedSchool] = useState("");

  const [placement, setPlacement] =
    useState("Left Chest");

  const [quantity, setQuantity] = useState(1);

  const [added, setAdded] = useState(false);

  const [size, setSize] = useState("Youth M");

  const [color, setColor] =
    useState("Heather Gray");

  const [distressed, setDistressed] =
    useState(false);

  const [logoColor, setLogoColor] =
    useState("Navy");

  const [selectedOptions, setSelectedOptions] =
    useState<Record<string, string>>({});

  const collegeLogos = useMemo(() => {
    return logos.filter(
      (logo) => logo.category === "College"
    );
  }, []);

  const selectedLogoObject = useMemo(() => {
    return logos.find(
      (logo) => logo.slug === selectedLogo
    );
  }, [selectedLogo]);

  useEffect(() => {
    if (product) {
      setSelectedImage(0);

      setSize(
        product.sizes?.[1] ??
          product.sizes?.[0] ??
          "Youth M"
      );

      setColor(
        product.colors?.[0] ?? "Heather Gray"
      );

      setSelectedLogo("");

      setSelectedSchool("");

      setSelectedOptions({});

      setDistressed(false);
    }
  }, [product]);

  if (!slug || !product) {
    return (
      <main className="min-h-screen bg-white px-6 py-16 text-[#4B4B4B]">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-light">
            Product not found
          </h1>

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
    product.images?.[selectedImage] ??
    product.images?.[0] ??
    "";

  const schoolForCart =
    selectedSchool &&
    selectedSchool !== "All" &&
    selectedSchool !== "Other"
      ? selectedSchool
      : customDetails.trim();

  function handleAddToCart() {
    if (!product || !slug) return;

    if (!schoolForCart) {
      alert(
        "Please choose a school or enter the school name."
      );
      return;
    }

    if (!selectedLogo) {
      alert("Please select a design");
      return;
    }

    const existingCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const newItem = {
      id: Date.now(),

      slug,

      product: product.name,

      style: selectedOptions.style || "",

      fit: selectedOptions.fit || "",

      length: selectedOptions.length || "",

      neckline:
        selectedOptions.neckline || "",

      price: product.price,

      college: schoolForCart,

      collegeName: schoolForCart,

      customDetails:
        customDetails.trim(),

      distressed,

      logoImage:
        selectedLogoObject?.image || "",

      logoColor,

      size,

      color,

      quantity,

      image: currentImage,

      logoSlug: selectedLogo,

      logoName:
        selectedLogo === "custom-logo"
          ? "Custom Design Request"
          : selectedLogoObject?.name || "",

      placement,
    };

    localStorage.setItem(
      "cart",
      JSON.stringify([
        ...existingCart,
        newItem,
      ])
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    window.dispatchEvent(
      new Event("openMiniCart")
    );

    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
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
                {product.images.map(
                  (img, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setSelectedImage(i)
                      }
                      className={`overflow-hidden rounded-[14px] border bg-white ${
                        selectedImage === i
                          ? "border-[#6F879E]"
                          : "border-[#EEEAE4]"
                      }`}
                    >
                      <img
                        src={img}
                        className="h-16 w-16 object-contain p-2"
                      />
                    </button>
                  )
                )}
              </div>
            )}

            <div className="flex aspect-square w-full items-center justify-center rounded-[28px] border bg-[#FBFAF8] p-6">
              <img
                src={currentImage}
                className="max-h-[94%] max-w-[94%] object-contain"
              />
            </div>
          </div>

          <div>
            <h1 className="text-[32px] font-light text-[#2F2F2F]">
              {product.name}
            </h1>

            <p className="mt-2 text-[18px] text-[#5F7A94]">
              {product.price}
            </p>

            <div className="mt-8 rounded-[30px] border border-[#ECE7E1] bg-[#FBFAF8] p-5 sm:p-6">
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A8178]">
                  Product Options
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] uppercase text-[#8A8178]">
                    Size
                  </p>

                  <select
                    value={size}
                    onChange={(e) =>
                      setSize(e.target.value)
                    }
                    className="mt-2 w-full rounded-full border px-4 py-3"
                  >
                    {product.sizes.map((s) => (
                      <option key={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-[11px] uppercase text-[#8A8178]">
                    Color
                  </p>

                  <select
                    value={color}
                    onChange={(e) =>
                      setColor(e.target.value)
                    }
                    className="mt-2 w-full rounded-full border px-4 py-3"
                  >
                    {product.colors.map((c) => (
                      <option key={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {product.options?.map(
                (option) => (
                  <div
                    key={option.label}
                    className="mt-6"
                  >
                    <p className="text-[11px] uppercase text-[#8A8178]">
                      {option.label}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {option.choices.map(
                        (choice) => {
                          const active =
                            selectedOptions[
                              option.label
                            ] === choice;

                          return (
                            <button
                              key={choice}
                              onClick={() =>
                                setSelectedOptions({
                                  ...selectedOptions,
                                  [option.label]:
                                    choice,
                                })
                              }
                              className={`rounded-full px-4 py-2 text-sm ${
                                active
                                  ? "bg-[#2F3A4A] text-white"
                                  : "border bg-white"
                              }`}
                            >
                              {choice}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-8 rounded-[30px] border bg-[#FBFAF8] p-6">
              <p className="text-[11px] uppercase text-[#8A8178]">
                Design
              </p>

              <LogoPicker
                logos={collegeLogos}
                selectedLogo={selectedLogo}
                onSelectLogo={setSelectedLogo}
                distressed={distressed}
                onDistressedChange={
                  setDistressed
                }
                onSelectGroup={
                  setSelectedSchool
                }
              />

              <div className="mt-6">
                <label className="text-[11px] uppercase tracking-[0.16em] text-[#8A8178]">
                  Logo Color
                </label>

                <select
                  value={logoColor}
                  onChange={(e) =>
                    setLogoColor(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-full border border-[#E5E1DB] bg-white px-4 py-3 text-sm"
                >
                  {logoColors.map((c) => (
                    <option key={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <label className="text-[11px] uppercase tracking-[0.16em] text-[#8A8178]">
                  Placement
                </label>

                <select
                  value={placement}
                  onChange={(e) =>
                    setPlacement(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-full border border-[#E5E1DB] bg-white px-4 py-3 text-sm"
                >
                  <option>
                    Left Chest
                  </option>

                  <option>
                    Full Front
                  </option>

                  <option>Back</option>

                  <option>
                    Sleeve
                  </option>
                </select>
              </div>

              <textarea
                placeholder="School name, mascot, notes..."
                value={customDetails}
                onChange={(e) =>
                  setCustomDetails(
                    e.target.value
                  )
                }
                className="mt-4 w-full rounded-[18px] border px-4 py-3"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-6 w-full rounded-full bg-[#5F7A94] py-3 text-white"
            >
              {added
                ? "Added ✓"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
```
