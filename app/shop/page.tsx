"use client";

import { useState } from "react";
import { categories } from "@/lib/categories";

export default function ShopPage() {
  const [quickViewCategory, setQuickViewCategory] = useState<null | {
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
              Camp Collection
            </h1>

            <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#6B7280] sm:text-[17px] sm:leading-[1.7]">
              Custom apparel and accessories designed for all things camp.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`/shop/${category.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-[22px] border border-[#ECE8E2] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:rounded-[26px]">
                  <div className="flex h-[220px] items-center justify-center p-4 sm:h-[280px] sm:p-5">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="max-h-[94%] max-w-[94%] object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/8">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setQuickCategory({
                          slug: category.slug,
                          title: category.title,
                          image: category.image,
                        });
                      }}
                      className="pointer-events-auto rounded-full bg-white px-4 py-2 text-sm font-medium text-[#2F3A4A] opacity-0 shadow-sm transition duration-300 group-hover:opacity-100"
                    >
                      Quick 
                    </button>
                  </div>
                </div>

                <div className="pt-3 text-center">
                  <h3 className="text-[15px] font-medium tracking-[0.01em] text-[#2F2F2F] sm:text-[17px]">
                    {category.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {quickCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setQuickCategory(null)}
        >
          <div
            className="w-full max-w-md rounded-[28px] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[22px] font-light text-[#2F2F2F]">
                {PreviewCategory.title}
              </h3>

              <button
                type="button"
                onClick={() => setPreviewCategory(null)}
                className="text-sm text-[#6B7280] transition hover:text-[#2F2F2F]"
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex h-[320px] items-center justify-center rounded-[22px] border border-[#ECE8E2] bg-white p-4">
              <img
                src={PreviewCategory.image}
                alt={PreviewCategory.title}
                className="max-h-[94%] max-w-[94%] object-contain"
              />
            </div>

            <a
              href={`/shop/${PreviewCategory.slug}`}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#5F7A94] py-3 text-sm font-medium text-white transition hover:bg-[#536C84]"
            >
              VIEW
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
