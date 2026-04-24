"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Logo } from "../data/logos";

const styles = ["All", "Varsity", "Minimal", "Script", "Classic", "Icon"] as const;

export default function LogoPicker({
  logos,
  selectedLogo,
  onSelectLogo,
}: {
  logos: Logo[];
  selectedLogo: string;
  onSelectLogo: (slug: string) => void;
}) {
  const [activeStyle, setActiveStyle] = useState<(typeof styles)[number]>("All");

  const filtered = useMemo(() => {
    if (activeStyle === "All") return logos;
    return logos.filter((l) => l.style === activeStyle);
  }, [logos, activeStyle]);

  return (
    <div className="mt-6">
      {/* STYLE FILTER */}
      <div className="mb-4 flex flex-wrap gap-2">
        {styles.map((style) => {
          const active = style === activeStyle;

          return (
            <button
              key={style}
              onClick={() => setActiveStyle(style)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active
                  ? "bg-black text-white"
                  : "border border-gray-300 bg-white hover:border-black"
              }`}
            >
              {style}
            </button>
          );
        })}
      </div>

      {/* LOGOS */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {filtered.map((logo) => {
          const isSelected = selectedLogo === logo.slug;

          return (
            <button
              key={logo.slug}
              onClick={() => onSelectLogo(logo.slug)}
              className={`rounded-2xl border p-4 transition ${
                isSelected
                  ? "border-[#6F879E] ring-1 ring-[#6F879E]"
                  : "border-gray-200 hover:border-[#CFC9C2]"
              }`}
            >
              <div className="relative aspect-square w-full bg-[#F7F7F5] rounded-xl">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <p className="mt-3 text-sm text-[#2F2F2F]">
                {logo.name}
              </p>

              {isSelected && (
                <p className="text-xs text-[#6F879E] mt-1">
                  Selected
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
