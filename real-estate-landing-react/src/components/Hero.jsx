export default function Hero() {
  return (
    <section className="mb-12 pt-24">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">ค้นหาอสังหาริมทรัพย์ในฝัน</h1>
        <p className="text-lg mb-6">เรามีตัวเลือกที่หลากหลายสำหรับคุณ</p>
        <div className="bg-white rounded-lg p-4 shadow-lg flex gap-4 flex-wrap">
          <select className="p-3 border border-gray-300 rounded-md w-full md:w-1/3">
            <option>ประเภทอสังหา</option><option>บ้าน</option><option>ที่ดิน</option><option>คอนโด</option>
          </select>
          <input className="p-3 border border-gray-300 rounded-md w-full md:w-1/3" placeholder="พื้นที่ / จังหวัด" />
          <button className="bg-blue-600 text-white px-4 py-3 rounded-md w-full md:w-1/4">ค้นหา</button>
        </div>
      </div>
    </section>
  );
}
