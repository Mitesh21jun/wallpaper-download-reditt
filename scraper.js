const puppeteer = require('puppeteer');
const fs = require('fs');
const request = require('request');
var http = require('http')                                             

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
    //   console.log('content-type:', res.headers['content-type']);
    //   console.log('content-length:', res.headers['content-length']);
  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
  



const getImages = async (n) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.reddit.com/r/wallpapers/new/');
  const imgs = await page.$$eval('._3Oa0THmZ3f5iZXAQ0hBJ0k img[src]', imgs => imgs.map(img => img.getAttribute('src')));

//   const result = await download(imgs[0], `image-${0}.png`);
    for (let i = 0; i < n; i++){
        download(imgs[i], 'image'+i+'.png', function(){
            console.log('downloaded '+ i);
          });    
    }

  await browser.close();
}

module.exports = getImages