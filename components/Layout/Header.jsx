import React from "react";
import { Bell, User } from "lucide-react";
import money from "../../src/assets/moneyhand.png"
import logo from "../../src/assets/logoreward.png"

const Header = () => {
  return (
    <div>
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-6 py-4 md:py-5 bg-white shadow-sm border-b border-blue-200 gap-4">
        {/* Left: Logo & Welcome Message */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="font-inter font-bold text-lg md:text-[20px] leading-[100%] tracking-[0px]">
            Welcome, <span className="font-bold">Rajesh</span> 👋
          </div>
        </div>

        {/* Right: XCoins + Icons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 md:gap-4 w-full md:w-auto justify-start md:justify-end">
          <div className="bg-green-50 text-sm px-3 py-1 rounded-full flex items-center gap-1 font-medium">
            XCoins: <span className="text-yellow-500 font-bold">300</span> 🪙
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-green-50 p-2 rounded-full hover:bg-green-100">
              <img src={money} alt="money" className="h-4 w-4" />
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
