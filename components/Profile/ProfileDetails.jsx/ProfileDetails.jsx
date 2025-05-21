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
    setShowNote(false); // Hide note while editing
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowNote(true); // Show note after saving
    // Add your save logic here (e.g., API call)
  };

  return (
    <div className="w-115 max-w-lg bg-white p-6 rounded-md border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-1">Profile Details</h3>
      <p className="text-sm text-gray-500 mb-4">
        Here you can view and edit your details.
      </p>

      <div className="space-y-9">
        <input
          type="text"
          value={formData.name}
          readOnly={!isEditing}
          onChange={handleChange("name")}
          className="w-100 border rounded px-2 py-2 text-sm"
        />

        <input
          type="text"
          value={formData.phone}
          readOnly={!isEditing}
          onChange={handleChange("phone")}
          className="w-100 border rounded px-2 py-2 text-sm"
        />

        <div className="relative">
          <input
            type="email"
            value={formData.email}
            readOnly={!isEditing}
            onChange={handleChange("email")}
            className="w-100 border rounded px-2 py-2 text-sm pr-20"
          />
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="absolute top-2.5 right-10 text-red-500 text-sm font-medium"
            >
              Change
            </button>
          )}
        </div>

        <button
          disabled={!isEditing}
          onClick={handleSave}
          className={`w-100 py-2 rounded text-sm ${
            isEditing
              ? "bg-green-500 text-white cursor-pointer"
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
