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
    <main className="bg-[#F7F7F5] text-[#4B4B4B]">
      <section className="px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#6F879E]">
            </p>

            <h1 className="mt-4 text-4xl font-light text-[#2F3A4A] sm:text-5xl md:text-6xl">
              Shop College
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
              Custom college clothing designed for you.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`/college/${category.slug}`}
                className="group rounded-[24px] border border-[#E6E2DD] bg-white p-3 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-transparent hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-4"
              >
                <div className="overflow-hidden rounded-[18px] bg-white sm:rounded-[22px]">
                  <div className="flex h-32 items-end justify-center sm:h-48 md:h-56">
                    <img
                      src={category.image}
                      alt={category.title}
                      className={
                        category.slug === "sweatshirts"
                          ? "h-full w-full object-contain p-2 sm:p-3 scale-[1.03] transition duration-500 ease-out"
                          : category.slug === "accessories"
                          ? "h-full w-full object-contain p-3 sm:p-4 scale-[1.02] transition duration-500 ease-out"
                          : "h-full w-full object-contain p-2 sm:p-3 transition duration-500 ease-out"
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
