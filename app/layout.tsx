"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Josefin_Sans } from "next/font/google";
import MiniCart from "./components/MiniCart";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  const announcementText = "";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function loadCartCount() {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = stored.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0
      );
      setCartCount(count);
    }

    loadCartCount();

    window.addEventListener("cartUpdated", loadCartCount);
    window.addEventListener("storage", loadCartCount);

    return () => {
      window.removeEventListener("cartUpdated", loadCartCount);
      window.removeEventListener("storage", loadCartCount);
    };
  }, []);

  return (
    <html lang="en" className={josefin.variable}>
      <body className={`${josefin.className} bg-white text-[#4B4B4B]`}>

        {/* NAV */}
        <header className="sticky top-0 z-40 bg-[#F7F7F5]/95 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 sm:px-6 sm:py-4">

            {/* LOGO */}
            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Just Made Custom logo"
                className="h-14 w-auto sm:h-16"
              />
            </a>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center gap-10 text-[14px] uppercase tracking-[0.14em] md:flex">
              <a href="/" className="transition hover:text-[#6F879E]">Home</a>
              <a href="/shop" className="transition hover:text-[#6F879E]">Shop Camp</a>
              <a href="/college" className="transition hover:text-[#6F879E]">Shop College</a>
              <a href="/designs" className="transition hover:text-[#6F879E]">Design Collection</a>
              <a href="/custom-orders" className="transition hover:text-[#6F879E]">Custom Orders</a>
              <a href="/contact" className="transition hover:text-[#6F879E]">Contact</a>
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">

              {/* CART */}
              <button
                onClick={() => window.dispatchEvent(new Event("openMiniCart"))}
                className="hidden md:flex items-center gap-2 text-[14px] uppercase tracking-[0.12em] transition hover:text-[#6F879E]"
              >
                Cart
                {cartCount > 0 && (
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#5F7A94] text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              >
                <span className={`block h-0.5 w-7 bg-[#4B4B4B] transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-7 bg-[#4B4B4B] transition ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-7 bg-[#4B4B4B] transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                
              </button>

            </div>
          </div>

          {/* MOBILE MENU */}
          {menuOpen && (
            <nav className="border-t border-[#E5E1DB] bg-[#F7F7F5] px-6 py-6 md:hidden">

              <div className="flex flex-col gap-6 pt-2">

                <a href="/" onClick={() => setMenuOpen(false)} className="text-[14px] tracking-[0.12em] transition hover:text-[#6F879E]">
                  Home
                </a>

                <a href="/shop" onClick={() => setMenuOpen(false)} className="text-[14px] tracking-[0.12em] transition hover:text-[#6F879E]">
                  Shop Camp
                </a>

                <a href="/college" onClick={() => setMenuOpen(false)} className="text-[14px] tracking-[0.12em] transition hover:text-[#6F879E]">
                  Shop College
                </a>
<a href="/designs" onClick={() => setMenuOpen(false)}>
  Design Collection
</a>
                <a href="/custom-orders" onClick={() => setMenuOpen(false)} className="text-[14px] tracking-[0.12em] transition hover:text-[#6F879E]">
                  Custom Orders
                </a>

                <a href="/contact" onClick={() => setMenuOpen(false)} className="text-[14px] tracking-[0.12em] transition hover:text-[#6F879E]">
                  Contact
                </a>

                <a href="/cart" onClick={() => setMenuOpen(false)} className="text-[14px] tracking-[0.12em] transition hover:text-[#6F879E]">
                  View Cart
                </a>

              </div>
            </nav>
          )}
        </header>

        {/* ANNOUNCEMENT BAR */}
        {pathname !== "/" && (
          <div className="bg-[#6F879E] py-2.5 text-center text-xs uppercase tracking-[0.3em] text-white">
            {announcementText || "\u00A0"}
          </div>
        )}

        <MiniCart />

        {children}

      </body>
    </html>
  );
}
