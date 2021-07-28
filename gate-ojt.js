var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var port = require('./config/config-port.json')

/* router */


/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* use Function */


console.log('The Gateway on port:' + port.gateway)
router.listen(port.gateway, '0.0.0.0')
