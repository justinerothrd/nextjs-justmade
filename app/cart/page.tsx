const res = await fetch("/api/send-order-confirmation", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email,
    orderNumber,
    submittedAt,
    total: `$${getTotal().toFixed(2)}`,
    cart,
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
