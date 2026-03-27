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
    <main className="min-h-screen bg-[#F7F7F5] text-[#4B4B4B]">

      {/* Cart header */}
      <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6 sm:py-5">
        <a href="/">
          <img src="/logo.png" alt="logo" className="h-8 sm:h-10" />
        </a>
        <a href="/shop" className="text-sm underline underline-offset-4 hover:text-[#6F879E]">
          Continue Shopping
        </a>
      </div>

      {/* Cart content */}
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
        <h1 className="mb-6 text-2xl font-light sm:mb-8 sm:text-3xl">Your Cart</h1>

        <div className="rounded-2xl border bg-white p-5 sm:p-8">

          {/* Product name + price */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-medium sm:text-xl">{product}</h2>
            <p className="shrink-0 text-lg font-light text-[#6F879E]">{price}</p>
          </div>

          {/* Order details */}
          <div className="mt-6 divide-y divide-[#F0EEEB]">
            {[
              { label: "Camp Name", value: name },
              { label: "Size", value: size },
              { label: "Color", value: color },
              { label: "Quantity", value: quantity },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-3 text-sm">
                <span className="text-gray-500">{item.label}</span>
                <span className="font-medium text-[#2F3A4A]">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 flex justify-between border-t border-[#E8E4DE] pt-4 text-sm font-medium">
            <span>Total</span>
            <span className="text-[#6F879E]">{price}</span>
          </div>

          {/* Checkout button */}
          <a
            href="#"
            className="mt-6 block w-full rounded-full bg-[#6F879E] px-6 py-4 text-center text-sm text-white transition hover:opacity-90 sm:py-3"
          >
            Checkout
          </a>

          {/* Back to shop */}
          <p className="mt-4 text-center text-xs text-gray-400">
            Not ready?{" "}
            <a href="/shop" className="underline underline-offset-4 hover:text-[#6F879E]">
              Keep shopping
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
