export default function ShopPage() {
  const categories = [
    {
      slug: "sweatshirts",
      title: "Sweatshirts",
      image: "/hoodie.jpeg",
      link: "/shop/sweatshirts",
    },
    {
      slug: "tees",
      title: "Tees & Tanks",
      image: "/Tank.jpeg",
      link: "/shop/tees",
    },
    {
      slug: "bottoms",
      title: "Bottoms",
      image: "/bottoms.jpg",
      link: "/shop/bottoms",
    },
    {
      slug: "sleepwear",
      title: "Sleep & Loungewear",
      image: "/sleepwear.jpg",
      link: "/shop/sleepwear",
    },
    {
      slug: "accessories",
      title: "Accessories & Gifts",
      image: "/accessories.jpg",
      link: "/shop/accessories",
    },
  ];

  return (
    <main className="bg-white text-[#4B4B4B]">
      <section className="px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 sm:mb-16">
  <h1 className="text-[36px] font-light leading-[1.02] tracking-[-0.02em] text-[#2F2F2F] sm:text-[48px] md:text-[60px]">
    Camp Collection
  </h1>

  <p className="mt-3 max-w-[520px] text-[20px] leading-7 text-[#6B7280] sm:text-[20px]">
Custom apparel and acessories designed for all things camp.
  </p>
</div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <a
                key={category.title}
                href={category.link}
                className="group block transition duration-300 ease-out hover:-translate-y-[2px]"
              >
                <div className="overflow-hidden rounded-[22px] border border-[#F0ECE6] bg-white transition duration-300 ease-out group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] sm:rounded-[26px]">
                  <div className="flex h-[220px] items-center justify-center p-4 sm:h-[280px] sm:p-5">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="max-h-full max-w-full object-contain transition duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="pt-3 text-center">
                  <h3 className="text-[15px] font-medium tracking-[0.02em] text-[#2F2F2F] sm:text-[17px]">
                    {category.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
