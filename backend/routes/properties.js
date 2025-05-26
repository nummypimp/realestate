const express = require('express');
const router = express.Router();
const db = require('../firebase');

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('properties').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('properties').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).send('Property not found');
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/api/properties", async (req, res) => {
  try {
    const { title, price, type } = req.body;
    const newDoc = await db.collection("properties").add({ title, price, type, createdAt: new Date() });
    res.json({ id: newDoc.id, message: "เพิ่มข้อมูลสำเร็จ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;