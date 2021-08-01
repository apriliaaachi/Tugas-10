var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var getIP = require('ipware')().get_ip
var conf = require('./config.json')
var request = require('superagent')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

/* Inquiry Credit */
router.post('/', function (req, res, next) {
  /* Get IP first */
  var ipInfo = getIP(req)
  var clientip = ipInfo.clientIp
  
  /* Regex */
  var regForNum = new RegExp('^[0-9]+$')
  var regForAlpha = new RegExp('^[a-zA-Z\\s]+$')

  /* Change Data */
  var dataReq = {
    nik: req.body.nik,
    nama: req.body.nama,
  }
  console.log('Request to API: ' + conf.url.inqA + ' ' + JSON.stringify(dataReq))

  if (regForNum.test(dataReq.nik) == true && regForAlpha.test(dataReq.nama) == true) {
    var dataRes = {
      'rsp': "000",
      'rspdesc': "Success",
      'noReg' : dataReq.nama.substr(0,3).toUpperCase() + dataReq.nik.substr(0,3),
      'nik': dataReq.nik,
      'nama': dataReq.nama,
      'email': dataReq.nama.replace(/\s/g, "").toLowerCase() + "@gmail.com",
      'status': "Sudah Vaksin Pertama"
    }
  } else if (regForNum.test(dataReq.nik) == false && regForAlpha.test(dataReq.nama) == false) {
    var dataRes = {
      'rsp': "998",
      'rspdesc': "nik or name contains invalid characters",
    }
  } else if (regForNum.test(dataReq.nik) == false) {
    var dataRes = {
      'rsp': "998",
      'rspdesc': "nik contains invalid characters, numerics only",
    }
  } else if (regForAlpha.test(dataReq.nama) == false) {
    var dataRes = {
      'rsp': "998",
      'rspdesc': "name contains invalid characters, letters and spaces only",
    }
  }

  res.send(dataRes)
  console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})

module.exports = router