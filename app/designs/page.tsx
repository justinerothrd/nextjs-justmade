"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { logos } from "@/app/data/logos";

const filters = ["All", "Camp", "College", "Team", "Custom"] as const;

export default function DesignsPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const filteredLogos = useMemo(() => {
    if (activeFilter === "All") return logos;
    return logos.filter((logo) => logo.category === activeFilter);
  }, [activeFilter]);

  const featured = logos.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-10 text-[#4B4B4B] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-light text-[#2F3A4A] sm:text-4xl">
              Design Library
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
              Browse camp, college, team, and custom designs. If you do not see
              the one you want, add your request in the customization details box
              on the product page.
            </p>
          </div>

          <a
            href="/shop"
            className="shrink-0 text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
          >
            Back to Shop
          </a>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-lg font-medium text-[#2F3A4A]">
            Featured Designs
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {featured.map((logo) => (
              <div
                key={logo.slug}
                className="rounded-3xl border border-[#ECE7E1] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F7F7F5]">
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
                  <p className="mt-1 text-sm text-gray-500">{logo.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-black hover:border-black"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filteredLogos.map((logo) => (
            <div
              key={logo.slug}
              className="rounded-3xl border border-[#ECE7E1] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F7F7F5]">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="mt-4">
                <p className="text-base font-medium text-[#2F3A4A]">
                  {logo.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">{logo.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
