import React, { useState } from "react";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';


export default function UploadImage({ onUploaded }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const handleUpload = async () => {
    if (!image) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "tvmajw1d"); // 👉 เปลี่ยนตรงนี้
    formData.append("cloud_name", "nummypimp"); // 👉 เปลี่ยนตรงนี้

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/nummypimp/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      onUploaded(data.secure_url); // 🔁 ส่ง URL กลับไป parent
      setPreview(data.secure_url);
    } catch (err) {
      alert("อัปโหลดไม่สำเร็จ");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">เลือกรูปภาพ</label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-2" />
      <button
        disabled={uploading}
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
      >
        {uploading ? "กำลังอัปโหลด..." : "อัปโหลด"}
      </button>

      {preview && <img src={preview} alt="preview" className="mt-3 w-full max-w-xs rounded" />}
    </div>
  );
}
