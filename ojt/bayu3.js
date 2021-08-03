const express = require("express");
const bodyParser = require("body-parser");
const getIP = require("ipware")().get_ip;
const conf = require("./config.json");
const CryptoJS = require("crypto-js");

const router = express();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", function (req, res, next) {
  const ipInfo = getIP(req);
  const clientip = ipInfo.clientIp;
  const dataReq = {
    iv: req.params.iv,
    secret: req.params.secret,
    ciphertext: req.params.ciphertext,
  };
  console.log(
    "Request to API: " + conf.url.inqA + " " + JSON.stringify(dataReq)
  );
  let dataRes = {};
  if (
    typeof req.params.iv === "string" &&
    typeof req.params.secret === "string" &&
    typeof req.params.ciphertext === "string"
  ) {
    if (req.params.iv.length !== 16) {
      dataRes.rsp = "997";
      dataRes.rspdesc = "Invalid data format, iv length must be 16 character.";
    } else if (req.params.secret.length !== 32) {
      dataRes.rsp = "997";
      dataRes.rspdesc = "Invalid data format, secret length must be 32 character.";
    } else {
      const AES256CBC = CryptoJS.AES.decrypt(
        CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Base64.parse(req.params.ciphertext),
          formatter: CryptoJS.format.OpenSSL,
        }),
        CryptoJS.enc.Utf8.parse(req.params.secret),
        { iv: CryptoJS.enc.Utf8.parse(req.params.iv) }
      );
      dataRes.rsp = "000";
      dataRes.rspdesc = "Success";
      dataRes.iv = req.params.iv;
      dataRes.secret = req.params.secret;
      dataRes.ciphertext = req.params.ciphertext;
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
