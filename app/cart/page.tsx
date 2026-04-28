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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
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
          `Price: ${item.price}`,
          `Quantity: ${item.quantity}`,
          `Size: ${item.size}`,
          `Color: ${item.color}`,
          `Customization: ${item.campName || item.college || "N/A"}`,
          `Design: ${item.logoName || "N/A"}`,
          `Placement: ${item.placement || "N/A"}`,
        ].join("\n");
      })
      .join("\n\n");

    return `
JUST MADE CUSTOM — ORDER REQUEST

Order Number: ${orderNumber}
Submitted: ${submittedAt}
Customer Email: ${email}

ORDER SUMMARY
------------------------------
${itemLines}

------------------------------
Order Total: $${getTotal().toFixed(2)}

We will follow up with confirmation and payment instructions.
`;
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
          subject: `Just Made Order • ${orderNumber}`,
          orderNumber,
          submittedAt,
          total: `$${getTotal().toFixed(2)}`,
          message: formatOrderEmail(orderNumber, submittedAt),
        }),
      });

      if (res.ok) {
        // send customer email
        await fetch("/api/send-order-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            orderNumber,
            total: `$${getTotal().toFixed(2)}`,
            cart,
          }),
        });

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
      <main className="min-h-screen flex items-center justify-center bg-[#F7F7F5]">
        <div className="text-center">
          <h1 className="text-2xl mb-2">Order Received 🎉</h1>
          <p>We’ll email you shortly at {email}</p>
          <p className="text-sm mt-2">Order #{submittedOrderNumber}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-xl mb-4">Your Cart</h1>

      {cart.map((item) => (
        <div key={item.id} className="mb-4 border p-4">
          <p>{item.product}</p>
          <p>{item.price}</p>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}

      <p className="mt-4">Total: ${getTotal().toFixed(2)}</p>

      <form onSubmit={handleSubmit} className="mt-6">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="mt-4 bg-black text-white px-4 py-2"
        >
          {status === "sending" ? "Submitting..." : "Submit Order"}
        </button>

        {status === "error" && (
          <p className="text-red-500 mt-2">Something went wrong</p>
        )}
      </form>
    </main>
  );
}
