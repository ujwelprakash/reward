import React from "react";

const OrderReady = ({ orders, onStatusChange }) => {
  if (!orders || orders.length === 0) {
    return (
      <div >
       
      </div>
    );
  }

  return (
    <div>
      {/* Go to Packed Orders Tab Button */}
     
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-sm rounded-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-sm font-semibold">Order ID: {order.id}</h3>
                <p className="text-xs text-gray-500">Date: {order.date}</p>
              </div>
              <button
                onClick={() => onStatusChange(order.id, "Packed Orders")}
                className="text-sm bg-lime-600 text-white px-4 py-1.5 rounded hover:bg-lime-700 transition"
              >
                Mark as Packed
              </button>
            </div>

            <div className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Customer:</span> {order.customer}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Phone:</span> {order.phone}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Address:</span> {order.address}
            </div>
            <div className="text-sm text-gray-700 mb-1">
              <span className="font-medium">Pickup Time:</span>{" "}
              {order.pickupTime}
            </div>

            <div className="mt-3">
              <h4 className="font-semibold text-sm mb-1">Items:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.qty} – ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 text-sm text-gray-800 font-medium">
              Total: ₹{order.total} ({order.payment})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderReady;
