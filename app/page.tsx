export default function HomePage() {
  return (
    <main className="bg-[#F7F7F5] text-[#4B4B4B] min-h-screen">

      {/* Header */}
      <header className="border-b border-[#E3E3E0] bg-[#F7F7F5]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Just Made Custom logo"
              className="h-14 w-auto"
            />
          </a>

          {/* Navigation */}
          <nav className="hidden gap-8 text-sm md:flex">
            <a href="/" className="transition hover:text-[#6F879E]">Home</a>
            <a href="/shop" className="transition hover:text-[#6F879E]">Shop</a>
            <a href="/custom-orders" className="transition hover:text-[#6F879E]">Custom Orders</a>
            <a href="/about" className="transition hover:text-[#6F879E]">About</a>
            <a href="/faq" className="transition hover:text-[#6F879E]">FAQ</a>
            <a href="/contact" className="transition hover:text-[#6F879E]">Contact</a>
          </nav>

          {/* Cart */}
          <a href="/cart" className="text-sm">
            Cart
          </a>

        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-light leading-tight text-[#3F3F3F] max-w-xl">
          Custom camp clothing made for summer memories
        </h1>

        <p className="mt-6 max-w-lg text-lg text-[#5D5D5D]">
          Personalized sweatshirts, tees, sleepwear, and camp favorites
          for kids heading off to sleepaway camp.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/shop"
            className="rounded-full bg-[#6F879E] px-6 py-3 text-white"
          >
            Shop Camp Favorites
          </a>

          <a
            href="/custom-orders"
            className="rounded-full border border-[#6F879E] px-6 py-3 text-[#6F879E]"
          >
            Start a Custom Order
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-light mb-8">Shop by Category</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {["Sweatshirts", "Tees", "Sleepwear", "Accessories"].map((item) => (
            <div key={item} className="bg-white p-6 rounded-xl border">
              <div className="h-40 bg-gray-100 rounded mb-4"></div>
              <h3 className="text-lg">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-[#EEF2F5] py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl mb-2">Choose your item</h3>
            <p>Select from sweatshirts, tees, and more.</p>
          </div>
          <div>
            <h3 className="text-xl mb-2">Personalize it</h3>
            <p>Add names, colors, and custom details.</p>
          </div>
          <div>
            <h3 className="text-xl mb-2">We make it</h3>
            <p>Each piece is made just for your order.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16 py-10 text-center text-sm">
        <p>© Just Made Custom</p>
      </footer>

    </main>
  );
}
