export default function CustomOrdersPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 py-20 text-[#4B4B4B]">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.24em] text-[#6F879E]">
          Custom Orders
        </p>

        <h1 className="mt-4 max-w-3xl text-[42px] font-light leading-tight tracking-[-0.02em] text-[#2F2F2F] md:text-[62px]">
          Made for your bunk, group, or special moment.
        </h1>

        <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#5D5D5D]">
          For bunk gifts, sibling sets, camp events, and one-of-a-kind pieces.
          Tell us what you’re imagining and we’ll help bring it to life.
        </p>

        <section className="mt-16 border-t border-[#DDD8D2] pt-10">
          <p className="mb-8 text-sm uppercase tracking-[0.22em] text-[#8A8178]">
            How it works
          </p>

          <div className="space-y-8">
            {[
              ["01", "Choose your item", "Start with a sweatshirt, tee, tank, sleepwear piece, accessory, or something custom."],
              ["02", "Share your personalization", "Send the camp name, colors, quantity, wording, and any design notes."],
              ["03", "We’ll confirm the details", "We’ll review sizing, artwork, and next steps before anything is made."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="grid gap-4 border-b border-[#E5E1DB] pb-8 md:grid-cols-[90px_1fr]"
              >
                <p className="text-sm tracking-[0.22em] text-[#6F879E]">
                  {number}
                </p>
                <div>
                  <h2 className="text-2xl font-light text-[#2F2F2F]">
                    {title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#66615C]">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[34px] bg-white px-7 py-8 shadow-[0_18px_45px_rgba(0,0,0,0.04)] sm:px-10">
          <p className="text-sm uppercase tracking-[0.22em] text-[#8A8178]">
            Ready to start?
          </p>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-light text-[#2F2F2F]">
                Send us your custom request.
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#66615C]">
                Include the item, name or camp wording, quantity, colors, and any
                design ideas you have in mind.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex w-fit rounded-full bg-[#6F879E] px-7 py-3 text-sm text-white transition hover:bg-[#5F768C]"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
