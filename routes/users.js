var express = require('express');
var router = express.Router();
var controller = require('../controllers/usuarios');
var auth = require("../middlewares/auth-jwt")();

router.post('/get',   controller.find);
router.post('/verificaemail', controller.verificaEmail);
router.post('/update-data/:id',   controller.atualizar);
router.delete('/:id',   controller.deletar);
router.post('/lista',   controller.listarUsuario);
router.post('/', controller.save);
router.get('/get-my/data/:id',   controller.getUserData);

module.exports = router;
