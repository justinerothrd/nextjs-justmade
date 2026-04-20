import { products } from "@/lib/products";

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

const categoryStyles = {
  sweatshirts: [
    {
      slug: "hoodie",
      title: "Hoodies",
      image: products["hoodie"].images[0],
      href: "/product/hoodie",
    },
    {
      slug: "quarter-zip",
      title: "Quarter Zips",
      image: products["quarter-zip"].images[0],
      href: "/product/quarter-zip",
    },
  ],
  tees: [
    {
      slug: "tank-top",
      title: "Tank Tops",
      image: products["tank-top"].images[0],
      href: "/product/tank-top",
    },
    {
      slug: "custom-tee",
      title: "Tees",
      image: products["custom-tee"].images[0],
      href: "/product/custom-tee",
    },
  ],
  bottoms: [
    {
      slug: "custom-shorts",
      title: "Shorts",
      image: products["custom-shorts"].images[0],
      href: "/product/custom-shorts",
    },
    {
      slug: "sweatpants",
      title: "Sweatpants",
      image: products["sweatpants"].images[0],
      href: "/product/sweatpants",
    },
  ],
  sleepwear: [
    {
      slug: "sleepwear",
      title: "Pajama Shorts",
      image: products["sleepwear"].images[0],
      href: "/product/sleepwear",
    },
    {
      slug: "sleepwear-set",
      title: "Sleep Sets",
      image: products["sleepwear-set"].images[0],
      href: "/product/sleepwear-set",
    },
  ],
  accessories: [
    {
      slug: "accessories-slides",
      title: "Slides",
      image: products["accessories-slides"].images[0],
      href: "/product/accessories-slides",
    },
    {
      slug: "accessories-socks",
      title: "Socks",
      image: products["accessories-socks"].images[0],
      href: "/product/accessories-socks",
    },
  ],
} as const;

type CategorySlug = keyof typeof categoryMeta;
type ProductSlug = keyof typeof products;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;

  const meta = categoryMeta[categorySlug as CategorySlug];
  const styles = categoryStyles[categorySlug as keyof typeof categoryStyles];

  if (!meta || !styles) {
    return (
      <main className="min-h-screen bg-white text-[#2F3A4A]">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-light">Category not found</h1>
            <a
              href="/shop"
              className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]"
            >
              Back to Shop
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white text-[#4B4B4B]">
      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 sm:mb-14">
            <h1 className="text-[30px] font-light leading-[1.02] tracking-[-0.02em] text-[#2F2F2F] sm:text-[38px] md:text-[48px]">
              {meta.title}
            </h1>
            <a
              href="/shop"
              className="mt-5 inline-block text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
            >
              Back to All Categories
            </a>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {styles.map((style) => (
              <a
                key={style.slug}
                href={style.href}
                className="group block transition duration-300 ease-out hover:-translate-y-[2px]"
              >
                <div className="overflow-hidden rounded-[22px] border border-[#F0ECE6] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:rounded-[26px]">
                  <div className="flex h-[200px] items-center justify-center p-4 sm:h-[240px] sm:p-5">
  <img
    src={style.image}
    alt={style.title}
    className="max-h-full max-w-full object-contain transition duration-500 ease-out group-hover:scale-[1.02]"
  />
</div>
                </div>

                <div className="mt-3 text-center">
  <h3 className="text-[15px] font-medium tracking-wide text-[#2F2F2F] sm:text-[16px]">
    {style.title}
  </h3>

  <div className="mx-auto mt-3 h-[1px] w-6 bg-[#D8D8D8]"></div>

  {style.slug in products && (
    <p className="mt-2 text-[13px] text-[#6B7280] sm:text-[14px]">
      {products[style.slug as ProductSlug].price}
    </p>
  )}
</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
