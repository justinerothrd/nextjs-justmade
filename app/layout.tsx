"use client";

import "./globals.css";
import { useState } from "react";
import { Josefin_Sans } from "next/font/google";

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

  return (
    <html lang="en" className={josefin.variable}>
      <body className={`${josefin.className} bg-[#F7F7F5] text-[#4B4B4B]`}>
        <header className="border-b border-[#E3E3E0] bg-[#F7F7F5]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

            {/* Logo */}
            <a href="/" className="flex items-center">
              <img src="/logo.png" alt="Just Made Custom logo" className="h-24 w-auto" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-400 tracking-widest uppercase">
              <a href="/" className="hover:text-[#6F879E] transition">Home</a>
              <a href="/shop" className="hover:text-[#6F879E] transition">Shop Camp</a>
              <a href="/custom-orders" className="hover:text-[#6F879E] transition">Custom Orders</a>
              <a href="/about" className="hover:text-[#6F879E] transition">About</a>
              <a href="/faq" className="hover:text-[#6F879E] transition">FAQ</a>
              <a href="/contact" className="hover:text-[#6F879E] transition">Contact</a>
              <a href="/college" className="hover:text-[#6F879E] transition">Shop College</a>
            </nav>

            {/* Right side: Cart + Hamburger */}
            <div className="flex items-center gap-4">
              <a href="/cart" className="text-sm uppercase tracking-widest hover:text-[#6F879E] transition">Cart</a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                aria-label="Toggle menu"
              >
                <span className={`block h-0.5 w-6 bg-[#4B4B4B] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 w-6 bg-[#4B4B4B] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-6 bg-[#4B4B4B] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <nav className="md:hidden border-t border-[#E3E3E0] bg-[#F7F7F5] px-6 py-4 flex flex-col gap-4 text-sm uppercase tracking-widest">
              <a href="/" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">Home</a>
              <a href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">Shop</a>
              <a href="/custom-orders" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">Custom Orders</a>
              <a href="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">About</a>
              <a href="/faq" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">FAQ</a>
              <a href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">Contact</a>
              <a href="/cart" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">Cart</a>
            </nav>
          )}
        </header>

        <div className="bg-[#6F879E] py-3 text-center text-xs text-white tracking-widest uppercase">
          Personalized camp favorites for kids, bunks, and groups
        </div>

        {children}
      </body>
    </html>
  );
}
