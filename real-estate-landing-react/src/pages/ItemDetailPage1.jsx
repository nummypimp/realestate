import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import properties from '../data/properties.json';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';


export default function ItemDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [activeThumbnail, setActiveThumbnail] = useState(0);
   const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const item = properties.find((p) => p.id === id);
    setData(item);
  }, [id]);

  if (!data) return <div className="p-4">กำลังโหลด...</div>;

  const recommended = properties.filter(p => p.id !== id).slice(0, 3);

  return (
    <div className="font-[Prompt]">
       <Header toggleMenu={toggleMenu} />
            <SideMenu open={menuOpen} toggleMenu={toggleMenu} />
      <div className="flex">
      
        <main className="flex-1 p-4">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <img src={data.images[activeThumbnail]} alt="Preview" className="w-full h-[400px] object-cover rounded-lg" />
          <div className="flex space-x-4 mt-4">
            {data.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${activeThumbnail === i ? 'border-blue-600' : 'border-transparent'}`}
                onClick={() => setActiveThumbnail(i)}
                alt={`thumbnail ${i}`}
              />
            ))}
          </div>
          <div className="mt-6 space-y-2">
            <p className="text-gray-600">ที่ตั้ง: {data.location}</p>
            <p className="text-gray-600">ขนาด: {data.area} ตร.วา</p>
            <p className="text-gray-600">{data.bedrooms} ห้องนอน, {data.bathrooms} ห้องน้ำ</p>
            <p className="text-blue-600 font-bold text-xl">฿{data.price.toLocaleString()}</p>
            <p className="text-gray-700 mt-4">{data.description}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">รายการสินค้าแนะนำ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommended.map(item => (
                <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
                  <img src={item.images[0]} alt={item.title} className="h-48 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.location}</p>
                    <p className="text-blue-600 font-bold">฿{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
