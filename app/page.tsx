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

export default function HomePage() {
  const [previewCategory, setPreviewCategory] = useState<null | {
    slug: CategorySlug;
    title: string;
    image: string;
  }>(null);

  const previewItems = previewCategory
    ? previewProductsByCategory[previewCategory.slug].map((slug) => {
        const product = products[slug as ProductSlug];
        return {
          slug,
          name: product.name,
          price: product.price,
          image: product.images[0],
        };
      })
    : [];

  return (
    <main className="bg-white text-[#4B4B4B]">
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden sm:h-[72vh] sm:min-h-[560px] md:h-[90vh] md:min-h-[700px]">
        <img
          src="/hero-mobile.png"
          alt="Custom apparel"
          className="absolute inset-0 h-full w-full object-cover sm:hidden"
          style={{ objectPosition: "50% 35%" }}
        />

        <img
          src="/hero-main.png"
          alt="Custom apparel"
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

      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-[34px] font-light text-[#2F2F2F] sm:text-[44px]">
            Camp Collection
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <div key={category.slug} className="group">
                <div className="relative overflow-hidden rounded-[22px] border border-[#ECE8E2] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:rounded-[26px]">
                  <a href={`/shop/${category.slug}`} className="block">
                    <div className="flex h-[220px] items-center justify-center p-4 sm:h-[280px] sm:p-5">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="max-h-[94%] max-w-[94%] object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                  </a>

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/8">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setPreviewCategory({
                          slug: category.slug as CategorySlug,
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

                <div className="pt-3 text-center">
                  <h3 className="text-[15px] font-medium tracking-[0.01em] text-[#2F2F2F] sm:text-[17px]">
                    {category.title}
                  </h3>
                </div>
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
                <h3 className="text-[22px] font-light text-[#2F2F2F]">
                  {previewCategory.title}
                </h3>
                <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-[#8A93A0]">
                  Featured styles
                </p>
              </div>

              <button
                onClick={() => setPreviewCategory(null)}
                className="text-[12px] uppercase tracking-[0.12em] text-[#8A93A0]"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 items-center gap-4 sm:grid-cols-[1.24fr_0.76fr]">
              {previewItems?.[0] && (
                <div className="group">
                  <a href={`/product/${previewItems[0].slug}`} className="block">
                    <div className="flex h-[320px] items-center justify-center -translate-x-2">
                      <img
                        src={previewItems[0].image}
                        alt={previewItems[0].name}
                        className="max-h-full max-w-full object-contain scale-[1.15] drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition duration-500 ease-out group-hover:scale-[1.18]"
                      />
                    </div>
                  </a>

                  <div className="mt-4 text-left">
                    <h4 className="text-[17px] font-normal tracking-[0.01em] text-[#2F2F2F]">
                      {previewItems[0].name}
                    </h4>
                    <p className="mt-1 text-[14px] text-[#6B7280]">
                      {previewItems[0].price}
                    </p>
                  </div>

                  <a
                    href={`/product/${previewItems[0].slug}`}
                    className="mt-3 inline-block text-[11px] uppercase tracking-[0.18em] text-[#6B7C8F] transition hover:text-[#2F3A4A]"
                  >
                    View
                  </a>
                </div>
              )}

              {previewItems?.[1] && (
                <div className="group flex flex-col items-center -translate-x-3">
                  <a href={`/product/${previewItems[1].slug}`} className="block">
                    <div className="flex h-[200px] items-center justify-center">
                      <img
                        src={previewItems[1].image}
                        alt={previewItems[1].name}
                        className="max-h-[95%] max-w-[95%] object-contain translate-x-2 scale-[1.08] opacity-90 transition duration-500 ease-out group-hover:scale-[1.11] group-hover:opacity-100"
                      />
                    </div>
                  </a>

                  <div className="mt-3 text-center">
                    <h4 className="text-[15px] font-normal tracking-[0.01em] text-[#2F2F2F]">
                      {previewItems[1].name}
                    </h4>
                    <p className="mt-1 text-[13px] text-[#6B7280]">
                      {previewItems[1].price}
                    </p>
                  </div>

                  <a
                    href={`/product/${previewItems[1].slug}`}
                    className="mt-2 inline-block text-[11px] uppercase tracking-[0.18em] text-[#6B7C8F] transition hover:text-[#2F3A4A]"
                  >
                    View
                  </a>
                </div>
              )}
            </div>

            <a
              href={`/shop/${previewCategory.slug}`}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#5F7A94]/95 px-5 py-2.5 text-[12px] uppercase tracking-[0.12em] text-white transition hover:bg-[#5F7A94]"
            >
              View Collection
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
