import React, { useState } from "react";
import { User, Store, Wallet, Info, LogOut } from "lucide-react"; // Lucide icons
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
    <div className="flex min-h-screen bg-white font-sans">
      <aside className="w-64 border-grey-100 px-6 pt-10">
        <h2 className="text-xl font-semibold mb-8">My Profile</h2>
        <ul className="space-y-4">
          {tabs.map((tab) => (
            <li
              key={tab.key}
              onClick={() => {
                if (tab.key === "logout") onLogoutClick?.();
                else setActiveTab(tab.key);
              }}
              className={`flex items-center space-x-3 px-4 py-2 rounded-full cursor-pointer transition ${
                activeTab === tab.key
                  ? "bg-green-00 text-black-600 font-medium"
                  : "text-gray-600 "
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 flex justify-center items-start pt-12 overflow-y-auto max-h-screen">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-sm p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ProfileLayout;
  