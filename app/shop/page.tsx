const products = [
  {
    slug: "camp-sweatshirt",
    name: "Personalized Camp Sweatshirt",
    price: "$48",
  },
  {
    slug: "name-tee",
    name: "Custom Name Tee",
    price: "$28",
  },
  {
    slug: "pajama-shorts",
    name: "Camp Pajama Shorts",
    price: "$32",
  },
  {
    slug: "bunk-gift-tote",
    name: "Bunk Gift Tote",
    price: "$22",
  },
  {
    slug: "visiting-day-sweatshirt",
    name: "Visiting Day Sweatshirt",
    price: "$50",
  },
  {
    slug: "sibling-camp-tee",
    name: "Sibling Camp Tee",
    price: "$26",
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
          <img src="/logo.png" alt="Just Made Custom" className="h-10 w-auto" />
        </a>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/shop" className="hover:text-[#6F879E]">Shop</a>
            <a href="#" className="hover:text-[#6F879E]">Custom Orders</a>
            <a href="#" className="hover:text-[#6F879E]">About</a>
            <a href="#" className="hover:text-[#6F879E]">FAQ</a>
            <a href="#" className="hover:text-[#6F879E]">Contact</a>
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
              <div className="h-64 bg-gray-100 rounded mb-4"></div>
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
