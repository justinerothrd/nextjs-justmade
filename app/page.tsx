export default function HomePage() {
  return (
    <main className="bg-[#F7F7F5] text-[#4B4B4B]">

      {/* Top Bar */}
      <div className="bg-[#6F879E] text-white text-center text-sm py-2">
        Personalized camp favorites for kids, bunks, and groups
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b">
        <img src="/logo.png" alt="Just Made Custom" className="h-10" />
        <div className="text-sm">Cart (0)</div>
      </div>

      {/* Hero */}
      <section className="text-center px-6 py-20">
        <h2 className="text-4xl md:text-6xl font-light text-gray-800">
          Custom camp clothing made for summer memories
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-gray-600">
          Personalized sweatshirts, tees, and camp favorites for kids heading to sleepaway camp.
        </p>
      </section>

      {/* Logo Section (THIS replaces the broken part) */}
      <div className="flex justify-center py-10">
        <img src="/logo.png" alt="logo" className="h-40" />
      </div>

      {/* Footer */}
      <footer className="text-center py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Just Made Custom
      </footer>

    </main>
  );
}
