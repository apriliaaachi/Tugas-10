var express = require('express')
var router = express()
var bodyParser = require('body-parser')

/* router */
var credential = require('./credential')
var priscilia = require('./priscillia')
var aryo = require('./aryo')
var hana = require('./hana')
var bayu = require('./bayu')
var achi = require('./achi')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* use Function */
router.use('/', credential)
router.use('/priscill', priscilia)
router.use('/aryo', aryo)
router.use('/hana', hana)
router.use('/bayu', bayu)
router.use('/achi', achi)

module.exports = router
