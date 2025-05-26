import React from 'react';
export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold">เว็บขายอสังหา</div>
      <div className="space-x-4">
        <a href="/" className="text-blue-600">หน้าแรก</a>
        <a href="/categories">หมวดหมู่</a>
        <a href="/post">ลงประกาศ</a>
      </div>
    </nav>
  );
}