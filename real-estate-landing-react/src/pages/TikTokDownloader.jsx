import React, { useState } from 'react';

export default function TikTokDownloader() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tiktokUrl: url }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setVideoUrl('');
      } else {
        setVideoUrl(data.videoUrl);
        setError('');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">ดาวน์โหลดวิดีโอ TikTok (ไม่มีลายน้ำ)</h1>
      <a href="/search" className="text-blue-600 underline mb-4 block">ค้นหาคลิปจาก Keyword</a>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="วางลิงก์ TikTok ที่นี่"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full p-3 border rounded-md"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ดาวน์โหลด
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {videoUrl && (
        <div className="mt-6">
          <video src={videoUrl} controls className="rounded-lg w-full max-w-md"></video>
        </div>
      )}
    </div>
  );
}
