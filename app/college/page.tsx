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

export default function CollegePage() {
  const [previewCategory, setPreviewCategory] = useState<null | {
    slug: string;
    title: string;
    image: string;
  }>(null);

  return (
    <main className="bg-white text-[#4B4B4B]">
      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 sm:mb-14">
            <h1 className="text-[36px] font-light leading-[1.02] tracking-[-0.02em] text-[#2F2F2F] sm:text-[48px] md:text-[60px]">
              College Collection
            </h1>

            <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#6B7280] sm:text-[17px] sm:leading-[1.7]">
              Unique and fun designs for everything you need at college.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <div key={category.slug} className="group">
                <div className="relative overflow-hidden rounded-[22px] border border-[#F0ECE6] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:rounded-[26px]">
                  <a href={`/college/${category.slug}`} className="block">
                    <div className="flex h-[260px] items-center justify-center p-3 sm:h-[320px] sm:p-4">
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

                <a href={`/college/${category.slug}`} className="block">
                  <div className="pt-2 text-center">
                    <h3 className="mt-3 text-center text-[14px] font-medium text-[#2F3A4A] sm:mt-4 sm:text-[15px] md:text-[16px]">
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
  className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.20)] ring-1 ring-black/5"
  onClick={(e) => e.stopPropagation()}
>
            <div className="flex items-start justify-between">
              <h3 className="text-[22px] font-light tracking-[0.01em] text-[#2F2F2F]">
                {previewCategory.title}
              </h3>

              <button
                onClick={() => setPreviewCategory(null)}
                className="text-[12px] uppercase tracking-[0.12em] text-[#8A93A0] hover:text-[#2F2F2F]"
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex h-[320px] items-center justify-center rounded-[22px] border border-[#ECE8E2] bg-[#F7F7F5] p-4">
              <img
                src={previewCategory.image}
                alt={previewCategory.title}
                className="max-h-[94%] max-w-[94%] object-contain"
              />
            </div>

            <a
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#5F7A94] px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#4e677f]"
            >
              View Collection
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
