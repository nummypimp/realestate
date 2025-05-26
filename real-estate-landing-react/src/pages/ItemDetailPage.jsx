import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import properties from '../data/properties.json';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';

export default function PropertyDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const images = [
    'https://via.placeholder.com/800x500/e2e8f0/1a202c?text=คอนโดหรู+สุขุมวิท',
    'https://via.placeholder.com/800x500/e2e8f0/1a202c?text=ห้องนั่งเล่น',
    'https://via.placeholder.com/800x500/e2e8f0/1a202c?text=ห้องนอน',
    'https://via.placeholder.com/800x500/e2e8f0/1a202c?text=ห้องน้ำ',
    'https://via.placeholder.com/800x500/e2e8f0/1a202c?text=วิวจากระเบียง',
  ];
   const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleChangeImage = (index) => setActiveImage(index);

  return (
    <div className="bg-gray-50 min-h-screen">
          <Header toggleMenu={toggleMenu} />
          <SideMenu open={menuOpen} toggleMenu={toggleMenu} />
          <main className="pt-24 container mx-auto px-4 pb-12">
    <div className="font-[Prompt] p-4 max-w-7xl mx-auto">      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[70%]">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium mr-3">ขาย</span>
              <span className="text-gray-600">รหัสทรัพย์: CD12345</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">คอนโดหรู ใจกลางเมือง สุขุมวิท</h1>
            <p className="text-gray-600 mb-2 flex items-center">
              <i className="fas fa-map-marker-alt mr-2 text-red-500"></i>
              สุขุมวิท 24, คลองตัน, คลองเตย, กรุงเทพมหานคร 10110
            </p>
            <div className="text-blue-600 font-bold text-2xl">฿6,500,000</div>
          </div>

          <div className="mb-6">
            <div className="rounded-lg overflow-hidden bg-gray-100 h-[400px] mb-4">
              <img src={images[activeImage]} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`thumbnail rounded-lg overflow-hidden h-20 cursor-pointer ${index === activeImage ? 'border-2 border-blue-600' : ''}`}
                  onClick={() => handleChangeImage(index)}
                >
                  <img src={src} alt={`thumbnail-${index}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">รายละเอียดทรัพย์</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <DetailItem icon="ruler-combined" label="พื้นที่ใช้สอย" value="65 ตร.ม." />
              <DetailItem icon="bed" label="ห้องนอน" value="2" />
              <DetailItem icon="bath" label="ห้องน้ำ" value="2" />
              <DetailItem icon="building" label="ชั้น" value="15" />
              <DetailItem icon="compass" label="ทิศ" value="ตะวันออก" />
              <DetailItem icon="calendar-alt" label="ปีที่สร้าง" value="2020" />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">คำอธิบาย</h3>
            <div className={`text-gray-600 leading-relaxed ${expanded ? '' : 'line-clamp-4'}`}>
              คอนโดหรูใจกลางเมือง ตั้งอยู่บนถนนสุขุมวิท 24 ใกล้สถานี BTS พร้อมพงษ์ เพียง 300 เมตร ห้องมุม วิวสวย ไม่บล็อก ชั้นสูง เฟอร์นิเจอร์และเครื่องใช้ไฟฟ้าครบครัน พร้อมเข้าอยู่

ห้องขนาด 65 ตารางเมตร 2 ห้องนอน 2 ห้องน้ำ 1 ห้องนั่งเล่น 1 ห้องครัว พร้อมระเบียงขนาดใหญ่ วิวเมือง ไม่บล็อก

เฟอร์นิเจอร์และเครื่องใช้ไฟฟ้า:

เตียงขนาด 6 ฟุต พร้อมที่นอน
ตู้เสื้อผ้าบิลท์อิน
โซฟา
โต๊ะกินข้าว
ทีวี 55 นิ้ว
ตู้เย็น 2 ประตู
เครื่องปรับอากาศ 3 เครื่อง
เครื่องซักผ้า
เครื่องทำน้ำอุ่น
ไมโครเวฟ
สิ่งอำนวยความสะดวกภายในโครงการ:

สระว่ายน้ำขนาดใหญ่
ฟิตเนสพร้อมอุปกรณ์ครบครัน
สวนพักผ่อน
ห้องสมุด
ห้องประชุม
ระบบรักษาความปลอดภัย 24 ชั่วโมง
ที่จอดรถ
ทำเลดีมาก ใกล้ห้างสรรพสินค้า เอ็มควอเทียร์, เอ็มโพเรียม, สถานีรถไฟฟ้า BTS พร้อมพงษ์, โรงพยาบาลสมิติเวช, โรงเรียนนานาชาติ และร้านอาหารชั้นนำมากมาย</div>
            <button onClick={() => setExpanded(!expanded)} className="text-blue-600 hover:text-blue-800 font-medium mt-2">
              {expanded ? 'แสดงน้อยลง' : 'อ่านเพิ่มเติม'} <i className={`fas fa-chevron-${expanded ? 'up' : 'down'} ml-1`}></i>
            </button>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">สิ่งอำนวยความสะดวก</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
              {['เฟอร์นิเจอร์ครบชุด','เครื่องปรับอากาศ','เครื่องทำน้ำอุ่น','ตู้เย็น','เครื่องซักผ้า','ทีวี','อินเทอร์เน็ตไร้สาย','ระเบียง','ที่จอดรถ'].map((item, i) => (
                <div className="flex items-center" key={i}>
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Facilities */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">สิ่งอำนวยความสะดวกส่วนกลาง</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
              {[
                ['swimming-pool', 'สระว่ายน้ำ'],
                ['dumbbell', 'ฟิตเนส'],
                ['tree', 'สวน'],
                ['couch', 'ล็อบบี้'],
                ['shield-alt', 'รปภ. 24 ชม.'],
                ['video', 'กล้องวงจรปิด'],
                ['key', 'คีย์การ์ด'],
                ['car', 'ที่จอดรถ'],
                ['store', 'ร้านสะดวกซื้อ'],
              ].map(([icon, label], i) => (
                <div className="flex items-center" key={i}>
                  <i className={`fas fa-${icon} text-blue-500 mr-2`}></i>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[30%]">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <img src="https://via.placeholder.com/150/e2e8f0/1a202c?text=A" alt="agent" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">คุณ อภิชาติ นักขาย</h3>
                <p className="text-gray-600 text-sm">นายหน้าอสังหาริมทรัพย์</p>
              </div>
            </div>
            <a href="tel:0812345678" className="block text-center bg-blue-600 text-white py-3 px-4 rounded-md mb-2 hover:bg-blue-700">
              โทร 081-234-5678
            </a>
            <a href="https://line.me/ti/p/~propertythai" className="block text-center bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600">
              LINE: @propertythai
            </a>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-10 w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">อสังหาริมทรัพย์ใกล้เคียง</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map((n) => (
            <div key={n} className="property-card bg-white border rounded-lg overflow-hidden shadow-md">
              <img src={`https://via.placeholder.com/300x200?text=ใกล้เคียง${n}`} alt={`similar-${n}`} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">คอนโดใกล้ BTS</h3>
                <p className="text-gray-600 mb-2"><i className="fas fa-map-marker-alt mr-1 text-red-500"></i> อโศก, กรุงเทพฯ</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span><i className="fas fa-bed mr-1"></i> 1 ห้องนอน</span>
                  <span><i className="fas fa-ruler-combined mr-1"></i> 35 ตร.ม.</span>
                </div>
                <div className="mt-2 text-blue-600 font-bold">฿4,500,000</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </main>
     <Footer />
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center">
      <div className="bg-blue-100 p-2 rounded-full mr-3">
        <i className={`fas fa-${icon} text-blue-600`}></i>
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
