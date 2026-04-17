import { products } from "@/lib/products";

const categories = [
  {
    slug: "sweatshirts",
    title: "Sweatshirts",
    subtitle: "Cozy personalized layers for camp nights and cool mornings.",
    image: products.hoodie.images[0],
  },
  {
    slug: "tees",
    title: "Tees & Tanks",
    subtitle: "Easy everyday camp styles with a custom feel.",
    image: products["tank-top"].images[0],
  },
  {
    slug: "bottoms",
    title: "Bottoms",
    subtitle: "Custom shorts and easy camp-ready staples.",
    image: products["custom-shorts"].images[0],
  },
  {
    slug: "sleepwear",
    title: "Sleepwear",
    subtitle: "Soft camp-ready pieces made for bedtime and bunk life.",
    image: products.sleepwear.images[0],
  },
  {
    slug: "accessories",
    title: "Accessories",
    subtitle: "Thoughtful extras and gifts.",
    image: products["accessories-slides"].images[0],
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white text-[#2F3A4A]">
      <section className="px-4 pb-4 pt-6 text-center sm:px-6 sm:pb-8 sm:pt-10">
        <p className="text-xs uppercase tracking-[0.22em] text-[#6F879E] sm:text-sm"></p>

        <h1 className="mt-3 text-3xl font-light sm:mt-4 sm:text-5xl md:text-6xl"></h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:mt-4 sm:text-lg sm:leading-8"></p>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="group rounded-[20px] border border-[#E6E2DD] bg-white p-2.5 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-transparent hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:rounded-[28px] sm:p-4"
            >
              <div className="overflow-hidden rounded-[16px] bg-white sm:rounded-[20px]">
                <div className="flex aspect-[4/5] items-end justify-center sm:h-60 sm:aspect-auto">
                  <img
                    src={category.image}
                    alt={category.title}
                    className={
                      category.slug === "sweatshirts"
                        ? "fade-in h-full w-full scale-[1.06] object-contain p-2.5 transition duration-500 ease-out sm:p-5"
                        : "fade-in h-full w-full scale-[1.1] object-contain p-2.5 transition duration-500 ease-out sm:p-3"
                    }
                  />
                </div>
              </div>

              <h3 className="mt-3 text-[13px] font-medium text-[#3F3F3F] sm:mt-4 sm:text-lg">
                {category.title}
              </h3>

              <p className="mt-1 hidden text-[11px] leading-5 text-[#666] sm:block sm:text-sm sm:leading-6">
  {category.subtitle}
</p>

              <p className="mt-2 text-xs font-medium text-[#6F879E] sm:mt-3 sm:text-sm">
                Shop now →
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
