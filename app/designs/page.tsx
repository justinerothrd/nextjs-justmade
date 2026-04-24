"use client";

import Image from "next/image";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { logos } from "@/app/data/logos";

const styles = ["All", "Varsity", "Minimal", "Script", "Classic", "Icon"] as const;

function DesignsPageContent() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/shop";

  const [activeStyle, setActiveStyle] =
    useState<(typeof styles)[number]>("All");

  const filteredLogos = useMemo(() => {
    if (activeStyle === "All") return logos;
    return logos.filter((logo) => logo.style === activeStyle);
  }, [activeStyle]);

  const featured = logos.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-10 text-[#4B4B4B] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-light text-[#2F3A4A] sm:text-4xl">
              Design Library
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
              Browse our signature design styles. Select your camp or school on
              the product page to see available custom options.
            </p>
            <p className="mt-2 text-sm text-[#8A8178]">
              Custom requests welcome — add details on the product page.
            </p>
          </div>

          <a
  href={returnTo || "/shop"}
  className="text-sm underline underline-offset-4"
>
  Back
</a>
        </div>

        <section className="mb-14">
          <h2 className="mb-5 text-lg font-medium text-[#2F3A4A]">
            Featured Designs
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {featured.map((logo) => (
              <div
                key={logo.slug}
                className="rounded-[30px] border border-[#ECE7E1] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.055)]"
              >
                <div className="relative aspect-square overflow-hidden rounded-[24px] bg-[#F7F7F5]">
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    className="object-contain p-6"
                  />
                </div>

                <div className="mt-4">
                  <p className="text-base font-medium text-[#2F3A4A]">
                    {logo.name}
                  </p>
                  <p className="mt-1 text-sm text-[#8A8178]">
                    {logo.group} · {logo.style}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-wrap gap-2">
            {styles.map((style) => {
              const active = activeStyle === style;

              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => setActiveStyle(style)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    active
                      ? "border-[#2F3A4A] bg-[#2F3A4A] text-white"
                      : "border-[#D8D3CD] bg-white text-[#2F3A4A] hover:border-[#6F879E]"
                  }`}
                >
                  {style === "All" ? "All Designs" : style}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {filteredLogos.map((logo) => (
              <div
                key={logo.slug}
                className="rounded-[28px] border border-[#ECE7E1] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.05)]"
              >
                <div className="relative aspect-square overflow-hidden rounded-[22px] bg-[#F7F7F5]">
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    className="object-contain p-5"
                  />
                </div>

                <div className="mt-4">
                  <p className="text-base font-medium text-[#2F3A4A]">
                    {logo.name}
                  </p>
                  <p className="mt-1 text-sm text-[#8A8178]">
                    {logo.group} · {logo.style}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function DesignsPage() {
  return (
    <Suspense fallback={null}>
      <DesignsPageContent />
    </Suspense>
  );
}
