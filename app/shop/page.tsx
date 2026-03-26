const sweatshirtProducts = [
  {
    slug: "hoodie",
    name: "Custom Hoodie",
    price: "$60",
    image: "/hoodie.jpeg",
  },
  {
    slug: "quarter-zip",
    name: "Custom 1/4 Zip",
    price: "$58",
    image: "/quarterzip.jpeg",
  },
];

const teeProducts = [
  {
    slug: "tank-top",
    name: "Custom Tank Top",
    price: "$32",
    image: "/Tank.jpeg",
  },
  {
    slug: "custom-tee",
    name: "Custom Tee",
    price: "$28",
    image: "/Tee.jpeg",
  },
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
    price: "$38",
    image: "/sleepwear.jpg",
  },
];

const accessoryProducts = [
  {
    slug: "accessories",
    name: "Bunk Gift Tote",
    price: "$22",
    image: "/accessories.jpg",
  },
  {
    slug: "accessories-pouch",
    name: "Camp Accessories Pouch",
    price: "$18",
    image: "/accessories.jpg",
  },
];

function ProductGrid({ products }: { products: any[] }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <div key={product.slug} className="group">
          <a href={`/product/${product.slug}`} className="block">
            <div className="overflow-hidden rounded-[28px] bg-[#F7F7F5]">
              <img
                src={product.image}
                alt={product.name}
                className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </a>

          <div className="px-2 pt-5">
            <h3 className="text-2xl font-light">{product.name}</h3>
            <p className="mt-2 text-base text-gray-500">{product.price}</p>

            <a
              href={`/product/${product.slug}`}
              className="mt-5 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]"
            >
              View Product
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function Section({ title, products }: { title: string; products: any[] }) {
  return (
    <section className="px-8 pb-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-3xl font-light">{title}</h2>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white text-[#2F3A4A]">
      {/* Header */}
      <section className="px-8 pb-8 pt-10 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
          Just Made Custom
        </p>

        <h1 className="mt-4 text-5xl font-light md:text-6xl">Shop</h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
          Custom camp clothing designed to feel easy, polished, and special.
        </p>
      </section>

      {/* Sections */}
      <Section title="Sweatshirts" products={sweatshirtProducts} />
      <Section title="Tees & Tanks" products={teeProducts} />
      <Section title="Sleepwear" products={sleepwearProducts} />
      <Section title="Accessories" products={accessoryProducts} />
    </main>
  );
}
