import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Edit = () => {
  const initialData = {
    category: "Pharmacy",
    productName: "Dove Face Wash",
    productMRP: "600",
    discountType: "Flat",
    discountValue: "10",
    productPrice: "540",
    uom: "ml",
    unitSize: "250",
    availableQty: "200",
    description: "",
    country: "India",
    manufacturer: "DOVE PVT LTD",
    delivery: {
      instant: true,
      schedule: false,
      pickup: false,
    },
  };

  const [formData, setFormData] = useState(initialData);
  const [isChanged, setIsChanged] = useState(false);
   const navigate = useNavigate(); // ✅ proper use
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  const handleCheckbox = (key) => {
    setFormData((prev) => ({
      ...prev,
      delivery: { ...prev.delivery, [key]: !prev.delivery[key] },
    }));
    setIsChanged(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 text-sm">
      <button
        onClick={() => navigate("/Product")}
        className="text-lg text-black"
      >
        &larr; Back
      </button>
      <h2 className="text-2xl font-semibold">Edit Price</h2>

      {/* Product Details */}
      <div className="border border-gray-400 rounded-md p-4 space-y-4">
        <h3 className="text-lg font-medium">Product Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full"
          >
            <option value="">Select Category</option>
         
          </select>

          <input
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full"
            placeholder="Product Name"
          />

          <input
            name="productMRP"
            value={formData.productMRP}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full"
            placeholder="Product MRP"
          />

          <div className="flex gap-2">
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-1/2"
            >
              <option value="Flat">Flat</option>
              <option value="Percent">Percent</option>
            </select>
            <input
              name="discountValue"
              value={formData.discountValue}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-1/2"
              placeholder="Discount Value"
            />
          </div>

          <input
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full"
            placeholder="Product Price"
          />

          <select
            name="uom"
            value={formData.uom}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full"
          >
            <option value="ml">ml</option>
            <option value="g">g</option>
          </select>

          <input
            name="unitSize"
            value={formData.unitSize}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full"
            placeholder="Unit Size"
          />

          <input
            name="availableQty"
            value={formData.availableQty}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded w-full"
            placeholder="Available Quantity"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="border border-gray-400 rounded-md p-4 space-y-4">
        <h3 className="text-lg font-medium">Product Information</h3>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-400 p-2 rounded w-full"
          rows="4"
          placeholder="Description"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            value={formData.country}
            disabled
            className="border border-gray-400 p-2 rounded bg-gray-100 w-full"
            placeholder="Country of Origin"
          />
          <input
            value={formData.manufacturer}
            disabled
            className="border border-gray-400 p-2 rounded bg-gray-100 w-full"
            placeholder="Manufacturer"
          />
        </div>
      </div>

      {/* Delivery & Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-400 rounded-md p-4">
          <h3 className="text-lg font-medium">Delivery Details</h3>
          <p className="text-xs text-gray-500 mb-2">
            (You can select multiple options)
          </p>
          <div className="space-y-2">
            {[
              { key: "instant", label: "Instant delivery" },
              { key: "schedule", label: "Schedule delivery" },
              { key: "pickup", label: "Store Pickup" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.delivery[key]}
                  onChange={() => handleCheckbox(key)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border border-gray-400 rounded-md p-4 flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium mb-2">Product Image</h3>
          <div className="w-32 h-32 border-2 border-dashed rounded-md flex items-center justify-center">
            <img
              src="https://via.placeholder.com/100x100.png?text=Dove"
              alt="product"
              className="object-contain"
            />
          </div>
          <p className="text-xs mt-2 text-center text-gray-500">
            Product images will be fetched from the Rewardify server
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          disabled={!isChanged}
          className={`w-[180px] mt-4 py-2 rounded text-sm font-medium transition-colors duration-200 ${
            isChanged
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Update Changes
        </button>
      </div>
    </div>
  );
};

export default Edit;
