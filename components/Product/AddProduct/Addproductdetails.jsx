import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addproductdetails = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    productName: "",
    mrp: "",
    discountType: "",
    discountValue: "",
    price: "",
    uom: "",
    size: "",
    quantity: "",
    description: "",
    origin: "",
    manufacturer: "",
    deliveryTypes: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (value) => {
    const updated = form.deliveryTypes.includes(value)
      ? form.deliveryTypes.filter((d) => d !== value)
      : [...form.deliveryTypes, value];
    setForm({ ...form, deliveryTypes: updated });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const isFormValid = () => {
    return (
      form.category.trim() &&
      form.productName.trim() &&
      !isNaN(parseFloat(form.price)) &&
      !isNaN(parseInt(form.quantity)) &&
      form.uom.trim()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting product:", form); // Debug log

    if (!isFormValid()) {
      alert("Please fill all required fields correctly.");
      return;
    }

    const storedData = sessionStorage.getItem("productData");
    const productData = storedData ? JSON.parse(storedData) : [];

    const newProduct = {
      id: Date.now(),
      name: form.productName,
      mrp: form.mrp ? parseFloat(form.mrp) : 0,
      discountType: form.discountType,
      discountValue: form.discountValue ? parseFloat(form.discountValue) : 0,
      price: parseFloat(form.price),
      uom: form.uom,
      size: form.size,
      quantity: parseInt(form.quantity, 10),
      description: form.description,
      origin: form.origin,
      manufacturer: form.manufacturer,
      deliveryTypes: form.deliveryTypes,
      image: form.image,
    };

    const categoryIndex = productData.findIndex(
      (cat) => cat.category === form.category
    );

    if (categoryIndex >= 0) {
      productData[categoryIndex].products.push(newProduct);
    } else {
      productData.push({
        category: form.category,
        products: [newProduct],
      });
    }

    sessionStorage.setItem("productData", JSON.stringify(productData));
    console.log("Saved to sessionStorage:", productData); // Debug log

    alert("Product added successfully!");

    setForm({
      category: "",
      productName: "",
      mrp: "",
      discountType: "",
      discountValue: "",
      price: "",
      uom: "",
      size: "",
      quantity: "",
      description: "",
      origin: "",
      manufacturer: "",
      deliveryTypes: [],
      image: null,
    });

    navigate("/Product");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 space-y-9 bg-white border pb-20 border-gray-400 rounded-md"
    >
      <h2 className="text-xl font-semibold">Add a product</h2>

      <div className="space-y-2 border border-gray-400 p-6 rounded-md">
        <h3 className="font-medium text-[18px] pb-3">Product Details</h3>
        <div className="grid grid-cols-1 pb-3 md:grid-cols-2 gap-4 p-4">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 text-sm"
          >
            <option value="">Select related Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>

          <input
            name="productName"
            value={form.productName}
            onChange={handleChange}
            type="text"
            placeholder="Product Name"
            className="border border-gray-400 rounded px-3 py-2 text-sm"
          />

          <input
            name="mrp"
            value={form.mrp}
            onChange={handleChange}
            type="text"
            placeholder="Product MRP"
            className="border border-gray-400 rounded px-3 py-2 text-sm"
          />

          <div className="flex gap-2">
            <select
              name="discountType"
              value={form.discountType}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-2 text-sm w-1/2"
            >
              <option value="">Discount type</option>
              <option value="percentage">%</option>
              <option value="flat">Flat</option>
            </select>
            <input
              name="discountValue"
              value={form.discountValue}
              onChange={handleChange}
              type="text"
              placeholder="Discount Value"
              className="border border-gray-400 rounded px-3 py-2 text-sm w-1/2"
            />
          </div>

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="text"
            placeholder="Product Price"
            className="border border-gray-400 rounded px-3 py-2 text-sm"
          />

          <select
            name="uom"
            value={form.uom}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 text-sm"
          >
            <option value="">UOM (Unit of measurement)</option>
            <option value="kg">Kg</option>
            <option value="ltr">Litre</option>
            <option value="pcs">Pieces</option>
          </select>

          <input
            name="size"
            value={form.size}
            onChange={handleChange}
            type="text"
            placeholder="Product Size"
            className="border border-gray-400 rounded px-3 py-2 text-sm"
          />

          <input
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            type="number"
            placeholder="Available Quantity"
            className="border border-gray-400 rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="border border-gray-400 p-4 rounded-md space-y-4">
          <h3 className="text-xl font-semibold">Product Information</h3>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description of the Product"
            className="w-full border border-gray-400 rounded px-3 py-4 text-sm h-44"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="origin"
              value={form.origin}
              onChange={handleChange}
              placeholder="Country of Origin"
              className="border border-gray-400 rounded px-3 py-2 text-sm"
            />
            <input
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
              placeholder="Manufacturer name"
              className="border border-gray-400 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-[#E0E0E0] p-6 rounded-md">
          <h3 className="text-base font-semibold mb-4">Delivery Details</h3>
          <div className="border border-[#E0E0E0] rounded-md p-4">
            <p className="text-sm font-medium mb-1">Delivery Type</p>
            <p className="text-xs text-[#BEBEBE] mb-4">
              (You can select multiple options)
            </p>
            <div className="space-y-3">
              {["Instant delivery", "Schedule delivery", "Store Pickup"].map(
                (option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 text-sm text-[#8B8B8B]"
                  >
                    <input
                      type="checkbox"
                      checked={form.deliveryTypes.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="w-4 h-4 border border-[#BEBEBE] rounded"
                    />
                    <span>{option}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border border-[#E0E0E0] p-6 rounded-md">
          <h3 className="text-base font-semibold mb-1">Product Image</h3>
          <p className="text-sm text-[#8B8B8B] mb-4">
            Product images will be fetched from
            <br />
            <span>the Rewardify server</span>
          </p>

          <label
            htmlFor="upload-image"
            className="w-28 h-28 border-2 border-dashed border-[#D0D0D0] rounded-lg flex items-center justify-center text-gray-400 mx-auto cursor-pointer"
          >
            {form.image ? (
              <img
                src={form.image}
                alt="Product Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-2xl">🖼️</span>
            )}
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className={`w-[180px] py-2 rounded text-sm text-center ${
            isFormValid()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isFormValid()}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Addproductdetails;
