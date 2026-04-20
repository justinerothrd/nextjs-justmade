import { collegeProducts } from "@/lib/college-products";

const categoryMeta = {
  sweatshirts: {
    title: "Sweatshirts",
  },
  tees: {
    title: "Tees & Tanks",
  },
  bottoms: {
    title: "Bottoms",
  },
  sleepwear: {
    title: "Sleep & Loungewear",
  },
  accessories: {
    title: "Accessories & Gifts",
  },
} as const;

const categoryProductSlugs = {
  sweatshirts: ["college-crewneck", "college-hoodie"],
  tees: ["college-tee", "college-tank"],
  bottoms: ["college-shorts"],
  sleepwear: ["college-sleepwear", "college-sleepwear-set"],
  accessories: ["college-slides", "college-socks"],
} as const;

type CategorySlug = keyof typeof categoryMeta;
type ProductSlug = keyof typeof collegeProducts;

export default async function CollegeCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;

  const meta = categoryMeta[categorySlug as CategorySlug];
  const slugs = categoryProductSlugs[categorySlug as CategorySlug];

  if (!meta || !slugs) {
    return (
      <main className="min-h-screen bg-white text-[#2F3A4A]">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-light">Category not found</h1>
            <a
              href="/college"
              className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]"
            >
              Back to College
            </a>
          </div>
        </div>
      </main>
    );
  }

  const categoryProducts = slugs.map((slug) => ({
    slug,
    ...collegeProducts[slug as ProductSlug],
  }));

  return (
    <main className="bg-white text-[#4B4B4B]">
      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 sm:mb-14">
            <h1 className="text-[30px] font-light leading-[1.02] tracking-[-0.02em] text-[#2F2F2F] sm:text-[38px] md:text-[48px]">
              {meta.title}
            </h1>

            <a
              href="/college"
              className="mt-5 inline-block text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
            >
              Back to All Categories
            </a>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProducts.map((product) => (
              <a
                key={product.slug}
                href={`/college/product/${product.slug}`}
                className="group block transition duration-300 ease-out hover:-translate-y-[2px]"
              >
                <div className="overflow-hidden rounded-[22px] border border-[#F0ECE6] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:rounded-[26px]">
                  <div className="flex h-[260px] items-center justify-center p-3 sm:h-[320px] sm:p-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-contain scale-[0.92] transition duration-500 ease-out group-hover:scale-[0.96]"
                    />
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <h3 className="text-[15px] font-medium tracking-wide text-[#2F2F2F] sm:text-[16px]">
                    {product.name}
                  </h3>

                  <div className="mx-auto mt-3 h-[1px] w-6 bg-[#D8D8D8]"></div>

                  <p className="mt-2 text-[13px] text-[#6B7280] sm:text-[14px]">
                    {product.price}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
