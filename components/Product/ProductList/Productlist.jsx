import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import search from "../../../src/assets/search.png";

// Fallback Initial product data
const initialData = [
  {
    category: "Fruits & Vegetable's",
    products: [
      { name: "Ooty Apple", price: 100, quantity: 5 },
      { name: "Dove Natural soap", price: 100, quantity: 5 },
    ],
  },
  {
    category: "Dairy, Bread and Eggs",
    products: [
      { name: "Ooty Apple", price: 1200, quantity: 5 },
      { name: "Dove Natural soap", price: 1200, quantity: 5 },
    ],
  },
  {
    category: "Snacks and Biscuits",
    products: [
      { name: "Ooccccty Apple", price: 1020, quantity: 5 },
      { name: "Dove Natural soap", price: 1010, quantity: 5 },
    ],
  },
  {
    category: "Atta, Dal and Rice",
    products: [
      { name: "Ootaaaaaay Apple", price: 1020, quantity: 5 },
      { name: "Dossssve Natural soap", price: 1200, quantity: 5 },
    ],
  },
  {
    category: "Dry fruits and Masala",
    products: [
      { name: "Ootyssss Apple", price: 1020, quantity: 5 },
      { name: "Dosssve Natural soap", price: 1010, quantity: 5 },
    ],
  },
  {
    category: "Tea, Coffee and more",
    products: [
      { name: "Ootysssss Apple", price: 1010, quantity: 51 },
      { name: "Dove Nsssssatural soap", price: 100, quantity: 25 },
    ],
  },
  {
    category: "Chocolate and Desserts",
    products: [
      { name: "Ooty Apple", price: 1020, quantity: 35 },
      { name: "Dove Nsssatural soap", price: 1300, quantity: 35 },
    ],
  },
];

// Modal Component
const AddStock = ({ product, onClose, onUpdateStock }) => {
  const [quantity, setQuantity] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setQuantity(value);
  };

  const handleSubmit = () => {
    if (!quantity) return;
    onUpdateStock(product, parseInt(quantity));
    onClose();
  };

  return (
    <div className="text-center font-sans px-4 py-6 w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-3">ADD STOCK</h2>
      <p className="text-sm text-gray-600 mb-1">
        <span className="text-black font-medium">Product Name:</span>{" "}
        {product.name}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <span className="text-black font-medium">Current Stock:</span>{" "}
        {product.quantity}
      </p>
      <input
        type="text"
        placeholder="Add stock"
        value={quantity}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2"
      />
      {quantity && (
        <p className="text-xs text-gray-600 mb-3">
          *Note: {quantity} stock{quantity > 1 ? "s" : ""} will be added
        </p>
      )}
      <button
        onClick={handleSubmit}
        disabled={!quantity}
        className={`w-full py-2 rounded text-white font-semibold text-sm mb-2 transition-opacity ${
          quantity
            ? "bg-gradient-to-r from-[#668D12] to-[#ACC43F] hover:opacity-90"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Update Stock
      </button>
      <button onClick={onClose} className="text-sm text-black hover:underline">
        Cancel
      </button>
    </div>
  );
};

// Main Component
const ProductListing = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState("Fruits & Vegetable's");
  const [activeAction, setActiveAction] = useState({
    action: null,
    product: null,
  });
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("productData")) || [];
    const mergedData = mergeInitialAndStoredData(initialData, storedData);
    setProductData(mergedData);
  }, []);

  const mergeInitialAndStoredData = (initial, stored) => {
    const result = [...initial];
    stored.forEach((storedCategory) => {
      const existingCategory = result.find(
        (c) => c.category === storedCategory.category
      );
      if (existingCategory) {
        storedCategory.products.forEach((newProduct) => {
          const existingProduct = existingCategory.products.find(
            (p) => p.name === newProduct.name
          );
          if (!existingProduct) {
            existingCategory.products.push(newProduct);
          }
        });
      } else {
        result.push(storedCategory);
      }
    });
    return result;
  };

  const handleUpdateStock = (selectedProduct, addedQuantity) => {
    const updatedData = productData.map((category) => ({
      ...category,
      products: category.products.map((product) =>
        product.name === selectedProduct.name
          ? { ...product, quantity: product.quantity + addedQuantity }
          : product
      ),
    }));
    setProductData(updatedData);
    sessionStorage.setItem("productData", JSON.stringify(updatedData));
  };

  return (
    <div className="p-4 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        <h3 className="text-xl font-semibold text-center sm:text-left w-full sm:w-auto">
          My Product Listing
        </h3>
        <div className="relative w-full sm:w-60">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img src={search} alt="Search" className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search for products"
            className="border border-gray-400 pl-10 pr-3 py-2 w-full rounded focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Add Product Button */}
      <button
        onClick={() => navigate("/addproduct")}
        className="bg-gradient-to-r from-[#668D12] to-[#ACC43F] text-white py-2 mb-4 w-full sm:w-[259px] rounded-md text-sm"
      >
        + Add a Product
      </button>

      {/* Product Categories */}
      <div className="space-y-4">
        {productData.map(({ category, products }) => (
          <div key={category} className="border rounded shadow-sm">
            <button
              onClick={() =>
                setExpanded((prev) => (prev === category ? "" : category))
              }
              className="w-full text-base flex justify-between items-center px-4 py-3 font-medium bg-gray-50 hover:bg-gray-100"
            >
              {category}
              <span>{expanded === category ? "▲" : "▼"}</span>
            </button>

            {expanded === category && (
              <div className="overflow-x-auto">
                {products.length > 0 ? (
                  <table className="min-w-full text-left text-sm">
                    <thead className="text-gray-500 bg-white">
                      <tr>
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Availability</th>
                        <th className="px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-4 py-2">{p.name}</td>
                          <td className="px-4 py-2">₹{p.price}</td>
                          <td className="px-4 py-2">{p.quantity}</td>
                          <td className="px-4 py-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                defaultChecked
                              />
                              <div className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-[#668D12]" />
                              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-all duration-300" />
                            </label>
                          </td>
                          <td className="px-4 py-2">
                            <select
                              className="border rounded w-full sm:w-28 py-1 text-sm"
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "edit-price") {
                                  navigate("/Editproduct");
                                } else {
                                  setActiveAction({
                                    action: value,
                                    product: p,
                                  });
                                }
                                e.target.value = "action";
                              }}
                              defaultValue="action"
                            >
                              <option value="action" disabled>
                                Action
                              </option>
                              <option value="edit-price">Edit Price</option>
                              <option value="add-stock">Add Stock</option>
                              <option value="minus-stock">Minus Stock</option>
                              <option value="delete-product">
                                Delete Product
                              </option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="px-4 py-4 text-gray-500">No products listed.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Stock Modal */}
      {activeAction.action === "add-stock" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-md">
            <AddStock
              product={activeAction.product}
              onClose={() => setActiveAction({ action: null, product: null })}
              onUpdateStock={handleUpdateStock}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;

