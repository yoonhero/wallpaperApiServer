const axios = require("axios");
const cheerio = require("cheerio");
var express = require('express');
var app = express();
var port = 3000;

app.get('/api/img', function (req, res) {
    async function getHTML() {
        try {
            return await axios.get("https://unsplash.com/wallpapers");
        } catch (error) {
            console.error(error);
        }
    }
    getHTML()
        .then(html => {
            let imgList = [];
            const $ = cheerio.load(html.data);
            const bodyList = $("img._2UpQX")

            // bodyList를 순회하며 titleList에 h2 > a의 내용을 저장
            bodyList.each(function (i, elem) {
                imgList[i] = {
                    title: $(this).attr('src')
                };
            });

            return res.json(imgList);

        })


});

app.listen(port, function () {
    console.log('The server is running, ' +
        ' please, open your browser at http://localhost:%s',
        port);
});
