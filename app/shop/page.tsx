const sweatshirtProducts = [
  {
    slug: "hoodie",
    name: "Custom Hoodie",
    price: "$70",
    image: "/hoodie.jpeg",
  },
  {
    slug: "quarter-zip",
    name: "Custom 1/4 Zip",
    price: "$65",
    image: "/quarterzip.jpeg",
  },
];

const teeProducts = [
  {
    slug: "tank-top",
    name: "Custom Tank Top",
    price: "$40",
    image: "/Tank.jpeg",
  },
  {
    slug: "custom-tee",
    name: "Custom Tee",
    price: "$35",
    image: "/Tee.jpeg",
  },
];

const bottomProducts = [
  {
    slug: "custom-shorts",
    name: "Custom Shorts",
    price: "$36",
    image: "/shorts.jpeg",
  },
];

const sleepwearProducts = [
  {
    slug: "sleepwear",
    name: "Camp Pajama Shorts",
    price: "$32",
    image: "/sleepwear.jpg",
  },
  {
    slug: "sleepwear-set",
    name: "Custom Sleep Set",
    price: "$65",
    image: "/sleepwear-set.jpg",
  },
];

const accessoryProducts = [
  {
    slug: "accessories-slides",
    name: "Bunk Gift Slides",
    price: "$60",
    image: "/accessories.jpg",
  },
  {
    slug: "accessories-socks",
    name: "Fuzzy Socks",
    price: "$22",
    image: "/customsocks.jpg",
  },
];

function ProductGrid({
  products,
}: {
  products: {
    slug: string;
    name: string;
    price: string;
    image: string;
  }[];
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <div key={product.slug} className="group">
          <a href={`/product/${product.slug}`} className="block">
            <div className="overflow-hidden rounded-[28px] bg-[#F7F7F5] p-4 transition duration-300 group-hover:shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="h-[340px] w-full object-contain transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </a>

          <div className="pt-4">
            <h3 className="text-[28px] font-light leading-tight text-[#2F3A4A]">
              {product.name}
            </h3>

            <p className="mt-2 text-base text-gray-500">{product.price}</p>

            <a
              href={`/product/${product.slug}`}
              className="mt-4 inline-block text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
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
  products: {
    slug: string;
    name: string;
    price: string;
    image: string;
  }[];
}) {
  return (
    <section id={id} className="scroll-mt-32 py-14 first:pt-6">
      <div className="border-t border-[#E8E4DE] pt-10">
        <h2 className="text-3xl font-light text-[#2F3A4A]">{title}</h2>
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white text-[#2F3A4A]">
      <section className="px-8 pb-10 pt-12 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
          Just Made Custom
        </p>

        <h1 className="mt-4 text-5xl font-light md:text-6xl">Shop</h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-500">
          Custom camp clothing designed to feel easy, polished, and special.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#sweatshirts"
            className="rounded-full border border-[#D8D8D4] px-5 py-2 text-sm transition hover:border-[#6F879E] hover:text-[#6F879E]"
          >
            Sweatshirts
          </a>
          <a
            href="#tees"
            className="rounded-full border border-[#D8D8D4] px-5 py-2 text-sm transition hover:border-[#6F879E] hover:text-[#6F879E]"
          >
            Tees & Tanks
          </a>
          <a
            href="#bottoms"
            className="rounded-full border border-[#D8D8D4] px-5 py-2 text-sm transition hover:border-[#6F879E] hover:text-[#6F879E]"
          >
            Bottoms
          </a>
          <a
            href="#sleepwear"
            className="rounded-full border border-[#D8D8D4] px-5 py-2 text-sm transition hover:border-[#6F879E] hover:text-[#6F879E]"
          >
            Sleepwear
          </a>
          <a
            href="#accessories"
            className="rounded-full border border-[#D8D8D4] px-5 py-2 text-sm transition hover:border-[#6F879E] hover:text-[#6F879E]"
          >
            Accessories
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-8 pb-20">
        <Section id="sweatshirts" title="Sweatshirts" products={sweatshirtProducts} />
        <Section id="tees" title="Tees & Tanks" products={teeProducts} />
        <Section id="bottoms" title="Bottoms" products={bottomProducts} />
        <Section id="sleepwear" title="Sleepwear" products={sleepwearProducts} />
        <Section id="accessories" title="Accessories" products={accessoryProducts} />
      </div>
    </main>
  );
}
