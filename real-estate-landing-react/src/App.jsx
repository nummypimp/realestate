import { useState } from 'react';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Hero from './components/Hero';
import PropertyIndex from './components/PropertyIndex';
import Footer from './components/Footer';

const mockData = [
 { name: "ที่ดินเปล่า ติดถนนใหญ่", location: "บางนา, กรุงเทพฯ", detail: "200 ตร.วา", price: "฿15,000,000", for: "sale" },
   { name: "บ้านเดี่ยว 2 ชั้น", location: "ลาดพร้าว, กรุงเทพฯ", detail: "3 ห้องนอน 2 ห้องน้ำ", price: "฿5,900,000", for: "sale" },
  { name: "คอนโดใกล้ BTS", location: "อโศก, กรุงเทพฯ", detail: "1 ห้องนอน 30 ตร.ม.", price: "฿18,000/เดือน", for: "rent" },
  { name: "ที่ดินเปล่า ติดถนนใหญ่", location: "บางนา, กรุงเทพฯ", detail: "200 ตร.วา", price: "฿15,000,000", for: "sale" },
   { name: "บ้านเดี่ยว 2 ชั้น", location: "ลาดพร้าว, กรุงเทพฯ", detail: "3 ห้องนอน 2 ห้องน้ำ", price: "฿5,900,000", for: "sale" },
  { name: "คอนโดใกล้ BTS", location: "อโศก, กรุงเทพฯ", detail: "1 ห้องนอน 30 ตร.ม.", price: "฿18,000/เดือน", for: "rent" },
  { name: "ที่ดินเปล่า ติดถนนใหญ่", location: "บางนา, กรุงเทพฯ", detail: "200 ตร.วา", price: "฿15,000,000", for: "sale" }
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-gray-50">
      <Header toggleMenu={toggleMenu} />
      <SideMenu open={menuOpen} toggleMenu={toggleMenu} />
      <main className="pt-24 container mx-auto px-4 pb-12">
        <Hero />
        <PropertyIndex title="houses"  isSlider={true} />
        <PropertyIndex title="land" isSlider={true} />   
         <PropertyIndex title="condo" isSlider={true} />   
       
      </main>
      <Footer />
    </div>
  );
}
