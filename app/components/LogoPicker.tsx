"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Logo } from "@/app/data/logos";

const styles = ["All", "Varsity", "Minimal", "Script", "Classic", "Icon", "Custom"] as const;

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
    return logos.filter((logo) => {
      const matchStyle = activeStyle === "All" || logo.style === activeStyle;
      const matchGroup = selectedGroup === "All" || logo.group === selectedGroup;

      return matchStyle && matchGroup;
    });
  }, [logos, activeStyle, selectedGroup]);

  const previewIndex = previewLogo
    ? filtered.findIndex((logo) => logo.slug === previewLogo.slug)
    : -1;

  function goToPrevious() {
    if (!previewLogo || filtered.length === 0) return;

    const nextIndex =
      previewIndex <= 0 ? filtered.length - 1 : previewIndex - 1;

    setPreviewLogo(filtered[nextIndex]);
  }

  function goToNext() {
    if (!previewLogo || filtered.length === 0) return;

    const nextIndex =
      previewIndex >= filtered.length - 1 ? 0 : previewIndex + 1;

    setPreviewLogo(filtered[nextIndex]);
  }

  return (
    <>
      <div className="mt-6">
        {defaultGroup ? (
          <p className="mb-4 text-sm text-[#8A8178]">
            Showing designs for{" "}
            <span className="font-medium text-[#2F3A4A]">{defaultGroup}</span>
          </p>
        ) : (
          <div className="mb-5">
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

        {filtered.length === 0 ? (
          <p className="rounded-[18px] border border-[#ECE7E1] bg-[#FBFAF8] px-4 py-4 text-sm text-[#8A8178]">
            No designs found for this selection.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {filtered.map((logo) => {
              const isSelected = selectedLogo === logo.slug;

              return (
                <div
                  key={logo.slug}
                  className={`rounded-[22px] border bg-white p-4 transition hover:-translate-y-0.5 ${
                    isSelected
                      ? "border-[#6F879E] ring-1 ring-[#6F879E]"
                      : "border-[#EEEAE4] hover:border-[#CFC9C2]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectLogo(logo.slug)}
                    className="block w-full text-left"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-white">
                      <Image
                        src={logo.image}
                        alt={logo.name}
                        fill
                        className="object-contain p-6 transition-transform duration-500 hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-3 flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm text-[#2F2F2F]">
                          {logo.slug === "custom-logo"
                            ? "Custom Logo — Add in details"
                            : logo.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[#8A8178]">
                          {logo.style}
                        </p>
                      </div>

                      {isSelected && (
                        <span className="rounded-full bg-[#6F879E] px-2 py-1 text-[10px] text-white">
                          Selected
                        </span>
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewLogo(logo)}
                    className="mt-3 text-xs text-[#6F879E] underline underline-offset-4"
                  >
                    View larger
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-4 text-sm text-[#8A8178]">
          Don’t see your camp? Add it in the customization details above.
        </p>
      </div>

      {previewLogo && (
        <>
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setPreviewLogo(null)}
            className="fixed inset-0 z-40 bg-black/45"
          />

          <div className="fixed inset-0 z-50 overflow-y-auto p-4">
            <div className="flex min-h-full items-center justify-center">
              <div className="my-6 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[30px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                <div className="flex items-start justify-between gap-4 border-b border-[#ECE7E1] px-5 py-4 sm:px-6">
                  <div>
                    <h4 className="text-xl font-medium text-[#2F3A4A]">
                      {previewLogo.name}
                    </h4>
                    <p className="mt-1 text-sm text-[#8A8178]">
                      {previewLogo.group} · {previewLogo.style}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPreviewLogo(null)}
                    className="shrink-0 text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
                  >
                    Close
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
                  <div className="relative mx-auto flex aspect-square max-h-[55vh] w-full max-w-[700px] items-center justify-center overflow-hidden rounded-[24px] bg-white">
                    <Image
                      src={previewLogo.image}
                      alt={previewLogo.name}
                      fill
                      className="object-contain p-8"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={goToPrevious}
                      className="rounded-full border border-[#D8D3CD] px-5 py-2 text-sm text-[#2F3A4A] transition hover:bg-[#F7F7F5]"
                    >
                      ← Previous
                    </button>

                    <p className="text-xs text-[#8A8178]">
                      {previewIndex + 1} of {filtered.length}
                    </p>

                    <button
                      type="button"
                      onClick={goToNext}
                      className="rounded-full border border-[#D8D3CD] px-5 py-2 text-sm text-[#2F3A4A] transition hover:bg-[#F7F7F5]"
                    >
                      Next →
                    </button>
                  </div>
                </div>

                <div className="border-t border-[#ECE7E1] px-5 py-4 sm:px-6">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectLogo(previewLogo.slug);
                        setPreviewLogo(null);
                      }}
                      className="rounded-full bg-[#6F879E] px-6 py-3 text-sm text-white transition hover:bg-[#5F7A94]"
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
