const CLOUD_NAME = "dtvlfmjqy";
const UPLOAD_PRESET = "unsigned_preset";

export const uploadImageToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.secure_url || null;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
};
