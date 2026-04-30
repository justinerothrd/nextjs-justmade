"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Logo } from "@/app/data/logos";

const styles = ["All", "Varsity", "Minimal", "Script", "Classic", "Icon", "Custom"] as const;

type LogoPickerProps = {
  logos: Logo[];
  selectedLogo: string;
  onSelectLogo: (slug: string) => void;
  defaultGroup?: string;
  productType?: string;
  selectedColor?: string;
};

export default function LogoPicker({
  logos,
  selectedLogo,
  onSelectLogo,
  defaultGroup,
}: LogoPickerProps) {
  const [activeStyle, setActiveStyle] = useState<(typeof styles)[number]>("All");
  const [selectedGroup, setSelectedGroup] = useState(defaultGroup || "Tyler Hill");
  const [zoomLogo, setZoomLogo] = useState<Logo | null>(null);
  const pathname = usePathname();
  const [otherCamp, setOtherCamp] = useState("");

  const pickerCategory = logos[0]?.category;

  const groupLabel =
    pickerCategory === "College"
      ? "Select School"
      : pickerCategory === "Team"
      ? "Select Team"
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
        const matchStyle = activeStyle === "All" || item.style === activeStyle;
        const matchGroup =
          selectedGroup === "All" ||
          selectedGroup === "Other" ||
          item.group === selectedGroup ||
          item.slug === "custom-logo";

        return matchStyle && matchGroup;
      })
      .filter((item) => item.slug !== "custom-logo")
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [logos, activeStyle, selectedGroup]);

  return (
    <div className="mt-2">
      {!defaultGroup && (
        <div className="mb-6 border-b border-[#ECE7E1] pb-5">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#8A8178]">
            {groupLabel}
          </p>

          <div className="flex flex-wrap gap-2">
           {groups.map((group) => {
  const active = selectedGroup === group && group !== "All";

  return (
    <button
      key={group}
      type="button"
      onClick={() => setSelectedGroup(group)}
      className={`px-3.5 py-1.5 text-[13px] transition ${
        active
          ? "rounded-full bg-[#2F3A4A] text-white"
          : group === "All"
  ? "text-[#8A8178] underline underline-offset-4 hover:text-[#2F2F2F]"
          : "rounded-full border border-[#E5E1DB] bg-white text-[#2F2F2F] hover:border-[#CFC9C2]"
      }`}
    >
      {group}
    </button>
  );
})}
          </div>
          <div className="mt-3 flex items-center gap-2">
  <button
    type="button"
    onClick={() => setSelectedGroup("Other")}
    className={`rounded-full px-3.5 py-1.5 text-[13px] transition ${
      selectedGroup === "Other"
        ? "bg-[#2F3A4A] text-white"
        : "border border-[#E5E1DB] bg-white text-[#2F2F2F] hover:border-[#CFC9C2]"
    }`}
  >
    Other
  </button>

  {selectedGroup === "Other" && (
    <input
      value={otherCamp}
      onChange={(e) => setOtherCamp(e.target.value)}
      placeholder="Camp name"
      className="min-w-[180px] rounded-full border border-[#E5E1DB] bg-white px-4 py-1.5 text-[13px] outline-none focus:border-[#6F879E]"
    />
  )}
</div>
        </div>
      )}

      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A8178]">
          Choose Logo
        </p>

     <a
  href={`/designs?group=${encodeURIComponent(
    selectedGroup === "All" || selectedGroup === "Other"
      ? "Tyler Hill"
      : selectedGroup
  )}&returnTo=${encodeURIComponent(pathname)}`}
  className="text-[11px] text-[#8A8178] underline underline-offset-4 hover:text-[#6F879E]"
>
  {pickerCategory === "College"
    ? "Browse all college designs"
    : "Browse all camp designs"}
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
              {style}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {filtered.map((item) => {
          const isSelected = selectedLogo === item.slug;

          return (
            <div
              key={item.slug}
              className={`rounded-[20px] border p-3 transition-all duration-300 ${
                isSelected
                  ? "border-[#6F879E] bg-[#F6F8FA] shadow-[0_0_8px_rgba(111,135,158,0.25)]"
                  : "border-[#EAE7E2] bg-white hover:border-[#D6D1CB]"
              }`}
            >
              <button
  type="button"
  onClick={() => {
    onSelectLogo(item.slug);
    setZoomLogo(item);
  }}
  className="group flex h-[70px] w-full cursor-pointer items-center justify-center"
>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={130}
                  height={90}
                  className="pointer-events-none max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.08]"
                />
              </button>

              <button
                type="button"
                onClick={() => onSelectLogo(item.slug)}
                className="mt-2 block w-full text-center"
              >
                <p className="text-[12px] leading-tight text-[#2F2F2F]">
                  {item.name}
                </p>

                {isSelected && (
                  <p className="mt-1 text-[11px] text-[#6F879E]">
                    Selected
                  </p>
                )}
              </button>
            </div>
          );
        })}
      </div>
<div className="mt-6">
  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A8178]">
    Finish
  </p>

  <div className="mt-2 flex gap-2">
    <button
      type="button"
      onClick={() => onDistressedChange(false)}
      className={`rounded-full px-4 py-2 text-[13px] transition ${
        !distressed
          ? "bg-[#2F3A4A] text-white"
          : "border border-[#E5E1DB] bg-white text-[#2F2F2F]"
      }`}
    >
      Clean
    </button>

    <button
      type="button"
      onClick={() => onDistressedChange(true)}
      className={`rounded-full px-4 py-2 text-[13px] transition ${
        distressed
          ? "bg-[#2F3A4A] text-white"
          : "border border-[#E5E1DB] bg-white text-[#2F2F2F]"
      }`}
    >
      Distressed / Vintage
    </button>
  </div>
</div>
      <div className="mt-6 rounded-[24px] border border-[#ECE7E1] bg-[#FAF8F5] p-5">
        <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#8A8178]">
          Custom Logo Details
        </p>

        <p className="mb-3 text-[13px] text-[#6B6762]">
          Don’t see your camp? Add details below.
        </p>

        <button
          type="button"
          onClick={() => onSelectLogo("custom-logo")}
          className={`w-full rounded-full py-2 text-[13px] transition ${
            selectedLogo === "custom-logo"
              ? "bg-[#6F879E] text-white"
              : "bg-[#2F3A4A] text-white hover:bg-[#1F2933]"
          }`}
        >
          {selectedLogo === "custom-logo"
            ? "Custom Design Selected"
            : "Use Custom Design"}
        </button>
      </div>

      {zoomLogo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setZoomLogo(null)}
        >
          <div
            className="relative flex h-[520px] w-[520px] max-w-[90vw] items-center justify-center rounded-[28px] bg-white p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomLogo(null)}
              className="absolute right-5 top-5 text-[11px] uppercase tracking-[0.18em] text-[#8A8178] underline underline-offset-4 hover:text-[#2F3A4A]"
            >
              Close
            </button>

            <Image
              src={zoomLogo.image}
              alt={zoomLogo.name}
              width={420}
              height={420}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
