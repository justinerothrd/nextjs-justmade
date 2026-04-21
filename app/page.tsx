import { categories } from "@/lib/categories";

export default function HomePage() {
  return (
    <main className="bg-white text-[#4B4B4B]">
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden sm:h-[72vh] sm:min-h-[560px] md:h-[90vh] md:min-h-[700px]">
        <img
          src="/hero-mobile.png"
          alt="Custom apparel"
          className="absolute inset-0 h-full w-full object-cover sm:hidden"
          style={{ objectPosition: "50% 35%" }}
        />

        <img
          src="/hero-main.png"
          alt="Custom apparel"
          className="absolute inset-0 hidden h-full w-full object-cover object-center sm:block"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent sm:bg-black/20" />

        <div className="relative z-10 flex h-full items-end pb-14 sm:items-center sm:pb-0">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="inline-block sm:bg-transparent sm:p-0">
              <p
                className="text-left text-[16px] font-bold uppercase tracking-[0.12em] text-white sm:text-white/80 md:text-base"
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
              >
                MADE TO BE CUSTOM
              </p>

              <p
                className="mt-3 max-w-[500px] text-[28px] leading-[1.1] tracking-[0.01em] text-white sm:mt-4 sm:max-w-[640px] sm:text-4xl sm:leading-[1.22] md:text-5xl md:leading-[1.3]"
                style={{
                  fontFamily: "Glacial",
                  textShadow: "0 3px 20px rgba(0,0,0,0.45)",
                }}
              >
                Personalized gear for camp, college, and everyday.
              </p>

              <div className="mt-5 flex flex-row items-center gap-3 sm:mt-7 sm:gap-4">
                <a
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#2F3A4A] transition hover:opacity-90 sm:px-7 sm:py-3.5 sm:text-sm"
                >
                  Shop Camp
                </a>

                <a
                  href="/college"
                  className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/10 px-3.5 py-2 text-[12px] font-medium text-white backdrop-blur-sm transition hover:bg-white/20 sm:px-6 sm:py-3 sm:text-sm"
                >
                  Shop College
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-[34px] font-light leading-[1.02] tracking-[-0.02em] text-[#2F2F2F] sm:text-[44px] md:text-[56px]">
              Camp Collection
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`/shop/${category.slug}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-[22px] border border-[#ECE8E2] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:rounded-[26px]">
                 <div className="flex h-[260px] items-center justify-center p-4 sm:h-[320px]">
  <img
    src={product.images[0]}
    alt={product.name}
    className="h-[90%] w-[90%] object-contain transition duration-500 ease-out group-hover:scale-[1.03]"
  />
</div>
                </div>

                <div className="pt-3 text-center">
                  <h3 className="text-[15px] font-medium tracking-[0.01em] text-[#2F2F2F] sm:text-[17px]">
                    {category.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
