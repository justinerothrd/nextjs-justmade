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
    <div className="mt-2">
      {!defaultGroup && (
        <div className="mb-6 border-b border-[#ECE7E1] pb-5">
          <p className="mb-2 text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
            {groupLabel}
          </p>

          <div className="flex flex-wrap gap-2">
            {groups.map((group) => {
              const active = selectedGroup === group;

              return (
                <button
                  key={group}
                  type="button"
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

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] uppercase tracking-[0.14em] text-[#6B7280]">
            Choose Logo
          </p>
          <p className="mt-1 text-sm text-[#8A8178]">
            Choose your logo or add a custom request.
          </p>
        </div>

        <a
          href={`/designs?returnTo=${encodeURIComponent(
            window.location.pathname
          )}`}
          className="shrink-0 text-xs underline underline-offset-4 transition hover:text-[#6F879E]"
        >
          View all
        </a>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {styles.map((style) => {
          const active = style === activeStyle;

          return (
            <button
              key={style}
              type="button"
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

      <div className="grid grid-cols-3 gap-3">
        {filtered.map((logo) => {
          const isSelected = selectedLogo === logo.slug;

          return (
            <div
              key={logo.slug}
              className={`rounded-[18px] border bg-white p-3 transition ${
                isSelected
                  ? "border-[#6F879E] ring-1 ring-[#6F879E]"
                  : "border-[#EEEAE4] hover:border-[#CFC9C2]"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectLogo(logo.slug)}
                className="w-full text-left"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-[14px] bg-white">
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-2">
                  <p className="text-[13px] leading-4 text-[#2F2F2F]">
                    {logo.slug === "custom-logo"
                      ? "Custom Logo"
                      : logo.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#8A8178]">
                    {logo.slug === "custom-logo"
                      ? "Add in details"
                      : logo.style}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-[#8A8178]">
        Don’t see your camp? Add it in the customization details above.
      </p>
    </div>
  );
}
