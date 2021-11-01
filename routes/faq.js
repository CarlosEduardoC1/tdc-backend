var express = require('express');
var router = express.Router();
var controller = require('../controllers/faq');
var auth = require("../middlewares/auth-jwt")();

router.get('/get-messages/:user/:processo', auth.authenticate(), controller.get);
router.post('/set-message', auth.authenticate(), controller.save);


module.exports = router;
