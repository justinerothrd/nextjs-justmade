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
    <>
      <div className="mt-2">
        {/* CAMP SELECT */}
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

        {/* HEADER */}
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

        {/* STYLE FILTERS */}
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

        {/* LOGO GRID */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {filtered.map((logo) => {
            const isSelected = selectedLogo === logo.slug;

            return (
              <div key={logo.slug} className="relative group">
                <button
                  onClick={() => onSelectLogo(logo.slug)}
                  className={`w-full rounded-[14px] border bg-white p-2 transition ${
                    isSelected
                      ? "border-[#6F879E]"
                      : "border-[#F0ECE6] hover:border-[#D9D4CE]"
                  }`}
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      fill
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="mt-1 text-center">
                    <p className="text-[12px] text-[#2F2F2F] leading-tight">
                      {logo.slug === "custom-logo"
                        ? "Custom"
                        : logo.name}
                    </p>
                  </div>
                </button>

                {/* VIEW OVERLAY */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewLogo(logo);
                  }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <span className="bg-white/90 text-[#2F2F2F] text-[11px] px-3 py-1.5 rounded-full shadow-sm">
                    View
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-[12px] text-[#8A8178]">
          Don’t see your camp? Add it below.
        </p>
      </div>

      {/* MODAL */}
      {previewLogo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setPreviewLogo(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-xs uppercase tracking-[0.2em]"
            onClick={() => setPreviewLogo(null)}
          >
            Close
          </button>

          <img
            src={previewLogo.image}
            alt={previewLogo.name}
            className="max-h-[85vh] max-w-[85vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
