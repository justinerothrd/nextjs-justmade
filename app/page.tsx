"use client";

import { useState } from "react";
import { categories } from "@/lib/categories";

export default function HomePage() {
  const [previewCategory, setPreviewCategory] = useState<null | {
    slug: string;
    title: string;
    image: string;
  }>(null);

  return (
    <main className="bg-white text-[#4B4B4B]">
      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-[34px] font-light text-[#2F2F2F]">
            Camp Collection
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <div key={category.slug} className="group">
                <div className="relative overflow-hidden rounded-[22px] border border-[#ECE8E2] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)]">

                  <a href={`/shop/${category.slug}`} className="block">
                    <div className="flex h-[220px] items-center justify-center p-4">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                  </a>

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/8">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setPreviewCategory(category);
                      }}
                      className="pointer-events-auto rounded-full bg-white px-4 py-2 text-sm font-medium text-[#2F3A4A] opacity-0 scale-95 shadow-sm transition duration-300 group-hover:opacity-100 group-hover:scale-100"
                    >
                      Preview
                    </button>
                  </div>
                </div>

                <a href={`/shop/${category.slug}`} className="block">
                  <div className="pt-3 text-center">
                    <h3 className="text-[15px] font-medium text-[#2F2F2F]">
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
            className="w-full max-w-md rounded-[28px] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[22px] font-light text-[#2F2F2F]">
              {previewCategory.title}
            </h3>

            <div className="mt-4 flex h-[300px] items-center justify-center">
              <img
                src={previewCategory.image}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <a
              href={`/shop/${previewCategory.slug}`}
              className="mt-5 inline-flex w-full justify-center rounded-full border border-[#C9D3DD] px-5 py-2.5 text-[12px] uppercase tracking-[0.14em] text-[#5F7A94]"
            >
              View Collection
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
