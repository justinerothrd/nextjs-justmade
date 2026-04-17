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
      image: "/bottoms.jpg",
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
      <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden sm:h-[68vh] sm:min-h-[480px] md:h-[80vh] md:min-h-[560px]">
  <img
    src="/hero-main.png"
    alt="Custom apparel"
    className="absolute inset-0 h-full w-full object-cover object-top sm:object-center"
  />

  <div className="absolute inset-0 bg-black/10 sm:bg-black/20" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <p className="text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 sm:text-[13px] md:text-base">
              MADE TO BE CUSTOM
            </p>

            <p
              className="mt-3 max-w-[640px] text-[26px] leading-[1.15] tracking-[0.01em] text-white/90 sm:mt-4 sm:text-4xl sm:leading-[1.22] md:max-w-[700px] md:text-5xl md:leading-[1.3]"
              style={{ fontFamily: "Glacial" }}
            >
              Personalized gear for camp, college, and everyday.
            </p>

            <div className="mt-5 flex flex-col items-start gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="/shop"
                className="inline-flex w-[150px] items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#2F3A4A] transition hover:opacity-90 sm:w-auto sm:px-7 sm:py-3.5"
              >
                Shop Camp
              </a>

              <a
                href="/college"
                className="inline-flex w-[150px] items-center justify-center rounded-full border border-white/80 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 sm:w-auto sm:px-7 sm:py-3.5"
              >
                Shop College
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl font-light text-[#3F3F3F] sm:text-3xl md:text-4xl">
              Shop Camp by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <a
                key={category.title}
                href={category.link}
                className="group rounded-[20px] border border-[#E6E2DD] bg-white p-2.5 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-transparent hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:rounded-[24px] sm:p-4"
              >
                <div className="overflow-hidden rounded-[16px] bg-white sm:rounded-[22px]">
                  <div className="flex aspect-[4/5] items-end justify-center sm:h-48 sm:aspect-auto md:h-56">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-contain p-2 transition duration-500 ease-out sm:p-3"
                    />
                  </div>
                </div>

                <h3 className="mt-3 text-[13px] font-medium text-[#3F3F3F] sm:mt-4 sm:text-base md:text-lg">
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
