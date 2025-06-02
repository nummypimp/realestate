import React, { useState } from 'react';


export default function TiktokSearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setResults([]);
      } else {
        setResults(data.results);
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-xl font-semibold mb-4">ค้นหาวิดีโอ TikTok จากคีย์เวิร์ด</h1>
      <form onSubmit={handleSearch} className="mb-6 max-w-lg w-full">
        <input
          type="text"
          placeholder="เช่น แมวเต้น, เพลงฮิต"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
          className="w-full p-3 rounded-md border border-gray-300 mb-3"
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md transition"
        >
          ค้นหา
        </button>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {results.length > 0 && (
        <>
          <h2 className="text-base font-medium mb-4">ผลการค้นหา</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((clip, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow">
                <video
                  src={clip.play}
                  controls
                  className="w-full rounded-md bg-gray-100 max-h-[320px] object-contain mb-3"
                  poster={clip.cover}
                  preload="none"
                />
                <div className="text-sm text-gray-700 line-clamp-2 mb-2">{clip.title}</div>
                <a
                  href={clip.play}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center text-sm text-blue-600 border border-green-500 rounded-md py-2 hover:bg-green-500 hover:text-white transition"
                >
                  ดูคลิป TikTok
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="mt-8">
        <a href="/" className="text-blue-500 underline">
          ← กลับหน้าโหลดคลิป
        </a>
      </p>
    </div>
  );
}
