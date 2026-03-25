import "./globals.css";

export const metadata = {
  title: "Just Made Custom",
  description: "Custom camp clothing for kids",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F7F7F5] text-[#4B4B4B]">

        {/* Header */}
        <header className="border-b border-[#E3E3E0] bg-[#F7F7F5]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Just Made Custom logo"
                className="h-14 w-auto"
              />
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="/" className="hover:text-[#6F879E]">Home</a>
              <a href="/shop" className="hover:text-[#6F879E]">Shop</a>
              <a href="/custom-orders" className="hover:text-[#6F879E]">Custom Orders</a>
              <a href="/about" className="hover:text-[#6F879E]">About</a>
              <a href="/faq" className="hover:text-[#6F879E]">FAQ</a>
              <a href="/contact" className="hover:text-[#6F879E]">Contact</a>
            </nav>

            <a href="/cart" className="text-sm hover:text-[#6F879E]">
              Cart
            </a>
          </div>
        </header>

        {/* 🔵 GLOBAL BLUE BAR */}
        <div className="bg-[#6F879E] text-white text-center py-3 text-sm">
          Personalized camp favorites for kids, bunks, and groups
        </div>

        {/* PAGE CONTENT */}
        <main className="mx-auto max-w-7xl px-6">
          {children}
        </main>

      </body>
    </html>
  );
}
