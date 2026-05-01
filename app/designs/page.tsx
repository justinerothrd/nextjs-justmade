"use client";

import { useMemo, useState } from "react";
import { logos } from "@/app/data/logos";

const styles = ["All", "Varsity", "Minimal", "Script", "Classic", "Icon", "Custom"] as const;

export default function DesignsPage() {
  const [activeStyle, setActiveStyle] = useState<(typeof styles)[number]>("All");

  // ✅ ALL LOGOS
  const realLogos = useMemo(() => {
    return logos;
  }, []);

  // ✅ NEW ARRIVALS (2 college + 2 camp)
 const featured = useMemo(() => {
  return realLogos.filter((logo) => logo.featured).slice(0, 4);
}, [realLogos]);

  // ✅ FILTERED GRID
  const visibleLogos = useMemo(() => {
    if (activeStyle === "All") return realLogos;
    return realLogos.filter((logo) => logo.style === activeStyle);
  }, [activeStyle, realLogos]);

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-[#4B4B4B]">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <h1 className="text-[40px] font-light text-[#2F2F2F] md:text-[56px]">
          Design Library
        </h1>

        <p className="mt-4 max-w-2xl text-[16px] text-[#6B6B6B]">
          All logos can be designed and modified for most camps and colleges.
        </p>

        {/* NEW ARRIVALS */}
        <div className="mt-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#8A8178]">
            New Arrivals
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {featured.map((logo) => (
              <div
                key={logo.slug}
                className="group flex aspect-square items-center justify-center rounded-[24px] border border-[#EEEAE4] bg-[#FBFAF8] p-6 transition hover:shadow-sm"
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* FILTER */}
        <div className="mt-14 flex flex-wrap gap-3">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setActiveStyle(style)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeStyle === style
                  ? "bg-[#5F7A94] text-white"
                  : "border border-[#DDD8D2] text-[#4B4B4B] hover:bg-[#F3F2EF]"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* ALL DESIGNS GRID */}
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {visibleLogos.map((logo) => (
            <div
              key={logo.slug}
              className="group flex aspect-square items-center justify-center rounded-[24px] border border-[#EEEAE4] bg-[#FBFAF8] p-6 transition hover:shadow-sm"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
