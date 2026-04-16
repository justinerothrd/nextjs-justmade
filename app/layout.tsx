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
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setShowBar(false);
      return;
    }

    setShowBar(false);
    const timer = window.setTimeout(() => setShowBar(true), 120);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  let announcementText = "";

  if (pathname.startsWith("/college")) {
    announcementText = "COLLEGE COLLECTION";
  } else if (pathname.startsWith("/shop") || pathname.startsWith("/product")) {
    announcementText = "CAMP COLLECTION";
  }

  return (
    <html lang="en" className={josefin.variable}>
      <body className={`${josefin.className} bg-[#F7F7F5] text-[#4B4B4B]`}>
        <header className="border-b border-[#E3E3E0] bg-[#F7F7F5]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Just Made Custom logo"
                className="h-24 w-auto"
              />
            </a>

            <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-[0.08em] md:flex">
  <a href="/" className="text-[#3F3F3F] transition hover:text-[#6F879E]">
    Home
  </a>
  <a href="/shop" className="text-[#3F3F3F] transition hover:text-[#6F879E]">
    Shop Camp
  </a>
  <a href="/college" className="text-[#3F3F3F] transition hover:text-[#6F879E]">
    Shop College
  </a>
  <a href="/custom-orders" className="text-[#3F3F3F] transition hover:text-[#6F879E]">
    Custom Orders
  </a>
  <a href="/about" className="text-[#3F3F3F] transition hover:text-[#6F879E]">
    About
  </a>
  <a href="/faq" className="text-[#3F3F3F] transition hover:text-[#6F879E]">
    FAQ
  </a>
  <a href="/contact" className="text-[#3F3F3F] transition hover:text-[#6F879E]">
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
              <a href="/" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">
                Home
              </a>
              <a href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">
                Shop Camp
              </a>
              <a href="/college" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">
                Shop College
              </a>
              <a
                href="/custom-orders"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#6F879E]"
              >
                Custom Orders
              </a>
              <a href="/about" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">
                About
              </a>
              <a href="/faq" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">
                FAQ
              </a>
              <a
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#6F879E]"
              >
                Contact
              </a>
              <a href="/cart" onClick={() => setMenuOpen(false)} className="hover:text-[#6F879E]">
                Full Cart
              </a>
            </nav>
          )}
        </header>

        {pathname !== "/" && announcementText && (
          <div
            className={`bg-[#5E748A] py-2.5 text-center text-xs uppercase tracking-[0.3em] text-white transition-all duration-500 ${
              showBar ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`}
          >
            {announcementText}
          </div>
        )}

        {children}
      </body>
    </html>
  );
}
