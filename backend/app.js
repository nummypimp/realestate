const express = require("express");
const fetch = require("node-fetch");
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 3003;
const Tiktok = require("@tobyg74/tiktok-api-dl")




app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { videoUrl: null, error: null });
});

app.post("/download", async (req, res) => {
  const { tiktokUrl } = req.body;
  console.log(tiktokUrl);
  Tiktok.Downloader(tiktokUrl, {
  version: "v2", // "v1" | "v2" | "v3"
  proxy: "YOUR_PROXY", // optional
  showOriginalResponse: true // optional, v1 only
}).then((result) => {
  console.log(result.result.video);


var urldl = result.result.video.playAddr;

 if (result.result  && urldl.length > 0) {
       
      res.render("download", { results: {videoUrl : urldl[0]}, error: null});
    } else {
      res.render("download", { results: null, error: "ไม่พบคลิป"});
    }

}
);


});
app.get("/search", (req, res) => {
  res.render("search", { results: null, error: null, keyword: '' });
});

app.post("/search", async (req, res) => {
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
      res.render("search", { results: data.data.videos, error: null, keyword });
    } else {
      res.render("search", { results: null, error: "ไม่พบคลิป", keyword });
    }
  } catch (err) {
    res.render("search", { results: null, error: "เกิดข้อผิดพลาด: " + err.message, keyword });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
