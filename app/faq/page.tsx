export default function FaqPage() {
  return (
    <main className="bg-[#F7F7F5] min-h-screen px-6 py-16 text-[#4B4B4B]">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[#6F879E]">
          FAQ
        </p>

        <h1 className="mt-3 text-4xl font-light text-[#3F3F3F] md:text-5xl">
        </h1>

        <div className="mt-10 space-y-4">
          {[
            {
              q: "How long do custom orders take?",
              a: "Timing depends on the item and customization, but custom orders usually need extra time before shipping.",
            },
            {
              q: "Are custom items final sale?",
              a: "Because personalized pieces are made just for you, custom items are typically final sale.",
            },
            {
              q: "Can I order for multiple kids or a group?",
              a: "Yes. We can help with siblings, bunk orders, and all groups.",
            },
            {
              q: "How do I choose sizing?",
              a: "Use the size details listed on each product page and reach out if you need help deciding.",
            },
            {
              q: "Can I request a special design?",
              a: "Yes. Visit the Custom Orders page or Contact page and send us the details.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-[#E3E3E0] bg-white p-6"
            >
              <h2 className="text-lg font-medium text-[#3F3F3F]">{item.q}</h2>
              <p className="mt-3 leading-7 text-[#5D5D5D]">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
