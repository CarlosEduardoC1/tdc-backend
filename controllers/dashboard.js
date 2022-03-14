'use-strict';

var models = require('../models');


exports.getProcess = async (req, res, next) => {
    await models.processos.findAndCountAll().then(response => res.status(200).json(response))
        .catch(error => res.status(400).json(error))
}

exports.getUserApp = async (req, res, next) => {
    await models.users.findAndCountAll({ where: { type: 'US' } }).then(response => res.status(200).json(response))
        .catch(error => res.status(400).json(error))

}

exports.getUserSystem = async (req, res, next) => {
    await models.users.findAndCountAll({ where: { type: 'AD' } }).then(response => res.status(200).json(response))
        .catch(error => res.status(400).json(error))

}