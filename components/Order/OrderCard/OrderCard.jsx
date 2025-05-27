import React from "react";
import { Phone, MapPin } from "lucide-react";

const OrderCard = ({ order, onStatusChange, onClick }) => {
  if (!order) return null;

  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm space-y-4">
      {/* Order ID and Date */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span className="text-lime-600 font-semibold">
          Order Id: {order.id}
        </span>
        <span>Date: {order.date}</span>
      </div>

      {/* Customer Info */}
      <div className="text-sm">
        <p className="font-medium">Order for:</p>
        <p className="text-gray-800">{order.customer}</p>
        <div className="flex items-center text-xs text-gray-600 gap-4 mt-1">
          <span className="flex items-center gap-1">
            <span className="bg-lime-100 text-lime-700 p-1.5 rounded-full">
              <Phone size={12} />
            </span>
            {order.phone}
          </span>
          <span className="flex items-center gap-1">
            <span className="bg-lime-100 text-lime-700 p-1.5 rounded-full">
              <MapPin size={12} />
            </span>
            {order.address}
          </span>
        </div>

        {/* Optional Pickup Time */}
        {order.pickupTime && order.status !== "Confirmation" && (
          <div className="text-xs text-gray-400 mt-1">
            🕒 {order.pickupTime}
          </div>
        )}
      </div>

      {/* Items */}
      <div>
        <p className="text-sm font-semibold">Order Items:</p>
        <ul className="text-sm text-gray-700 mt-1 space-y-1">
          {order.items?.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>
                {item.qty} x {item.name}
              </span>
              <span>₹{item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total + Payment */}
      <div className="flex justify-between items-center text-sm font-semibold border-t pt-3">
        <span>Total Bill Amount</span>
        <span className="text-gray-700">
          <span className="bg-lime-100 text-lime-700 px-2 py-0.5 rounded text-xs font-medium mr-2">
            {order.payment}
          </span>
          ₹{order.total.toFixed(2)}
        </span>
      </div>

      {/* Status: Confirmation */}
      {order.status === "Confirmation" && (
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onStatusChange(order.id, "Rejected")}
            className="w-full border border-lime-600 text-lime-600 px-4 py-2 rounded hover:bg-lime-50 transition font-medium"
          >
            Reject Order
          </button>
          <button
            onClick={() => onStatusChange(order.id, "Preparing")}
            className="w-full bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700 transition font-medium"
          >
            Confirm Order
          </button>
        </div>
      )}

      {/* Status: Preparing */}
      {order.status === "Preparing" && (
        <button
          className="w-full bg-gray-100 text-gray-700 py-2 rounded font-medium hover:bg-gray-200"
          onClick={() => onClick?.(order)}
        >
          Verify & Pack Items
        </button>
      )}

      {/* Status: Packed Orders */}
      {order.status === "Packed Orders" && order.packedTimeline && (
        <>
          <ul className="text-xs text-gray-600 space-y-1 pt-2">
            {order.packedTimeline.map((step, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="w-40">{step.label}</span>
                <span>{step.time}</span>
              </li>
            ))}
          </ul>
          <button
            className="w-full bg-green-100 text-green-800 py-2 rounded font-medium mt-3 hover:bg-green-200"
            onClick={() => onStatusChange(order.id, "Completed")}
          >
            Mark as Delivered
          </button>
        </>
      )}

      {/* Status: Completed */}
      {order.status === "Completed" && order.deliveryTimeline && (
        <>
          <p className="text-sm font-semibold text-green-700 mt-3">
            Delivery Status:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            {order.deliveryTimeline.map((step, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="w-40">{step.label}</span>
                <span>{step.time}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OrderCard;
