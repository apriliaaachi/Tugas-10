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
    IWSID: req.headers.id,
    IWSREF: ' ',
    IID: ' ',
    IACCTNO: req.body.account
  }
  console.log('Request to API: ' + conf.url.inqA + ' ' + JSON.stringify(dataReq))
  var dataRes = {
    'rsp': "000",
    'rspdesc': "Success",
    'trxid': req.body.trxid,
    'account': req.body.account,
    'nama': parseRes.OSNAME,
    'status': parseRes.OSTATUS,
    'statusdesc': parseRes.OSTSDSC
  }

    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})

module.exports = router