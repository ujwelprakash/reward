import React, { useState } from "react";
import ConfirmationTab from "../ConfirmationTab/ConfirmationTab";
import PreparingTab from "../Prepare/PreparingTab";
import PackedOrdersTabs from "../PackedOrderTab/PackedOrderTab";
import CompletedTab from "../CompletedTab/CompletedTab";
import OrderModal from "../OrderModel/OrderModel"; // New component

const initialOrders = [
  {
    id: "12345",
    date: "Apr 10, 2024",
    customer: "Rajesh Kannan",
    phone: "+918526547512",
    address: "R S Puram, Coimbatore",
    pickupTime: "Self-pickup: 30 Mar 2024, 10AM - 12PM",
    items: [
      { name: "Ooty apple", qty: 1, price: 100 },
      { name: "White Egg", qty: 5, price: 50 },
    ],
    total: 150,
    payment: "PAID - UPI",
    status: "Confirmation",
  },
];

const tabs = ["Confirmation", "Preparing", "Packed Orders", "Completed"];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("Confirmation");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
            ...(newStatus === "Packed Orders" && {
              packedTimeline: [
                { label: "Store Confirmation", time: "Apr 09, 2024 | 02:00PM" },
                { label: "Delivery Accepted", time: "Apr 10, 2024 | 03:00PM" },
                { label: "Delivery Pickup", time: "Apr 10, 2024 | 03:30PM" },
              ],
            }),
            ...(newStatus === "Completed" && {
              deliveryTimeline: [
                { label: "Delivery pickup", time: "Apr 10, 2024 | 03:30PM" },
                { label: "Delivered", time: "Apr 10, 2024 | 06:00PM" },
              ],
            }),
          }
        : order
    );
    setOrders(updatedOrders);
    setActiveTab(newStatus);
    setSelectedOrder(null); // close modal after status change
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.status === activeTab &&
      (o.id.includes(searchTerm) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">My Orders</h2>
          <p className="text-xs text-gray-500">
            Last Update at:{" "}
            <span className="text-black">June 02, 2024 | 11:25 PM</span>
          </p>
        </div>
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          className="border px-3 py-2 rounded-md w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex space-x-6 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium ${
              activeTab === tab
                ? "text-lime-700 border-b-2 border-lime-600"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab} ({orders.filter((o) => o.status === tab).length})
          </button>
        ))}
      </div>

      {activeTab === "Confirmation" && (
        <ConfirmationTab
          orders={filteredOrders}
          onStatusChange={handleStatusChange}
        />
      )}
      {activeTab === "Preparing" && (
        <PreparingTab
          orders={filteredOrders}
          onStatusChange={handleStatusChange}
          onSelectOrder={(order) => setSelectedOrder(order)}
        />
      )}
      {activeTab === "Packed Orders" && (
        <PackedOrdersTabs
          orders={filteredOrders}
          onStatusChange={handleStatusChange}
        />
      )}
      {activeTab === "Completed" && (
        <CompletedTab
          orders={filteredOrders}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
