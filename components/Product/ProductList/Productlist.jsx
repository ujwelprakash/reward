import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ correct hook
import search from "../../../src/assets/search.png";

const sampleData = [
  {
    category: "Fruits & Vegetable's",
    products: [
      { name: "Ooty Apple", price: 100, quantity: 5 },
      { name: "Dove Natural soap", price: 100, quantity: 5 },
      { name: "Ooty Apple", price: 100, quantity: 5 },
      { name: "Dove Natural soap", price: 100, quantity: 5 },
      { name: "Ooty Apple", price: 100, quantity: 5 },
      { name: "Dove Natural soap", price: 100, quantity: 5 },
    ],
  },
  { category: "Dairy, Bread and Eggs", products: [] },
  { category: "Snacks and Biscuits", products: [] },
  { category: "Atta, Dal and Rice", products: [] },
  { category: "Dry fruits and Masala", products: [] },
  { category: "Tea, Coffee and more", products: [] },
  { category: "Chocolate and Desserts", products: [] },
];

const ProductListing = () => {
  const [expanded, setExpanded] = useState("Fruits & Vegetable's");
  const navigate = useNavigate(); // ✅ proper use

  return (
    <div className="p-4 max-w-5xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-[24px] leading-[100%] tracking-[0px] font-inter">
          {" "}
          My Product Listing
        </h3>
        <div className="relative w-60">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img src={search} alt="Search" className="w-4 h-4" />
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Search for products"
            className="border border-gray-400 pl-10 pr-3 py-2 w-full rounded focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={() => navigate("/addproduct")}
        className="bg-[linear-gradient(100deg,#668D12_0%,#ACC43F_100%)]  text-white py-2  mb-4 hover:bg-lime-700 w-[259px] h-[45px] rounded-[8px] gap-[4px] px-[30px] py-[14px]>"
      >
        + Add a Product
      </button>

      <div className="space-y-4">
        {sampleData.map(({ category, products }) => (
          <div
            key={category}
            className="border border-gray-300  rounded shadow-sm"
          >
            <button
              onClick={() =>
                setExpanded((prev) => (prev === category ? "" : category))
              }
              className="w-full text-lg flex justify-between items-center px-4 py-3 font-medium bg-gray-50 hover:bg-gray-100"
            >
              {category}
              <span>{expanded === category ? "▲" : "▼"}</span>
            </button>

            {expanded === category && (
              <div className="overflow-x-auto">
                {products.length > 0 ? (
                  <table className="w-full text-left table-auto">
                    <thead className="bg-gray-00 text-gray-500 text-sm">
                      <tr>
                        <th className="px-4 py-2">Product Name</th>
                        <th
                          className="pl-0 pr-4 py-2"
                          style={{ marginLeft: "-20px" }}
                        >
                          Price
                        </th>
                        <th
                          className="pl-4 pr-3 py-2"
                          style={{ marginLeft: "30px" }}
                        >
                          Avail. Quantity
                        </th>
                        <th
                          className="pl-0 pr-4 py-2"
                          style={{ marginLeft: "-20px" }}
                        >
                          Availability
                        </th>
                        <th
                          className="pl-0 pr-4 py-2"
                          style={{ marginLeft: "-20px" }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-4 py-2">{p.name}</td>
                          <td
                            className="pl-0 pr- 4py-2"
                            style={{ marginLeft: "-20px" }}
                          >
                            ₹{p.price}
                          </td>
                          <td
                            className="pl-0 pr-4 py-2"
                            style={{ marginRight: "20px" }}
                          >
                            <div>
                              <span style={{ marginLeft: "30px" }}>
                                {p.quantity}
                              </span>
                              <div
                                style={{ marginLeft: "10px" }}
                                className="text-xs text-gray-500"
                              >
                                (UOM: kg)
                              </div>
                            </div>
                          </td>

                          <td
                            className="pl-0 pr-4 py-2"
                            style={{ marginLeft: "40px" }}
                          >
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                defaultChecked
                              />
                              <div
                                style={{ backgroundColor: "#668D12" }}
                                className="w-10 h-6 ml-3 bg-gray-300 peer-focus:outline-none peer-focus:ring-0 rounded-full  transition-all duration-300"
                              ></div>
                              <div className="absolute ml-3  top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
                            </label>
                          </td>
                          <td
                            className="pl-0 pr-4 py-2"
                            style={{ marginLeft: "20px" }}
                          >
                            <select
                              className="border rounded w-23 py-1"
                              onChange={(e) => {
                                if (e.target.value === "edit-price") {
                                  navigate("/Editproduct");
                                }
                                e.target.value = "action";
                              }}
                              defaultValue="action"
                            >
                              <option value="action" disabled>
                                Action
                              </option>
                              <option className=""  value="edit-price">Edit Price</option>
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
    </div>
  );
};

export default ProductListing;
