// components/Orders/PreparingTab.js
import React from "react";
import OrderCard from "../OrderCard/OrderCard";

const PreparingTab = ({ orders, onStatusChange, onSelectOrder }) => {
  const filtered = orders.filter((o) => o.status === "Preparing");

  return filtered.length ? (
    <div className="grid md:grid-cols-2 gap-5">
      {filtered.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onStatusChange={onStatusChange}
          onClick={() => onSelectOrder(order)} // 🔥 Open modal when clicked
        />
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500 text-sm col-span-2">
      No orders found.
    </p>
  );
};

export default PreparingTab;
