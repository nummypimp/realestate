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
       <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">ประกาศขาย/ให้เช่าอสังหาริมทรัพย์</h1>
      <form className="space-y-6" >
        <div>
          <label className="block font-medium mb-1">ประเภทประกาศ</label>
          <div className="flex gap-4">
            <label><input type="radio" name="listingType" value="sell" checked={formData.listingType === 'sell'} onChange={handleChange}/> ขาย</label>
            <label><input type="radio" name="listingType" value="rent" checked={formData.listingType === 'rent'} onChange={handleChange}/> ให้เช่า</label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block">ประเภทอสังหาริมทรัพย์</label>
            <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full border rounded p-2">
              <option value="">เลือกประเภท</option>
              <option value="condo">คอนโด</option>
              <option value="house">บ้านเดี่ยว</option>
              <option value="townhouse">ทาวน์เฮ้าส์</option>
              <option value="land">ที่ดิน</option>
              <option value="commercial">อาคารพาณิชย์</option>
              <option value="apartment">อพาร์ทเมนท์</option>
            </select>
          </div>
          <div>
            <label className="block">หัวข้อประกาศ</label>
            <input name="title" value={formData.title} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
        </div>

        <div>
          <label className="block">รายละเอียด</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded p-2" rows="4" />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="ราคา (บาท)" className="border p-2 rounded w-full" />
          <input type="number" name="area" value={formData.area} onChange={handleChange} placeholder="พื้นที่ (ตร.ม.)" className="border p-2 rounded w-full" />
          <input type="number" name="landArea" value={formData.landArea} onChange={handleChange} placeholder="พื้นที่ดิน (ตร.วา)" className="border p-2 rounded w-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="ห้องนอน" className="border p-2 rounded w-full" />
          <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="ห้องน้ำ" className="border p-2 rounded w-full" />
          <input type="number" name="floor" value={formData.floor} onChange={handleChange} placeholder="ชั้นที่" className="border p-2 rounded w-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select name="province" value={formData.province} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">เลือกจังหวัด</option>
            <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
            <option value="เชียงใหม่">เชียงใหม่</option>
          </select>
          <select name="district" value={formData.district} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">เลือกเขต/อำเภอ</option>
            {districts.map((d, i) => <option key={i}>{d}</option>)}
          </select>
          <select name="subdistrict" value={formData.subdistrict} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">เลือกแขวง/ตำบล</option>
            {subdistricts.map((sd, i) => <option key={i}>{sd}</option>)}
          </select>
          <input name="zipcode" value={formData.zipcode} onChange={handleChange} placeholder="รหัสไปรษณีย์" className="border p-2 rounded w-full" />
        </div>

        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="บ้านเลขที่ ซอย ถนน" className="border p-2 rounded w-full" rows="2" />

        <div>
          <label className="block mb-2">แผนที่</label>
          <div id="map" className="h-60 w-full rounded border" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input value={formData.latitude} readOnly placeholder="ละติจูด" className="border p-2 rounded" />
          <input value={formData.longitude} readOnly placeholder="ลองจิจูด" className="border p-2 rounded" />
        </div>

        <div>
          <label className="block">อัพโหลดรูปภาพ (สูงสุด 10 รูป)</label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="border p-2 w-full" />
          
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input name="contactName" value={formData.contactName} onChange={handleChange} placeholder="ชื่อผู้ติดต่อ" className="border p-2 rounded w-full" />
          <input name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="เบอร์โทรศัพท์" className="border p-2 rounded w-full" />
        </div>
        <input name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="อีเมล" className="border p-2 rounded w-full" />
        <input name="contactLine" value={formData.contactLine} onChange={handleChange} placeholder="LINE ID" className="border p-2 rounded w-full" />

        <button type="submit" className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700">ลงประกาศ</button>
      </form>
    </div>
    );
  }
  