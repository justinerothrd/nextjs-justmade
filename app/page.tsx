export default function HomePage() {
  const categories = [
    { title: "Sweatshirts", subtitle: "Cozy personalized layers for camp nights and cool mornings.", image: "/hoodie.center-preview.png", link: "/shop/sweatshirts" },
    { title: "Tees & Tanks", subtitle: "Easy everyday camp styles with a custom feel.", image: "/Tank.jpeg", link: "/shop/tees" },
    { title: "Bottoms", subtitle: "Custom shorts and easy camp-ready staples.", image: "/shorts.jpeg", link: "/shop/bottoms" },
    { title: "Sleepwear", subtitle: "Soft camp-ready pieces made for bedtime and bunk life.", image: "/sleepwear.jpg", link: "/shop/sleepwear" },
    { title: "Accessories", subtitle: "Thoughtful extras and gifts.", image: "/accessories.jpg", link: "/shop/accessories" },
  ];

  return (
    <main className="bg-[#F7F7F5] text-[#4B4B4B]">

      {/* Hero */}
      <section className="px-4 pb-12 pt-8 sm:px-6 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-7xl grid items-center gap-8 md:grid-cols-[1fr_.95fr] md:gap-12">
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.28em] text-[#6F879E]">Just Made Custom</p>
            <h1 className="mt-4 text-3xl font-light leading-tight text-[#3F3F3F] sm:text-4xl md:text-6xl">
              Custom camp clothing made for summer memories
            </h1>
            <p className="mt-4 text-base leading-7 text-[#5D5D5D] sm:text-lg sm:leading-8">
              Personalized sweatshirts, tees, sleepwear, and thoughtful camp favorites designed to feel special, wearable, and easy to love all summer long.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start md:mt-8 md:gap-4">
              <a href="/shop" className="rounded-full bg-[#6F879E] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90">
                Shop Camp Favorites
              </a>
              <a href="/custom-orders" className="rounded-full border border-[#6F879E] px-6 py-3 text-sm font-medium text-[#6F879E] transition hover:bg-[#EEF2F5]">
                Start a Custom Order
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-[#E6E2DD] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-5">
            <img
              src="/hero-main.png"
              alt="Camp clothing"
              className="block w-full rounded-[26px] object-cover h-[260px] sm:h-[360px] md:h-[420px]"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 sm:mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#6F879E]">Shop</p>
            <h2 className="mt-2 text-2xl font-light text-[#3F3F3F] sm:text-3xl md:text-4xl">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <a
                key={category.title}
                href={category.link}
                className="group rounded-[24px] border border-[#E6E2DD] bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] sm:rounded-[28px] sm:p-4"
              >
                <div className="overflow-hidden rounded-[18px] sm:rounded-[22px]">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="block h-32 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-48 md:h-56"
                  />
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
