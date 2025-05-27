import React, { useState } from "react";

const ProfileDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const [formData, setFormData] = useState({
    name: "Rajesh Kannan",
    phone: "7986541239",
    email: "xyz@gmail.com",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowNote(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowNote(true);
    // Add your save logic here
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-5 sm:p-6 rounded-md border border-gray-200 shadow-sm">
      <h3 className="text-lg sm:text-xl font-semibold mb-1">Profile Details</h3>
      <p className="text-sm text-gray-500 mb-4">
        Here you can view and edit your details.
      </p>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            readOnly={!isEditing}
            onChange={handleChange("name")}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            value={formData.phone}
            readOnly={!isEditing}
            onChange={handleChange("phone")}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            readOnly={!isEditing}
            onChange={handleChange("email")}
            className="w-full border rounded px-3 py-2 text-sm pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="absolute top-8 right-3 text-blue-600 text-sm font-medium hover:underline"
            >
              Change
            </button>
          )}
        </div>

        {/* Save Button */}
        <button
          disabled={!isEditing}
          onClick={handleSave}
          className={`w-full py-2 rounded text-sm font-medium transition ${
            isEditing
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Save Changes
        </button>
      </div>

      {showNote && (
        <p className="text-xs text-red-500 mt-4 text-center">
          *Note: After changing the details, the REWARDIFY admin team will
          verify and approve changes.
        </p>
      )}
    </div>
  );
};

export default ProfileDetails;
