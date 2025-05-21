import React from "react";
import { Bell, User } from "lucide-react";
import money from "../../src/assets/moneyhand.png"
import logo from "../../src/assets/logoreward.png"

const Header = () => {
  return (
    <div>
      <header className="flex items-center justify-between px-6 py-5 bg-white shadow-sm border-b border-blue-200">
        {/* Left: Logo & Welcome Message */}
        <div className="flex items-center gap-4">
          <div className=" tracking-wide">
            <img src={ logo}  />
          </div>
          <div className="font-inter font-bold text-[20px] leading-[100%] tracking-[0px] pl-15">
            Welcome, <span className="font-bold">Rajesh</span>👋
          </div>
        </div>

        {/* Right: XCoins + Icons */}
        <div className="flex items-center gap-4">
          <div className="bg-green-50 text-sm px-3 py-1 rounded-full flex items-center gap-1 font-medium">
            XCoins: <span className="text-yellow-500 font-bold">300</span> 🪙
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-green-50 p-2 rounded-full hover:bg-green-100">
              <img src={ money} size={18} />
            </button>
            <button className="bg-green-50 p-2 rounded-full hover:bg-green-100">
              <Bell size={18} />
            </button>
            <button className="bg-green-50 p-2 rounded-full hover:bg-green-100">
              <User size={18} />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
