"use client";

import Image from "next/image";
import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { logos } from "@/app/data/logos";

const styles = ["All", "Varsity", "Minimal", "Script", "Classic", "Icon"] as const;

function DesignsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const returnTo = searchParams.get("returnTo") || "/shop";

  const [activeStyle, setActiveStyle] =
    useState<(typeof styles)[number]>("All");

  const [selectedLogo, setSelectedLogo] = useState<null | {
    image: string;
    name: string;
    group: string;
    style: string;
  }>(null);

  const visibleLogos = useMemo(() => {
    const realLogos = logos.filter((logo) => logo.slug !== "custom-logo");

    if (activeStyle === "All") return realLogos;
    return realLogos.filter((logo) => logo.style === activeStyle);
  }, [activeStyle]);

  const featured = visibleLogos.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-10 text-[#4B4B4B] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex items-start justify-between gap-6">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#8A8178]">
              Just Made Custom
            </p>

            <h1 className="text-[38px] font-light leading-[1.05] tracking-[-0.03em] text-[#2F3A4A] sm:text-[58px]">
              Design Library
            </h1>

            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#6B7280]">
              Explore our collection of camp and college designs. Every piece
              can be customized for your camp, school, or group.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push(returnTo)}
            className="shrink-0 text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
          >
            Back to product
          </button>
        </div>

        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A8178]">
                Featured
              </p>
          
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((logo) => (
              <button
                key={logo.slug}
                type="button"
                onClick={() =>
                  setSelectedLogo({
                    image: logo.image,
                    name: logo.name,
                    group: logo.group,
                    style: logo.style,
                  })
                }
                className="group text-left rounded-[34px] border border-[#ECE7E1] bg-white p-5 shadow-[0_12px_34px_rgba(0,0,0,0.035)] transition hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(0,0,0,0.06)]"
              >
                <div className="relative aspect-square overflow-hidden rounded-[26px] bg-transparent">
                 <Image
  src={selectedLogo.image}
  alt={selectedLogo.name}
  fill
/>
                    
                    className="object-contain p-7 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-5">
                  <p className="text-[15px] font-medium text-[#2F3A4A]">
                    {logo.name}
                  </p>
                  <p className="mt-1 text-[13px] text-[#8A8178]">
                    {logo.group} · {logo.style}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A8178]">
                Browse
              </p>
              <h2 className="mt-2 text-2xl font-light text-[#2F3A4A]">
                All designs
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {styles.map((style) => {
                const active = activeStyle === style;

                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setActiveStyle(style)}
                    className={`rounded-full border px-4 py-2 text-[13px] transition ${
                      active
                        ? "border-[#2F3A4A] bg-[#2F3A4A] text-white"
                        : "border-[#D8D3CD] bg-white text-[#2F3A4A] hover:border-[#6F879E]"
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
            {visibleLogos.map((logo, index) => (
              <button
                key={logo.slug}
                type="button"
                onClick={() =>
                  setSelectedLogo({
                    image: logo.image,
                    name: logo.name,
                    group: logo.group,
                    style: logo.style,
                  })
                }
                className="mb-4 w-full break-inside-avoid rounded-[28px] border border-[#ECE7E1] bg-white p-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.025)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.045)]"
              >
                <div
                  className={`relative overflow-hidden rounded-[22px] bg-transparent ${
                    index % 5 === 0 ? "aspect-[4/5]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    />
                    className="object-contain p-5 transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-[#2F3A4A]">
                    {logo.name}
                  </p>
                  <p className="mt-1 text-xs text-[#8A8178]">
                    {logo.group} · {logo.style}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {selectedLogo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedLogo(null)}
        >
          <div
            className="w-full max-w-xl rounded-[30px] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-[24px] bg-transparent"
              <Image
                src={selectedLogo.image}
                alt={selectedLogo.name}
                fill
                className="object-contain p-8"
              />
            </div>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-medium text-[#2F3A4A]">
                  {selectedLogo.name}
                </p>
                <p className="mt-1 text-sm text-[#8A8178]">
                  {selectedLogo.group} · {selectedLogo.style}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLogo(null)}
                className="rounded-full border border-[#E5E1DB] px-4 py-2 text-sm text-[#2F3A4A] transition hover:border-[#6F879E]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function DesignsPage() {
  return (
    <Suspense fallback={null}>
      <DesignsPageContent />
    </Suspense>
  );
}
