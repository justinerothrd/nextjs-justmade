export default function CartPage() {
  return (
    <main className="bg-[#F7F7F5] text-[#4B4B4B] min-h-screen">

      <div className="flex justify-between items-center px-6 py-5 border-b">
        <a href="/">
          <img src="/logo.png" alt="logo" className="h-10" />
        </a>
        <a href="/shop" className="text-sm">Continue Shopping</a>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-light mb-8">Your Cart</h1>

        <div className="bg-white p-6 rounded-xl border">
          <p className="text-gray-600">Your cart is empty (for now)</p>
        </div>

      </section>

    </main>
  );
}
