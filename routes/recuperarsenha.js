var express = require('express');
var router = express.Router();
var controller = require('../controllers/recuperarsenha');

router.post('/', controller.recuperar);

module.exports = router;