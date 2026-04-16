"use client";

import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  slug?: string;
  product: string;
  price: string;
  campName?: string;
  college?: string;
  size: string;
  color: string;
  quantity: number;
  image?: string;
  logoName?: string;
  placement?: string;
};

export default function MiniCart() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  function loadCart() {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }

  useEffect(() => {
    loadCart();

    function handleCartUpdated() {
      loadCart();
    }

    function handleStorage() {
      loadCart();
    }

    function handleOpenMiniCart() {
      loadCart();
      setOpen(true);
    }

    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("openMiniCart", handleOpenMiniCart);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("openMiniCart", handleOpenMiniCart);
    };
  }, []);

  function removeItem(id: number) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  function getItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function getTotal() {
    return cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return sum + price * item.quantity;
    }, 0);
  }

  function getItemHref(item: CartItem) {
    if (!item.slug) return "/cart";

    if (item.slug.startsWith("college-")) {
      return `/college/product/${item.slug}`;
    }

    return `/product/${item.slug}`;
  }

  return (
    <>
      <button
  onClick={() => setOpen(true)}
  className="relative text-sm font-light uppercase tracking-[0.18em] text-[#5F6F7F] transition hover:text-[#6F879E]"
  aria-label="Open cart"
>
  Cart
        {getItemCount() > 0 && (
          <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#6F879E] px-1.5 text-[10px] text-white">
            {getItemCount()}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/20"
          />

          <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[#E6E2DD] bg-white shadow-[0_0_40px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between border-b border-[#ECE7E1] px-5 py-4">
              <h2 className="text-xl font-light text-[#2F3A4A]">Your Cart</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {cart.length === 0 ? (
                <div className="pt-20 text-center">
                  <p className="text-gray-500">Your cart is empty.</p>
                  <a
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]"
                  >
                    Start Shopping
                  </a>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[#ECE7E1] bg-[#FCFCFB] p-4"
                    >
                      <div className="flex gap-3">
                        <a
                          href={getItemHref(item)}
                          onClick={() => setOpen(false)}
                          className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white transition hover:opacity-90"
                          aria-label={`View ${item.product}`}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.product}
                              className="h-full w-full object-contain p-2"
                            />
                          ) : (
                            <div className="text-xs text-gray-400">No image</div>
                          )}
                        </a>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <a
                              href={getItemHref(item)}
                              onClick={() => setOpen(false)}
                              className="text-sm font-medium text-[#2F3A4A] transition hover:text-[#6F879E]"
                            >
                              {item.product}
                            </a>

                            <p className="shrink-0 text-sm font-medium text-[#6F879E]">
                              {item.price}
                            </p>
                          </div>

                          <div className="mt-2 space-y-1 text-xs text-gray-500">
                            <p>
                              {item.campName
                                ? `Customization: ${item.campName}`
                                : item.college
                                ? `College: ${item.college}`
                                : "Customization: N/A"}
                            </p>
                            <p>
                              {item.size} · {item.color} · Qty {item.quantity}
                            </p>
                            {item.logoName && <p>Design: {item.logoName}</p>}
                            {item.placement && <p>Placement: {item.placement}</p>}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="mt-3 text-xs text-gray-400 underline underline-offset-4 transition hover:text-red-400"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#ECE7E1] px-5 py-4">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="font-medium text-[#2F3A4A]">Total</span>
                <span className="text-lg font-medium text-[#6F879E]">
                  ${getTotal()}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-[#6F879E] px-6 py-3 text-sm text-white transition-all duration-200 hover:opacity-95 hover:shadow-[0_12px_24px_rgba(111,135,158,0.25)]"
                >
                  View Cart
                </a>

                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-[#D8D3CD] px-6 py-3 text-sm text-[#2F3A4A] transition hover:bg-[#F7F7F5]"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
