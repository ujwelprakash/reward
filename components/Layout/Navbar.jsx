import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Truck, ShoppingCart, User } from "lucide-react";
import shop from '../../src/assets/resimg.png';

const Navbar = () => {
  // NavLink automatically applies 'active' class when route matches

  return (
    <aside className="w-60 h-screen bg-white border-r border-blue-200 shadow-sm">
      <div className="flex flex-col  py-6 pl-10">
        <img
          src={shop}
          alt="Shop Banner"
          className="w-[101px] h-[82px] rounded-[8px] pr-3"
        />
        <div className="text-sm font-semibold mt-2">Kannan departmental</div>
        <div className="text-xs text-gray-500">Shop ID: 123456789</div>
      </div>

      <nav className="mt-6 ml-3">
        <ul className="text-sm text-gray-700">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-2 hover:bg-gray-50 ${
                  isActive
                    ? "bg-green-50 border-r-4 border-green-500 font-medium text-black"
                    : "text-gray-700"
                }`
              }
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Order"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-2 hover:bg-gray-50 ${
                  isActive
                    ? "bg-green-50 border-r-4 border-green-500 font-medium text-black"
                    : "text-gray-700"
                }`
              }
            >
              <Truck size={18} />
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Product"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-2 hover:bg-gray-50 ${
                  isActive
                    ? "bg-green-50 border-r-4 border-green-500 font-medium text-black"
                    : "text-gray-700"
                }`
              }
            >
              <ShoppingCart size={18} />
              My Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-6 py-3 gap-2 hover:bg-gray-50 ${
                  isActive
                    ? "bg-green-50 border-r-4 border-green-500 font-medium text-black"
                    : "text-gray-700"
                }`
              }
            >
              <User size={18} />
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
