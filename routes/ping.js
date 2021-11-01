var express = require('express');
var router = express.Router();
var controller = require('../controllers/ping');

router.get('/', controller.ping);

module.exports = router;