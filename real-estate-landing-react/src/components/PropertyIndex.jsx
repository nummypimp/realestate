import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import properties from '../data/properties.json';


export default function PropertyIndex({title,isSlider}) {
 const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(properties);
  }, []);

  const containerClass = isSlider
    ? "flex overflow-x-auto gap-4 pb-4 slider-container"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4";

  return (
    <section className="mb-12" id={title}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className={containerClass}>
         {items.map((item) => (
            
          <Link to={`/property/${item.id}`} key={item.id}>
          <div key={item.id} className="flex-shrink-0 w-64 md:w-72 bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-48 overflow-hidden">
              <div className={`absolute top-0 left-0 px-3 py-1 m-2 rounded-md text-sm font-medium text-white ${item.for === 'rent' ? 'bg-green-600' : 'bg-blue-600'}`}>
                {item.for === 'rent' ? 'เช่า' : 'ขาย'}
              </div>
              <img src={item.images[0]} alt={item.title} className="h-48 w-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-gray-600 mb-2">{item.location}</p>
              <div className="text-sm text-gray-500 line-clamp-2">
             {item.description}
                </div>
              <div className="mt-3 text-blue-600 font-bold text-xl">{item.price.toLocaleString()}</div>
            </div>
          </div></Link>
        ))}
      </div>
    </section>
  );
}