import { categories } from "@/lib/categories";

export default function ShopPage() {
  return (
    <main className="bg-white text-[#4B4B4B]">
      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 sm:mb-14">
            <h1 className="text-[36px] font-light leading-[1.02] tracking-[-0.02em] text-[#2F2F2F] sm:text-[48px] md:text-[60px]">
              Camp Collection
            </h1>

            <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#6B7280] sm:text-[17px] sm:leading-[1.7]">
              Custom apparel and accessories designed for all things camp.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`/shop/${category.slug}`}
                className="group block transition duration-300 ease-out hover:-translate-y-[2px]"
              >
                <div className="overflow-hidden rounded-[22px] border border-[#F0ECE6] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:rounded-[26px]">
                  <div className="flex h-[240px] items-end justify-center p-3 sm:h-[280px] sm:p-4">
                    <img
  src={category.image}
  alt={category.title}
  className="h-full w-full object-contain object-bottom transition duration-500 ease-out group-hover:scale-[1.02]"
/>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <h3 className="mt-3 text-center text-[14px] font-medium text-[#2F3A4A] sm:mt-4 sm:text-[15px] md:text-[16px]">
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
