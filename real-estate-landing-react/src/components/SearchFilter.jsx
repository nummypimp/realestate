import React from 'react';
export default function SearchFilter() {
  return (
    <div className="bg-white shadow p-4 flex flex-wrap gap-4 justify-center">
      <input placeholder="ค้นหา..." className="border p-2 rounded w-full sm:w-auto" />
      <select className="border p-2 rounded w-full sm:w-auto">
        <option>ทุกจังหวัด</option>
        <option>กรุงเทพฯ</option>
        <option>เชียงใหม่</option>
      </select>
      <select className="border p-2 rounded w-full sm:w-auto">
        <option>ทุกหมวดหมู่</option>
        <option>บ้าน</option>
        <option>คอนโด</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">ค้นหา</button>
    </div>
  );
}