import React, { useState } from "react";

import resimg from "../../../src/assets/resimg.png";
import east from "../../../src/assets/east.png"


const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ShopDetails = () => {
  const [shopName, setShopName] = useState("Kannan departmental");
  const [shopAddress, setShopAddress] = useState(
    "2 Nd Flr, 27A/25, Mohan Mansion, Sbs Rd, Fort, Coimbatore"
  );
  const [contactNumber, setContactNumber] = useState("9865232145");
  const [workingDays, setWorkingDays] = useState([
   
  ]);
  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("18:00");
  
  const [storeImage, setStoreImage] = useState(null);
  const [saveClicked, setSaveClicked] = useState(false);

  const toggleDay = (day) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setStoreImage(previewURL);
    }
  };

  const handleRemoveImage = () => {
    setStoreImage(null);
  };

  const handleSaveClick = () => {
    setSaveClicked(true);
    // Add your save logic here (e.g., API call)
  };

  const handleMapClick = () => {
    const query = encodeURIComponent(shopAddress);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6 text-sm max-w-2xl mx-auto px-4 pb-32">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold">Shop Details</h2>
        <p className="text-gray-500">
          Here you can view and edit your details.
        </p>
      </div>

      {/* Inputs */}
      <input
        type="text"
        placeholder="Shop Name"
        className="w-full border rounded px-4 py-2 font-inter focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      />

      <textarea
        placeholder="Shop Address"
        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        value={shopAddress}
        onChange={(e) => setShopAddress(e.target.value)}
        rows={2}
      />

      <input
        type="text"
        placeholder="Contact Number"
        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />

      {/* Map Button */}
      <button
        onClick={handleMapClick}
        className="flex items-center justify-between gap-2 border rounded px-4 py-2 w-full text-gray-700 hover:bg-gray-100 transition"
      >
        <span>Map Location</span>
        <img src={east} alt="arrow" className="w-4 h-4" />
      </button>

      {/* Working Days */}
      <div className="border rounded-lg p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Working Days</h3>
          <button
            onClick={() => setWorkingDays([...daysOfWeek])}
            className="text-gray-500 text-sm"
          >
            Select All
          </button>
        </div>

        <div className="flex flex-wrap md:flex-nowrap justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            {["Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
              <label key={day} className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={workingDays.includes(day)}
                  onChange={() => toggleDay(day)}
                  className="accent-green-500"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>

          {/* Right */}
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            {["Friday", "Saturday", "Sunday"].map((day) => (
              <label key={day} className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={workingDays.includes(day)}
                  onChange={() => toggleDay(day)}
                  className="accent-green-500"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Working Time */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Working Time</h3>
        <p className="text-gray-700 mb-3">Select the Opening & Closing Time</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-[50%]">
            <input
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="w-full p-2 border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              step="900"
            />
          </div>
          <div className="w-full sm:w-[50%]">
            <input
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="w-full p-2 border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              step="900"
            />
          </div>
        </div>
      </div>

      {/* Store Image */}
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-lg">Edit Store Image</h3>
        <p className="text-gray-500 text-sm">You can edit the Store Image</p>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div>
            <img
              src={storeImage || resimg}
              alt="Store"
              className="w-32 h-32 object-cover rounded shadow"
            />
          </div>
          <div className="flex flex-col justify-center space-y-1 text-sm text-gray-500">
            <label className="cursor-pointer text-gray-600">
              <span className="underline">Change Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-gray-600 text-xs">or</p>
            <button
              onClick={handleRemoveImage}
              className="text-red-500 text-sm underline"
            >
              Remove Image
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveClick}
        disabled={saveClicked}
        className={`w-full py-2 rounded font-medium text-white transition ${
          saveClicked
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {saveClicked ? "Save Changes" : "Save Changes"}
      </button>

      {saveClicked && (
        <p className="text-xs text-red-500 text-center mt-2">
          *Note: After changing the details, the REWARDIFY admin team will need
          to verify and approve the change. Once approved, the updated changes
          will be reflected here.
        </p>
      )}
    </div>
  );
};

export default ShopDetails;
