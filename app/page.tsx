export default function HomePage() {
  const categories = [
    { title: "Sweatshirts", subtitle: "Cozy personalized layers for camp nights and cool mornings.", image: "/hoodie.jpeg", link: "/shop/sweatshirts" },
    { title: "Tees & Tanks", subtitle: "Easy everyday camp styles with a custom feel.", image: "/Tank.jpeg", link: "/shop/tees" },
    { title: "Bottoms", subtitle: "Custom shorts and easy camp-ready staples.", image: "/shorts.jpeg", link: "/shop/bottoms" },
    { title: "Sleepwear", subtitle: "Soft camp-ready pieces made for bedtime and bunk life.", image: "/sleepwear.jpg", link: "/shop/sleepwear" },
    { title: "Accessories", subtitle: "Thoughtful extras and gifts.", image: "/accessories.jpg", link: "/shop/accessories" },
  ];

  return (
    <main className="bg-[#F7F7F5] text-[#4B4B4B]">
      {/* Hero */}
      <section className="px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1fr_.95fr] md:gap-12">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#6F879E]">Just Made Custom</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-light leading-[1.05] text-[#3F3F3F] md:text-6xl">
              Custom camp clothing made for summer memories
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5D5D5D]">
              Personalized sweatshirts, tees, sleepwear, and thoughtful camp favorites designed to feel special, wearable, and easy to love all summer long.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/shop" className="rounded-full bg-[#6F879E] px-7 py-3 text-sm font-medium text-white transition hover:opacity-90">
                Shop Camp Favorites
              </a>
              <a href="/custom-orders" className="rounded-full border border-[#6F879E] px-7 py-3 text-sm font-medium text-[#6F879E] transition hover:bg-[#EEF2F5]">
                Start a Custom Order
              </a>
            </div>
          </div>
          <div>
            <div className="overflow-hidden rounded-[32px] border border-[#E6E2DD] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <img src="/hero-main.png" alt="Camp clothing" className="block h-[300px] w-full rounded-[26px] object-cover sm:h-[360px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">Shop</p>
            <h2 className="mt-3 text-3xl font-light text-[#3F3F3F] md:text-4xl">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <a
                key={category.title}
                href={category.link}
                className="group rounded-[28px] border border-[#E6E2DD] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
              >
                <img src={category.image} alt={category.title} className="block h-40 w-full rounded-[22px] bg-white object-cover transition duration-500 group-hover:scale-[1.03] sm:h-56" />
                <h3 className="mt-4 text-base font-medium text-[#3F3F3F] sm:text-lg">{category.title}</h3>
                <p className="mt-1 text-xs leading-6 text-[#666] sm:text-sm">{category.subtitle}</p>
                <p className="mt-3 text-sm font-medium text-[#6F879E]">Shop now →</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
