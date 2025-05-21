import React, { useState, useEffect } from "react";

const OrderModal = ({ order, onClose, onStatusChange }) => {
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const initialChecks = {};
    order.items.forEach((item) => {
      initialChecks[item.name] = false;
    });
    setCheckedItems(initialChecks);
  }, [order]);

  const handleCheck = (itemName) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const allChecked = Object.values(checkedItems).every(Boolean);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl"
        >
          &times;
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Order Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Order ID: {order.id}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Customer: {order.customer}
            </p>
            <p className="text-sm text-gray-600 mb-1">Phone: {order.phone}</p>
            <p className="text-sm text-gray-600 mb-1">
              Address: {order.address}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Pickup Time: {order.pickupTime}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Payment: {order.payment}
            </p>
            <p className="text-sm text-gray-600 mb-3">Total: ₹{order.total}</p>
          </div>

          {/* Right: Checklist */}
          <div>
            <h4 className="text-md font-semibold mb-3">Verify Items</h4>
            <ul className="space-y-2 mb-4">
              {order.items.map((item) => (
                <li key={item.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checkedItems[item.name] || false}
                    onChange={() => handleCheck(item.name)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">
                    {item.qty} × {item.name} (₹{item.price})
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onStatusChange(order.id, "Packed Orders")}
              className={`w-full py-2 rounded-md text-white font-semibold ${
                allChecked
                  ? "bg-lime-600 hover:bg-lime-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!allChecked}
            >
              Ready for Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
