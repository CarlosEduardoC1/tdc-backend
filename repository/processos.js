'use-strict';
var models = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');
const Op = models.sequelize.Op;
var cfg = require("../config/config-jwt");
var jwt = require("jwt-simple");

var ProcessosRepository = {
    save: async (body) => {
        return models.processos.create(body).then(retorno => { return retorno });
    },
    getProcess: async (params) => {
        return models.processos.findAll({ include: [{
            model: models.users, as: "PrcUsr", where: { id: params.usr }
        }] }).then(response => { return response });
    },

    update: async (body, params) => {
        return models.processos.update(body, { whre: { id: params.processo, id_user: params.usr } }).then(response => { return response });
    },

    delete: async (params) => {
        return models.processos.destroy({ whre: { id: params.id } }).then(response => { return response });
    }

}

module.exports = ProcessosRepository;
