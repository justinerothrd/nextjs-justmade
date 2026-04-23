"use client";

import { useState } from "react";
import { collegeProducts } from "@/lib/college-products";

const categories = [
  {
    slug: "sweatshirts",
    title: "Sweatshirts",
    image: collegeProducts["college-crewneck"].images[0],
  },
  {
    slug: "tees",
    title: "Tees & Tanks",
    image: collegeProducts["college-tee"].images[0],
  },
  {
    slug: "bottoms",
    title: "Bottoms",
    image: collegeProducts["college-shorts"].images[0],
  },
  {
    slug: "sleepwear",
    title: "Sleep & Loungewear",
    image: collegeProducts["college-sleepwear"].images[0],
  },
  {
    slug: "accessories",
    title: "Accessories & Gifts",
    image: collegeProducts["college-slides"].images[0],
  },
];

const categoryProducts: Record<string, string[]> = {
  sweatshirts: ["college-crewneck", "college-hoodie"],
  tees: ["college-tee", "college-tank"],
  bottoms: ["college-shorts", "ucla-sweatpants"], 
  sleepwear: ["college-sleepwear", "college-sleep-set"],
  accessories: ["college-slides", "college-socks"],
};

export default function CollegePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const previewItems = activeCategory
    ? categoryProducts[activeCategory]?.map(
        (slug) => collegeProducts[slug]
      )
    : [];

  return (
    <main className="bg-white text-[#4B4B4B]">
      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 sm:mb-14">
            <h1 className="text-[36px] font-light leading-[1.02] tracking-[-0.02em] text-[#2F2F2F] sm:text-[48px] md:text-[60px]">
              College Collection
            </h1>

            <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#6B7280] sm:text-[17px] sm:leading-[1.7]">
              Unique and fun designs for everything you need at college.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className="group block text-left transition duration-300 ease-out hover:-translate-y-[2px]"
              >
                <div className="overflow-hidden rounded-[22px] border border-[#F0ECE6] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:rounded-[26px]">
                  <div className="flex h-[260px] items-center justify-center p-3 sm:h-[320px] sm:p-4">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="max-h-full max-w-full object-contain scale-[1.08] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.12]"
                    />
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <h3 className="mt-3 text-[14px] font-medium text-[#2F3A4A] sm:mt-4 sm:text-[15px] md:text-[16px]">
                    {category.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {activeCategory && (
        <div
          onClick={() => setActiveCategory(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[720px] rounded-[28px] bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.12)] sm:p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-light text-[#2F2F2F]">
                {
                  categories.find((c) => c.slug === activeCategory)?.title
                }
              </h2>

              <button
                onClick={() => setActiveCategory(null)}
                className="text-[12px] tracking-[0.2em] text-[#6B7280] hover:text-black"
              >
                CLOSE
              </button>
            </div>

            <p className="mt-1 text-[11px] tracking-[0.18em] text-[#94A3B8]">
              FEATURED STYLES
            </p>

            {/* PRODUCTS */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[1.2fr_0.8fr]">
              {/* LEFT LARGE */}
              {previewItems?.[0] && (
                <div>
                  <div className="flex h-[260px] items-center justify-center rounded-[22px] bg-[#F9F7F4] p-4">
                    <img
                      src={previewItems[0].images[0]}
                      className="max-h-full max-w-full object-contain scale-[1.12]"
                    />
                  </div>

                  <p className="mt-4 text-[15px] text-[#2F2F2F]">
                    {previewItems[0].name}
                  </p>

                  <p className="text-[14px] text-[#6B7280]">
                    {previewItems[0].price}
                  </p>

                  <a
                    href={`/product/${Object.keys(collegeProducts).find(
                      (key) => collegeProducts[key] === previewItems[0]
                    )}`}
                    className="mt-2 block text-[12px] tracking-[0.2em] text-[#64748B] hover:text-black"
                  >
                    view
                  </a>
                </div>
              )}

              {/* RIGHT SMALL */}
              {previewItems?.[1] && (
                <div>
                  <div className="flex h-[200px] items-center justify-center rounded-[22px] bg-[#F9F7F4] p-4">
                    <img
                      src={previewItems[1].images[0]}
                      className="max-h-full max-w-full object-contain scale-[1.05]"
                    />
                  </div>

                  <p className="mt-4 text-[14px] text-[#2F2F2F]">
                    {previewItems[1].name}
                  </p>

                  <p className="text-[13px] text-[#6B7280]">
                    {previewItems[1].price}
                  </p>

                  <a
                    href={`/product/${Object.keys(collegeProducts).find(
                      (key) => collegeProducts[key] === previewItems[1]
                    )}`}
                    className="mt-2 block text-[11px] tracking-[0.2em] text-[#94A3B8] hover:text-black"
                  >
                    view
                  </a>
                </div>
              )}
            </div>

            {/* VIEW COLLECTION */}
            <a
              href={`/college/${activeCategory}`}
              className="mt-8 block w-full rounded-full bg-[#6B8197] py-3 text-center text-[13px] tracking-[0.18em] text-white transition hover:bg-[#5A6F83]"
            >
              VIEW COLLECTION
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
