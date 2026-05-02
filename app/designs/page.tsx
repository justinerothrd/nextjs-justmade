"use client";

import { useMemo, useState } from "react";
import { logos } from "@/app/data/logos";

const styles = ["All", "Varsity", "Minimal", "Script", "Classic", "Icon", "Custom"] as const;

type SelectedLogo = {
  image: string;
  name: string;
  group: string;
  style: string;
};

export default function DesignsPage() {
  const [activeStyle, setActiveStyle] = useState<(typeof styles)[number]>("All");
  const [selectedLogo, setSelectedLogo] = useState<SelectedLogo | null>(null);

  const realLogos = useMemo(() => {
    return logos;
  }, []);

  const featured = useMemo(() => {
    return realLogos.filter((logo) => logo.featured).slice(0, 4);
  }, [realLogos]);

  const visibleLogos = useMemo(() => {
    if (activeStyle === "All") return realLogos;
    return realLogos.filter((logo) => logo.style === activeStyle);
  }, [activeStyle, realLogos]);

  function openLogo(logo: SelectedLogo) {
    setSelectedLogo({
      image: logo.image,
      name: logo.name,
      group: logo.group,
      style: logo.style,
    });
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-[#4B4B4B]">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-[40px] font-light text-[#2F2F2F] md:text-[56px]">
          Design Library
        </h1>

        <p className="mt-4 max-w-2xl text-[16px] text-[#6B6B6B]">
          All logos can be designed and modified for most camps and colleges.
        </p>

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
            {featured[0] && (
              <button
                type="button"
                onClick={() => openLogo(featured[0])}
                className="group rounded-[34px] border border-[#ECE7E1] bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
              >
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
              </button>
            )}

            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {featured.slice(1, 4).map((logo) => (
                <button
                  key={logo.slug}
                  type="button"
                  onClick={() => openLogo(logo)}
                  className="group grid grid-cols-[110px_1fr] items-center gap-4 rounded-[28px] border border-[#ECE7E1] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm sm:block lg:grid"
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
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-16 flex flex-wrap gap-3">
          {styles.map((style) => (
            <button
              key={style}
              type="button"
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

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {visibleLogos.map((logo) => (
            <button
              key={logo.slug}
              type="button"
              onClick={() => openLogo(logo)}
              className="group flex aspect-square items-center justify-center rounded-[24px] border border-[#EEEAE4] bg-[#FBFAF8] p-6 transition hover:shadow-sm"
            >
              <img
                src={logo.image}
                alt={logo.name}
                className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </button>
          ))}
        </div>
      </div>

      {selectedLogo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedLogo(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-[30px] bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedLogo(null)}
              className="absolute right-5 top-5 text-[11px] uppercase tracking-[0.18em] text-[#8A8178] underline underline-offset-4 hover:text-[#2F3A4A]"
            >
              Close
            </button>

            <div className="flex aspect-square w-full items-center justify-center rounded-[24px] bg-[#FAF8F5] p-8">
              <img
                src={selectedLogo.image}
                alt={selectedLogo.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="mt-5">
              <p className="text-lg font-medium text-[#2F3A4A]">
                {selectedLogo.name}
              </p>
              <p className="mt-1 text-sm text-[#8A8178]">
                {selectedLogo.group} · {selectedLogo.style}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
