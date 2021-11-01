var express = require('express');
var router = express.Router();
var controller = require('../controllers/viacepController');
var auth = require("../middlewares/auth-jwt")();

router.post('/', controller.buscarcepjson);

module.exports = router;
