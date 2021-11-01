var express = require('express');
var router = express.Router();
var controller = require('../controllers/usuarios');
var auth = require("../middlewares/auth-jwt")();

router.post('/get', auth.authenticate(), controller.find);
router.post('/verificaemail', controller.verificaEmail);
router.post('/update-data/:id', auth.authenticate(), controller.atualizar);
router.delete('/:id', auth.authenticate(), controller.deletar);
router.post('/lista', auth.authenticate(), controller.listarUsuario);
router.post('/', controller.save);
router.get('/get-my/data/:id', auth.authenticate(), controller.getUserData);

module.exports = router;
