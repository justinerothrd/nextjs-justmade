const categories = {
  sweatshirts: {
    title: "Sweatshirts",
    subtitle: "Cozy personalized layers for camp nights and cool mornings.",
    products: [
      { slug: "hoodie", name: "Custom Hoodie", price: "$70", image: "/hoodie.center-preview.png" },
      { slug: "quarter-zip", name: "Custom 1/4 Zip", price: "$65", image: "/quarterzip-preview.png" },
    ],
  },
  tees: {
    title: "Tees & Tanks",
    subtitle: "Easy everyday camp styles with a custom feel.",
    products: [
      { slug: "tank-top", name: "Custom Tank Top", price: "$40", image: "/tank-preview.png" },
      { slug: "custom-tee", name: "Custom Tee", price: "$35", image: "/tee-preview.png" },
    ],
  },
  bottoms: {
    title: "Bottoms",
    subtitle: "Custom shorts and easy camp-ready staples.",
    products: [
      { slug: "custom-shorts", name: "Custom Shorts", price: "$36", image: "/shorts-preview.png" },
    ],
  },
  sleepwear: {
    title: "Sleepwear",
    subtitle: "Soft camp-ready pieces made for bedtime and bunk life.",
    products: [
      { slug: "sleepwear", name: "Camp Pajama Shorts", price: "$32", image: "/sleepwear.jpg" },
      { slug: "sleepwear-set", name: "Custom Sleep Set", price: "$65", image: "/sleepwear-set.jpg" },
    ],
  },
  accessories: {
    title: "Accessories",
    subtitle: "Thoughtful extras and gifts.",
    products: [
      { slug: "accessories-slides", name: "Bunk Gift Slides", price: "$60", image: "/slides-preview.png" },
      { slug: "accessories-socks", name: "Fuzzy Socks", price: "$22", image: "/customsocks.jpg" },
    ],
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = categories[categorySlug as keyof typeof categories];

  if (!category) {
    return (
      <main className="min-h-screen bg-white text-[#2F3A4A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-light">Category not found</h1>
          <a href="/shop" className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]">
            Back to Shop
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#2F3A4A]">
      <section className="px-4 pb-6 pt-8 text-center sm:px-6 sm:pb-8 sm:pt-10">
        <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">Just Made Custom</p>
        <h1 className="mt-4 text-4xl font-light sm:text-5xl md:text-6xl">{category.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
          {category.subtitle}
        </p>
        <div className="mt-4">
          <a href="/shop" className="text-sm underline underline-offset-4 hover:text-[#6F879E]">
            Back to All Categories
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {category.products.map((product) => (
            <div key={product.slug} className="group">
              <a href={`/product/${product.slug}`} className="block">
                <div className="overflow-hidden rounded-[24px] bg-[#F7F7F5]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[220px] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] sm:h-[380px]"
                  />
                </div>
              </a>
              <div className="pt-3 sm:pt-4">
                <h3 className="text-base font-light leading-tight text-[#2F3A4A] sm:text-lg">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.price}</p>
                <a href={`/product/${product.slug}`} className="mt-2 inline-block text-sm underline underline-offset-4 transition duration-300 ease-out hover:text-[#6F879E] sm:mt-4">
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
