export default function HomePage() {
  const categories = [
    {
      slug: "sweatshirts",
      title: "Sweatshirts",
      subtitle: "Cozy personalized layers for camp nights and cool mornings.",
      image: "/hoodie.jpeg",
      link: "/shop/sweatshirts",
    },
    {
      slug: "tees",
      title: "Tees & Tanks",
      subtitle: "Easy everyday camp styles with a custom feel.",
      image: "/Tank.jpeg",
      link: "/shop/tees",
    },
    {
      slug: "bottoms",
      title: "Bottoms",
      subtitle: "Custom shorts and easy camp-ready staples.",
      image: "/shorts.jpeg",
      link: "/shop/bottoms",
    },
    {
      slug: "sleepwear",
      title: "Sleepwear",
      subtitle: "Soft camp-ready pieces made for bedtime and bunk life.",
      image: "/sleepwear.jpg",
      link: "/shop/sleepwear",
    },
    {
      slug: "accessories",
      title: "Accessories",
      subtitle: "Thoughtful extras and gifts.",
      image: "/accessories.jpg",
      link: "/shop/accessories",
    },
  ];

  return (
    <main className="bg-[#F7F7F5] text-[#4B4B4B]">
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <img
          src="/hero-main.png"
          alt="Custom apparel"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-14 sm:pb-20">
            <p className="text-left text-base font-semibold uppercase tracking-[0.28em] text-white/90 sm:text-lg">
  MADE TO BE CUSTOM
</p>

<p
  className="mt-5 max-w-xl text-[26px] leading-[1.4] tracking-[0.02em] text-white sm:text-[32px] md:text-[38px]"
  style={{ fontFamily: "Glacial" }}
>
  Personalized gear for camp, college, and everyday.
</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/shop"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[#2F3A4A] transition hover:opacity-90"
              >
                Shop Camp
              </a>

              <a
                href="/college"
                className="rounded-full border border-white/80 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Shop College
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl font-light text-[#3F3F3F] sm:text-3xl md:text-4xl">
              Shop Camp by Category
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#666]">
              Cozy layers, everyday tees, sleepwear, and thoughtful extras.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <a
                key={category.title}
                href={category.link}
                className="group rounded-[24px] border border-[#E6E2DD] bg-white p-3 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-transparent hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-4"
              >
                <div className="overflow-hidden rounded-[18px] bg-white sm:rounded-[22px]">
                  <div className="flex h-32 items-end justify-center sm:h-48 md:h-56">
                    <img
                      src={category.image}
                      alt={category.title}
                      className={
                        category.slug === "sweatshirts"
                          ? "h-full w-full scale-[1.03] object-contain p-2 transition duration-500 ease-out sm:p-3"
                          : "h-full w-full object-contain p-2 transition duration-500 ease-out sm:p-3"
                      }
                    />
                  </div>
                </div>

                <h3 className="mt-3 text-sm font-medium text-[#3F3F3F] sm:mt-4 sm:text-base md:text-lg">
                  {category.title}
                </h3>

                <p className="mt-1 hidden text-xs leading-5 text-[#666] sm:block sm:leading-6">
                  {category.subtitle}
                </p>

                <p className="mt-2 text-xs font-medium text-[#6F879E] sm:mt-3 sm:text-sm">
                  Shop now →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
