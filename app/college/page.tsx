import { collegeProducts } from "@/lib/college-products";

const categories = [
  {
    slug: "sweatshirts",
    title: "Sweatshirts",
    subtitle: "Custom college sweatshirts and cozy layers.",
    image: collegeProducts["college-crewneck"].images[0],
  },
  {
    slug: "tees",
    title: "Tees & Tanks",
    subtitle: "Easy college tees and tanks with a custom feel.",
    image: collegeProducts["college-tee"].images[0],
  },
  {
    slug: "bottoms",
    title: "Bottoms",
    subtitle: "Custom shorts and easy everyday staples.",
    image: collegeProducts["college-shorts"].images[0],
  },
  {
    slug: "sleepwear",
    title: "Sleepwear",
    subtitle: "Soft college sleepwear made for comfort.",
    image: collegeProducts["college-sleepwear"].images[0],
  },
  {
    slug: "accessories",
    title: "Accessories",
    subtitle: "Thoughtful extras and gifts.",
    image: collegeProducts["college-slides"].images[0],
  },
];

export default function CollegePage() {
  return (
    <main className="min-h-screen bg-white text-[#2F3A4A]">
      <section className="px-4 pb-6 pt-8 text-center sm:px-6 sm:pb-8 sm:pt-10">
        <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
          Just Made Custom
        </p>

        <h1 className="mt-4 text-4xl font-light sm:text-5xl md:text-6xl">
          College
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
          Custom college gear designed to feel polished, personal, and easy to wear.
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`/college/${category.slug}`}
              className="group rounded-[28px] border border-[#E6E2DD] bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:border-transparent"
            >
              <div className="overflow-hidden rounded-[20px] bg-white">
                <div className="flex h-44 items-end justify-center sm:h-60">
                  <img
                    src={category.image}
                    alt={category.title}
                    className={
                      category.slug === "sweatshirts"
                        ? "fade-in h-full w-full object-contain p-2 sm:p-3 scale-[1.08] transition duration-500 ease-out"
                        : category.slug === "accessories"
                        ? "fade-in h-full w-full object-contain p-3 sm:p-4 scale-[1.05] transition duration-500 ease-out"
                        : "fade-in h-full w-full object-contain p-1 sm:p-2 scale-[1.24] transition duration-500 ease-out"
                    }
                  />
                </div>
              </div>

              <h3 className="mt-4 text-base font-medium text-[#3F3F3F] sm:text-lg">
                {category.title}
              </h3>

              <p className="mt-1 text-xs leading-6 text-[#666] sm:text-sm">
                {category.subtitle}
              </p>

              <p className="mt-3 text-sm font-medium text-[#6F879E]">
                Shop now →
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
