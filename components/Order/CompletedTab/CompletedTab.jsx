// components/Orders/CompletedTab.js
import React from "react";
import OrderCard from "../OrderCard/OrderCard";

const CompletedTab = ({ orders }) => {
  const filtered = orders.filter((o) => o.status === "Completed");

  return filtered.length ? (
    <div className="grid md:grid-cols-2 gap-5">
      {filtered.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500 text-sm col-span-2">
      No orders found.
    </p>
  );
};

export default CompletedTab;
