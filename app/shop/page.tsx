const sweatshirtProducts = [
  { slug: "hoodie", name: "Custom Hoodie", price: "$70", image: "/hoodie.jpeg" },
  { slug: "quarter-zip", name: "Custom 1/4 Zip", price: "$65", image: "/quarterzip.jpeg" },
];

const teeProducts = [
  { slug: "tank-top", name: "Custom Tank Top", price: "$40", image: "/Tank.jpeg" },
  { slug: "custom-tee", name: "Custom Tee", price: "$35", image: "/Tee.jpeg" },
];

const bottomProducts = [
  { slug: "custom-shorts", name: "Custom Shorts", price: "$36", image: "/shorts.jpeg" },
];

const sleepwearProducts = [
  { slug: "sleepwear", name: "Camp Pajama Shorts", price: "$32", image: "/sleepwear.jpg" },
  { slug: "sleepwear-set", name: "Custom Sleep Set", price: "$65", image: "/sleepwear-set.jpg" },
];

const accessoryProducts = [
  { slug: "accessories-slides", name: "Bunk Gift Slides", price: "$60", image: "/accessories.jpg" },
  { slug: "accessories-socks", name: "Fuzzy Socks", price: "$22", image: "/customsocks.jpg" },
];

function ProductGrid({
  products,
}: {
  products: { slug: string; name: string; price: string; image: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-6 sm:gap-y-10">
      {products.map((product) => (
        <div key={product.slug} className="group">
          <a href={`/product/${product.slug}`} className="block">
            <div className="overflow-hidden rounded-[24px] bg-transparent transition duration-300 ease-out">
              <img
                src={product.image}
                alt={product.name}
                className={
                  product.slug === "quarter-zip"
                    ? "h-[220px] w-full object-contain scale-130 transition duration-500 ease-out group-hover:scale-[1.32] sm:h-[340px]"
                    : "h-[220px] w-full object-contain transition duration-500 ease-out group-hover:scale-[1.03] sm:h-[340px]"
                }
              />
            </div>
          </a>
          <div className="pt-3 sm:pt-4">
            <h3 className="text-base font-light leading-tight text-[#2F3A4A] sm:text-lg">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.price}</p>
            
              href={`/product/${product.slug}`}
              className="mt-2 inline-block text-sm underline underline-offset-4 transition duration-300 ease-out hover:text-[#6F879E] sm:mt-4"
            >
              View Product
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function Section({
  id,
  title,
  products,
}: {
  id: string;
  title: string;
  products: { slug: string; name: string; price: string; image: string }[];
}) {
  return (
    <section id={id} className="scroll-mt-24 py-8 sm:scroll-mt-32 sm:py-10">
      <div className="mb-6 flex items-center justify-between border-b border-[#E8E4DE] pb-4 sm:mb-8">
        <h2 className="text-xl font-light text-[#2F3A4A] sm:text-2xl">{title}</h2>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white text-[#2F3A4A]">
      <section className="px-4 pb-6 pt-8 text-center sm:px-6 sm:pb-8 sm:pt-10">
        <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
          Just Made Custom
        </p>

        <h1 className="mt-4 text-4xl font-light sm:text-5xl md:text-6xl">Shop</h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 sm:mt-5 sm:text-lg sm:leading-8">
          Custom camp clothing designed to feel easy, polished, and special.
        </p>

        <div className="mt-6 sm:mt-8">
          <div className="flex overflow-x-auto sm:flex-wrap sm:justify-center gap-3 pb-2 sm:pb-0 px-4 sm:px-0 no-scrollbar">
            {[
              { label: "Sweatshirts", href: "#sweatshirts" },
              { label: "Tees & Tanks", href: "#tees" },
              { label: "Bottoms", href: "#bottoms" },
              { label: "Sleepwear", href: "#sleepwear" },
              { label: "Accessories", href: "#accessories" },
            ].map((item) => (
              
                key={item.label}
                href={item.href}
                className="flex-shrink-0 rounded-full border border-[#D8D8D4] px-5 py-2 text-sm transition hover:border-[#6F879E] hover:text-[#6F879E] whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        <Section id="sweatshirts" title="Sweatshirts" products={sweatshirtProducts} />
        <Section id="tees" title="Tees & Tanks" products={teeProducts} />
        <Section id="bottoms" title="Bottoms" products={bottomProducts} />
        <Section id="sleepwear" title="Sleepwear" products={sleepwearProducts} />
        <Section id="accessories" title="Accessories" products={accessoryProducts} />
      </div>
    </main>
  );
}
