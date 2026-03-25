export default function HomePage() {
  const categories = [
    { title: "Sweatshirts", subtitle: "Cozy camp favorites" },
    { title: "Tees", subtitle: "Easy everyday essentials" },
    { title: "Sleepwear", subtitle: "Soft personalized pieces" },
    { title: "Accessories", subtitle: "Thoughtful finishing touches" },
  ];

  return (
    <main className="bg-[#F7F7F5] text-[#4B4B4B]">
      {/* Hero */}
      <section className="px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#6F879E]">
              Just Made Custom
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-light leading-[1.05] text-[#3F3F3F] md:text-6xl">
              Personalized camp clothing made to feel special
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5D5D5D]">
              Boutique-style sweatshirts, tees, sleepwear, and custom favorites
              for sleepaway camp, visiting day, bunk gifts, and all the moments
              families want to remember.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/shop"
                className="rounded-full bg-[#6F879E] px-7 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Shop Camp Favorites
              </a>

              <a
                href="/custom-orders"
                className="rounded-full border border-[#6F879E] px-7 py-3 text-sm font-medium text-[#6F879E] transition hover:bg-[#EEF2F5]"
              >
                Start a Custom Order
              </a>
            </div>
          </div>

          <div>
            <div className="rounded-[32px] border border-[#E6E2DD] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <div className="grid gap-5">
                <div className="h-[360px] rounded-[26px] bg-[#ECE8E2]" />
                <div className="grid grid-cols-2 gap-5">
                  <div className="h-36 rounded-[22px] bg-[#EEF2F5]" />
                  <div className="h-36 rounded-[22px] bg-[#F2F0EB]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-light">Shop by Category</h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <a
              key={category.title}
              href="/shop"
              className="group rounded-[28px] border border-[#E6E2DD] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
            >
              <div className="h-56 rounded-[22px] bg-[#F1EFEB]" />
              <h3 className="mt-5 text-xl font-medium text-[#3F3F3F]">
                {category.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#666]">
                {category.subtitle}
              </p>
              <p className="mt-4 text-sm font-medium text-[#6F879E]">
                Explore
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
