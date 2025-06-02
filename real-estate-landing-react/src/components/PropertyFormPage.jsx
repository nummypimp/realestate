import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function PropertyFormPage() {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (!mapRef.current) {
      const mapInstance = L.map('map').setView([13.7563, 100.5018], 12);
      mapRef.current = mapInstance;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance);

      mapInstance.on('click', function (e) {
        if (marker) {
          mapInstance.removeLayer(marker);
        }
        const newMarker = L.marker(e.latlng).addTo(mapInstance);
        setMarker(newMarker);
        setFormData((prev) => ({
          ...prev,
          latitude: e.latlng.lat.toFixed(6),
          longitude: e.latlng.lng.toFixed(6),
        }));
      });
    }
  }, [marker]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);

    if (validFiles.length + previewImages.length > 10) {
      alert('คุณสามารถอัพโหลดได้สูงสุด 10 รูปเท่านั้น');
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewImages((prev) => [...prev, ev.target.result]);
      };
      reader.readAsDataURL(file);
    });

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (previewImages.length === 0) {
      alert('กรุณาอัพโหลดรูปภาพอย่างน้อย 1 รูป');
      return;
    }

    const data = new FormData();
    formData.images.forEach((image, index) => {
      data.append(`images`, image);
    });
    data.append('latitude', formData.latitude);
    data.append('longitude', formData.longitude);

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error('Failed to post data');

      alert('ส่งข้อมูลสำเร็จ! ประกาศของคุณกำลังรอการตรวจสอบ');
      setFormData({ latitude: '', longitude: '', images: [] });
      setPreviewImages([]);
      if (marker) {
        mapRef.current.removeLayer(marker);
        setMarker(null);
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 font-[Prompt]">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">ประกาศขาย/ให้เช่าอสังหาริมทรัพย์</h1>
          <p className="mt-2 text-blue-100">สร้างประกาศของคุณได้ง่ายๆ เพียงไม่กี่ขั้นตอน</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-6">
          {/* ตำแหน่งบนแผนที่ */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">ตำแหน่งบนแผนที่</label>
            <p className="text-sm text-gray-500 mb-2">คลิกบนแผนที่เพื่อเลือกตำแหน่งที่ตั้ง</p>
            <div id="map" className="map-container" style={{ height: '300px', width: '100%' }}></div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-gray-700 text-sm mb-1">ละติจูด</label>
                <input type="text" value={formData.latitude} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">ลองจิจูด</label>
                <input type="text" value={formData.longitude} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>

          {/* อัพโหลดรูปภาพ */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">อัพโหลดรูปภาพ (สูงสุด 10 รูป)</label>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="mb-4" />
            <div className="flex flex-wrap gap-2">
              {previewImages.map((src, idx) => (
                <img key={idx} src={src} alt="preview" className="image-preview" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} />
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl">
            ลงประกาศ
          </button>
        </form>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-8 text-center">
        <p>© 2023 ระบบลงประกาศอสังหาริมทรัพย์ สงวนลิขสิทธิ์</p>
      </footer>
    </div>
  );
}