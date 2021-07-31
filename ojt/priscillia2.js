var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var getIP = require('ipware')().get_ip
var conf = require('./config.json')
var request = require('superagent')
//const { userValidationRules, validate } = require('./priscillia3.js')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

//Check if the field contains numbers
function containsNumbers(_string) {
    let matched1 = _string.match(/\d+/g)
    if (matched1 != null) {
        return true
    } else {
        return false
    }
}

//Check if the field contains letters
function containsLetters(_int) {
    let matched2 = _int.match(/[a-z]/i)
    if (matched2 != null) {
        return true
    } else {
        return false
    }
}

/* Entry Postcards */
router.post('/', function (req, res, next) {
    var ipInfo = getIP(req)
    var clientip = ipInfo.clientIp
    var dataReq = {
        receiverID: req.body.receiverID,
        postcardID: req.body.postcardID
    }

    if (
        containsNumbers(dataReq.receiverID) === false &&
        containsLetters(dataReq.postcardID) === false
    ) {
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
    } else if (
        containsNumbers(dataReq.receiverID) === true &&
        containsLetters(dataReq.postcardID) === true
    ) {
        dataRes = {
            'rsp': "998",
            'rspdesc': "Invalid format"
        }
    } else if (
        containsLetters(dataReq.postcardID) === true
    ){
        dataRes = {
            'rsp': "006",
            'rspdesc': "Invalid Postcard ID",
        }
    } else {
        dataRes = {
            'rsp': "005",
            'rspdesc': "Receiver ID can't contain numbers"
        }
    }

    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})

module.exports = router