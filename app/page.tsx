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
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden sm:h-[72vh] sm:min-h-[560px] md:h-[90vh] md:min-h-[700px]">
        <img
          src="/hero-mobile.png"
          className="absolute inset-0 h-full w-full object-cover sm:hidden"
          style={{ objectPosition: "50% 35%" }}
        />

        <img
          src="/hero-main.png"
          className="absolute inset-0 hidden h-full w-full object-cover sm:block"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent sm:bg-black/20" />

        <div className="relative z-10 flex h-full items-end pb-14 sm:items-center sm:pb-0">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <p className="text-[16px] font-bold uppercase tracking-[0.12em] text-white sm:text-white/80">
              MADE TO BE CUSTOM
            </p>

            <p className="mt-3 max-w-[500px] text-[28px] leading-[1.1] text-white sm:text-4xl md:text-5xl">
              Personalized gear for camp, college, and everyday.
            </p>

            <div className="mt-5 flex gap-3 sm:mt-7">
              <a
                href="/shop"
                className="rounded-full bg-white px-5 py-3 text-sm text-[#2F3A4A]"
              >
                Shop Camp
              </a>

              <a
                href="/college"
                className="rounded-full border border-white/80 px-5 py-3 text-sm text-white"
              >
                Shop College
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION GRID */}
      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-[34px] font-light text-[#2F2F2F] sm:text-[44px]">
            Camp Collection
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <div key={category.slug} className="group">
                <div className="relative overflow-hidden rounded-[22px] border border-[#ECE8E2] bg-white sm:rounded-[26px]">
                  <a href={`/shop/${category.slug}`}>
                    <div className="flex h-[220px] items-center justify-center p-4 sm:h-[280px]">
                      <img
                        src={category.image}
                        className="max-h-[94%] max-w-[94%] object-contain"
                      />
                    </div>
                  </a>

                  {/* PREVIEW BUTTON */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/8">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setPreviewCategory(category);
                      }}
                      className="rounded-full bg-white px-4 py-2 text-sm opacity-0 transition group-hover:opacity-100"
                    >
                      Preview
                    </button>
                  </div>
                </div>

                <div className="pt-3 text-center">
                  <h3 className="text-[15px]">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {previewCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setPreviewCategory(null)}
        >
          <div
            className="w-full max-w-md rounded-[30px] bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.20)] animate-[fadeIn_.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[22px]">{previewCategory.title}</h3>

            <div className="mt-4 flex h-[260px] items-center justify-center">
              <img
                src={previewCategory.image}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <a
              href={`/shop/${previewCategory.slug}`}
              className="mt-6 block rounded-full bg-[#5F7A94] py-3 text-center text-white"
            >
              View Collection
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
