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
  const [submittedOrderNumber, setSubmittedOrderNumber] = useState("");

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
          `   Customization Details: ${item.campName || item.college || "N/A"}`,
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
        setSubmittedOrderNumber(orderNumber);
        setStatus("success");
        localStorage.removeItem("cart");
        setCart([]);
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
        <div className="mx-auto max-w-lg rounded-[32px] border border-[#EAE6E1] bg-white px-6 py-12 text-center shadow-[0_4px_18px_rgba(0,0,0,0.04)] sm:px-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#9A9A9A]">
            Just Made Custom
          </p>

          <div className="mt-6 text-5xl">🎉</div>

          <h1 className="mt-6 text-3xl font-light text-[#2F2F2F]">
            Order Received
          </h1>

          {submittedOrderNumber && (
            <p className="mt-3 text-xs tracking-[0.14em] text-gray-400">
              ORDER #{submittedOrderNumber}
            </p>
          )}

          <p className="mt-5 text-base leading-7 text-gray-600">
            Your custom order has been submitted successfully.
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            A confirmation will be sent to{" "}
            <span className="font-medium text-[#3F3F3F]">{email}</span> shortly
            with next steps and payment instructions.
          </p>

          <a
            href="/shop"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#5F7A94] px-8 py-3.5 text-[14px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#536C84] hover:shadow-md"
          >
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-10 text-[#4B4B4B] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8A8A8A]">
            Just Made Custom
          </p>

          <h1 className="mt-2 text-[34px] font-light tracking-[-0.01em] text-[#2F2F2F] sm:text-[42px]">
            Review Your Order
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Each piece is made custom — please review your selections below
            before submitting your order request.
          </p>

          <a
            href="/shop"
            className="mt-4 inline-block text-xs tracking-wide underline underline-offset-4 transition hover:text-[#6F879E]"
          >
            Continue Shopping
          </a>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[32px] border border-[#EAE6E1] bg-white px-6 py-20 text-center shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
            <p className="text-gray-500">Your cart is empty.</p>

            <a
              href="/shop"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[#5F7A94] px-7 py-3 text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#536C84] hover:shadow-md"
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
                  className="rounded-[28px] border border-[#EAE6E1] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:p-7"
                >
                  <div className="flex gap-4 sm:gap-5">
                    <a
                      href={getItemHref(item)}
                      className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F7F7F5] transition hover:opacity-90 sm:h-32 sm:w-32"
                      aria-label={`View ${item.product}`}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.product}
                          className="h-full w-full object-contain p-2 transition duration-300 hover:scale-[1.04]"
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
                          className="text-[16px] font-medium tracking-[0.005em] text-[#2F2F2F] transition hover:text-[#6F879E]"
                        >
                          {item.product}
                        </a>

                        <p className="shrink-0 text-[15px] font-medium text-[#5F7A94]">
                          {item.price}
                        </p>
                      </div>

                      <div className="mt-4 grid gap-2 text-sm leading-5 text-[#4B4B4B] sm:grid-cols-2">
                        <p>
                          <span className="text-gray-500">Size:</span>{" "}
                          {item.size}
                        </p>

                        <p>
                          <span className="text-gray-500">Color:</span>{" "}
                          {item.color}
                        </p>

                        <p>
                          <span className="text-gray-500">Quantity:</span>{" "}
                          {item.quantity}
                        </p>

                        <p>
                          <span className="text-gray-500">Line Total:</span>{" "}
                          $
                          {(
                            parseFloat(item.price.replace("$", "")) *
                            item.quantity
                          ).toFixed(2)}
                        </p>

                        <p className="sm:col-span-2">
                          <span className="text-gray-500">
                            Customization Details:
                          </span>{" "}
                          {item.campName || item.college || "N/A"}
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
                        className="mt-5 text-xs text-gray-400 underline underline-offset-4 transition hover:text-[#8A8A8A]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-[#EAE6E1] bg-white px-6 py-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Order Total</span>
                <span className="text-xl font-medium text-[#2F2F2F]">
                  ${getTotal().toFixed(2)}
                </span>
              </div>

              <p className="mt-3 text-xs text-gray-400">
                Final pricing and payment details will be confirmed after review.
              </p>
            </div>

            <div className="mt-8 rounded-[28px] border border-[#EAE6E1] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
              <label className="text-sm font-medium text-[#2F2F2F]">
                Contact Email
              </label>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                We’ll send your order confirmation and payment instructions here.
              </p>

              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-4 w-full rounded-xl border border-[#D8D3CD] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#5F7A94]"
              />
            </div>

            <p className="mt-6 text-center text-sm leading-6 text-gray-600">
              After submitting, we’ll review your order and email you with
              confirmation and payment instructions.
            </p>

            {status === "error" && (
              <p className="mt-4 text-center text-sm text-red-500">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-8 w-full rounded-full bg-[#5F7A94] px-7 py-4 text-[15px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#536C84] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Submitting..." : "Submit Order Request"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
