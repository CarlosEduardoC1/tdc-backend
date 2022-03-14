var express = require('express');
var router = express.Router();
var controller = require('../controllers/processos');
var auth = require("../middlewares/auth-jwt")();

router.post('/create/process',   controller.create);
router.get('/get/:usr',   controller.getUsr);
router.post('/get/',   controller.getFrontProcess);
router.put('/update/process',   controller.updateProcess);
// router.put('/atualiza',   controller.atualizar);
router.delete('/drop-process/:id/:id_user',   controller.deletar);
router.post('/update-process-file',  controller.fileUpdate);
// router.post('/lista',   controller.listarUsuario);
// router.post('/',   controller.save);

module.exports = router;
