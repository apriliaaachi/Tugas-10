const express = require("express");
const bodyParser = require("body-parser");
const getIP = require("ipware")().get_ip;
const conf = require("./config.json");
const CryptoJS = require("crypto-js");

const router = express();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", function (req, res, next) {
  const ipInfo = getIP(req);
  const clientip = ipInfo.clientIp;
  const dataReq = {
    iv: req.body.iv,
    secret: req.body.secret,
    ciphertext: req.body.ciphertext,
  };
  console.log(
    "Request to API: " + conf.url.inqA + " " + JSON.stringify(dataReq)
  );
  let dataRes = {};
  if (
    typeof req.body.iv === "string" &&
    typeof req.body.secret === "string" &&
    typeof req.body.ciphertext === "string"
  ) {
    if (req.body.iv.length !== 16) {
      dataRes.rsp = "997";
      dataRes.rspdesc = "Invalid data format, iv length must be 16 character.";
    } else if (req.body.secret.length !== 32) {
      dataRes.rsp = "997";
      dataRes.rspdesc = "Invalid data format, secret length must be 32 character.";
    } else {
      const AES256CBC = CryptoJS.AES.decrypt(
        CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Base64.parse(req.body.ciphertext),
          formatter: CryptoJS.format.OpenSSL,
        }),
        CryptoJS.enc.Utf8.parse(req.body.secret),
        { iv: CryptoJS.enc.Utf8.parse(req.body.iv) }
      );
      dataRes.rsp = "000";
      dataRes.rspdesc = "Success";
      dataRes.iv = req.body.iv;
      dataRes.secret = req.body.secret;
      dataRes.ciphertext = req.body.ciphertext;
      dataRes.plaintext = AES256CBC.toString(CryptoJS.enc.Utf8);
    }
  } else {
    dataRes.rsp = "997";
    dataRes.rspdesc = "Invalid data format, all input must be string.";
  }
  res.send(dataRes);
  console.log(
    "Response to client: " + clientip + " " + JSON.stringify(dataRes)
  );
});

module.exports = router;
