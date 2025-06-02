const express = require('express');
const cors = require('cors');
const path = require('path') ;
const propertyRoutes = require('./routes/properties');
const db = require('./firebase');
const fetch = require("node-fetch");
const axios = require('axios');
const Tiktok = require("@tobyg74/tiktok-api-dl")
const condosRouter = require('./routes/condos');


const app = express(); 
app.use(cors());
app.use(express.json());


app.use('/api/condos', condosRouter);

app.post('/api/download', async (req, res) => {
    const { keyword } = req.body;
  
    try {
      // ตัวอย่างใช้ Scraptik (RapidAPI)
      const options = {
    method: 'GET',
    url: 'https://tiktok-scraper7.p.rapidapi.com/feed/search',
    params: {
      keywords: keyword,
      region: 'th',
      count: '50',
      cursor: '0',
      publish_time: '0',
      sort_type: '0'
    },
    headers: {
      'x-rapidapi-key': 'ffe2d1586amsh7b8c7098520ec73p1b3d5ajsneef87f941500',
      'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com'
    }
  };
  
  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
      
     try {
      const response = await axios.request(options);
      console.log(response.data);
          var data = response.data;
           console.log(data.data.videos);
    } catch (error) {
      console.error(error);
    }
      if (data  && data.data.videos.length > 0) {
          console.log(data.data.videos);
          return res.json({ results: data.data.videos, error: null, keyword });
       // res.render("search", { results: data.data.videos, error: null, keyword });
      } else {
      return  res.json({ results: null, error: "ไม่พบคลิป", keyword });
      }
    } catch (err) {
     return res.json({ results: null, error: "เกิดข้อผิดพลาด: " + err.message, keyword });
    }
});

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