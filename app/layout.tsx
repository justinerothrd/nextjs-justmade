"use client";

import "./globals.css";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-[#F7F7F5] text-[#4B4B4B]">
        <header className="border-b border-[#E3E3E0] bg-[#F7F7F5]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

            {/* Logo */}
            <a href="/" className="flex items-center">
              <img src="/logo.png" alt="Just Made Custom logo" className="h-24 w-auto" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="/" className="hover:text-[#6F879E]">Home</a>
              <a href="/shop" className="hover:text-[#6F879E]">Shop</a>
              <a href="/custom-orders" className="hover:text-[#6F879E]">Custom Orders</a>
              <a href="/about" className="hover:text-[#6F879E]">About</a>
              <a href="/faq" className="hover:text-[#6F879E]">FAQ</a>
              <a href="/contact" className="hover:text-[#6F879E]">Contact</a>
            </nav>

            {/* Right side: Cart + Hamburger */}
            <div className="flex items-center gap-4">
              <a href="/cart" className="text-sm hover:text-[#6F879E]">Cart</a>

              {/* Hamburger button — mobile only */}
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
            <nav className="md:hidden border-t border-[#E3E3E0] bg-[#F7F7F5] px-6 py-4 flex flex-col gap-4 text-sm">
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

        <div className="bg-[#6F879E] py-3 text-center text-sm text-white">
          Personalized camp favorites for kids, bunks, and groups
        </div>

        {children}
      </body>
    </html>
  );
}

