"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Logo } from "@/app/data/logos";

const styles = [
  "All",
  "Varsity",
  "Minimal",
  "Script",
  "Classic",
  "Icon",
  "Custom",
] as const;

type LogoPickerProps = {
  logos: Logo[];
  selectedLogo: string;
  onSelectLogo: (slug: string) => void;
  defaultGroup?: string;
};

export default function LogoPicker({
  logos,
  selectedLogo,
  onSelectLogo,
  defaultGroup,
}: LogoPickerProps) {
  const [activeStyle, setActiveStyle] =
    useState<(typeof styles)[number]>("All");

  const [selectedGroup, setSelectedGroup] = useState<string>(
    defaultGroup || "All"
  );

  const [previewLogo, setPreviewLogo] = useState<Logo | null>(null);

  const pickerCategory = logos[0]?.category;

  const groupLabel =
    pickerCategory === "College"
      ? "Select School"
      : pickerCategory === "Team"
      ? "Select Team"
      : pickerCategory === "Custom"
      ? "Select Type"
      : "Select Camp";

  const groups = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(logos.map((logo) => logo.group))).filter(
        (group) => group !== "All"
      ),
    ];
  }, [logos]);

  // ✅ FIXED FILTER + ORDER
  const filtered = useMemo(() => {
    return logos
      .filter((logo) => {
        const matchStyle =
          activeStyle === "All" || logo.style === activeStyle;

        const matchGroup =
          selectedGroup === "All" ||
          logo.group === selectedGroup ||
          logo.slug === "custom-logo";

        return matchStyle && matchGroup;
      })
      .sort((a, b) => {
        if (a.slug === "custom-logo") return 1;
        if (b.slug === "custom-logo") return -1;
        return 0;
      });
  }, [logos, activeStyle, selectedGroup]);

  return (
    <div className="mt-6">
      {/* CAMP SELECTOR */}
      {!defaultGroup && (
        <div className="mb-6 pb-5 border-b border-[#ECE7E1]">
          <p className="mb-2 text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
            {groupLabel}
          </p>

          <div className="flex flex-wrap gap-2">
            {groups.map((group) => {
              const active = selectedGroup === group;

              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-[#2F3A4A] text-white"
                      : "border border-[#D8D3CD] bg-white text-[#2F3A4A] hover:border-[#6F879E]"
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>
      )}

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
                  ? "bg-[#6F879E] text-white"
                  : "border border-[#D8D3CD] bg-white text-[#2F3A4A] hover:border-[#6F879E]"
              }`}
            >
              {style === "All" ? "All Designs" : style}
            </button>
          );
        })}
      </div>

      {/* LOGOS GRID */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {filtered.map((logo) => {
          const isSelected = selectedLogo === logo.slug;

          return (
            <div
              key={logo.slug}
              className={`rounded-[22px] border bg-white p-4 transition ${
                isSelected
                  ? "border-[#6F879E] ring-1 ring-[#6F879E]"
                  : "border-[#EEEAE4] hover:border-[#CFC9C2]"
              }`}
            >
              <button
                onClick={() => onSelectLogo(logo.slug)}
                className="w-full text-left"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-white">
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    className="object-contain p-6 transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-3">
                  <p className="text-sm text-[#2F2F2F]">
                    {logo.slug === "custom-logo"
                      ? "Custom Logo — Add in details"
                      : logo.name}
                  </p>
                  <p className="text-xs text-[#8A8178]">{logo.style}</p>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* HELP TEXT */}
      <p className="mt-4 text-sm text-[#8A8178]">
        Don’t see your camp? Add it in the customization details above.
      </p>
    </div>
  );
}
