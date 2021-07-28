var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var getIP = require('ipware')().get_ip
var conf = require('./config.json')
var request = require('superagent')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* Inquiry Credit */
router.post('/', function (req, res, next) {
  /* Get IP first */
  var ipInfo = getIP(req)
  var clientip = ipInfo.clientIp
  /* Change Data */
  var dataReq = {
    JENIS: req.body.jenis,
    TAHUN: req.body.tahun
  }
  console.log('Request to API: ' + conf.url.inqA + ' ' + JSON.stringify(dataReq))
  var dataRes = {
    'rsp': "000",
    'rspdesc': "Success",
    'jenis': dataReq.JENIS,
    'tahun': dataReq.TAHUN,
    'merk': "toyota",
    'model': "toyota camry",
    'harga': "581",
    'mesin': "2,5 L"
  }

    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})

module.exports = router