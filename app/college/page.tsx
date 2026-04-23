"use client";

import { useState } from "react";
import {
  collegeProducts,
  type CollegeProductSlug,
} from "@/lib/college-products";

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
    image: collegeProducts["college-sweatpants"].images[0],
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
] as const;

type CategorySlug = (typeof categories)[number]["slug"];

type PreviewItemConfig = {
  slug: CollegeProductSlug;
  imageIndex?: number;
  titleOverride?: string;
};

const previewProductsByCategory: Record<CategorySlug, PreviewItemConfig[]> = {
  sweatshirts: [
    { slug: "college-crewneck" },
    { slug: "college-hoodie" },
  ],
  tees: [
    { slug: "college-tank" },
    { slug: "college-tee" },
  ],
  bottoms: [
    { slug: "college-sweatpants" },
    { slug: "college-shorts" },  
],
  sleepwear: [
    { slug: "college-sleepwear" },
    { slug: "college-sleepwear-set" },
  ],
  accessories: [
    { slug: "college-slides" },
    { slug: "college-socks" },
  ],
};

export default function CollegePage() {
  const [previewCategory, setPreviewCategory] = useState<null | {
    slug: CategorySlug;
    title: string;
    image: string;
  }>(null);

  const previewItems =
    previewCategory
      ? previewProductsByCategory[previewCategory.slug].map((item) => {
          const product = collegeProducts[item.slug];
          return {
            slug: item.slug,
            name: item.titleOverride ?? product.name,
            price: product.price,
            image: product.images[item.imageIndex ?? 0] ?? product.images[0],
          };
        })
      : [];

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
  src={product.images[0]}
  alt={product.name}
  className={`object-contain transition duration-500 ease-out
    ${index === 0 
      ? "max-h-[100%] max-w-[100%]"   // front (sweatpants)
      : "max-h-[88%] max-w-[88%] opacity-90" // back (shorts)
    }
  `}
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
                    <h3 className="mt-3 text-[14px] font-medium text-[#2F3A4A] sm:mt-4 sm:text-[15px] md:text-[16px]">
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
            className="w-full max-w-3xl rounded-[30px] bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.20)] ring-1 ring-black/5 sm:p-7 animate-[fadeIn_.25s_ease-out]"
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

            <div className="mt-6 grid grid-cols-1 items-center gap-6 sm:grid-cols-[1.2fr_0.8fr]">
              {previewItems[0] && (
                <div>
                  <a href={`/college/product/${previewItems[0].slug}`} className="block">
                    <div className="flex h-[320px] items-center justify-center">
                      <img
                        src={previewItems[0].image}
                        alt={previewItems[0].name}
                        className="max-h-full max-w-full object-contain scale-[1.15] drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
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
                    href={`/college/product/${previewItems[0].slug}`}
                    className="mt-3 inline-block text-[11px] uppercase tracking-[0.18em] text-[#6B7C8F] transition hover:text-[#2F3A4A]"
                  >
                    View
                  </a>
                </div>
              )}

              {previewItems[1] && (
                <div className="flex flex-col items-center">
                  <a href={`/college/product/${previewItems[1].slug}`} className="block">
                    <div className="flex h-[200px] items-center justify-center opacity-90">
                      <img
                        src={previewItems[1].image}
                        alt={previewItems[1].name}
                        className="max-h-full max-w-full object-contain scale-[1.05] drop-shadow-[0_8px_20px_rgba(0,0,0,0.10)]"
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
                    href={`/college/product/${previewItems[1].slug}`}
                    className="mt-2 inline-block text-[11px] uppercase tracking-[0.18em] text-[#6B7C8F] transition hover:text-[#2F3A4A]"
                  >
                    View
                  </a>
                </div>
              )}
            </div>

            <a
              href={`/college/${previewCategory.slug}`}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#5F7A94]/95 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#5F7A94]"
            >
              View Collection
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
