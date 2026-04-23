"use client";

import { useState } from "react";
import { categories } from "@/lib/categories";
import { products } from "@/lib/products";

const previewProductsByCategory = {
  sweatshirts: ["hoodie", "quarter-zip"],
  tees: ["tank-top", "custom-tee"],
  bottoms: ["custom-shorts", "sweatpants"],
  sleepwear: ["sleepwear", "sleepwear-set"],
  accessories: ["accessories-slides", "accessories-socks"],
} as const;

type CategorySlug = keyof typeof previewProductsByCategory;
type ProductSlug = keyof typeof products;

export default function ShopPage() {
  const [previewCategory, setPreviewCategory] = useState<null | {
    slug: string;
    title: string;
    image: string;
  }>(null);

  const previewItems =
    previewCategory &&
    previewProductsByCategory[
      previewCategory.slug as CategorySlug
    ]?.map((slug) => ({
      slug,
      ...products[slug as ProductSlug],
    }));

  return (
    <main className="bg-white text-[#4B4B4B]">
      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 sm:mb-14">
            <h1 className="text-[36px] font-light leading-[1.02] tracking-[-0.02em] text-[#2F2F2F] sm:text-[48px] md:text-[60px]">
              Camp Collection
            </h1>

            <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#6B7280] sm:text-[17px] sm:leading-[1.7]">
              Custom apparel and accessories designed for all things camp.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <div key={category.slug} className="group">
                <div className="relative overflow-hidden rounded-[22px] border border-[#ECE8E2] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:rounded-[26px]">
                  <a href={`/shop/${category.slug}`} className="block">
                    <div className="flex h-[220px] items-center justify-center p-4 sm:h-[280px] sm:p-3">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="max-h-[94%] max-w-[94%] object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                  </a>

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/8">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setPreviewCategory({
                          slug: category.slug,
                          title: category.title,
                          image: category.image,
                        });
                      }}
                      className="pointer-events-auto rounded-full bg-white px-4 py-2 text-sm font-medium text-[#2F3A4A] opacity-0 scale-95 shadow-sm transition duration-300 group-hover:opacity-100 group-hover:scale-100"
                    >
                      Preview
                    </button>
                  </div>
                </div>

                <a href={`/shop/${category.slug}`} className="block">
                  <div className="pt-3 text-center">
                    <h3 className="text-[15px] font-medium tracking-[0.01em] text-[#2F2F2F] sm:text-[17px]">
                      {category.title}
                    </h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {previewCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setPreviewCategory(null)}
        >
          <div
            className="w-full max-w-3xl rounded-[30px] bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.20)] ring-1 ring-black/5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[22px] font-light tracking-[0.01em] text-[#2F2F2F]">
                  {previewCategory.title}
                </h3>
                <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-[#8A93A0]">
                  Featured styles
                </p>
              </div>

              <button
                onClick={() => setPreviewCategory(null)}
                className="text-[12px] uppercase tracking-[0.12em] text-[#8A93A0] hover:text-[#2F2F2F]"
              >
                Close
              </button>
            </div>
{/* PRODUCTS — ELEVATED LAYOUT */}
<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[1.2fr_0.8fr] items-center">

  {/* HERO PRODUCT */}
  {previewItems?.[0] && (
    <div>
      <a href={`/product/${previewItems[0].slug}`} className="block">
        <div className="flex h-[320px] items-center justify-center">
          <img
            src={previewItems[0].images[0]}
            alt={previewItems[0].name}
            className="max-h-full max-w-full object-contain scale-[1.15]"
          />
        </div>
      </a>

      <div className="mt-4 text-left">
        <h4 className="text-[18px] font-medium text-[#2F2F2F]">
          {previewItems[0].name}
        </h4>
        <p className="mt-1 text-[14px] text-[#6B7280]">
          {previewItems[0].price}
        </p>
      </div>

      <a
        href={`/product/${previewItems[0].slug}`}
        className="mt-3 inline-flex items-center justify-center rounded-full border border-[#D8E0E8] bg-white px-5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#6B7C8F] transition hover:bg-[#F7FAFC]"
      >
        View Product
      </a>
    </div>
  )}

  {/* SECONDARY PRODUCT */}
  {previewItems?.[1] && (
    <div className="flex flex-col items-center">
      <a href={`/product/${previewItems[1].slug}`} className="block">
        <div className="flex h-[200px] items-center justify-center opacity-90">
          <img
            src={previewItems[1].images[0]}
            alt={previewItems[1].name}
            className="max-h-full max-w-full object-contain scale-[1.05]"
          />
        </div>
      </a>

      <div className="mt-3 text-center">
        <h4 className="text-[15px] font-medium text-[#2F2F2F]">
          {previewItems[1].name}
        </h4>
        <p className="mt-1 text-[13px] text-[#6B7280]">
          {previewItems[1].price}
        </p>
      </div>

      <a
        href={`/product/${previewItems[1].slug}`}
        className="mt-2 inline-flex items-center justify-center rounded-full border border-[#E2E8F0] bg-white px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B7C8F] transition hover:bg-[#F7FAFC]"
      >
        View
      </a>
    </div>
  )}
</div>
    

            <a
              href={`/shop/${previewCategory.slug}`}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#5F7A94] px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#4e677f]"
            >
              View Collection
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
