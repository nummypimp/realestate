const express = require('express');
const router = express.Router();
const db = require('../firebase');

// ดึงคอนโดทั้งหมดในพิกัด Lat/Lng ที่กำหนด (เช่น ในกรอบสี่เหลี่ยม)
router.get('/in-box', async (req, res) => {
  const { minLat, maxLat, minLng, maxLng } = req.query;
  try {
    const snapshot = await db.collection('condos').get();
    const results = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.lat >= parseFloat(minLat) && data.lat <= parseFloat(maxLat) &&
          data.lng >= parseFloat(minLng) && data.lng <= parseFloat(maxLng)) {
        results.push({ id: doc.id, ...data });
      }
    });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;
