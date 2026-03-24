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
    <main className="min-h-screen bg-[#F7F7F5] text-[#4B4B4B]">
      <div className="bg-[#6F879E] py-2 text-center text-sm text-white">
        Personalized camp favorites for kids, bunks, and groups
      </div>

      <header className="flex items-center justify-between border-b px-6 py-5">
        <a href="/">
          <img src="/logo.png" alt="logo" className="h-10" />
        </a>

        <div className="flex items-center gap-8">
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="/shop" className="hover:text-[#6F879E]">Shop</a>
            <a href="#" className="hover:text-[#6F879E]">Custom Orders</a>
            <a href="#" className="hover:text-[#6F879E]">About</a>
            <a href="#" className="hover:text-[#6F879E]">FAQ</a>
            <a href="#" className="hover:text-[#6F879E]">Contact</a>
          </nav>
          <a href="/cart" className="text-sm hover:text-[#6F879E]">Cart</a>
        </div>
      </header>

      <section className="px-6 py-14 text-center">
        <h1 className="text-4xl font-light md:text-5xl">Shop</h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Personalized camp favorites for every part of summer
        </p>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.slug}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-medium">{product.name}</h3>
                <p className="mt-2 text-gray-500">{product.price}</p>

                <a
                  href={`/product/${product.slug}`}
                  className="mt-5 inline-block rounded-full bg-[#6F879E] px-5 py-2.5 text-sm text-white transition hover:opacity-90"
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
