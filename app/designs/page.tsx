import { logos } from "@/app/data/logos";

export default function DesignsPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-10 text-[#4B4B4B] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-light text-[#2F3A4A]">Design Library</h1>

          <a
            href="/shop"
            className="text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
          >
            Back to Shop
          </a>
        </div>

        <p className="max-w-2xl text-sm leading-7 text-gray-600">
          Browse available camp, college, team, and custom designs. If you do not
          see the one you want, add your request in the customization details box
          on the product page.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {logos.map((logo) => (
            <div
              key={logo.slug}
              className="rounded-3xl border border-[#ECE7E1] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
            >
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#F7F7F5]">
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="h-full w-full object-contain p-4"
                />
              </div>

              <div className="mt-4">
                <p className="text-base font-medium text-[#2F3A4A]">{logo.name}</p>
                <p className="mt-1 text-sm text-gray-500">{logo.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
