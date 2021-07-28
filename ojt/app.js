var express = require('express')
var router = express()
var bodyParser = require('body-parser')

/* router */
var credential = require('./credential')
var inqbalance = require('./inqbalance')
var inqcredit = require('./inqtransfer')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* use Function */
router.use('/', credential)
router.use('/inqbalance', inqbalance)
router.use('/inqcredit', inqcredit)

module.exports = router
