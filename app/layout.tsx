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
  const [showBar, setShowBar] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/") {
      setShowBar(false);
      return;
    }

    setShowBar(false);
    const timer = window.setTimeout(() => setShowBar(true), 120);
    return () => window.clearTimeout(timer);
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

    function handleCartUpdated() {
      loadCartCount();
    }

    function handleStorage() {
      loadCartCount();
    }

    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  let announcementText = "";

  if (pathname.startsWith("/college")) {
    announcementText = "COLLEGE COLLECTION";
  } else if (pathname.startsWith("/shop") || pathname.startsWith("/product")) {
    announcementText = "CAMP COLLECTION";
  }

  return (
    <html lang="en" className={josefin.variable}>
      <body className={`${josefin.className} bg-[#F7F7F5] text-[#4B4B4B]`}>
        <header className="sticky top-0 z-40 bg-[#F7F7F5]/95 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Just Made Custom logo"
                className="h-14 w-auto sm:h-16"
              />
            </a>

            <nav className="hidden items-center gap-10 text-[15px] font-medium uppercase tracking-[0.14em] md:flex">
              <a href="/" className="hover:text-[#6F879E]">
                Home
              </a>
              <a href="/shop" className="hover:text-[#6F879E]">
                Shop Camp
              </a>
              <a href="/college" className="hover:text-[#6F879E]">
                Shop College
              </a>
              <a href="/custom-orders" className="hover:text-[#6F879E]">
                Custom Orders
              </a>
              <a href="/about" className="hover:text-[#6F879E]">
                About
              </a>
              <a href="/faq" className="hover:text-[#6F879E]">
                FAQ
              </a>
              <a href="/contact" className="hover:text-[#6F879E]">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => window.dispatchEvent(new Event("openMiniCart"))}
                className="hidden md:flex items-center gap-2 text-[15px] font-medium uppercase tracking-[0.12em] text-[#3F3F3F] transition duration-200 hover:text-[#6F879E]"
                aria-label="Open cart"
              >
                <span>Cart</span>

                {cartCount > 0 && (
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#5F7A94] text-[10px] font-medium leading-none text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
                aria-label="Toggle menu"
              >
                <span
                  className={`block h-0.5 w-7 bg-[#4B4B4B] transition-all duration-300 ${
                    menuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-7 bg-[#4B4B4B] transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-7 bg-[#4B4B4B] transition-all duration-300 ${
                    menuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav className="border-t border-[#E3E3E0] bg-[#F7F7F5] px-6 py-5 text-sm uppercase tracking-widest md:hidden">
              <div className="flex flex-col gap-4">
                <a href="/" onClick={() => setMenuOpen(false)}>
                  Home
                </a>
                <a href="/shop" onClick={() => setMenuOpen(false)}>
                  Shop Camp
                </a>
                <a href="/college" onClick={() => setMenuOpen(false)}>
                  Shop College
                </a>
                <a href="/custom-orders" onClick={() => setMenuOpen(false)}>
                  Custom Orders
                </a>
                <a href="/about" onClick={() => setMenuOpen(false)}>
                  About
                </a>
                <a href="/faq" onClick={() => setMenuOpen(false)}>
                  FAQ
                </a>
                <a href="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </a>
                <a href="/cart" onClick={() => setMenuOpen(false)}>
                  View Cart
                </a>
              </div>
            </nav>
          )}
        </header>

        {pathname !== "/" && announcementText && (
          <div
            className={`bg-[#5E748A] py-2.5 text-center text-xs uppercase tracking-[0.3em] text-white transition ${
              showBar ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`}
          >
            {announcementText}
          </div>
        )}

        <MiniCart />

        {children}
      </body>
    </html>
  );
}
