import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import search from "../../../src/assets/search.png";

// Initial product data as fallback
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

// Modal component for adding/minus stock
const UpdateStockModal = ({ product, onClose, onUpdateStock, isAdding }) => {
  const [quantity, setQuantity] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setQuantity(value);
  };

  const handleSubmit = () => {
    const qty = parseInt(quantity, 10);
    if (!qty || qty <= 0) return;

    if (!isAdding && qty > product.quantity) {
      alert("Cannot reduce more than available stock");
      return;
    }

    console.log(
      `Updating stock for product: ${product.name}, quantity: ${qty}, action: ${
        isAdding ? "add" : "minus"
      }`
    );

    onUpdateStock(product, qty);
    onClose();
  };

  return (
    <div className="text-center font-sans px-4 py-6 w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-3">
        {isAdding ? "ADD STOCK" : "MINUS STOCK"}
      </h2>
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
        placeholder={isAdding ? "Add stock" : "Minus stock"}
        value={quantity}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2"
        aria-label={isAdding ? "Add stock quantity" : "Minus stock quantity"}
      />
      {quantity && (
        <p className="text-xs text-gray-600 mb-3" role="alert">
          *Note: {quantity} stock{quantity > 1 ? "s" : ""} will be{" "}
          {isAdding ? "added" : "removed"}
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

const ProductListing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [expanded, setExpanded] = useState("Fruits & Vegetable's");
  const [activeAction, setActiveAction] = useState({
    action: null,
    product: null,
    category: null,
  });
  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Merge fallback and stored data to avoid duplicates and keep updated
  const mergeInitialAndStoredData = (initial, stored) => {
    console.log("Merging initial data and stored data", { initial, stored });
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
            console.log("Adding new product", newProduct);
            existingCategory.products.push(newProduct);
          } else {
            console.log(
              `Updating product ${newProduct.name} in category ${storedCategory.category}`
            );
            existingProduct.quantity = newProduct.quantity;
            existingProduct.price = newProduct.price;
            existingProduct.available =
              typeof newProduct.available === "boolean"
                ? newProduct.available
                : existingProduct.available;
          }
        });
      } else {
        console.log("Adding new category", storedCategory.category);
        result.push(storedCategory);
      }
    });
    return result;
  };

  // Initialize sessionStorage on mount if empty
  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("productData"));
    if (!storedData || storedData.length === 0) {
      sessionStorage.setItem("productData", JSON.stringify(initialData));
      console.log("Initial productData saved to sessionStorage");
    }
  }, []);

  // Load and merge data from sessionStorage on mount and on location change
  useEffect(() => {
    console.log("Loading product data from sessionStorage");
    const storedData = JSON.parse(sessionStorage.getItem("productData")) || [];
    console.log("Stored data loaded:", storedData);
    const mergedData = mergeInitialAndStoredData(initialData, storedData);
    console.log("Merged data set to state:", mergedData);
    setProductData(mergedData);
  }, [location.key]);

  // Update stock quantity in the selected category
  const handleUpdateStock = (selectedProduct, quantity) => {
    console.log(
      `handleUpdateStock called for product ${selectedProduct.name} with quantity ${quantity} and action ${activeAction.action}`
    );
    const updatedData = productData.map((category) => {
      if (category.category !== activeAction.category) return category;

      return {
        ...category,
        products: category.products.map((product) => {
          if (product.name === selectedProduct.name) {
            if (activeAction.action === "add-stock") {
              const newQty = product.quantity + quantity;
              console.log(
                `Adding stock: Old Qty=${product.quantity}, New Qty=${newQty}`
              );
              return { ...product, quantity: newQty };
            } else if (activeAction.action === "minus-stock") {
              const newQty = product.quantity - quantity;
              console.log(
                `Reducing stock: Old Qty=${product.quantity}, New Qty=${
                  newQty < 0 ? 0 : newQty
                }`
              );
              return { ...product, quantity: newQty < 0 ? 0 : newQty };
            }
          }
          return product;
        }),
      };
    });
    setProductData(updatedData);
    console.log("Updated productData saved to sessionStorage", updatedData);
    sessionStorage.setItem("productData", JSON.stringify(updatedData));
  };

  // Delete product only from the selected category
  const handleDeleteProduct = (productToDelete, categoryName) => {
    console.log(
      `Request to delete product ${productToDelete.name} from category ${categoryName}`
    );
    if (
      !window.confirm(
        `Are you sure you want to delete ${productToDelete.name}?`
      )
    ) {
      console.log("Delete canceled by user");
      return;
    }
    const updatedData = productData.map((category) => {
      if (category.category !== categoryName) return category;

      return {
        ...category,
        products: category.products.filter(
          (p) => p.name !== productToDelete.name
        ),
      };
    });
    setProductData(updatedData);
    console.log("Product deleted, updated data saved", updatedData);
    sessionStorage.setItem("productData", JSON.stringify(updatedData));
  };

  // Toggle product availability and persist
  const handleToggleAvailability = (categoryName, productName) => {
    console.log(
      `Toggling availability for product ${productName} in category ${categoryName}`
    );
    const updatedData = productData.map((category) => {
      if (category.category !== categoryName) return category;

      return {
        ...category,
        products: category.products.map((product) => {
          if (product.name === productName) {
            console.log(
              `Availability changed from ${
                product.available
              } to ${!product.available}`
            );
            return { ...product, available: !product.available };
          }
          return product;
        }),
      };
    });
    setProductData(updatedData);
    sessionStorage.setItem("productData", JSON.stringify(updatedData));
  };

  // Filter products by search term
  const filteredProductData = useMemo(() => {
    console.log(`Filtering products by search term: "${searchTerm}"`);
    if (!searchTerm.trim()) return productData;

    const lowerSearch = searchTerm.toLowerCase();
    const filtered = productData
      .map(({ category, products }) => ({
        category,
        products: products.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerSearch) ||
            category.toLowerCase().includes(lowerSearch)
        ),
      }))
      .filter(({ products }) => products.length > 0);

    console.log(
      "Filtered products count by category:",
      filtered.map((c) => ({ category: c.category, count: c.products.length }))
    );
    return filtered;
  }, [searchTerm, productData]);

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
            placeholder="Search for products or category"
            className="border border-gray-400 pl-10 pr-3 py-2 w-full rounded focus:outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search products or categories"
          />
        </div>
      </div>

      {/* Add Product Button */}
      <button
        onClick={() => {
          console.log("Navigating to /addproduct");
          navigate("/addproduct");
        }}
        className="bg-gradient-to-r from-[#668D12] to-[#ACC43F] text-white py-2 mb-4 w-full sm:w-[259px] rounded-md text-sm"
        aria-label="Add a new product"
      >
        + Add a Product
      </button>

      {/* Product Categories */}
      <div className="space-y-4">
        {filteredProductData.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        {filteredProductData.map(({ category, products }) => (
          <div key={category} className="border rounded shadow-sm">
            <button
              onClick={() => {
                console.log("Toggling expand for category:", category);
                setExpanded((prev) => (prev === category ? "" : category));
              }}
              className="w-full text-base flex justify-between items-center px-4 py-3 font-medium bg-gray-50 hover:bg-gray-100"
              aria-expanded={expanded === category}
              aria-controls={`${category}-panel`}
              id={`${category}-header`}
            >
              {category}
              <span>{expanded === category ? "▲" : "▼"}</span>
            </button>

            {expanded === category && (
              <div
                className="overflow-x-auto"
                role="region"
                aria-labelledby={`${category}-header`}
                id={`${category}-panel`}
              >
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
                      {products.map((p) => (
                        <tr
                          key={`${category}-${p.name}`}
                          className="border-t"
                          aria-label={`Product ${p.name}`}
                        >
                          <td className="px-4 py-2">{p.name}</td>
                          <td className="px-4 py-2">₹{p.price}</td>
                          <td className="px-4 py-2">{p.quantity}</td>
                          <td className="px-4 py-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={!!p.available}
                                onChange={() =>
                                  handleToggleAvailability(category, p.name)
                                }
                                aria-checked={!!p.available}
                                aria-label={`Toggle availability for ${p.name}`}
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
                                console.log(
                                  `Action selected: ${value} for product ${p.name}`
                                );
                                if (value === "edit-price") {
                                  console.log(
                                    "Navigating to edit product:",
                                    p,
                                    category
                                  );
                                  navigate("/editproduct", {
                                    state: { product: p, category },
                                  });
                                } else if (value === "add-stock") {
                                  setActiveAction({
                                    action: "add-stock",
                                    product: p,
                                    category,
                                  });
                                } else if (value === "minus-stock") {
                                  setActiveAction({
                                    action: "minus-stock",
                                    product: p,
                                    category,
                                  });
                                } else if (value === "delete-product") {
                                  handleDeleteProduct(p, category);
                                }
                                // Reset select to default "action" after handling
                                e.target.selectedIndex = 0;
                              }}
                              defaultValue="action"
                              aria-label={`Actions for product ${p.name}`}
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

      {/* Modal for adding/minus stock */}
      {(activeAction.action === "add-stock" ||
        activeAction.action === "minus-stock") && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="update-stock-modal-title"
        >
          <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-md">
            <UpdateStockModal
              product={activeAction.product}
              onClose={() =>
                setActiveAction({ action: null, product: null, category: null })
              }
              onUpdateStock={handleUpdateStock}
              isAdding={activeAction.action === "add-stock"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
