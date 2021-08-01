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
    return {
      success: true,
      message: ""
    };
  } else {
    return {
      success: false,
      message: "Merek tidak boleh mengandung angka. "
    };
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
    if (param.toLowerCase().includes(alphabet[index]) === true) {
      pass = false;
    }
  });
  if (pass === true) {
    return {
      success: true,
      message: ""
    };
  } else {
    return {
      success: false,
      message: "Tahun tidak boleh mengandung huruf. "
    };
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
  const dataRes = {};
  if (
    checkMerek(req.body.merek).success === true &&
    checkTahun(req.body.tahun).success === true
  ) {
    dataRes.rsp = "000";
    dataRes.rspdesc = "Success";
    dataRes.merek = req.body.merek;
    dataRes.tahun = req.body.tahun;
  } else {
    dataRes.rsp = "998";
    dataRes.rspdesc = "";
    if (checkMerek(req.body.merek).success === false) {
      dataRes.rspdesc = dataRes.rspdesc + checkMerek(req.body.merek).message;
    }
    if (checkTahun(req.body.tahun).success === false) {
      dataRes.rspdesc = dataRes.rspdesc + checkTahun(req.body.tahun).message;
    }
  }
  res.send(dataRes);
  console.log(
    "Response to client: " + clientip + " " + JSON.stringify(dataRes)
  );
});

module.exports = router;
