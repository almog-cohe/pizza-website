"use client";

import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useEffect } from "react";

function OrderPage() {
  const { clearCart } = useContext(CartContext);
  useEffect(() => {
    if (window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
  }, []);

  return (
    <section className="max-w-xl text-center mx-auto mt-8">
      <SectionHeaders mainHeader="Your order" />
      <div className="my-4">
        <p>Thanks for your order</p>
        <p>We will call you when your order will be on the way</p>
      </div>
    </section>
  );
}
export default OrderPage;
