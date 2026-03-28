const categories = [
  { slug: "sweatshirts", title: "Sweatshirts", subtitle: "Custom college crewnecks and sweatshirts.", image: "/tulane-crewneck.jpeg" },
  { slug: "tees", title: "Tees & Tanks", subtitle: "Easy everyday college styles with a custom feel.", image: "/tulane-tee.jpeg" },
  { slug: "bottoms", title: "Bottoms", subtitle: "Custom shorts and easy college-ready staples.", image: "/shorts.jpeg" },
  { slug: "sleepwear", title: "Sleepwear", subtitle: "Soft personalized pieces made for bedtime.", image: "/sleepwear.jpg" },
  { slug: "accessories", title: "Accessories", subtitle: "Thoughtful extras and gifts.", image: "/accessories.jpg" },
];

export default function CollegePage() {
  return (
    <main className="min-h-screen bg-white text-[#2F3A4A]">
      <section className="px-4 pb-6 pt-8 text-center sm:px-6 sm:pb-8 sm:pt-10">
        <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">Just Made Custom</p>
        <h1 className="mt-4 text-4xl font-light sm:text-5xl md:text-6xl">College Gear</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
          Custom college clothing personalized for any school. Just tell us your college!
        </p>
      </section>
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`/college/${category.slug}`}
              className="group rounded-[28px] border border-[#E6E2DD] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
            >
              <div className={`overflow-hidden rounded-[20px] ${category.slug === "accessories" ? "bg-white" : "bg-[#F7F7F5]"}`}>
                {category.slug === "accessories" ? (
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-40 w-full object-contain p-3 transition duration-500 group-hover:scale-[1.03] sm:h-56"
                  />
                ) : (
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-56"
                  />
                )}
              </div>
              <h3 className="mt-4 text-base font-medium text-[#3F3F3F] sm:text-lg">{category.title}</h3>
              <p className="mt-1 text-xs leading-6 text-[#666] sm:text-sm">{category.subtitle}</p>
              <p className="mt-3 text-sm font-medium text-[#6F879E]">Shop now →</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
