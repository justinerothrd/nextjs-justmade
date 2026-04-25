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
      ...Array.from(new Set(logos.map((item) => item.group))).filter(
        (group) => group !== "All"
      ),
    ];
  }, [logos]);

  const filtered = useMemo(() => {
    return logos
      .filter((item) => {
        const matchStyle =
          activeStyle === "All" || item.style === activeStyle;

        const matchGroup =
          selectedGroup === "All" ||
          item.group === selectedGroup ||
          item.slug === "custom-logo";

        return matchStyle && matchGroup;
      })
      .sort((a, b) => {
        if (a.slug === "custom-logo") return 1;
        if (b.slug === "custom-logo") return -1;
        return 0;
      });
  }, [logos, activeStyle, selectedGroup]);

  return (
    <>
      <div className="mt-2">
        {!defaultGroup && (
          <div className="mb-6 border-b border-[#ECE7E1] pb-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#8A8178]">
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
                    className={`rounded-full px-3.5 py-1.5 text-[13px] transition ${
                      active
                        ? "bg-[#2F3A4A] text-white"
                        : "border border-[#E5E1DB] bg-white text-[#2F2F2F] hover:border-[#CFC9C2]"
                    }`}
                  >
                    {group}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A8178]">
            Choose Logo
          </p>

          <a
            href={`/designs?returnTo=${encodeURIComponent(
              window.location.pathname
            )}`}
            className="text-[11px] underline underline-offset-4 text-[#8A8178] hover:text-[#6F879E]"
          >
            View all
          </a>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {styles.map((style) => {
            const active = style === activeStyle;

            return (
              <button
                key={style}
                type="button"
                onClick={() => setActiveStyle(style)}
                className={`rounded-full px-3 py-1.5 text-[12px] transition ${
                  active
                    ? "bg-[#6F879E] text-white"
                    : "border border-[#E5E1DB] bg-white text-[#2F2F2F] hover:border-[#CFC9C2]"
                }`}
              >
                {style === "All" ? "All" : style}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {filtered.map((item) => {
            const isSelected = selectedLogo === item.slug;
            const isCustom = item.slug === "custom-logo";

            return (
              <div
                key={item.slug}
                className={`rounded-[20px] border p-3 transition-all duration-300 ${
                  isSelected
                    ? "border-[#6F879E] bg-[#F6F8FA]"
                    : "border-[#EAE7E2] bg-white hover:border-[#D6D1CB]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelectLogo(item.slug);
                    if (!isCustom) setPreviewLogo(item);
                  }}
                  className="group flex h-[70px] w-full cursor-zoom-in items-center justify-center"
                >
                  {isCustom ? (
                    <div className="flex h-full w-full flex-col items-center justify-center text-[#8A8178]">
                      <span className="text-[22px] leading-none">+</span>
                      <span className="mt-1 text-[11px]">Add your own</span>
                    </div>
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={130}
                      height={90}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.08]"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onSelectLogo(item.slug)}
                  className="mt-2 block w-full text-center"
                >
                  <p className="text-[12px] leading-tight text-[#2F2F2F]">
                    {isCustom ? "Custom Logo" : item.name}
                  </p>

                  {isCustom && (
                    <p className="mt-0.5 text-[11px] text-[#8A8178]">
                      Add in details
                    </p>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-[12px] text-[#8A8178]">
          Don’t see your camp? Add it below.
        </p>
      </div>

      {previewLogo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4"
          onClick={() => setPreviewLogo(null)}
        >
          <div
            className="relative flex h-[520px] max-h-[75vh] w-[520px] max-w-[90vw] items-center justify-center rounded-[28px] bg-white p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 text-[11px] uppercase tracking-[0.2em] text-[#8A8178] hover:text-[#2F2F2F]"
              onClick={() => setPreviewLogo(null)}
            >
              Close
            </button>

            <img
              src={previewLogo.image}
              alt={previewLogo.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
