import React, { useState } from "react";
import Header from "../Layout/Header";
import Navbar from "../Layout/Navbar";
import ProfileLayout from "./ProfileLayout/ProfileLayout";
import logout from "../../src/assets/logout.png";

const Profile = () => {
  const [showLogoutCard, setShowLogoutCard] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutCard(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutCard(false);
  };

  const handleConfirmLogout = () => {
    // Add actual logout logic here (e.g., clearing session, redirecting)
    console.log("Logging out...");
    setShowLogoutCard(false);
  };

  return (
    <div className="relative w-full h-screen bg-[#F9F9F9] overflow-hidden">
      <Header />
      <div className="flex w-full h-full">
        <div className="hidden md:block w-[240px] bg-white border-r h-full">
          <Navbar />
        </div>
        <div className="block md:hidden w-full">
          <Navbar />
        </div>
        <div className="flex-1 p-6 relative z-0">
          <ProfileLayout onLogoutClick={handleLogoutClick} />
        </div>
      </div>

      {showLogoutCard && (
        <>
          {/* Dim Background */}
          <div
            className="fixed inset-0"
            style={{ backgroundColor: "#00000080" }}
            onClick={handleCancelLogout}
          />

          {/* Logout Card */}
          <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="bg-white p-4 rounded-[10px] w-[350px] h-[250px] border border-blue-300 shadow-md relative text-center">
              {/* Logout Icon */}
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow">
                <img
                  src={logout}
                  alt="Logout Icon"
                  className="w-[60px] h-[60px]"
                />
              </div>

              <h3 className="text-base font-bold mt-14">Please Confirm</h3>
              <p className="text-xs text-gray-600 mb-4 mt-1 px-4">
                Do you really want<br/> to Logout from{" "}
                <span className="font-medium">REWARDIFY</span>?
              </p>

              <div className="flex flex-col gap-2 px-4">
                <button
                  onClick={handleConfirmLogout}
                  className="px-5 py-2.5 rounded bg-gradient-to-r text-white text-xs font-medium"
                  style={{ backgroundColor: "#668D12" }}
                >
                  Logout
                </button>
                <button
                  onClick={handleCancelLogout}
                  className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
