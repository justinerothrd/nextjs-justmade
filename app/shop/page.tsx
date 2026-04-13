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
      <section className="px-4 pb-6 pt-8 text-center sm:px-6 sm:pb-8 sm:pt-10">
        <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
          Just Made Custom
        </p>

        <h1 className="mt-4 text-4xl font-light sm:text-5xl md:text-6xl">
          Shop
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
          Custom camp clothing designed to feel easy, polished, and special.
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="group rounded-[26px] border border-[#E6E2DD] bg-white p-4 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="flex h-[180px] items-center justify-center overflow-hidden rounded-[20px] bg-[#F7F7F5] sm:h-[220px]">
                <img
                  src={category.image}
                  alt={category.title}
                  className={
                    category.slug === "accessories"
                      ? "h-[78%] w-[78%] object-contain transition duration-500 ease-out group-hover:scale-[1.03]"
                      : category.slug === "sleepwear"
                      ? "h-[82%] w-[82%] object-contain transition duration-500 ease-out group-hover:scale-[1.04]"
                      : "h-[90%] w-[90%] object-contain transition duration-500 ease-out group-hover:scale-[1.04]"
                  }
                />
              </div>

              <div className="pt-4">
                <h3 className="text-[15px] font-medium text-[#2F3A4A] sm:text-[17px]">
                  {category.title}
                </h3>

                <p className="mt-1 text-[12px] leading-6 text-[#666] sm:text-sm">
                  {category.subtitle}
                </p>

                <p className="mt-3 text-sm font-medium text-[#6F879E]">
                  Shop now →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
