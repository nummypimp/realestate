import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import properties from '../data/properties.json';

export default function LandingPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(properties);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">รายการอสังหาริมทรัพย์</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link to={`/property/${item.id}`} key={item.id}>
            <div className="shadow-md rounded-lg overflow-hidden bg-white hover:shadow-lg transition">
              <img src={item.images[0]} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-600">{item.location}</p>
                <p className="text-blue-600 font-bold text-lg">฿{item.price.toLocaleString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}