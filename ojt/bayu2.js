const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const getIP = require("ipware")().get_ip;
const conf = require("./config.json");

function checkMerek(param) {
  const number = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let pass = true;
  number.forEach((item, index) => {
    if (param.includes(number[index]) === true) {
      pass = false;
    }
  });
  if (pass === true) {
    return `{\n  "input" : "` + param + `",\n  "description" : "[SUCCESS] Merek tersedia"\n}`;
  } else {
    return `{\n  "input" : "` + param + `",\n  "description" : "[FAILED] Merek harus tidak mengandung angka"\n}`;
  }
}

function checkTahun(param) {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let pass = true;
  alphabet.forEach((item, index) => {
    if (param.includes(alphabet[index]) === true) {
      pass = false;
    }
  });
  if (pass === true) {
    return `{\n  "input" : "` + param + `",\n  "description" : "[SUCCESS] Tahun tersedia"\n}`;
  } else {
    return `{\n  "input" : "` + param + `",\n  "description" : "[FAILED] Tahun harus tidak mengandung huruf"\n}`;
  }
}

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.post("/", function (req, res, next) {
  const ipInfo = getIP(req);
  const clientip = ipInfo.clientIp;
  const dataReq = {
    merek: req.body.merek,
    tahun: req.body.tahun,
  };
  console.log("Request to API: " + conf.url + " " + JSON.stringify(dataReq));
  const dataRes = {
    rsp: "000",
    rspdesc: "Success",
    merek: checkMerek(req.body.merek),
    tahun: checkTahun(req.body.tahun),
  };
  res.send(dataRes);
  console.log(
    "Response to client: " + clientip + " " + JSON.stringify(dataRes)
  );
});

module.exports = router;
