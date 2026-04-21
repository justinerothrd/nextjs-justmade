import { collegeProducts } from "@/lib/college-products";

const categories = [
  {
    slug: "sweatshirts",
    title: "Sweatshirts",
    image: collegeProducts["college-crewneck"].images[0],
    imageClassName: "scale-[1.00]",
  },
  {
    slug: "tees",
    title: "Tees & Tanks",
    image: collegeProducts["college-tee"].images[0],
    imageClassName: "scale-[0.92]",
  },
  {
    slug: "bottoms",
    title: "Bottoms",
    image: collegeProducts["college-shorts"].images[0],
    imageClassName: "scale-[0.98]",
  },
  {
    slug: "sleepwear",
    title: "Sleep & Loungewear",
    image: collegeProducts["college-sleepwear"].images[0],
    imageClassName: "scale-[0.96]",
  },
  {
    slug: "accessories",
    title: "Accessories & Gifts",
    image: collegeProducts["college-slides"].images[0],
    imageClassName: "scale-[0.88]",
  },
] as const;

export default function CollegePage() {
  return (
    <main className="bg-white text-[#4B4B4B]">
      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 sm:mb-14">
            <h1 className="text-[30px] font-light leading-[1.02] tracking-[-0.02em] text-[#2F2F2F] sm:text-[38px] md:text-[48px]">
              College Collection
            </h1>

            <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#6B7280] sm:text-[17px] sm:leading-[1.7]">
              Unique and fun designs for everything you need at college.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`/college/${category.slug}`}
                className="group block transition duration-300 ease-out hover:-translate-y-[2px]"
              >
                <div className="overflow-hidden rounded-[22px] border border-[#F0ECE6] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:rounded-[26px]">
                  <div className="flex h-[260px] items-center justify-center p-4 sm:h-[320px]">
  <img
    src={product.images[0]}
    alt={product.name}
    className="h-[90%] w-[90%] object-contain transition duration-500 ease-out group-hover:scale-[1.03]"
  />
</div>
                </div>

                <div className="mt-3 text-center">
                  <h3 className="text-[15px] font-medium tracking-wide text-[#2F2F2F] sm:text-[16px]">
                    {category.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
