var express = require('express')
var router = express()
var bodyParser = require('body-parser')

/* router */
var credential = require('./credential')
/* tugas 1 */
var priscillia = require('./priscillia')
var aryo = require('./aryo')
var hana = require('./hana')
var bayu = require('./bayu')
var achi = require('./achi')
/* tugas 2 */
var priscillia2 = require('./priscillia2')
var aryo2 = require('./aryo2')
var hana2 = require('./hana2')
var bayu2 = require('./bayu2')
var achi2 = require('./achi2')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* use Function */
router.use('/', credential)
/* tugas 1 */
router.use('/priscillia', priscillia)
router.use('/aryo', aryo)
router.use('/hana', hana)
router.use('/bayu', bayu)
router.use('/achi', achi)
/* tugas 2 */
router.use('/priscillia2', priscillia2)
router.use('/aryo2', aryo2)
router.use('/hana2', hana2)
router.use('/bayu2', bayu2)
router.use('/achi2', achi2)

module.exports = router
