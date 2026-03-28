"use client";

import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  product: string;
  price: string;
  campName: string;
  size: string;
  color: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  function removeItem(id: number) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  function getTotal() {
    return cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return sum + price * item.quantity;
    }, 0);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mlgoglny", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          total: `$${getTotal()}`,
          items: cart.map((item) =>
            `${item.product} — Camp Name: ${item.campName || "N/A"}, Size: ${item.size}, Color: ${item.color}, Qty: ${item.quantity}, Price: ${item.price}`
          ).join("\n"),
        }),
      });
      if (res.ok) {
        setStatus("success");
        localStorage.removeItem("cart");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-4 py-16 text-[#4B4B4B]">
        <div className="mx-auto max-w-lg text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className="text-3xl font-light text-[#2F3A4A]">Order Received!</h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Thanks for your order! We'll be in touch at {email} shortly to confirm your items and arrange payment.
          </p>
          <a href="/shop" className="mt-8 inline-block rounded-full bg-[#6F879E] px-6 py-3 text-sm text-white transition hover:opacity-90">
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#4B4B4B] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-light sm:text-3xl">Your Cart</h1>
          <a href="/shop" className="text-sm underline underline-offset-4 hover:text-[#6F879E]">
            Continue Shopping
          </a>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Your cart is empty.</p>
            <a href="/shop" className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]">
              Start Shopping
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-base font-medium sm:text-lg">{item.product}</h2>
                    <p className="shrink-0 text-[#6F879E]">{item.price}</p>
                  </div>
                  <div className="mt-3 divide-y divide-[#F0EEEB]">
                    {[
                      { label: "Camp Name", value: item.campName || "N/A" },
                      { label: "Size", value: item.size },
                      { label: "Color", value: item.color },
                      { label: "Quantity", value: item.quantity.toString() },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between py-2 text-sm">
                        <span className="text-gray-500">{row.label}</span>
                        <span className="font-medium text-[#2F3A4A]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="mt-3 text-xs text-gray-400 underline underline-offset-4 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 flex justify-between rounded-2xl bg-white px-5 py-4 text-sm font-medium">
              <span>Total</span>
              <span className="text-[#6F879E]">${getTotal()}</span>
            </div>

            {/* Email */}
            <div className="mt-6">
              <label className="text-sm">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-lg border bg-white p-3"
              />
            </div>

            {status === "error" && (
              <p className="mt-3 text-sm text-red-500">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full rounded-full bg-[#6F879E] px-6 py-4 text-center text-sm text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {status === "sending" ? "Submitting..." : "Submit Order"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
