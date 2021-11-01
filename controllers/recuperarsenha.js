'use-strict';
var models = require('../models');
var users = require("../repository/usuarios");
var crypto = require('crypto');
var utils = require('../utils/utils');
var layoutEmail = require('../utils/layoutEmail');
const bcrypt = require('bcrypt');

exports.recuperar = async (req, res, next) => {
    var user = await users.pesquisarUsuarioSemImagem(req.body);
    if (user) {
        var md5sum = crypto.createHash('md5');
        md5sum.update(new Date().toString());
        let senha = md5sum.digest('hex').toString();
        user.password = senha;
        await models.users.update({ password: bcrypt.hashSync(senha, 10) }, { where: { id: user.id } }).then(function (result) { return result; });
        utils.enviarEmailCliente('Recuperar Senha | Gerente WP - Ferramenta para Gerenciar seu estacionamento', layoutEmail(senha), user.email);
        return res.status(200).json({ sit: 0, msg: 'E-mail enviado! Verifique sua caixa de entrada.' });
    } else { return res.status(200).json({ sit: 1, msg: 'E-mail não encontrado. Verifique a ortografia!' }); }
}