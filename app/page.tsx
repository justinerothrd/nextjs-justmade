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
      {/* HERO */}
      <section className="px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div className="max-w-2xl text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-[#6F879E]">
              Made to be custom
            </p>

            <h1 className="mt-5 text-4xl font-light leading-[1.08] text-[#3F3F3F] sm:text-5xl md:text-6xl">
              Custom pieces for camp,
              college, and everyday wear.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#5D5D5D] sm:text-lg lg:mx-0 mx-auto">
              Designed to feel personal, wearable, and easy to love.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href="/shop"
                className="rounded-full bg-[#6F879E] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Shop Camp
              </a>

              <a
                href="/college"
                className="rounded-full border border-[#6F879E] px-6 py-3 text-sm font-medium text-[#6F879E] transition hover:bg-[#EEF2F5]"
              >
                Shop College
              </a>
            </div>

            <div className="mt-4">
              <a
                href="/custom-orders"
                className="text-sm font-medium text-[#6F879E] underline underline-offset-4 transition hover:opacity-80"
              >
                Need something custom? Start a custom order
              </a>
            </div>
          </div>

          <div className="lg:pl-2">
            <img
              src="/hero-main.png"
              alt="Custom apparel"
              className="block h-[360px] w-full rounded-[32px] object-cover sm:h-[430px] lg:h-[520px]"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20">
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
