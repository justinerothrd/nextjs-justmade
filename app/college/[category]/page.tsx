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
      <main className="flex min-h-screen items-center justify-center bg-white text-[#2F3A4A]">
        <div className="text-center">
          <h1 className="text-3xl font-light">Category not found</h1>
          <a href="/college" className="mt-6 inline-block text-sm underline">
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
    <main className="min-h-screen bg-white text-[#2F3A4A]">
      <section className="px-4 pb-6 pt-8 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
          Just Made Custom
        </p>

        <h1 className="mt-4 text-4xl font-light">
          {meta.title}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500">
          {meta.subtitle}
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <div key={product.slug}>
              <a href={`/college/product/${product.slug}`}>
                <div className="overflow-hidden rounded-[24px] bg-white">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={
                      product.slug === "college-crewneck"
                        ? "h-[260px] w-full object-contain p-2 scale-[1.01]"
                        : product.slug === "college-hoodie"
                        ? "h-[260px] w-full object-contain p-2 scale-[1.01]"
                        : product.slug === "college-slides"
                        ? "h-[260px] w-full object-contain p-4"
                        : "h-[260px] w-full object-contain p-2"
                    }
                  />
                </div>
              </a>

              <div className="pt-3">
                <h3 className="text-base font-light">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
