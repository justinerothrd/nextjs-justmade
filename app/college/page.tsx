const colleges = [
  {
    slug: "duke",
    name: "Duke",
    products: [
      { slug: "duke-crewneck", name: "Duke Crewneck", price: "$70", image: "/duke-crewneck.jpeg" },
      { slug: "duke-hoodie", name: "Duke Hoodie", price: "$75", image: "/duke-hoodie.jpeg" },
      { slug: "duke-tee", name: "Duke Tee", price: "$40", image: "/duke-tee.jpeg" },
    ],
  },
  {
    slug: "penn-state",
    name: "Penn State",
    products: [
      { slug: "penn-state-crewneck", name: "Penn State Crewneck", price: "$70", image: "/penn-state-crewneck.jpeg" },
      { slug: "penn-state-hoodie", name: "Penn State Hoodie", price: "$75", image: "/penn-state-hoodie.jpeg" },
      { slug: "penn-state-tee", name: "Penn State Tee", price: "$40", image: "/penn-state-tee.jpeg" },
    ],
  },
  {
    slug: "usc",
    name: "USC",
    products: [
      { slug: "usc-crewneck", name: "USC Crewneck", price: "$70", image: "/usc-crewneck.jpeg" },
      { slug: "usc-hoodie", name: "USC Hoodie", price: "$75", image: "/usc-hoodie.jpeg" },
      { slug: "usc-tee", name: "USC Tee", price: "$40", image: "/usc-tee.jpeg" },
    ],
  },
  {
    slug: "unc",
    name: "UNC",
    products: [
      { slug: "unc-crewneck", name: "UNC Crewneck", price: "$70", image: "/unc-crewneck.jpeg" },
      { slug: "unc-hoodie", name: "UNC Hoodie", price: "$75", image: "/unc-hoodie.jpeg" },
      { slug: "unc-tee", name: "UNC Tee", price: "$40", image: "/unc-tee.jpeg" },
    ],
  },
  {
    slug: "tulane",
    name: "Tulane",
    products: [
      { slug: "tulane-crewneck", name: "Tulane Crewneck", price: "$70", image: "/tulane-crewneck.jpeg" },
      { slug: "tulane-hoodie", name: "Tulane Hoodie", price: "$75", image: "/tulane-hoodie.jpeg" },
      { slug: "tulane-tee", name: "Tulane Tee", price: "$40", image: "/tulane-tee.jpeg" },
    ],
  },
];

export default function CollegePage() {
  return (
    <main className="min-h-screen bg-white text-[#2F3A4A]">
      <section className="px-4 pb-6 pt-8 text-center sm:px-6 sm:pb-8 sm:pt-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[#6F879E]">Just Made Custom</p>
        <h1 className="mt-4 text-4xl font-light sm:text-5xl md:text-6xl">College Gear</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
          Custom college sweatshirts, hoodies, and tees personalized for your school.
        </p>
      </section>
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        {colleges.map((college) => (
          <section key={college.slug} className="py-8 sm:py-10">
            <div className="mb-6 flex items-center justify-between border-b border-[#E8E4DE] pb-4 sm:mb-8">
              <h2 className="text-xl font-light text-[#2F3A4A] sm:text-2xl">{college.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
              {college.products.map((product) => (
                <div key={product.slug} className="group">
                  <a href={`/college/${product.slug}`} className="block">
                    <div className="overflow-hidden rounded-[24px] bg-white">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-[220px] w-full object-contain p-4 transition duration-500 ease-out group-hover:scale-[1.03] sm:h-[300px]"
                      />
                    </div>
                  </a>
                  <div className="pt-3 sm:pt-4">
                    <h3 className="text-base font-light leading-tight text-[#2F3A4A] sm:text-lg">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.price}</p>
                    <a href={`/college/${product.slug}`} className="mt-2 inline-block text-sm underline underline-offset-4 transition duration-300 ease-out hover:text-[#6F879E] sm:mt-4">
                      View Product
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
