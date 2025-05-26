import React from 'react';

const properties = [
  { id: 1, title: "บ้านเดี่ยว", location: "กรุงเทพฯ", price: 4500000, image: "https://via.placeholder.com/400x300" },
  { id: 2, title: "คอนโด", location: "เชียงใหม่", price: 2200000, image: "https://via.placeholder.com/400x300" },
];

export default function PropertyList() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((p) => (
        <div key={p.id} className="border rounded-xl shadow overflow-hidden">
          <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="font-bold">{p.title}</h2>
            <p className="text-sm text-gray-500">{p.location}</p>
            <p className="text-blue-600 font-bold">{p.price.toLocaleString()} บาท</p>
          </div>
        </div>
      ))}
    </div>
  );
}