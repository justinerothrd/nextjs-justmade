export default function AboutPage() {
  return (
    <main className="bg-[#F7F7F5] min-h-screen px-10 py-16 text-[#4B4B4B]">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[#6F879E]">
          About
        </p>

        <h1 className="mt-3 text-4xl font-light text-[#3F3F3F] md:text-5xl">
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5D5D5D]">
          Just Made Custom creates personalized camp clothing and thoughtful custom
          pieces for kids and families. From sweatshirts and tees to sleepwear and
          gifts, each piece is designed to feel special, wearable, and easy to love.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 border border-[#E3E3E0]">
            <h2 className="text-2xl font-light text-[#3F3F3F]">What we believe</h2>
            <p className="mt-4 leading-8 text-[#5D5D5D]">
              Camp is full of meaningful moments. Our goal is to make custom clothing feel
              elevated, simple, and personal.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-[#E3E3E0]">
            <h2 className="text-2xl font-light text-[#3F3F3F]">What we make</h2>
            <p className="mt-4 leading-8 text-[#5D5D5D]">
              Personalized apparel for camp, bunk gifts, sibling sets,
              group orders, and all of your summer camp needs.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
