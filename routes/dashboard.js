var express = require('express');
var router = express.Router();
var controller = require('../controllers/dashboard');

router.get('/process',   controller.getProcess);
router.get('/userapp', controller.getUserApp);
router.get('/usersystem', controller.getUserSystem);

module.exports = router;
