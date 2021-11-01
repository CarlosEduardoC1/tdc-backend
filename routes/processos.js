var express = require('express');
var router = express.Router();
var controller = require('../controllers/processos');
var auth = require("../middlewares/auth-jwt")();

router.post('/create/process', auth.authenticate(), controller.create);
router.get('/get/:usr', auth.authenticate(), controller.getUsr);
router.put('/update/process/:processo/:usr', auth.authenticate(), controller.updateProcess);
// router.put('/atualiza', auth.authenticate(), controller.atualizar);
router.delete('/drop-process/:id', auth.authenticate(), controller.deletar);
router.post('/upload-process-file',  controller.fileUpload);
// router.post('/lista', auth.authenticate(), controller.listarUsuario);
// router.post('/', auth.authenticate(), controller.save);

module.exports = router;
