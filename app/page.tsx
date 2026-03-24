export default function HomePage() {
  return (
    <main className="bg-[#F7F7F5] text-[#4B4B4B]">
      <div className="bg-[#6F879E] text-white text-center text-sm py-2">
        Personalized camp favorites for kids, bunks, and groups
      </div>

      <header className="flex justify-between items-center px-6 py-5 border-b">
        <img src="/logo.png" alt="Just Made Custom" className="h-10 w-auto" />

        <div className="flex items-center gap-8">
          <nav className="flex gap-6 text-sm">
            <a href="#" className="hover:text-[#6F879E]">Shop</a>
            <a href="#" className="hover:text-[#6F879E]">Custom Orders</a>
            <a href="#" className="hover:text-[#6F879E]">About</a>
            <a href="#" className="hover:text-[#6F879E]">FAQ</a>
            <a href="#" className="hover:text-[#6F879E]">Contact</a>
          </nav>
          <div className="text-sm">Cart (0)</div>
        </div>
      </header>

      <section className="text-center px-6 py-20">
        <h2 className="text-4xl md:text-6xl font-light text-gray-800">
          Custom camp clothing made for summer memories
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-gray-600">
          Personalized sweatshirts, tees, and camp favorites for kids heading to sleepaway camp.
        </p>

        <div className="mt-8 flex justify-center gap-4">
         <a href="/shop" className="bg-[#6F879E] text-white px-6 py-3 rounded-full">
  Shop Camp Favorites
</a>
          <button className="border border-[#6F879E] text-[#6F879E] px-6 py-3 rounded-full">
            Start a Custom Order
          </button>
        </div>
      </section>

      <div className="flex justify-center py-10">
        <img src="/logo.png" alt="Just Made Custom" className="h-40 w-auto" />
      </div>

      <section className="px-6 py-16 text-center">
        <h3 className="text-3xl font-light mb-10">Shop by Category</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {["Sweatshirts", "Tees", "Sleepwear", "Accessories"].map((item) => (
            <div key={item} className="border p-6 rounded-xl bg-white">
              <div className="h-40 bg-gray-100 mb-4 rounded"></div>
              <h4 className="font-medium">{item}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 px-6 py-16 text-center">
        <h3 className="text-3xl font-light mb-10">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium mb-2">Choose your item</h4>
            <p className="text-sm text-gray-600">
              Pick from sweatshirts, tees, and camp gear.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Personalize it</h4>
            <p className="text-sm text-gray-600">
              Add names, colors, and custom details.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">We make it</h4>
            <p className="text-sm text-gray-600">
              Every piece is made just for you.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Just Made Custom
      </footer>
    </main>
  );
}
