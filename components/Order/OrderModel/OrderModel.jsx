import React, { useState, useEffect } from "react";

const OrderModal = ({ order, onClose, onStatusChange }) => {
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const initialChecks = {};
    order.items.forEach((item) => {
      initialChecks[item.name] = false;
    });
    setCheckedItems(initialChecks);

    // Add ESC key listener to close modal
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [order, onClose]);

  const handleCheck = (itemName) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const allChecked = Object.values(checkedItems).every(Boolean);

  return (
    <div className="fixed  inset-0 z-50 bg-gray bg-opacity-40 flex items-center justify-center px-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 relative mt-10 mb-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Order Confirmation
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Order Details */}
          <div className="border rounded-md p-4 space-y-2 text-sm bg-gray-50">
            <div className="flex justify-between text-green-600 font-medium">
              <span>
                Order ID:{" "}
                <span className="text-yellow-600 font-semibold">
                  {order.id}
                </span>
              </span>
              <span>Date: {order.date || "Apr 09, 2024"}</span>
            </div>

            <div className="pt-2 text-gray-700 space-y-1">
              <p className="font-medium">Customer:</p>
              <p>{order.customer}</p>
              <p>{order.phone}</p>
              <p>{order.address}</p>
              <p>Pickup Time: {order.pickupTime}</p>
              <p>Payment: {order.payment}</p>
              <p className="font-semibold pt-1">Total: ₹{order.total}</p>
            </div>

            {/* Order Timeline */}
            <div className="space-y-1 pt-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
                <p>Order Placed - Apr 09, 2024 | 02:00PM</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
                <p>Order Confirmed - Apr 09, 2024 | 05:00PM</p>
              </div>
            </div>
          </div>

          {/* Right: Checklist */}
          <div className="border rounded-md p-4 bg-gray-50">
            <p className="text-green-600 font-medium mb-2">
              Verify all items – {String(order.items.length).padStart(2, "0")}{" "}
              Item
              {order.items.length > 1 && "s"}
            </p>
            <ul className="space-y-3 mb-4 text-sm text-gray-800">
              {order.items.map((item) => (
                <li key={item.name} className="flex items-center gap-3">
                  <input
                    id={`check-${item.name}`}
                    type="checkbox"
                    checked={checkedItems[item.name] || false}
                    onChange={() => handleCheck(item.name)}
                    className="w-4 h-4 text-lime-600"
                  />
                  <label
                    htmlFor={`check-${item.name}`}
                    className="cursor-pointer"
                  >
                    {item.qty} × {item.name}{" "}
                    <span className="ml-2 text-gray-500">₹{item.price}</span>
                  </label>
                </li>
              ))}
            </ul>

            {/* Ready Button */}
            <button
              onClick={() => onStatusChange(order.id, "Order Ready")}
              disabled={!allChecked}
              className={`w-full py-2 rounded-md text-white font-semibold text-sm transition ${
                allChecked
                  ? "bg-lime-600 hover:bg-lime-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Ready for Delivery
            </button>

            {/* Note */}
            <p className="text-xs text-center text-gray-500 mt-2">
              *Select all items to proceed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
