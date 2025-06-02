const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const groupedData = {};

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    const condoName = row.CONDO_NAME;

    if (!groupedData[condoName]) {
      groupedData[condoName] = [];
    }

    // เลือกเฉพาะฟิลด์ที่ต้องการ
    const filteredRow = {
      CONDO_ID: row.CONDO_ID,
      CONDO_NAME: row.CONDO_NAME,
      CHANGWAT_CODE: row.CHANGWAT_CODE,
      CHANGWAT_NAME: row.CHANGWAT_NAME,
      AMPHUR_CODE: row.AMPHUR_CODE,
      AMPHUR_NAME: row.AMPHUR_NAME,
      TUMBON_CODE: row.TUMBON_CODE,
      TUMBON_NAME: row.TUMBON_NAME
    };

    groupedData[condoName].push(filteredRow);
  })
  .on('end', () => {
    console.log('✅ CSV file read and grouped successfully!');

    // Flatten all groups into one array
    let allData = Object.entries(groupedData).flatMap(([condoName, rows]) => rows);

    // กรองซ้ำ
    const uniqueSet = new Set();
    const uniqueData = allData.filter((item) => {
      const key = `${item.CONDO_ID}|${item.CONDO_NAME}|${item.CHANGWAT_CODE}|${item.AMPHUR_CODE}|${item.TUMBON_CODE}`;
      if (!uniqueSet.has(key)) {
        uniqueSet.add(key);
        return true;
      }
      return false;
    });

    console.log(`🔎 Filtered duplicates: ${uniqueData.length} records left`);

    // Split data into chunks of 15000 records
    const chunkSize = 15000;
    const totalChunks = Math.ceil(uniqueData.length / chunkSize);

    console.log(`📦 Will create ${totalChunks} JSON files`);

    for (let i = 0; i < totalChunks; i++) {
      const chunk = uniqueData.slice(i * chunkSize, (i + 1) * chunkSize);
      const filePath = path.join(__dirname, `output_chunk_${i + 1}.json`);
      fs.writeFileSync(filePath, JSON.stringify(chunk, null, 2), 'utf8');
      console.log(`✅ Saved ${filePath} (${chunk.length} records)`);
    }

    console.log('🚀 All chunks saved successfully!');
  });
