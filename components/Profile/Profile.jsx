import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../src/contexts/AppContext";// Make sure this path is correct
import Header from "../Layout/Header";
import Navbar from "../Layout/Navbar";
import ProfileLayout from "./ProfileLayout/ProfileLayout";
import logout from "../../src/assets/logout.png"; // Adjust if needed

const Profile = () => {
  const [showLogoutCard, setShowLogoutCard] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAppContext();

  const handleLogoutClick = () => {
    setShowLogoutCard(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutCard(false);
  };

  const handleConfirmLogout = () => {
    // ✅ Clear auth context
    setIsAuthenticated(false);
    // ✅ Optional: Clear storage if you persist login
    localStorage.removeItem("auth");
    // ✅ Hide logout modal
    setShowLogoutCard(false);
    // ✅ Navigate to login
    navigate("/");
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F9F9F9] overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-[1440px]">
        <Header />

        {/* Layout Wrapper */}
        <div className="flex flex-1 flex-col md:flex-row w-full h-full">
          {/* Sidebar/Navbar */}
          <div className="hidden md:block w-[240px] bg-white border-r h-full">
            <Navbar />
          </div>

          {/* Mobile Navbar */}
          <div className="md:hidden w-full">
            <Navbar />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <ProfileLayout onLogoutClick={handleLogoutClick} />
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutCard && (
        <>
          {/* Dim Background */}
          <div
            style={{ backgroundColor: "#00000080" }}
            className="fixed inset-0 bg-gray bg-opacity-50 z-30"
            onClick={handleCancelLogout}
          />

          {/* Logout Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
            <div className="bg-white p-5 rounded-xl w-full max-w-sm sm:w-[350px] shadow-md text-center relative">
              {/* Logout Icon */}
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow">
                <img
                  src={logout}
                  alt="Logout Icon"
                  className="w-[60px] h-[60px]"
                />
              </div>

              <h3 className="text-base font-bold mt-14">Please Confirm</h3>
              <p className="text-sm text-gray-600 mb-4 mt-1 px-2 sm:px-4">
                Do you really want to <br /> logout from{" "}
                <span className="font-medium">REWARDIFY</span>?
              </p>

              <div className="flex flex-col gap-2 px-4">
                <button
                  onClick={handleConfirmLogout}
                  className="px-5 py-2.5 rounded bg-[#668D12] text-white text-sm font-medium hover:opacity-90"
                >
                  Logout
                </button>
                <button
                  onClick={handleCancelLogout}
                  className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
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
