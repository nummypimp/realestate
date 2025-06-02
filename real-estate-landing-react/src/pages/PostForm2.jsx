import React, { useState } from "react";
import UploadImage from "../components/UploadImage"; // เพิ่ม import

export default function PostPage() {
   const [form, setForm] = useState({
      id: "p001",
      title: "",
      price: "",
      location: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      images: ["", "", ""],
      for: "sale",
      description: "",
    });
  
    const [status, setStatus] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleImageChange = (index, value) => {
      const newImages = [...form.images];
      newImages[index] = value;
      setForm((prev) => ({ ...prev, images: newImages }));
    };
  
    const handleSubmit = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        setStatus(`✅ บันทึกแล้ว: ${data.message || data.id}`);
      } catch (err) {
        setStatus("❌ บันทึกไม่สำเร็จ");
      }
    };
  
    return (
        
      <div className="max-w-2xl mx-auto p-6 font-[Prompt] bg-white rounded shadow mt-10">
        <h2 className="text-2xl font-bold mb-4">โพสต์อสังหาฯ</h2>
  
        {[
          ["title", "ชื่อประกาศ"],
          ["price", "ราคา"],
          ["location", "ที่ตั้ง"],
          ["bedrooms", "จำนวนห้องนอน"],
          ["bathrooms", "จำนวนห้องน้ำ"],
          ["area", "พื้นที่ (ตร.ว.)"],
          ["description", "รายละเอียดเพิ่มเติม"],
        ].map(([name, label]) => (
          <div key={name} className="mb-4">
            <label className="block mb-1">{label}</label>
            <input
              type={name === "price" || name === "bedrooms" || name === "bathrooms" || name === "area" ? "number" : "text"}
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
  
        <div className="mb-4">
          <label className="block mb-1">ประเภท (ขาย/เช่า)</label>
          <select name="for" value={form.for} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="sale">ขาย</option>
            <option value="rent">เช่า</option>
          </select>
        </div>
  
        <div className="mb-4">
          <UploadImage onUploaded={(url) => {
  const updated = [...form.images];
  const emptyIndex = updated.findIndex((i) => !i);
  if (emptyIndex !== -1) {
    updated[emptyIndex] = url;
    setForm({ ...form, images: updated });
  }
}} />
          <label className="block mb-2">ลิงก์รูปภาพ (สูงสุด 3 รูป)</label>
          {form.images.map((img, i) => (
            <input
              key={i}
              type="text"
              value={img}
              onChange={(e) => handleImageChange(i, e.target.value)}
              placeholder={`รูปที่ ${i + 1}`}
              className="w-full p-2 border rounded mb-2"
            />
          ))}
        </div>
  
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          บันทึกประกาศ
        </button>
  
        {status && <p className="mt-4 text-green-600">{status}</p>}
      </div>
    );
  }
  