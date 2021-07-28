const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const getIP = require("ipware")().get_ip;
const conf = require("./config.json");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", function (req, res, next) {
  const ipInfo = getIP(req);
  const clientip = ipInfo.clientIp;
  const dataReq = {
    merek: req.body.merek,
    detail: req.body.detail,
  };
  console.log(
    "Request to API: " + conf.url.inqA + " " + JSON.stringify(dataReq)
  );

  const dataRes = {
    rsp: "000",
    rspdesc: "Success",
    merek: req.body.merek,
    detail: req.body.detail,
    mesin: parseRes.mesin,
    jenis: parseRes.jenis,
    drivetrain: parseRes.drivetrain,
  };

  res.send(dataRes);
  console.log(
    "Response to client: " + clientip + " " + JSON.stringify(dataRes)
  );
});

module.exports = router;
