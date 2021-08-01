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
    jenis: req.body.jenis,
    tahun: req.body.tahun
  }
  console.log('Request to API: ' + conf.url.inqA + ' ' + JSON.stringify(dataReq))

  const regexfornum =/^[0-9]+$/;
  const regexforalp = /^[a-zA-Z]+$/;

  if (dataReq.jenis.match(regexfornum)!= null){
    var dataRes={
    'rsp' : '997',
    'rspdesc' : 'Invalid Format. Inputted jenis must be string'
    } 
  }

  if (dataReq.tahun.match(regexforalp)!= null){
  var dataRes={
  'rsp' : '997',
  'rspdesc' : 'Invalid Format. Inputted tahun must be number'
    }  
  }

  else if (dataReq.jenis.match(regexfornum)== null && dataReq.tahun.match(regexforalp)==null){
  var dataRes={
  'rsp': "000",
  'rspdesc': "Success",
  'jenis': dataReq.jenis,
  'tahun': dataReq.tahun,
  'merk': "toyota",
  'model': "toyota camry",
  'harga': "581",
  'mesin': "2,5 L"
  }
}
    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})

module.exports = router