import PropertySection from './components/PropertySection';
import { useState } from 'react';

const mockAll = [
  { name: "บ้านเดี่ยว 2 ชั้น", location: "ลาดพร้าว, กรุงเทพฯ", detail: "3 ห้องนอน 2 ห้องน้ำ", price: "฿5,900,000", for: "sale" },
  { name: "คอนโดใกล้ BTS", location: "อโศก, กรุงเทพฯ", detail: "1 ห้องนอน 30 ตร.ม.", price: "฿18,000/เดือน", for: "rent" },
  { name: "ที่ดินเปล่า ติดถนนใหญ่", location: "บางนา, กรุงเทพฯ", detail: "200 ตร.วา", price: "฿15,000,000", for: "sale" }
];

export default function ProductListPage() {
  return (
    <div className="pt-24 container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">รายการอสังหาริมทรัพย์ทั้งหมด</h1>
      <PropertySection title="รายการทั้งหมด" properties={mockAll} />
    </div>
  );
}
