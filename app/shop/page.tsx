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
    <main className="bg-[#F7F7F5] text-[#4B4B4B] min-h-screen">
      <div className="bg-[#6F879E] text-white text-center text-sm py-2">
        Personalized camp favorites for kids, bunks, and groups
      </div>

      <header className="flex justify-between items-center px-6 py-5 border-b">
        <a href="/">
          <img src="/logo.png" alt="logo" className="h-10" />
        </a>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/shop">Shop</a>
            <a href="#">Custom Orders</a>
            <a href="#">About</a>
            <a href="#">FAQ</a>
            <a href="#">Contact</a>
          </nav>
          <a href="/cart" className="text-sm">Cart</a>
        </div>
      </header>

      <section className="text-center py-16">
        <h1 className="text-4xl font-light">Shop</h1>
        <p className="mt-4 text-gray-600">
          Personalized camp favorites for every part of summer
        </p>
      </section>

      <section className="px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div key={product.slug} className="bg-white p-6 rounded-xl border">
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover rounded mb-4"
              />
              <h3 className="text-lg">{product.name}</h3>
              <p className="text-gray-500 mt-1">{product.price}</p>
              <a
                href={`/product/${product.slug}`}
                className="mt-4 inline-block bg-[#6F879E] text-white px-4 py-2 rounded-full text-sm"
              >
                View Product
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
