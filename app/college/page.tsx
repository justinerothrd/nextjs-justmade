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
      <section className="px-4 pb-12 pt-8 sm:px-6 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_.95fr] md:gap-12">
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.28em] text-[#6F879E]">
              Just Made Custom
            </p>

            <h1 className="mt-4 text-3xl font-light leading-tight text-[#3F3F3F] sm:text-4xl md:text-6xl">
              Custom college clothing made to feel personal
            </h1>

            <p className="mt-4 text-base leading-7 text-[#5D5D5D] sm:text-lg sm:leading-8">
              Personalized sweatshirts, tees, sleepwear, and thoughtful college
              favorites designed to feel polished, wearable, and easy to love.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 md:mt-8 md:justify-start md:gap-4">
              <a
                href="/college/sweatshirts"
                className="rounded-full bg-[#6F879E] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Shop College
              </a>

              <a
                href="/designs"
                className="rounded-full border border-[#6F879E] px-6 py-3 text-sm font-medium text-[#6F879E] transition hover:bg-[#EEF2F5]"
              >
                Browse Designs
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

          <div className="overflow-hidden rounded-[32px] border border-[#E6E2DD] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-5">
            <img
              src={collegeProducts["college-crewneck"].images[0]}
              alt="College clothing"
              className="block h-[260px] w-full rounded-[26px] object-cover sm:h-[360px] md:h-[420px]"
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 sm:mb-8">
            <h2 className="mt-2 text-2xl font-light text-[#3F3F3F] sm:text-3xl md:text-4xl">
              Shop College by Category
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#666]">
              Custom college favorites — cozy layers, everyday tees, sleepwear,
              and thoughtful extras.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
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
                          ? "h-full w-full scale-[1.05] object-contain p-2 transition duration-500 ease-out sm:p-3"
                          : category.slug === "accessories"
                          ? "h-full w-full scale-[1.03] object-contain p-3 transition duration-500 ease-out sm:p-4"
                          : "h-full w-full scale-[1.14] object-contain p-2 transition duration-500 ease-out sm:p-3"
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
