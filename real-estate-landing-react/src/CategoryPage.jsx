import { useLocation } from "react-router-dom";
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';
import PropertySection from './components/PropertySection';
import { useState } from 'react';

const mockAll = [
  { name: "บ้านเดี่ยว 2 ชั้น", location: "ลาดพร้าว, กรุงเทพฯ", detail: "3 ห้องนอน 2 ห้องน้ำ", price: "฿5,900,000", for: "sale", category: "home" },
  { name: "คอนโดใกล้ BTS", location: "อโศก, กรุงเทพฯ", detail: "1 ห้องนอน 30 ตร.ม.", price: "฿18,000/เดือน", for: "rent", category: "condo" },
  { name: "ที่ดินเปล่า ติดถนนใหญ่", location: "บางนา, กรุงเทพฯ", detail: "200 ตร.วา", price: "฿15,000,000", for: "sale", category: "land" }
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CategoryPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const query = useQuery();
  const cat = query.get("c") || "home";

  const categoryNames = {
    home: "บ้าน",
    condo: "คอนโด",
    land: "ที่ดิน"
  };

  const filtered = mockAll.filter(item => item.category === cat);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header toggleMenu={toggleMenu} />
      <SideMenu open={menuOpen} toggleMenu={toggleMenu} />

      <main className="pt-24 container mx-auto px-4 pb-12">
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">ค้นหาในหมวด: {categoryNames[cat]}</h1>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex flex-wrap gap-4">
                <select className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md">
                  <option value="home">บ้าน</option>
                  <option value="land">ที่ดิน</option>
                  <option value="condo">คอนโด</option>
                </select>
                <input type="text" placeholder="พื้นที่ / จังหวัด" className="w-full md:w-1/3 p-3 border border-gray-300 rounded-md" />
                <button className="w-full md:w-1/4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md">ค้นหา</button>
              </div>
            </div>
          </div>
        </section>

        <PropertySection title={categoryNames[cat] || cat} properties={filtered} />
      </main>

      <Footer />
    </div>
  );
}
