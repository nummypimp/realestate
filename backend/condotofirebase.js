const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 🔑 เรียกใช้ Service Account Key ที่ดาวน์โหลดจาก Firebase Console
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ฟังก์ชันสำหรับ Upload JSON ลง Firestore
const uploadJsonToFirestore = async (fileName) => {
  try {
    const data = JSON.parse(fs.readFileSync(fileName, 'utf8'));

    // ใช้ batch เพื่อประหยัด quota และเร็วขึ้น
    const batch = db.batch();

    data.forEach((item) => {
      const condoId = item.CONDO_ID;

      // เก็บข้อมูลเป็น condos/{CONDO_ID}
      const docRef = db.collection('condos').doc(condoId);

      // set() แบบ merge ข้อมูลทั้งหมดเป็น 1 document
      batch.set(docRef, item, { merge: true });
    });

    await batch.commit();
    console.log(`✅ Uploaded ${data.length} records from ${fileName} to Firestore`);
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}:`, error);
  }
};

// ฟังก์ชันหลัก
(async () => {
  const folderPath = __dirname; // ปรับ path ถ้าต้องการ

  // อ่านไฟล์ JSON ทั้งหมดในโฟลเดอร์
  const files = fs.readdirSync(folderPath).filter(file => file.startsWith('output_chunk_') && file.endsWith('.json'));

  for (const file of files) {
    await uploadJsonToFirestore(path.join(folderPath, file));
  }

  console.log('🚀 All files uploaded successfully!');
})();
