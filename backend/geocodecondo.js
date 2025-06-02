const fs = require('fs');
const axios = require('axios');
const admin = require('firebase-admin');

// 🔑 เรียกใช้ Service Account Key ที่ดาวน์โหลดจาก Firebase Console
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 🔑 ใส่ Google Maps API Key
const GOOGLE_API_KEY = 'AIzaSyAUp8IL2Ex6n7EOOl6erITU5kpYT2Sho5E';


/**
 * ดึงคอนโดทีละ batch (5 records) พร้อม pagination
 */
async function fetchCondosBatch(limit = 50, startAfterDoc = null) {
  let query = db.collection('condos').orderBy('CONDO_ID').limit(limit);
  if (startAfterDoc) {
    query = query.startAfter(startAfterDoc);
  }

  const snapshot = await query.get();
  if (snapshot.empty) {
    return { condos: [], lastDoc: null };
  }

  const condos = [];
  snapshot.forEach(doc => {
    condos.push({
      id: doc.id,
      ref: doc.ref,
      ...doc.data()
    });
  });

  const lastDoc = snapshot.docs[snapshot.docs.length - 1];

  return { condos, lastDoc };
}

/**
 * หา latitude, longitude จาก Google Maps Geocoding API
 */
async function geocode(condo) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: `${condo.CONDO_NAME}, ${condo.TUMBON_NAME || ''}, ${condo.AMPHUR_NAME || ''}, ${condo.CHANGWAT_NAME || ''}`,
        key: GOOGLE_API_KEY
      }
    });

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const loc = response.data.results[0].geometry.location;
      return {
        ...condo,
        lat: loc.lat,
        lng: loc.lng
      };
    } else {
      return {
        ...condo,
        lat: null,
        lng: null,
        error: response.data.status
      };
    }
  } catch (err) {
    return {
      ...condo,
      lat: null,
      lng: null,
      error: 'Request Failed'
    };
  }
}

/**
 * บันทึกไฟล์ JSON
 */
let fileCounter = 1;
function saveJsonBatch(data, prefix = 'condos_') {
  const fileName = `${prefix}${String(fileCounter).padStart(3, '0')}.json`;
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`💾 Saved ${fileName} (${data.length} records)`);
  fileCounter++;
}

/**
 * Main process
 */
(async () => {
  try {
    let lastDoc = null;
    let processedCount = 0;

    while (true) {
      const { condos, lastDoc: newLastDoc } = await fetchCondosBatch(50, lastDoc);
      if (condos.length === 0) {
        console.log('🎯 Fetch completed!');
        break;
      }

      const batchResults = [];
      for (const condo of condos) {
        const result = await geocode(condo);

            await condo.ref.update({
      lat: result.lat,
      lng: result.lng
    });
    console.log(`✅ Updated ${condo.CONDO_NAME}: lat=${result.lat}, lng=${result.lng}`);
 
        batchResults.push(result);
        processedCount++;

        // Optional: delay (ป้องกัน rate limit)
        await new Promise(r => setTimeout(r, 2000));

        if (processedCount % 100 === 0) {
          console.log(`🔍 Processed ${processedCount} condos`);
        }
      }

      saveJsonBatch(batchResults, 'condos_');
      lastDoc = newLastDoc;
    }

    console.log('🎉 All done!');
  } catch (error) {
    console.error('🚨 Error:', error);
  }
})();
