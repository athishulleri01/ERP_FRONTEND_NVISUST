import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../services/api";
import { PiUserCirclePlusFill } from "react-icons/pi";

const CLOUD_NAME = "dtvlfmjqy";
const UPLOAD_PRESET = "unsigned_preset";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    department: "",
    role: "",
    email: "",
    username: "",
    profile: {
      bio: "",
      avatar: "",
      address: "",
      date_of_birth: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await apiService.getProfile();
      setProfile(data);
      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone: data.phone || "",
        department: data.department || "",
        role: data.role || "",
        email: data.email || "",
        username: data.username || "",
        profile: {
          bio: data.profile?.bio || "",
          avatar: data.profile?.avatar || "",
          address: data.profile?.address || "",
          date_of_birth: data.profile?.date_of_birth || "",
        },
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          profile: { ...prev.profile, avatar: data.secure_url },
        }));
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await apiService.updateProfile(formData);
      setMessage("✅ Profile updated successfully!");
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      setMessage("❌ Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>

     <form
  onSubmit={handleSubmit}
  className="space-y-6 bg-white shadow-lg p-6 rounded-2xl border border-gray-100"
>
  {message && (
    <div
      className={`p-3 rounded-lg font-medium ${
        message.includes("✅")
          ? "bg-green-100 border border-green-400 text-green-700"
          : "bg-red-100 border border-red-400 text-red-700"
      }`}
    >
      {message}
    </div>
  )}

  {/* Avatar */}
  <div className="flex flex-col items-center">
    <div className="relative">
      {formData.profile.avatar ? (
        <img
          src={formData.profile.avatar}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover ring-2 ring-blue-500 shadow-md"
        />
      ) : (
        <PiUserCirclePlusFill className="w-28 h-28 text-gray-300" />
      )}

      {isEditing && (
        <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="hidden"
          />
          ✏️
        </label>
      )}
    </div>
  </div>

  {/* Fields in correct order */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* First Name */}
    <div>
      <label className="block text-sm font-semibold text-gray-600">
        First Name
      </label>
      <input
        type="text"
        value={formData.first_name}
        disabled={!isEditing}
        onChange={(e) =>
          setFormData({ ...formData, first_name: e.target.value })
        }
        className="w-full mt-1 rounded-lg border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Last Name */}
    <div>
      <label className="block text-sm font-semibold text-gray-600">
        Last Name
      </label>
      <input
        type="text"
        value={formData.last_name}
        disabled={!isEditing}
        onChange={(e) =>
          setFormData({ ...formData, last_name: e.target.value })
        }
        className="w-full mt-1 rounded-lg border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Username */}
    <div>
      <label className="block text-sm font-semibold text-gray-600">
        Username
      </label>
      <input
        type="text"
        value={formData.username}
        disabled
        className="w-full mt-1 rounded-lg border-gray-300 bg-gray-100 p-2 shadow-sm"
      />
    </div>

    {/* Role */}
    <div>
      <label className="block text-sm font-semibold text-gray-600">Role</label>
      <input
        type="text"
        value={formData.role}
        disabled
        className="w-full mt-1 rounded-lg border-gray-300 bg-gray-100 p-2 shadow-sm"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-semibold text-gray-600">Email</label>
      <input
        type="text"
        value={formData.email}
        disabled
        className="w-full mt-1 rounded-lg border-gray-300 bg-gray-100 p-2 shadow-sm"
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-semibold text-gray-600">Phone</label>
      <input
        type="tel"
        value={formData.phone}
        disabled={!isEditing}
        onChange={(e) =>
          setFormData({ ...formData, phone: e.target.value })
        }
        className="w-full mt-1 rounded-lg border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Department */}
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold text-gray-600">
        Department
      </label>
      <input
        type="text"
        value={formData.department}
        disabled={!isEditing}
        onChange={(e) =>
          setFormData({ ...formData, department: e.target.value })
        }
        className="w-full mt-1 rounded-lg border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Bio */}
  <div>
    <label className="block text-sm font-semibold text-gray-600">Bio</label>
    <textarea
      value={formData.profile.bio}
      disabled={!isEditing}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: { ...formData.profile, bio: e.target.value },
        })
      }
      className="w-full mt-1 rounded-lg border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Address */}
  <div>
    <label className="block text-sm font-semibold text-gray-600">Address</label>
    <textarea
      value={formData.profile.address}
      disabled={!isEditing}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: { ...formData.profile, address: e.target.value },
        })
      }
      className="w-full mt-1 rounded-lg border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* DOB */}
  <div>
    <label className="block text-sm font-semibold text-gray-600">
      Date of Birth
    </label>
    <input
      type="date"
      value={formData.profile.date_of_birth}
      disabled={!isEditing}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: { ...formData.profile, date_of_birth: e.target.value },
        })
      }
      className="w-full mt-1 rounded-lg border-gray-300 p-2 shadow-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Actions */}
  <div className="flex justify-end space-x-4">
    {isEditing ? (
      <>
        <button
          type="button"
          onClick={() => {
            setIsEditing(false);
            fetchProfile();
          }}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          disabled={saving}
        >
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </>
    ) : (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md"
      >
        Edit Profile
      </button>
    )}
  </div>
</form>

    </div>
  );
};

export default Profile;
