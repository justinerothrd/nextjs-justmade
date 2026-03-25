const products = [
  {
    slug: "tank-top",
    name: "Custom Tank Top",
    price: "$32",
    image: "/Tank.jpeg",
  },
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
  {
    slug: "custom-shorts",
    name: "Custom Shorts",
    price: "$36",
    image: "/shorts.jpeg",
  },
  {
    slug: "custom-tee",
    name: "Custom Tee",
    price: "$28",
    image: "/Tee.jpeg",
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white text-[#2F3A4A]">

      <section className="px-8 pb-8 pt-10 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
          Just Made Custom
        </p>
        <h1 className="mt-4 text-5xl font-light md:text-6xl">Shop</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
          Custom camp clothing designed to feel easy, polished, and special.
        </p>
      </section>

      <section className="px-8 pb-24 pt-6">
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
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-light">{product.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{product.price}</p>
                  </div>
                </div>

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
      </section>
    </main>
  );
}
