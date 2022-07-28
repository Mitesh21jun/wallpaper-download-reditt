var express = require("express");
var app = express();
var fs = require("fs");
const router = express.Router();
const bodyParser = require("body-parser");
const getImages = require("./scraper");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at port :",port);
});

app.get("/", function (req, res) {
  var port = server.address().port;
  res.send("App is currently running at port " + port);
});

app.post("/", function (req, res) {
//   try {

//   } catch (error) {
//   }
    
let number = req.body.number;
console.log(number);

getImages(number).then(() => {
res.send({ code: 200, result: "success" });
    
}).catch(err => {
res.send({ code: 500, result: "failed" });
    
})
});
