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

//   request
//     .post(conf.url.inqA)
//     .set('id', conf.apikey.id)
//     .set('key', conf.apikey.key)
//     .send(dataReq)
//     .set('Accept', 'application/json')
//     .end((err, resA) => {
//       console.log('Respon From API: ' + JSON.stringify(JSON.parse(resA.text)))
//       if (err) { console.log(err) }
//       try {
//         var parseRes = JSON.parse(resA.text)
//         var dataRes = {
//           'rsp': parseRes.ORSP,
//           'rspdesc': parseRes.ORSPDC,
//           'trxid': req.body.trxid,
//           'account': req.body.account,
//           'nama': parseRes.OSNAME,
//           'status': parseRes.OSTATUS,
//           'statusdesc': parseRes.OSTSDSC
//         }
//       } catch (e) {
//         console.log(e)
//         dataRes = {
//           'rsp': '999',
//           'rspdesc': 'Generally Error. (Timeout)',
//           'trxid': req.body.trxid
//         }
//       }
//       res.send(dataRes)
//       console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
//     })

  var dataRes = {
    "rsp": "000",
    "rspdesc": "Success",
    "gambar": "Pahlawan9",
    "nominal_pecahan": "10000",
    "informasi": {
        "tahun_emisi": "2016",
        "dibuat_oleh": "PERURI",
        "status": "Aktif"
    }
  }

    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})

module.exports = router 
