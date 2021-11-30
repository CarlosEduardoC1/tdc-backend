'use-strict';
var models = require('../models');

var UsuarioRepository = {

    getMessages: (user, processo) => {
        return models.faq.find({ where: { id_user: user, id_processo: processo }, attributes: ['duvida'] }).then(async (result) => { return result; });
    },

    saveMessage: async (body) => {
        let user = body.id_user;
        let processo = body.id_processo;

        const get = await models.faq.findAndCountAll({ where: { id_user: user, id_processo: processo } }).then(async (result) => { return result; });
        console.log(get['count']);
        if (get['count'] > 0) {
            delete body.id_processo;
            delete body.id_user;
            return models.faq.update(body, { where: { id_user: user, id_processo: processo } }).then(result => { return result });
        }
        else {
            return models.faq.create(body).then(response => { return response });
        }
    }
}

module.exports = UsuarioRepository;
