export default function CustomOrdersPage() {
  return (
    <main className="bg-[#F7F7F5] min-h-screen px-6 py-16 text-[#4B4B4B]">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[#6F879E]">
          Custom Orders
        </p>

        <h1 className="mt-3 text-4xl font-light text-[#3F3F3F] md:text-5xl">
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5D5D5D]">
          We create custom pieces for bunks, siblings, camp events, friend groups,
          and special summer moments. If you want something personalized beyond the
          standard shop options, this is the place to start.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#E3E3E0] bg-white p-6">
            <h2 className="text-xl font-medium text-[#3F3F3F]">What we make</h2>
            <p className="mt-3 leading-7 text-[#5D5D5D]">
              Sweatshirts, tees, sleepwear, totes, gifts, visiting day pieces,
              and matching camp apparel.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3E3E0] bg-white p-6">
            <h2 className="text-xl font-medium text-[#3F3F3F]">Who it’s for</h2>
            <p className="mt-3 leading-7 text-[#5D5D5D]">
              Individual campers, sibling sets, bunks, camp groups, and families
              looking for something extra special.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3E3E0] bg-white p-6">
            <h2 className="text-xl font-medium text-[#3F3F3F]">How to order</h2>
            <p className="mt-3 leading-7 text-[#5D5D5D]">
              Choose a product, decide on your personalization, and reach out with
              your ideas so we can create something just for you.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-[#E3E3E0] bg-white p-8">
          <h2 className="text-2xl font-light text-[#3F3F3F]">
            Ready to start a custom order?
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-[#5D5D5D]">
            Email or contact us with the item, name, camp wording, quantity, and
            any color or design ideas you have in mind.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-[#6F879E] px-6 py-3 text-white"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
