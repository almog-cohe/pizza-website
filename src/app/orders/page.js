"use client";

import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs.js";
import useProfile from "@/components/UseProfile";
import Link from "next/link";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { loading, data: profile } = useProfile();
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders")
      .then((res) => res.json())
      .then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && <div>Loading orders...</div>}
        {orders?.length > 0 &&
          orders.map((order, i) => (
            <div
              className="bg-gray-100 rounded-lg mb-2 p-4 flex items-center gap-4"
              key={i + 1}
            >
              <div className="grow flex items-center gap-4">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-300" : "bg-red-300") +
                      " p-2 rounded-md w-24 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not paid"}
                  </div>
                </div>
                <div>
                  <div className="flex gap-20 items-center mb-1">
                    <div>{order.userEmail}</div>
                    <div className="text-gray-600 text-sm">
                      {new Date(order.createdAt)
                        .toLocaleString()
                        .replace(/[.]/g, "-")}
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {order.cartProducts.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>
              <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                <Link className="button" href={"/orders/" + order._id}>
                  Show order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
export default OrdersPage;
