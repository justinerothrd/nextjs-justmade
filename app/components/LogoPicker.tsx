"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Logo } from "../data/logos";

type LogoPickerProps = {
  logos: Logo[];
  selectedLogo: string;
  onSelectLogo: (slug: string) => void;
};

const filters = ["All", "Camp", "College", "Team", "Custom"] as const;

export default function LogoPicker({
  logos,
  selectedLogo,
  onSelectLogo,
}: LogoPickerProps) {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [previewLogo, setPreviewLogo] = useState<Logo | null>(null);

  const filteredLogos = useMemo(() => {
    if (activeFilter === "All") return logos;
    return logos.filter((logo) => logo.category === activeFilter);
  }, [logos, activeFilter]);

  return (
    <>
      <div className="mt-8">
        <h3 className="mb-3 text-lg font-semibold">Choose Your Design</h3>

        <div className="mb-4 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const active = filter === activeFilter;

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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {filteredLogos.map((logo) => {
            const isSelected = selectedLogo === logo.slug;

            return (
              <div
                key={logo.slug}
                className={`rounded-2xl border p-3 transition ${
                  isSelected ? "border-black ring-1 ring-black" : "border-gray-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectLogo(logo.slug)}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      fill
                      className="object-contain p-3"
                    />
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium">{logo.name}</p>
                    <p className="text-xs text-gray-500">{logo.category}</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewLogo(logo)}
                  className="mt-2 text-xs underline underline-offset-4 transition hover:text-[#6F879E]"
                >
                  Preview larger
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Don&apos;t see your design? Add it in the customization details box above.
        </p>
      </div>

      {previewLogo && (
        <>
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setPreviewLogo(null)}
            className="fixed inset-0 z-40 bg-black/40"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl rounded-[28px] bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-xl font-medium text-[#2F3A4A]">
                    {previewLogo.name}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {previewLogo.category}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewLogo(null)}
                  className="text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
                >
                  Close
                </button>
              </div>

              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-[#F7F7F5]">
                <Image
                  src={previewLogo.image}
                  alt={previewLogo.name}
                  fill
                  className="object-contain p-6"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onSelectLogo(previewLogo.slug);
                    setPreviewLogo(null);
                  }}
                  className="rounded-full bg-[#6F879E] px-6 py-3 text-sm text-white transition hover:opacity-95"
                >
                  Select This Design
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewLogo(null)}
                  className="rounded-full border border-[#D8D3CD] px-6 py-3 text-sm text-[#2F3A4A] transition hover:bg-[#F7F7F5]"
                >
                  Keep Browsing
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
