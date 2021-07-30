var express = require('express')
var router = express()
var bodyParser = require('body-parser')
//var port = require('./config/config-port.json')

/* router */
var ojt = require('./ojt/app')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* use Function */
router.use('/ojt', ojt)

console.log('The Gateway on port:' + 8080)
router.listen(8080, '0.0.0.0')
