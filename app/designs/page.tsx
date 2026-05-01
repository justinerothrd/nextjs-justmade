"use client";

import { useMemo, useState } from "react";
import { logos } from "@/app/data/logos";

const styles = ["All", "Varsity", "Minimal", "Script", "Classic", "Icon", "Custom"] as const;

export default function DesignsPage() {
  const [activeStyle, setActiveStyle] = useState<(typeof styles)[number]>("All");

  // ALL LOGOS
  const realLogos = useMemo(() => {
    return logos;
  }, []);

  // FEATURED (controlled via featured: true)
  const featured = useMemo(() => {
    return realLogos.filter((logo) => logo.featured).slice(0, 4);
  }, [realLogos]);

  // FILTERED GRID
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

        {/* NEW ARRIVALS DROP */}
        <section className="mt-14">
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#8A8178]">
              New Arrivals
            </p>
            <h2 className="mt-2 text-3xl font-light tracking-[-0.02em] text-[#2F2F2F]">
              The latest drop
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">

            {/* HERO TILE */}
            {featured[0] && (
              <div className="group rounded-[34px] border border-[#ECE7E1] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
                <div className="relative flex aspect-[4/3] items-center justify-center rounded-[28px] bg-[#FAF8F5] p-8">
                  <img
                    src={featured[0].image}
                    alt={featured[0].name}
                    className="max-h-[82%] max-w-[82%] object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A8178]">
                    New
                  </p>
                  <p className="mt-2 text-xl font-light text-[#2F2F2F]">
                    {featured[0].name}
                  </p>
                  <p className="mt-1 text-sm text-[#8A8178]">
                    {featured[0].group} · {featured[0].style}
                  </p>
                </div>
              </div>
            )}

            {/* SIDE TILES */}
            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {featured.slice(1, 4).map((logo) => (
                <div
                  key={logo.slug}
                  className="group grid grid-cols-[110px_1fr] items-center gap-4 rounded-[28px] border border-[#ECE7E1] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm sm:block lg:grid"
                >
                  <div className="flex aspect-square items-center justify-center rounded-[22px] bg-[#FAF8F5] p-4">
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="mt-0 sm:mt-4 lg:mt-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A8178]">
                      New
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#2F2F2F]">
                      {logo.name}
                    </p>
                    <p className="mt-1 text-xs text-[#8A8178]">
                      {logo.group} · {logo.style}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FILTER */}
        <div className="mt-16 flex flex-wrap gap-3">
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
