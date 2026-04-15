import { collegeProducts } from "@/lib/college-products";

const categoryMeta = {
  sweatshirts: {
    title: "Sweatshirts",
    subtitle: "Custom college sweatshirts and cozy layers.",
  },
  tees: {
    title: "Tees & Tanks",
    subtitle: "Easy college tees and tanks with a custom feel.",
  },
  bottoms: {
    title: "Bottoms",
    subtitle: "Custom shorts and easy everyday staples.",
  },
  sleepwear: {
    title: "Sleepwear",
    subtitle: "Soft college sleepwear made for comfort.",
  },
  accessories: {
    title: "Accessories",
    subtitle: "Thoughtful extras and gifts.",
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
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7F5] text-[#2F3A4A]">
        <div className="text-center">
          <h1 className="text-3xl font-light">Category not found</h1>
          <a
            href="/college"
            className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]"
          >
            Back to College
          </a>
        </div>
      </main>
    );
  }

  const categoryProducts = slugs.map((slug) => ({
    slug,
    ...collegeProducts[slug as ProductSlug],
  }));

  return (
    <main className="min-h-screen bg-[#F7F7F5] text-[#4B4B4B]">
      <section className="px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#6F879E]">
                Just Made Custom
              </p>

              <h1 className="mt-4 text-4xl font-light text-[#3F3F3F] sm:text-5xl md:text-6xl">
                {meta.title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#666] sm:text-lg sm:leading-8">
                {meta.subtitle}
              </p>
            </div>

            <a
              href="/college"
              className="text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
            >
              Back to All Categories
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <a
              key={product.slug}
              href={`/college/product/${product.slug}`}
              className="group rounded-[24px] border border-[#E6E2DD] bg-white p-3 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-transparent hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-4"
            >
              <div className="overflow-hidden rounded-[18px] bg-white sm:rounded-[22px]">
                <div className="flex h-40 items-end justify-center sm:h-56 md:h-64">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={
                      product.slug === "college-crewneck"
                        ? "h-full w-full scale-[1.02] object-contain p-2 transition duration-500 ease-out sm:p-3"
                        : product.slug === "college-hoodie"
                        ? "h-full w-full scale-[1.02] object-contain p-2 transition duration-500 ease-out sm:p-3"
                        : product.slug === "college-slides"
                        ? "h-full w-full scale-[1.02] object-contain p-3 transition duration-500 ease-out sm:p-4"
                        : product.slug === "college-socks"
                        ? "h-full w-full scale-[1.02] object-contain p-3 transition duration-500 ease-out sm:p-4"
                        : product.slug === "college-tee"
                        ? "h-full w-full scale-[1.10] object-contain p-2 transition duration-500 ease-out sm:p-3"
                        : product.slug === "college-tank"
                        ? "h-full w-full scale-[1.10] object-contain p-2 transition duration-500 ease-out sm:p-3"
                        : product.slug === "college-shorts"
                        ? "h-full w-full scale-[1.08] object-contain p-2 transition duration-500 ease-out sm:p-3"
                        : "h-full w-full object-contain p-2 transition duration-500 ease-out sm:p-3"
                    }
                  />
                </div>
              </div>

              <div className="pt-3 sm:pt-4">
                <h3 className="text-sm font-medium text-[#3F3F3F] sm:text-base md:text-lg">
                  {product.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">{product.price}</p>

                <p className="mt-2 text-xs font-medium text-[#6F879E] sm:mt-3 sm:text-sm">
                  View Product →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

