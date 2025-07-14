import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import doveimg from "../../../src/assets/doveimg.png";

const Edit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const passedProduct = state?.product;
  const passedCategory = state?.category;

  const [formData, setFormData] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered with passedProduct and passedCategory:", {
      passedProduct,
      passedCategory,
    });
    if (passedProduct) {
      setFormData({
        category: passedCategory || "Unknown",
        productName: passedProduct.name,
        productMRP: passedProduct.price.toString(),
        discountType: "Flat",
        discountValue: "0",
        productPrice: passedProduct.price.toString(),
        uom: "ml",
        unitSize: "250",
        availableQty: passedProduct.quantity.toString(),
        description:
          "Lorem ipsum dolor sit amet consectetur. Viverra odio gravida praesent bibendum urna diam...",
        country: "India",
        manufacturer: "DOVE PVT LTD",
        delivery: {
          instant: true,
          schedule: false,
          pickup: false,
        },
      });
      console.log("Form data initialized:", {
        category: passedCategory || "Unknown",
        productName: passedProduct.name,
        productMRP: passedProduct.price.toString(),
      });
    }
  }, [passedProduct, passedCategory]);

  const calculateDiscountedPrice = (mrp, discountValue, discountType) => {
    const price = parseFloat(mrp);
    const discount = parseFloat(discountValue);

    if (isNaN(price) || isNaN(discount)) return price || 0;

    if (discountType === "Flat") {
      return Math.max(0, price - discount);
    } else if (discountType === "Percent") {
      return Math.max(0, price - (price * discount) / 100);
    }

    return price;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = ["productMRP", "discountValue", "availableQty"];
    if (numericFields.includes(name)) {
      if (value !== "" && !/^\d*\.?\d*$/.test(value)) {
        console.log(`Invalid input for ${name}:`, value);
        return; // ignore invalid numeric input
      }
    }

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (
        name === "productMRP" ||
        name === "discountValue" ||
        name === "discountType"
      ) {
        updated.productPrice = calculateDiscountedPrice(
          name === "productMRP" ? value : prev.productMRP,
          name === "discountValue" ? value : prev.discountValue,
          name === "discountType" ? value : prev.discountType
        ).toFixed(2);
        console.log(
          `Recalculated productPrice due to ${name} change:`,
          updated.productPrice
        );
      }

      console.log("Form data updated:", updated);
      return updated;
    });

    setIsChanged(true);
    console.log("isChanged set to true");
  };

  const validateFormData = () => {
    if (!formData) return false;
    const mrp = parseFloat(formData.productMRP);
    const qty = parseInt(formData.availableQty, 10);
    const discount = parseFloat(formData.discountValue);

    const isValid =
      !isNaN(mrp) &&
      mrp >= 0 &&
      !isNaN(qty) &&
      qty >= 0 &&
      !isNaN(discount) &&
      discount >= 0;

    console.log("Form validation result:", isValid);
    return isValid;
  };

  const handleUpdate = () => {
    console.log("handleUpdate called with formData:", formData);
    if (!validateFormData()) {
      alert(
        "Please enter valid numeric values for MRP, quantity, and discount."
      );
      return;
    }

    let storedData = JSON.parse(sessionStorage.getItem("productData"));
    console.log("Loaded productData from sessionStorage:", storedData);

    if (!storedData || storedData.length === 0) {
      alert("No product data found in storage to update!");
      return;
    }

    const updatedData = storedData.map((category) => {
      if (category.category !== formData.category) return category;

      return {
        ...category,
        products: category.products.map((product) => {
          if (product.name === passedProduct.name) {
            return {
              ...product,
              price: parseFloat(formData.productPrice),
              quantity: parseInt(formData.availableQty, 10),
            };
          }
          return product;
        }),
      };
    });

    console.log("Saved updatedData in sessionStorage:", updatedData);
    sessionStorage.setItem("productData", JSON.stringify(updatedData));

    alert("Product updated successfully!");
    navigate("/Product", { state: { refresh: true } });
  };
  
  if (!formData) {
    console.log("No formData available, rendering fallback.");
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">No product data found. Please go back.</p>
        <button
          onClick={() => navigate("/Product")}
          className="mt-4 underline text-blue-600"
        >
          Back to Product Listing
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 text-sm">
      <button onClick={() => navigate("/Product")} className="text-lg text-black">
        &larr; Back
      </button>
      <h2 className="text-2xl font-semibold">Edit Price</h2>

      {/* Product Details */}
      <div className="border border-gray-400 rounded-md p-4 space-y-4">
        <h3 className="text-lg font-medium">Product Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs block mb-1">Category</label>
            <input
              disabled
              value={formData.category}
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="text-xs block mb-1">Product Name</label>
            <input
              disabled
              value={formData.productName}
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="text-xs block mb-1">Product MRP</label>
            <input
              name="productMRP"
              value={formData.productMRP}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
              inputMode="decimal"
              pattern="[0-9]*"
            />
          </div>

          <div>
            <label className="text-xs block mb-1">Special Discount</label>
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
                inputMode="decimal"
                pattern="[0-9]*"
              />
            </div>
          </div>

          <div>
            <label className="text-xs block mb-1">Product Price</label>
            <input
              name="productPrice"
              value={formData.productPrice}
              readOnly
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="text-xs block mb-1">UOM</label>
            <input
              disabled
              value={formData.uom}
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="text-xs block mb-1">Unit Size</label>
            <input
              disabled
              value={formData.unitSize}
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="text-xs block mb-1">Available Quantity</label>
            <input
              name="availableQty"
              value={formData.availableQty}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded w-full"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="border border-gray-400 rounded-md p-4 space-y-4">
        <h3 className="text-lg font-medium">Product Information</h3>
        <label className="text-xs block mb-1">Description</label>
        <textarea
          disabled
          value={formData.description}
          className="border border-gray-400 p-2 rounded w-full bg-gray-100 resize-none"
          rows="4"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs block mb-1">Country of Origin</label>
            <input
              disabled
              value={formData.country}
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="text-xs block mb-1">Manufacturer</label>
            <input
              disabled
              value={formData.manufacturer}
              className="border border-gray-400 p-2 rounded w-full bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Delivery & Product Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-400 rounded-md p-4">
          <h3 className="text-lg font-medium">Delivery Details</h3>
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

        <div className="border border-gray-400 rounded-md p-4 flex flex-col items-center justify-center">
          <h3 className="text-lg font-medium mb-2">Product Image</h3>
          <p className="text-xs text-gray-500 mb-2 text-center">
            Product image is fetched from server
          </p>
          <div className="w-32 h-32">
            <img
              src={doveimg}
              alt="Product"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          disabled={!isChanged}
          onClick={handleUpdate}
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
