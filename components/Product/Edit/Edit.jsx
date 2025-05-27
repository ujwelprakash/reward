import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import doveimg from "../../../src/assets/doveimg.png"

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
    description:
      "Lorem ipsum dolor sit amet consectetur. Viverra odio gravida praesent bibendum urna diam. Vestibulum feugiat id varius egestas malesuada tempor lobortis donec vitae eleifend sit adipiscing mattis non duis. Nunc id volutpat sapien ut massa lorem volutpat sapien ut massa lorem volutpat sapien ut massa.",
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          {/* Category */}
          <div>
            <label className=" text-xs block mb-1">Category</label>
            <input
              disabled
              value={formData.category}
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className=" text-xs block mb-1">Product Name</label>
            <input
              disabled
              value={formData.productName}
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>

          {/* Product MRP */}
          <div>
            <label className=" text-xs block mb-1">Product MRP</label>
            <input
              name="productMRP"
              value={formData.productMRP}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>

          {/* Discount */}
          <div>
            <label className=" text-xs block mb-1">Special Discount</label>
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
              />
            </div>
          </div>

          {/* Product Price */}
          <div>
            <label className=" text-xs block mb-1">Product Price</label>
            <input
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
            />
          </div>

          {/* UOM */}
          <div>
            <label className=" text-xs block mb-1">UOM</label>
            <input
              disabled
              value={formData.uom}
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>

          {/* Unit Size */}
          <div>
            <label className=" text-xs block mb-1">Unit Size</label>
            <input
              disabled
              value={formData.unitSize}
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>

          {/* Available Quantity */}
          <div>
            <label className=" text-xs block mb-1">Available Quantity</label>
            <input
              disabled
              value={formData.availableQty}
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="border border-gray-400 rounded-md p-4 space-y-4">
        <h3 className="text-lg font-medium">Product Information</h3>
        <label className=" text-xs block mb-1">Description</label>
        <textarea
          disabled
          value={formData.description}
          className="border border-gray-400 p-2 pb-5 rounded w-full bg-gray-100 overflow-auto resize-none"
          rows="4"
          placeholder="Lorem ipsum dolor sit amet consectetur. Viverra duis gravida praesent bibendum urna diam velit. Interdum feugiat id montes lectus ultrices neque ipsum felis. Donec diam eleifend sit adipiscing rhoncus elit lacus. Erat ut orci quisque at massa ipsum facilisis.
Pharetra sollicitudin sollicitudin semper donec natoque commodo eu ultricies. At sit netus mattis pharetra urna sit. Urna turpis suspendisse pellentesque nisi at non sollicitudin suspendisse quam. Amet facilisis enim nibh convallis. Egestas enim est ut magna elementum facilisis.
Tellus felis ultrices pellentesque cras nec ipsum duis velit ac. Donec tortor in id lectus non nunc dui. Ullamcorper mattis."
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className=" text-xs block mb-1">Country of Origin</label>
            <input
              disabled
              value={formData.country}
              className="border border-gray-400 p-2 rounded bg-gray-100 w-full"
              placeholder="Country of Origin"
            />
          </div>
          <div>
            <label className=" text-xs block mb-1">Manufacturer</label>
            <input
              disabled
              value={formData.manufacturer}
              className="border border-gray-400 p-2 rounded bg-gray-100 w-full"
              placeholder="Manufacturer"
            />
          </div>
        </div>
      </div>

      {/* Delivery & Product Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Delivery */}
        <div className="border border-gray-400 rounded-md p-4">
          <h3 className="text-lg font-medium">Delivery Details</h3>
          <p className="text-xs text-gray-500 mb-2">
            Delivery Type (Read-only)
          </p>
          {["instant", "schedule", "pickup"].map((key) => (
            <label key={key} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={formData.delivery[key]}
                readOnly
                disabled
              />
              <span className="capitalize text-sm">{key} delivery</span>
            </label>
          ))}
        </div>

        {/* Product Image */}
        <div className="border border-gray-400 rounded-md p-4 flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium mb-2">Product Image</h3>
          <p className="text-xs mt-2 text-left text-gray-500">
            Product images will be fetched from <br/>the Rewardify server
          </p>
          <div className="w-32 h-32   rounded-md flex items-center justify-center">
            <img
              src={doveimg} // Replace with actual path in your project
              alt="Dove"
              className="object-contain"
            />
          </div>
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
