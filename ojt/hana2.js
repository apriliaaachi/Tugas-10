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

  var regexalphabet = /[a-zA-Z]/;
  var regexnumber =/[0-9]/;
  var regexcharacter = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/

  if (dataReq.jenis.match(regexnumber)!= null || dataReq.jenis.match(regexcharacter)!= null){
    var dataRes={
    'rsp' : '997',
    'rspdesc' : 'Invalid Format. Allow only alphabet input'
    } 
  }

  if (dataReq.tahun.match(regexalphabet)!= null || dataReq.tahun.match(regexcharacter)!= null){
  var dataRes={
  'rsp' : '997',
  'rspdesc' : 'Invalid Format. Allow only numeric input'
    }  
  }

  else if (dataReq.jenis.match(regexnumber)== null && dataReq.tahun.match(regexalphabet)==null 
  && dataReq.jenis.match(regexcharacter)== null && dataReq.tahun.match(regexcharacter)== null ){
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