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

  const filteredLogos = useMemo(() => {
    if (activeFilter === "All") return logos;
    return logos.filter((logo) => logo.category === activeFilter);
  }, [logos, activeFilter]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Choose Your Design</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((filter) => {
          const active = filter === activeFilter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-black"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filteredLogos.map((logo) => {
          const isSelected = selectedLogo === logo.slug;

          return (
            <button
              key={logo.slug}
              type="button"
              onClick={() => onSelectLogo(logo.slug)}
              className={`rounded-2xl border p-3 text-left transition hover:shadow-sm ${
                isSelected
                  ? "border-black ring-1 ring-black"
                  : "border-gray-200"
              }`}
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
          );
        })}
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Don’t see your design? Add it in the notes box below.
      </p>
    </div>
  );
}
