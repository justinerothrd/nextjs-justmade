export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<{
    product?: string;
    price?: string;
    name?: string;
    size?: string;
    color?: string;
    quantity?: string;
  }>;
}) {
  const params = await searchParams;

  const product = params.product || "Personalized Camp Sweatshirt";
  const price = params.price || "$48";
  const name = params.name || "Not provided";
  const size = params.size || "Youth M";
  const color = params.color || "Heather Gray";
  const quantity = params.quantity || "1";

  return (
    <main className="bg-[#F7F7F5] text-[#4B4B4B] min-h-screen">
      <div className="flex justify-between items-center px-6 py-5 border-b">
        <a href="/">
          <img src="/logo.png" alt="logo" className="h-10" />
        </a>
        <a href="/shop" className="text-sm">
          Continue Shopping
        </a>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-light mb-8">Your Cart</h1>

        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-medium">{product}</h2>
          <p className="mt-2 text-gray-600">{price}</p>

          <div className="mt-6 space-y-2 text-sm text-gray-700">
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Size:</strong> {size}
            </p>
            <p>
              <strong>Color:</strong> {color}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity}
            </p>
          </div>

          <a
            href="#"
            className="mt-8 inline-block bg-[#6F879E] text-white px-6 py-3 rounded-full"
          >
            Checkout
          </a>
        </div>
      </section>
    </main>
  );
}
