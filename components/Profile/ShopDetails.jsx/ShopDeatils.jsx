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
    <div className="space-y-6 text-sm max-w-sm mx-auto pb-32">
      <div>
        <h2 className="text-lg font-semibold">Shop Details</h2>
        <p className="text-gray-500">
          Here you can view and edit your details.
        </p>
      </div>

      <input
        type="text"
        placeholder="Shop Name"
        className="w-full border rounded px-4 py-2 font-inter focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      />

      <textarea
        placeholder="Shop Address"
        className="w-full border rounded px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
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

        <div className="flex justify-between gap-6">
          {/* Left side: Monday to Thursday */}
          <div className="flex flex-col gap-3 w-1/2">
            {daysOfWeek
              .filter((day) =>
                ["Monday", "Tuesday", "Wednesday", "Thursday"].includes(day)
              )
              .map((day) => (
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

          {/* Right side: Friday to Sunday */}
          <div className="flex flex-col gap-2 w-1/2 ">
            {daysOfWeek
              .filter((day) => ["Friday", "Saturday", "Sunday"].includes(day))
              .map((day) => (
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
        <h4 className="font-normal text-gray-700 mb-3">
          Select the Opening & Closing Time
        </h4>
        <div className="flex gap-4">
          {/* Open Time */}
          <div className="relative w-[122px] h-[40px]">
          
            <input
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="w-full h-full p-2 pl-5 border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
              step="900"
            />
          </div>

          {/* Close Time */}
          <div className="relative w-[122px] h-[40px]">
        
            <input
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="w-full h-full p-2 pl-5 border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
              step="900"
            />
          </div>
        </div>
      </div>

      {/* Store Image */}
      <div className="border rounded-lg p-4 space-y-3 ">
        <h3 className="font-[500] text-[18px] leading-[100%] tracking-[0px] font-inter">
          Edit Store Image
        </h3>
        <p className="font-inter font-[400] text-[12px] leading-[100%] tracking-[0px] text-gray-500">
          You can edit the Store Image
        </p>

        <div className="flex items-start gap-4">
          {/* Image */}
          <div>
            {storeImage ? (
              <img
                src={storeImage}
                alt="Store"
                className="w-32 h-32 object-cover rounded shadow"
              />
            ) : (
              <img
                src={resimg}
                alt="Default Store"
                className="w-32 h-32 object-cover rounded shadow"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col justify-center pt-3 space-y- text-sm text-gray-500">
            <label className="flex items-center pl-9 gap-1 cursor-pointer text-gray-600">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-gray-600 pl-18 pt-2">or</p>
            <button
              onClick={handleRemoveImage}
              className="flex items-center pl-9 pt-2  gap-1 text-gray-600"
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
