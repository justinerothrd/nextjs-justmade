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

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  function removeItem(id: number) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  function getItemHref(item: CartItem) {
    if (!item.slug) return "/cart";

    if (item.slug.startsWith("college-")) {
      return `/college/product/${item.slug}`;
    }

    return `/product/${item.slug}`;
  }

  function getTotal() {
    return cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return sum + price * item.quantity;
    }, 0);
  }

  function formatOrderEmail(orderNumber: string, submittedAt: string) {
    const itemLines = cart
      .map((item, index) => {
        return [
          `${index + 1}. ${item.product}`,
          `   Price: ${item.price}`,
          `   Quantity: ${item.quantity}`,
          `   Size: ${item.size}`,
          `   Color: ${item.color}`,
          `   Customization Details: ${item.campName || "N/A"}`,
          `   Design: ${item.logoName || "N/A"}`,
          `   Placement: ${item.placement || "N/A"}`,
          `   Line Total: $${(
            parseFloat(item.price.replace("$", "")) * item.quantity
          ).toFixed(2)}`,
        ].join("\n");
      })
      .join("\n\n");

    return [
      "JUST MADE CUSTOM — ORDER REQUEST",
      "",
      `Order Number: ${orderNumber}`,
      `Submitted: ${submittedAt}`,
      `Customer Email: ${email}`,
      "",
      "ORDER SUMMARY",
      "------------------------------",
      itemLines,
      "",
      "------------------------------",
      `Order Total: $${getTotal().toFixed(2)}`,
      "",
      "NEXT STEP",
      "Please review this order and follow up with confirmation and payment instructions.",
    ].join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const orderNumber = `JM-${Date.now().toString().slice(-6)}`;
    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });

    try {
      const res = await fetch("https://formspree.io/f/mlgoglny", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subject: `New Just Made Order ${orderNumber}`,
          orderNumber,
          submittedAt,
          total: `$${getTotal().toFixed(2)}`,
          message: formatOrderEmail(orderNumber, submittedAt),
        }),
      });

      if (res.ok) {
        setStatus("success");
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-4 py-20 text-[#4B4B4B]">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-6 text-5xl">🎉</div>

          <h1 className="text-3xl font-light text-[#3F3F3F]">
            Order Submitted
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Thanks for your order! We&apos;re reviewing your selections and will
            reach out shortly at <span className="font-medium">{email}</span> with
            confirmation and payment instructions.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Each order is carefully reviewed — we&apos;ll follow up shortly with
            confirmation and payment details.
          </p>

          <a
            href="/shop"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#5F7A94] px-8 py-3.5 text-[15px] font-medium tracking-[0.08em] text-white transition-all duration-200 hover:bg-[#536C84]"
          >
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-10 text-[#4B4B4B] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-[36px] font-light tracking-[0.01em] text-[#3F3F3F]">
            Your Cart
          </h1>

          <a
            href="/shop"
            className="text-sm underline underline-offset-4 transition hover:text-[#6F879E]"
          >
            Continue Shopping
          </a>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500">Your cart is empty.</p>

            <a
              href="/shop"
              className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-[#6F879E]"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[28px] border border-[#EAE6E1] bg-white p-5 sm:p-6"
                >
                  <div className="flex gap-4">
                    <a
                      href={getItemHref(item)}
                      className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F7F7F5] transition hover:opacity-90 sm:h-28 sm:w-28"
                      aria-label={`View ${item.product}`}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.product}
                          className="h-full w-full object-contain p-2 transition duration-300 hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="text-center text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </a>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <a
                          href={getItemHref(item)}
                          className="text-[15px] font-medium tracking-[0.01em] text-[#3F3F3F] transition hover:text-[#6F879E]"
                        >
                          {item.product}
                        </a>

                        <p className="shrink-0 font-medium text-[#5F7A94]">
                          {item.price}
                        </p>
                      </div>

                      <div className="mt-3 space-y-2 text-sm">
                        <p>
                          <span className="text-gray-500">
                            Customization Details:
                          </span>{" "}
                          {item.campName || "N/A"}
                        </p>
                        <p>
                          <span className="text-gray-500">Size:</span> {item.size}
                        </p>
                        <p>
                          <span className="text-gray-500">Color:</span> {item.color}
                        </p>
                        <p>
                          <span className="text-gray-500">Quantity:</span>{" "}
                          {item.quantity}
                        </p>
                        {item.logoName && (
                          <p>
                            <span className="text-gray-500">Design:</span>{" "}
                            {item.logoName}
                          </p>
                        )}
                        {item.placement && (
                          <p>
                            <span className="text-gray-500">Placement:</span>{" "}
                            {item.placement}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="mt-4 text-xs text-gray-400 underline underline-offset-4 transition hover:text-[#9CA3AF]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-[28px] border border-[#EFECE8] bg-white px-6 py-5 text-base font-medium">
              <span>Total</span>
              <span className="text-lg text-[#5F7A94]">
                ${getTotal().toFixed(2)}
              </span>
            </div>

            <div className="mt-8">
              <label className="text-sm font-medium text-[#3F3F3F]">
                Your Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#5F7A94]"
              />
            </div>

            <p className="mt-6 text-sm text-gray-600">
              Each order is carefully reviewed — we&apos;ll follow up shortly with
              confirmation and payment details.
            </p>

            {status === "error" && (
              <p className="mt-3 text-sm text-red-500">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-8 w-full rounded-full bg-[#5F7A94] px-7 py-3.5 text-[15px] font-medium tracking-[0.08em] text-white transition-all duration-200 hover:bg-[#536C84] hover:-translate-y-[1px] hover:opacity-95"
            >
              {status === "sending" ? "Submitting..." : "Submit Order Request"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
