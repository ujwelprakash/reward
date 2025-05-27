import React, { useState } from "react";
import { User, Store, Wallet, Info, LogOut, Menu } from "lucide-react";
import ProfileDetails from "../ProfileDetails.jsx/ProfileDetails";
import ShopDetails from "../ShopDetails.jsx/ShopDeatils";
import MyWallet from "../MyWallet/MyWallet";
import AboutRewardify from "../AboutRewardify/AboutRewardify";

const tabs = [
  { key: "profile", label: "Profile Details", icon: <User size={18} /> },
  { key: "shop", label: "Shop Details", icon: <Store size={18} /> },
  { key: "wallet", label: "My Wallet", icon: <Wallet size={18} /> },
  { key: "about", label: "About REWARDIFY", icon: <Info size={18} /> },
  { key: "logout", label: "Logout", icon: <LogOut size={18} /> },
];

const ProfileLayout = ({ onLogoutClick }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileDetails />;
      case "shop":
        return <ShopDetails />;
      case "wallet":
        return <MyWallet />;
      case "about":
        return <AboutRewardify />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans">
      {/* Mobile menu toggle */}
      <div className="flex justify-between items-center p-4 md:hidden border-b">
        <h2 className="text-xl font-semibold">My Profile</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block md:w-64 bg-white px-6 pt-6 md:pt-10  transition-all duration-300`}
      >
        <ul className="space-y-4">
          {tabs.map((tab) => (
            <li
              key={tab.key}
              onClick={() => {
                if (tab.key === "logout") {
                  onLogoutClick?.();
                } else {
                  setActiveTab(tab.key);
                }
                setIsSidebarOpen(false); // Close on mobile
              }}
              className={`flex items-center space-x-3 px-4 py-2 rounded-full cursor-pointer transition ${
                activeTab === tab.key
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-4 md:px-0 pt-4 md:pt-12 flex justify-center">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-sm p-6 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;
