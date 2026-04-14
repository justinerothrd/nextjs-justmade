export default function HomePage() {
  const categories = [
    {
      slug: "sweatshirts",
      title: "Sweatshirts",
      subtitle: "Cozy personalized layers for camp nights and cool mornings.",
      image: "/hoodie-preview-tight.png",
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
      image: "/tulane.sleepshorts.jpg",
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
      <section className="px-4 pb-12 pt-8 sm:px-6 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_.95fr] md:gap-12">
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.28em] text-[#6F879E]">
              Just Made Custom
            </p>

            <h1 className="mt-4 text-3xl font-light leading-tight text-[#3F3F3F] sm:text-4xl md:text-6xl">
              Custom camp clothing made for summer memories
            </h1>

            <p className="mt-4 text-base leading-7 text-[#5D5D5D] sm:text-lg sm:leading-8">
              Personalized sweatshirts, tees, sleepwear, and thoughtful camp favorites designed to feel special, wearable, and easy to love all summer long.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 md:mt-8 md:justify-start md:gap-4">
              <a
                href="/shop"
                className="rounded-full bg-[#6F879E] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Shop Camp Favorites
              </a>

              <a
                href="/custom-orders"
                className="rounded-full border border-[#6F879E] px-6 py-3 text-sm font-medium text-[#6F879E] transition hover:bg-[#EEF2F5]"
              >
                Start a Custom Order
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-[#E6E2DD] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-5">
            <img
              src="/hero-main.png"
              alt="Camp clothing"
              className="block h-[260px] w-full rounded-[26px] object-cover sm:h-[360px] md:h-[420px]"
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 sm:mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#6F879E]">
              Shop
            </p>

            <h2 className="mt-2 text-2xl font-light text-[#3F3F3F] sm:text-3xl md:text-4xl">
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <a
                key={category.title}
                href={category.link}
                className="group rounded-[24px] border border-[#E6E2DD] bg-white p-3 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-transparent hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:rounded-[28px] sm:p-4"
              >
                <div className="overflow-hidden rounded-[18px] bg-white sm:rounded-[22px]">
                  <div className="flex h-32 items-end justify-center sm:h-48 md:h-56">
                    <img
                      src={category.image}
                      alt={category.title}
                      className={
                        category.slug === "sweatshirts"
                          ? "fade-in h-full w-full object-contain p-3 sm:p-4 scale-[1.04] transition duration-500 ease-out"
                          : category.slug === "accessories"
                          ? "fade-in h-full w-full object-contain p-3 sm:p-4 transition duration-500 ease-out"
                          : "fade-in h-full w-full object-contain p-3 sm:p-4 transition duration-500 ease-out"
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
