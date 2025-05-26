import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const categories = [
  { name: "บ้าน", image: "https://via.placeholder.com/300x200?text=บ้าน" },
  { name: "คอนโด", image: "https://via.placeholder.com/300x200?text=คอนโด" },
  { name: "ที่ดิน", image: "https://via.placeholder.com/300x200?text=ที่ดิน" },
];

export default function CategorySlider() {
  return (
    <div className="my-6 px-4">
      <Swiper spaceBetween={10} slidesPerView={2}>
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <div className="rounded overflow-hidden shadow text-center">
              <img src={cat.image} alt={cat.name} className="w-full h-32 object-cover" />
              <div className="p-2 font-semibold">{cat.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}