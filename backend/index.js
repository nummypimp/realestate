const express = require('express');
const cors = require('cors');
const path = require('path') ;
const propertyRoutes = require('./routes/properties');
const db = require('./firebase');


const app = express(); 
app.use(cors());
app.use(express.json());




app.post("/api/properties", async (req, res) => {
  try {
   const data = req.body;
   data.createdAt= new Date();

    // ตรวจสอบค่าที่เป็น undefined แล้วลบออก
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });
    
    const newDoc = await db.collection('properties').add(data);
    //const newDoc = await db.collection("properties").add({ title, price, image, createdAt: new Date() });
    res.json({ id: newDoc.id, message: "เพิ่มข้อมูลสำเร็จ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// เสิร์ฟไฟล์ static จาก React
app.use(express.static(path.join(__dirname, '../real-estate-landing-react/dist'))); // หรือ 'build' ถ้าใช้ CRA

// Handle SPA
app.get(/^\/(?!admin).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../real-estate-landing-react/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});