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
     gambarID: req.body.gambarID,
     nominalID: req.body.nominalID
   }
   console.log('Request to API: ' + conf.url.inqA + ' ' + JSON.stringify(dataReq))

  var dataRes = {
    'rsp': '000',
    'rspdesc': 'Success',
    'gambar': dataReq.gambarID,
    'nominal_pecahan': dataReq.nominalID,
    'informasi': {
        'tahun_emisi': '2016',
        'dibuat_oleh': 'PERURI',
        'status': 'Aktif'
    }
  }

    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})

module.exports = router
