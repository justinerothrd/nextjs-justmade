export default function ContactPage() {
  return (
    <main className="bg-[#F7F7F5] min-h-screen px-6 py-16 text-[#4B4B4B]">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[#6F879E]">
          Contact
        </p>

        <h1 className="mt-3 text-4xl font-light text-[#3F3F3F] md:text-5xl">
          Get in touch
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5D5D5D]">
          Reach out with questions, custom order ideas, group requests, or help
          choosing the right item.
        </p>

        <div className="mt-10 rounded-3xl border border-[#E3E3E0] bg-white p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full rounded-xl border border-[#D8D8D4] bg-white px-4 py-3"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-xl border border-[#D8D8D4] bg-white px-4 py-3"
                placeholder="Your email"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">Message</label>
            <textarea
              rows={6}
              className="w-full rounded-xl border border-[#D8D8D4] bg-white px-4 py-3"
              placeholder="Tell us about your order or question"
            />
          </div>

          <button className="mt-6 rounded-full bg-[#6F879E] px-6 py-3 text-white">
            Send Message
          </button>
        </div>
      </div>
    </main>
  );
}
