var express = require('express');
var router = express.Router();
var controller = require('../controllers/files');

router.get('/', controller.get);
router.get('/get-names/:id_user/:id_processo', controller.getByName);
router.post('/delete-files', controller.deleteFile);

module.exports = router;