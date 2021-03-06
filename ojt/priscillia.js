var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var getIP = require('ipware')().get_ip
var conf = require('./config.json')
var request = require('superagent')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* Entry Postcards */
router.post('/', function (req, res, next) {
    /* Get IP first */
    var ipInfo = getIP(req)
    var clientip = ipInfo.clientIp
    /* BELOW ARE BODY REQUEST */
    var dataReq = {
        receiverID: req.body.receiverID,
        postcardID: req.body.postcardID
    }

    var dataRes = {
        'rsp': "000",
        'rspdesc': "Success",
        'receiverID': dataReq.receiverID,
        'postcardID': dataReq.postcardID,
        'country-origin': "USA",
        'sender': "Carlos",
        'sex': "male",
        'birthday': "23/12/1966"
    }

    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})

module.exports = router