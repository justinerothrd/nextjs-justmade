export default function HomePage() {
  const categories = [
    {
      title: "Sweatshirts",
      description: "Cozy camp favorites made for cool nights and summer memories.",
    },
    {
      title: "Tees",
      description: "Easy everyday personalized tees for camp, travel, and visiting day.",
    },
    {
      title: "Sleepwear",
      description: "Soft custom pajama pieces and camp sleep shirts kids will love.",
    },
    {
      title: "Accessories",
      description: "Thoughtful extras like totes, tags, and small custom camp gifts.",
    },
  ];

  const favorites = [
    "Personalized Camp Sweatshirt",
    "Custom Name Tee",
    "Camp Pajama Shorts",
    "Bunk Gift Tote",
    "Visiting Day Sweatshirt",
    "Sibling Camp Tee",
  ];

  const faqs = [
    "How long do custom orders take?",
    "Can I order for multiple kids?",
    "Do you offer group or bunk orders?",
    "Are custom items final sale?",
    "How should I choose sizing?",
  ];

  return (
    <main className="bg-[#F7F7F5] text-[#4B4B4B]">
      {/* Top Bar */}
      <section className="bg-[#6F879E] px-4 py-3 text-center text-sm font-medium text-white">
        Personalized camp favorites for kids, bunks, and groups
      </section>

      {/* Header */}
      <header className="border-b border-[#E3E3E0] bg-[#F7F7F5]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-light tracking-[0.35em] text-[#6F879E] uppercase">
            Just Made
            <span className="ml-2 normal-case font-normal tracking-normal text-[#5B5757] italic">
              custom
            </span>
          </div>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#" className="transition hover:text-[#6F879E]">
              Home
            </a>
            <a href="#" className="transition hover:text-[#6F879E]">
              Shop
            </a>
            <a href="#" className="transition hover:text-[#6F879E]">
              Custom Orders
            </a>
            <a href="#" className="transition hover:text-[#6F879E]">
              About
            </a>
            <a href="#" className="transition hover:text-[#6F879E]">
              FAQ
            </a>
            <a href="#" className="transition hover:text-[#6F879E]">
              Contact
            </a>
          </nav>

          <div className="text-sm text-[#4B4B4B]">Cart (0)</div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#6F879E]">
            Just Made Custom
          </p>
          <h1 className="max-w-xl text-4xl font-light leading-tight text-[#3F3F3F] md:text-6xl">
            Custom camp clothing made for summer memories
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#5D5D5D]">
            Personalized sweatshirts, tees, sleepwear, and camp favorites for
            kids heading off to sleepaway camp. Thoughtful pieces designed to
            feel special, wearable, and easy to order.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#shop"
              className="rounded-full bg-[#6F879E] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Shop Camp Favorites
            </a>
            <a
              href="#custom-orders"
              className="rounded-full border border-[#6F879E] px-6 py-3 text-sm font-medium text-[#6F879E] transition hover:bg-[#EEF2F5]"
            >
              Start a Custom Order
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex h-[420px] w-full max-w-[520px] items-center justify-center rounded-[32px] border border-[#E4E1DD] bg-white p-10 shadow-sm">
            <div className="text-center">
              <div className="text-5xl font-light uppercase tracking-[0.25em] text-[#6F879E] md:text-6xl">
                Just Made
              </div>
              <div className="mt-2 text-4xl italic text-[#5B5757] md:text-5xl">
                custom
              </div>
              <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-[#6A6A6A]">
                Add your logo image here, or replace this block with a hero
                lifestyle photo of kids&apos; camp clothing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="shop" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
            Shop
          </p>
          <h2 className="mt-3 text-3xl font-light text-[#3F3F3F] md:text-4xl">
            Shop by Category
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#5D5D5D]">
            A simple way to browse personalized camp pieces for every part of
            the summer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-[24px] border border-[#E4E1DD] bg-white p-6 shadow-sm"
            >
              <div className="mb-5 h-48 rounded-[20px] bg-[#EEF2F5]" />
              <h3 className="text-xl font-medium text-[#3F3F3F]">
                {category.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#646464]">
                {category.description}
              </p>
              <a
                href="#"
                className="mt-5 inline-block text-sm font-medium text-[#6F879E] hover:underline"
              >
                Shop now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Intro */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <div className="h-[380px] rounded-[28px] bg-[#EEF2F5]" />
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
              About the Brand
            </p>
            <h2 className="mt-3 text-3xl font-light text-[#3F3F3F] md:text-4xl">
              Made for camp kids
            </h2>
            <p className="mt-6 text-base leading-8 text-[#5D5D5D]">
              Just Made Custom creates personalized clothing and accessories for
              sleepaway camp, summer traditions, and all the little moments
              families want to remember. From custom sweatshirts and name tees
              to bunk gifts and matching group orders, each piece is designed to
              feel thoughtful, easy to wear, and special to keep.
            </p>
          </div>
        </div>
      </section>

      {/* Camp Favorites */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
            Best Sellers
          </p>
          <h2 className="mt-3 text-3xl font-light text-[#3F3F3F] md:text-4xl">
            Camp Favorites
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#5D5D5D]">
            The styles families come back for year after year.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((item) => (
            <div
              key={item}
              className="rounded-[24px] border border-[#E4E1DD] bg-white p-5 shadow-sm"
            >
              <div className="mb-4 h-64 rounded-[20px] bg-[#F0EEEA]" />
              <h3 className="text-lg font-medium text-[#3F3F3F]">{item}</h3>
              <p className="mt-2 text-sm text-[#646464]">
                Personalized and made with a boutique feel for camp season.
              </p>
              <a
                href="#"
                className="mt-4 inline-block text-sm font-medium text-[#6F879E] hover:underline"
              >
                View product
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#EEF2F5] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
              Ordering
            </p>
            <h2 className="mt-3 text-3xl font-light text-[#3F3F3F] md:text-4xl">
              How It Works
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[24px] bg-white p-8 shadow-sm">
              <div className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#6F879E]">
                Step 1
              </div>
              <h3 className="text-xl font-medium text-[#3F3F3F]">
                Choose your item
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#646464]">
                Pick from sweatshirts, tees, sleepwear, accessories, and other
                camp-ready favorites.
              </p>
            </div>

            <div className="rounded-[24px] bg-white p-8 shadow-sm">
              <div className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#6F879E]">
                Step 2
              </div>
              <h3 className="text-xl font-medium text-[#3F3F3F]">
                Personalize it
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#646464]">
                Add names, camp wording, colors, or custom details to make each
                piece feel personal.
              </p>
            </div>

            <div className="rounded-[24px] bg-white p-8 shadow-sm">
              <div className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#6F879E]">
                Step 3
              </div>
              <h3 className="text-xl font-medium text-[#3F3F3F]">
                We make it for you
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#646464]">
                Every order is made with care and designed to be part of your
                child&apos;s summer memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why families love it */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
              Why Just Made Custom
            </p>
            <h2 className="mt-3 text-3xl font-light text-[#3F3F3F] md:text-4xl">
              Why families love us
            </h2>
            <ul className="mt-6 space-y-4 text-base leading-8 text-[#5D5D5D]">
              <li>Personalized for each child</li>
              <li>Easy for camp, visiting day, and bunk gifts</li>
              <li>Boutique-style designs with a custom feel</li>
              <li>Simple ordering for individual and group needs</li>
              <li>Thoughtful pieces made for memorable summers</li>
            </ul>
          </div>

          <div className="h-[360px] rounded-[28px] bg-[#F0EEEA]" />
        </div>
      </section>

      {/* Custom Orders CTA */}
      <section id="custom-orders" className="bg-white py-16">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-[#E4E1DD] px-6 py-14 text-center shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
            Custom Orders
          </p>
          <h2 className="mt-3 text-3xl font-light text-[#3F3F3F] md:text-4xl">
            Need something custom for a bunk, sibling set, or group?
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#5D5D5D]">
            We create custom pieces for bunks, sisters, friend groups, camp
            events, and more. Whether you need matching sweatshirts,
            personalized gifts, or a special design brought to life, we&apos;d
            love to help.
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-full bg-[#6F879E] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Request a Custom Order
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
            Reviews
          </p>
          <h2 className="mt-3 text-3xl font-light text-[#3F3F3F] md:text-4xl">
            What customers are saying
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[24px] border border-[#E4E1DD] bg-white p-8 shadow-sm">
            <p className="text-base leading-8 text-[#5D5D5D]">
              “Such a special camp gift and the quality was amazing.”
            </p>
          </div>
          <div className="rounded-[24px] border border-[#E4E1DD] bg-white p-8 shadow-sm">
            <p className="text-base leading-8 text-[#5D5D5D]">
              “The ordering process was easy and everything came out adorable.”
            </p>
          </div>
          <div className="rounded-[24px] border border-[#E4E1DD] bg-white p-8 shadow-sm">
            <p className="text-base leading-8 text-[#5D5D5D]">
              “My daughter was so excited to bring her custom pieces to camp.”
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="bg-[#EEF2F5] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-light text-[#3F3F3F] md:text-4xl">
              Questions before you order?
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq}
                className="rounded-[18px] bg-white px-6 py-5 text-[#4B4B4B] shadow-sm"
              >
                {faq}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#6F879E]">
          Stay in Touch
        </p>
        <h2 className="mt-3 text-3xl font-light text-[#3F3F3F] md:text-4xl">
          Sign up for camp favorites and custom order updates
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5D5D5D]">
          Be the first to hear about new arrivals, seasonal launches, and
          custom-order openings.
        </p>

        <form className="mx-auto mt-8 flex max-w-xl flex-col gap-4 md:flex-row">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-full border border-[#D8D8D4] bg-white px-5 py-3 outline-none placeholder:text-[#8B8B8B] focus:border-[#6F879E]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#6F879E] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Join
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E3E3E0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
          <div>
            <div className="text-xl font-light uppercase tracking-[0.3em] text-[#6F879E]">
              Just Made
            </div>
            <div className="mt-1 text-2xl italic text-[#5B5757]">custom</div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#646464]">
              Personalized camp clothing and thoughtful custom pieces for kids,
              families, bunks, and summer memories.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6F879E]">
              Quick Links
            </h3>
            <div className="mt-4 space-y-3 text-sm text-[#4B4B4B]">
              <a href="#" className="block hover:text-[#6F879E]">
                Shop
              </a>
              <a href="#" className="block hover:text-[#6F879E]">
                Custom Orders
              </a>
              <a href="#" className="block hover:text-[#6F879E]">
                About
              </a>
              <a href="#" className="block hover:text-[#6F879E]">
                FAQ
              </a>
              <a href="#" className="block hover:text-[#6F879E]">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6F879E]">
              Policies
            </h3>
            <div className="mt-4 space-y-3 text-sm text-[#4B4B4B]">
              <a href="#" className="block hover:text-[#6F879E]">
                Shipping & Returns
              </a>
              <a href="#" className="block hover:text-[#6F879E]">
                Turnaround Time
              </a>
              <a href="#" className="block hover:text-[#6F879E]">
                Size Guide
              </a>
              <a href="#" className="block hover:text-[#6F879E]">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
