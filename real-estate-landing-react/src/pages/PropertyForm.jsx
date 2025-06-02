// src/pages/PropertyForm.jsx
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import UploadImage from '../components/UploadImage';

export default function PropertyForm() {
  const [formData, setFormData] = useState({
    listingType: 'sell',
    propertyType: '',
    title: '',
    description: '',
    price: '',
    area: '',
    landArea: '',
    bedrooms: '',
    bathrooms: '',
    floor: '',
    province: '',
    district: '',
    subdistrict: '',
    zipcode: '',
    address: '',
    latitude: '',
    longitude: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactLine: '',
    images: ['', '', '']
  });
  const [images, setImages] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    if (mapElement._leaflet_id != null) mapElement._leaflet_id = null;

    const leafletMap = L.map(mapElement).setView([13.7563, 100.5018], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);

    leafletMap.on('click', function (e) {
      if (marker) leafletMap.removeLayer(marker);
      const newMarker = L.marker(e.latlng).addTo(leafletMap);
      setMarker(newMarker);
      setFormData(prev => ({
        ...prev,
        latitude: e.latlng.lat.toFixed(6),
        longitude: e.latlng.lng.toFixed(6)
      }));
    });

    setMap(leafletMap);

    return () => {
      leafletMap.off();
      leafletMap.remove();
    };
  }, []);

  useEffect(() => {
    if (formData.province === 'กรุงเทพมหานคร') {
      setDistricts(['บางรัก', 'ปทุมวัน']);
    } else if (formData.province === 'เชียงใหม่') {
      setDistricts(['เมืองเชียงใหม่', 'แม่ริม']);
    } else {
      setDistricts([]);
    }
    setFormData(prev => ({ ...prev, district: '', subdistrict: '' }));
  }, [formData.province]);

  useEffect(() => {
    if (formData.district === 'บางรัก') {
      setSubdistricts(['สีลม', 'สุริยวงศ์']);
    } else if (formData.district === 'ปทุมวัน') {
      setSubdistricts(['รองเมือง', 'วังใหม่']);
    } else {
      setSubdistricts([]);
    }
    setFormData(prev => ({ ...prev, subdistrict: '' }));
  }, [formData.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, url) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = url;
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) return alert('อัพโหลดสูงสุด 10 รูป');
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeLocalImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasUploadImages = images.length > 0 || formData.images.some(img => img);
    if (!hasUploadImages) return alert('กรุณาอัพโหลดรูปอย่างน้อย 1 รูป');
    const fullData = {
      ...formData,
      uploadImages: images,
      imageLinks: formData.images
    };

    try {
      const res = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fullData)
      });

      const result = await res.json();

      if (res.ok) {
        alert('ส่งข้อมูลสำเร็จ!');
        console.log('Response:', result);
      } else {
        alert(`เกิดข้อผิดพลาด: ${result.message || res.statusText}`);
      }
    } catch (error) {
      console.error('❌ error:', error);
      alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์');
    }
  };


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">ประกาศขาย/ให้เช่าอสังหาริมทรัพย์</h1>
    <form className="space-y-6" onSubmit={handleSubmit}>
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
                <label className="block mb-2 font-semibold">ลิงก์รูปภาพ (สูงสุด 3 รูป)</label>
                <UploadImage onUploaded={(url) => {
                  const updated = [...formData.images];
                  const emptyIndex = updated.findIndex((i) => !i);
                  if (emptyIndex !== -1) {
                    updated[emptyIndex] = url;
                    setFormData(prev => ({ ...prev, images: updated }));
                  }
                }} />
                {formData.images.map((img, i) => (
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
      
              <div>
                <label className="block">อัพโหลดรูปภาพ (สูงสุด 10 รูป)</label>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="border p-2 w-full" />
                <div className="flex flex-wrap gap-2 mt-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img src={img} alt={`upload-${idx}`} className="w-24 h-24 object-cover rounded" />
                      <button
                        onClick={() => removeLocalImage(idx)}
                        className="absolute top-1 right-1 text-white bg-red-500 rounded-full w-5 h-5 text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
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
