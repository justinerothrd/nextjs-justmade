```tsx id="qxr9td"
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

  logoImage?: string;

  logoColor?: string;

  placement?: string;

  distressed?: boolean;

  customDetails?: string;

  style?: string;

  fit?: string;

  length?: string;

  type?: string;

  neckline?: string;

  sizeOption?: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [submittedOrderNumber, setSubmittedOrderNumber] =
    useState("");

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(stored);
  }, []);

  function removeItem(id: number) {
    const updated = cart.filter(
      (item) => item.id !== id
    );

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
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
      const price = parseFloat(
        item.price.replace("$", "")
      );

      return sum + price * item.quantity;
    }, 0);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setStatus("sending");

    const orderNumber = `JM-${Date.now()
      .toString()
      .slice(-6)}`;

    const submittedAt =
      new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

    try {
      const res = await fetch(
        "/api/send-order-confirmation",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            phone,
            orderNumber,
            submittedAt,
            total: `$${getTotal().toFixed(2)}`,
            cart,
          }),
        }
      );

      if (res.ok) {
        setSubmittedOrderNumber(
          orderNumber
        );

        setStatus("success");

        localStorage.removeItem("cart");

        setCart([]);

        window.dispatchEvent(
          new Event("cartUpdated")
        );
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

          <div className="mt-6 text-5xl">
            🎉
          </div>

          <h1 className="mt-6 text-3xl font-light text-[#2F2F2F]">
            Order Received
          </h1>

          {submittedOrderNumber && (
            <p className="mt-3 text-xs tracking-[0.14em] text-gray-400">
              ORDER #
              {
                submittedOrderNumber
              }
            </p>
          )}

          <p className="mt-5 text-base leading-7 text-gray-600">
            Your custom order has been submitted successfully.
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            A confirmation was sent
            to{" "}
            <span className="font-medium text-[#3F3F3F]">
              {email}
            </span>
            .
          </p>

          <a
            href="/shop"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#5F7A94] px-8 py-3.5 text-[14px] font-medium uppercase tracking-[0.12em] text-white"
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
          <h1 className="mt-2 text-[34px] font-light tracking-[-0.01em] text-[#2F2F2F] sm:text-[42px]">
            Review Your Order
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-10 text-gray-500">
            Review your selections
            below and contact us
            with any questions.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[32px] border border-[#EAE6E1] bg-white px-6 py-20 text-center">
            <p className="text-gray-500">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              {cart.map((item) => {
                const lineTotal =
                  parseFloat(
                    item.price.replace(
                      "$",
                      ""
                    )
                  ) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="rounded-[28px] border border-[#EAE6E1] bg-white p-6"
                  >
                    <div className="flex gap-4 sm:gap-5">
                      <a
                        href={getItemHref(
                          item
                        )}
                        className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F7F7F5]"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={
                              item.product
                            }
                            className="h-full w-full object-contain p-2"
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
                            href={getItemHref(
                              item
                            )}
                            className="text-[16px] font-medium tracking-[0.005em] text-[#2F2F2F]"
                          >
                            {
                              item.product
                            }
                          </a>

                          <p className="shrink-0 text-[15px] font-medium text-[#5F7A94]">
                            {
                              item.price
                            }
                          </p>
                        </div>

                        <div className="mt-4 grid gap-2 text-sm leading-5 text-[#4B4B4B] sm:grid-cols-2">
                          <p>
                            <span className="text-gray-500">
                              Size:
                            </span>{" "}
                            {item.size}
                          </p>

                          <p>
                            <span className="text-gray-500">
                              Color:
                            </span>{" "}
                            {item.color}
                          </p>

                          <p>
                            <span className="text-gray-500">
                              Quantity:
                            </span>{" "}
                            {
                              item.quantity
                            }
                          </p>

                          <p>
                            <span className="text-gray-500">
                              Line Total:
                            </span>{" "}
                            $
                            {lineTotal.toFixed(
                              2
                            )}
                          </p>

                          {item.type && (
                            <p>
                              <span className="text-gray-500">
                                Type:
                              </span>{" "}
                              {
                                item.type
                              }
                            </p>
                          )}

                          {item.style && (
                            <p>
                              <span className="text-gray-500">
                                Style:
                              </span>{" "}
                              {
                                item.style
                              }
                            </p>
                          )}

                          {item.neckline && (
                            <p>
                              <span className="text-gray-500">
                                Neckline:
                              </span>{" "}
                              {
                                item.neckline
                              }
                            </p>
                          )}

                          {item.fit && (
                            <p>
                              <span className="text-gray-500">
                                Fit:
                              </span>{" "}
                              {
                                item.fit
                              }
                            </p>
                          )}

                          {item.length && (
                            <p>
                              <span className="text-gray-500">
                                Length:
                              </span>{" "}
                              {
                                item.length
                              }
                            </p>
                          )}

                          <p className="sm:col-span-2">
                            <span className="text-gray-500">
                              Camp / School:
                            </span>{" "}
                            {item.campName ||
                              item.college ||
                              "N/A"}
                          </p>

                          {item.customDetails && (
                            <p className="sm:col-span-2">
                              <span className="text-gray-500">
                                Notes:
                              </span>{" "}
                              {
                                item.customDetails
                              }
                            </p>
                          )}

                          {item.logoName && (
                            <p className="flex items-center gap-2">
                              <span className="text-gray-500">
                                Design:
                              </span>

                              <span>
                                {
                                  item.logoName
                                }
                              </span>

                              {item.logoImage && (
                                <img
                                  src={
                                    item.logoImage
                                  }
                                  alt={
                                    item.logoName
                                  }
                                  className="h-12 w-12 rounded-lg bg-[#F7F7F5] object-contain p-2 border border-[#EEEAE5]"
                                />
                              )}
                            </p>
                          )}

                          {item.logoColor && (
                            <p>
                              <span className="text-gray-500">
                                Logo Color:
                              </span>{" "}
                              {
                                item.logoColor
                              }
                            </p>
                          )}

                          {item.placement && (
                            <p>
                              <span className="text-gray-500">
                                Placement:
                              </span>{" "}
                              {
                                item.placement
                              }
                            </p>
                          )}

                          {item.distressed && (
                            <p>
                              <span className="text-gray-500">
                                Finish:
                              </span>{" "}
                              Distressed /
                              Vintage
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(
                              item.id
                            )
                          }
                          className="mt-5 text-xs text-gray-400 underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-[28px] border border-[#EAE6E1] bg-white px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Order Total
                </span>

                <span className="text-xl font-medium text-[#2F2F2F]">
                  $
                  {getTotal().toFixed(
                    2
                  )}
                </span>
              </div>
            </div>

            <div className="mt-8 rounded-[28px] border border-[#EAE6E1] bg-white p-6">
              <label className="text-sm font-medium text-[#2F2F2F]">
                Contact Information
              </label>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  required
                  className="w-full rounded-xl border border-[#D8D3CD] bg-white px-4 py-3 text-sm"
                />

                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  required
                  className="w-full rounded-xl border border-[#D8D3CD] bg-white px-4 py-3 text-sm"
                />
              </div>

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
                className="mt-4 w-full rounded-xl border border-[#D8D3CD] bg-white px-4 py-3 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={
                status === "sending"
              }
              className="mt-8 w-full rounded-full bg-[#5F7A94] px-7 py-4 text-[15px] font-medium uppercase tracking-[0.12em] text-white"
            >
              {status === "sending"
                ? "Submitting..."
                : "Submit Order Request"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
```
