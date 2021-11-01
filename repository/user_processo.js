'use-strict';
var models = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');
const Op = models.sequelize.Op;
var cfg = require("../config/config-jwt");
var jwt = require("jwt-simple");

var UserProcessoRepository = {
    save: async (body, response) => {
        return models.user_processo.create({ id_user: body.id_user, id_processo: response.id }).then(retorno => { return retorno });
    },
    // getProcess: async (params) => {
    //     return models.processos.findAll({ where: { id_user: params.usr } }).then(response => { return response });
    // },

    // update: async (body, params) => {
    //     return models.processos.update(body, { whre: { id: params.processo, id_user: params.usr } }).then(response => { return response });
    // },

    // delete: async (params) => {
    //     return models.processos.destroy({ whre: { id: params.id } }).then(response => { return response });
    // }

}

module.exports = UserProcessoRepository;
