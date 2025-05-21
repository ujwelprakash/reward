import React from "react";

const OrderCard = ({ order, onStatusChange, onClick }) => {
  if (!order) return null;

  return (
    <div className="bg-white border rounded-md p-4 shadow-sm">
      {/* Status Badge */}
      <div className="text-xs font-semibold text-white bg-blue-500 px-2 py-0.5 rounded-full inline-block mb-2">
        {order.status}
      </div>

      {/* Order ID and Date */}
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span className="text-lime-700 font-semibold">
          Order Id: {order.id}
        </span>
        <span>Date: {order.date}</span>
      </div>

      {/* Customer Info */}
      <p className="text-sm font-medium">Order for: {order.customer}</p>
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <span>📞 {order.phone}</span>
        <span>📍 {order.address}</span>
      </div>

      {/* Pickup Time */}
      {order.pickupTime && (
        <div className="text-xs text-gray-500 mt-1">🕒 {order.pickupTime}</div>
      )}

      {/* Items */}
      <div className="mt-2 text-sm">
        <p className="font-semibold mb-1">Order Items:</p>
        <ul className="list-disc ml-5 text-xs">
          {order.items?.map((item, i) => (
            <li key={i}>
              {item.qty} x {item.name} — ₹{item.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Payment */}
      <div className="mt-2 text-sm">
        <strong>Total Bill Amount:</strong>{" "}
        <span className="text-green-600">{order.payment}</span> — ₹{order.total}
      </div>

      {/* Status: Confirmation */}
      {order.status === "Confirmation" && (
        <div className="mt-3 flex gap-3">
          <button
            className="border border-lime-600 text-lime-600 px-4 py-1 rounded hover:bg-lime-100"
            onClick={() => onStatusChange(order.id, "Preparing")}
          >
            Confirm
          </button>
          <button className="border border-red-600 text-red-600 px-4 py-1 rounded hover:bg-red-100">
            Reject
          </button>
        </div>
      )}

      {/* Status: Preparing */}
      {order.status === "Preparing" && (
        <div className="mt-3">
          <button
            className="w-full text-center bg-gray-200 text-gray-600 py-2 rounded font-medium"
            onClick={() => onClick?.(order)} // 🔥 Open modal instead of status change
          >
            Verify & Pack Items
          </button>
        </div>
      )}

      {/* Status: Packed Orders */}
      {order.status === "Packed Orders" && order.packedTimeline && (
        <>
          <ul className="text-xs space-y-2 mt-3">
            {order.packedTimeline.map((step, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="w-40">{step.label}</span>
                <span className="text-gray-600">{step.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-sm">
            <button
              className="w-full text-center bg-green-100 text-green-800 py-2 rounded font-medium"
              onClick={() => onStatusChange(order.id, "Completed")}
            >
              Mark as Delivered
            </button>
          </div>
        </>
      )}

      {/* Status: Completed */}
      {order.status === "Completed" && order.deliveryTimeline && (
        <>
          <p className="text-sm font-semibold text-green-700 mt-3 mb-1">
            Delivery Status:
          </p>
          <ul className="text-xs space-y-2">
            {order.deliveryTimeline.map((step, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="w-40">{step.label}</span>
                <span className="text-gray-600">{step.time}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OrderCard;
