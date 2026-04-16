"use client";

import "./globals.css";
import { useState } from "react";
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
  const pathname = usePathname();

  return (
    <html lang="en" className={josefin.variable}>
      <body className={`${josefin.className} bg-[#F7F7F5] text-[#4B4B4B]`}>
        <header className="border-b border-[#E3E3E0] bg-[#F7F7F5]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Just Made Custom logo"
                className="h-28 w-auto"
              />
            </a>

            <nav className="hidden items-center gap-8 text-sm font-normal uppercase tracking-widest md:flex">
              <a href="/" className="transition hover:text-[#6F879E]">
                Home
              </a>
              <a href="/shop" className="transition hover:text-[#6F879E]">
                Shop Camp
              </a>
              <a href="/college" className="transition hover:text-[#6F879E]">
                Shop College
              </a>
              <a
                href="/custom-orders"
                className="transition hover:text-[#6F879E]"
              >
                Custom Orders
              </a>
              <a href="/about" className="transition hover:text-[#6F879E]">
                About
              </a>
              <a href="/faq" className="transition hover:text-[#6F879E]">
                FAQ
              </a>
              <a href="/contact" className="transition hover:text-[#6F879E]">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <MiniCart />
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
                aria-label="Toggle menu"
              >
                <span
                  className={`block h-0.5 w-6 bg-[#4B4B4B] transition-all duration-300 ${
                    menuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-[#4B4B4B] transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-[#4B4B4B] transition-all duration-300 ${
                    menuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav className="flex flex-col gap-4 border-t border-[#E3E3E0] bg-[#F7F7F5] px-6 py-4 text-sm uppercase tracking-widest md:hidden">
              <a
                href="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#6F879E]"
              >
                Home
              </a>
              <a
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#6F879E]"
              >
                Shop Camp
              </a>
              <a
                href="/college"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#6F879E]"
              >
                Shop College
              </a>
              <a
                href="/custom-orders"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#6F879E]"
              >
                Custom Orders
              </a>
              <a
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#6F879E]"
              >
                About
              </a>
              <a
                href="/faq"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#6F879E]"
              >
                FAQ
              </a>
              <a
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#6F879E]"
              >
                Contact
              </a>
              <a
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#6F879E]"
              >
                Full Cart
              </a>
            </nav>
          )}
        </header>
        {/* BLUE BAR — hidden only on homepage */}
        {pathname !== "/" && (
          <div className="bg-[#6F879E] py-3 text-center text-xs uppercase tracking-[0.2em] text-white">
            Custom designs for clothing and more
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
