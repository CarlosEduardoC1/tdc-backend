'use-strict';
var cfg = require("../config/config-jwt");
var jwt = require("jwt-simple");
var logger = require('../utils/logfile');
var models = require('../models');
const Op = models.sequelize.Op;
const moment = require('moment');

var loggs = {
    write: async (headers, id, empresa, acao, status, key) => {

        var tokens = headers.authorization.slice(7);
        var tokenDecoded = jwt.decode(tokens, cfg.jwtSecret);
        
        if (key) {
            const emp = await models.tb_empresas.find({ where: { id: id } });
            
            logger.create(id);
            logger.create(id).info({
                "Empresa": emp.dataValues.tx_razao_social,
                "user_id": tokenDecoded.id,
                "empr_id": id,
                "name": tokenDecoded.name,
                "acao": acao,
                "status": status,
                "data": moment().format("DD/MM/YYYY"),
                "hora": moment().format("HH:mm"),
                "segundos": moment().format("ss")
            });
        }
        else {
            logger.create(id);
            logger.create(id).info({
                "Empresa": empresa,
                "user_id": tokenDecoded.id,
                "empr_id": id,
                "name": tokenDecoded.name,
                "acao": acao,
                "status": status,
                "data": moment().format("DD/MM/YYYY"),
                "hora": moment().format("HH:mm"),
                "segundos": moment().format("ss")
            });

        }
    },

    writeNEmpresas: async (headers, acao, status) => {

        var tokens = headers.authorization.slice(7);
        var tokenDecoded = jwt.decode(tokens, cfg.jwtSecret);

        tokenDecoded.minhas_empresas.forEach(element => {
            logger.create(element).info({
                "Empresa": 'Todas',
                "user_id": tokenDecoded.id,
                "empr_id": element,
                "name": tokenDecoded.name,
                "acao": acao,
                "status": status,
                "data": moment().format("DD/MM/YYYY"),
                "hora": moment().format("HH:mm"),
                "segundos": moment().format("ss")
            });
        });
    },

    vinculationContaUnidade: async (headers, id_conta, id_unidade, acao, status) => {

        var tokens = headers.authorization.slice(7);
        var tokenDecoded = jwt.decode(tokens, cfg.jwtSecret);

        const unids = await models.tb_unidades.find({ where: { id: id_unidade } });

        const emp = await models.tb_empresas.find({ where: { id: unids.dataValues.id_empresa } });

        logger.create(unids.dataValues.id_empresa).info({
            "Empresa": emp.dataValues.tx_razao_social,
            "user_id": tokenDecoded.id,
            "empr_id": unids.dataValues.id_empresa,
            "name": tokenDecoded.name,
            "acao": acao,
            "status": status,
            "data": moment().format("DD/MM/YYYY"),
            "hora": moment().format("HH:mm"),
            "segundos": moment().format("ss")
        });
    },

    vinculationFormaUnidade: async (headers, id_forma, id_unidade, acao, status) => {

        var tokens = headers.authorization.slice(7);
        var tokenDecoded = jwt.decode(tokens, cfg.jwtSecret);

        const unids = await models.tb_unidades.find({ where: { id: id_unidade } });

        const emp = await models.tb_empresas.find({ where: { id: unids.dataValues.id_empresa } });

        logger.create(unids.dataValues.id_empresa).info({
            "Empresa": emp.dataValues.tx_razao_social,
            "user_id": tokenDecoded.id,
            "empr_id": unids.dataValues.id_empresa,
            "name": tokenDecoded.name,
            "acao": acao,
            "status": status,
            "data": moment().format("DD/MM/YYYY"),
            "hora": moment().format("HH:mm"),
            "segundos": moment().format("ss")
        });
    },

    vinculationContaEmpresa: async (headers, id_empresa, acao, status) => {

        var tokens = headers.authorization.slice(7);
        var tokenDecoded = jwt.decode(tokens, cfg.jwtSecret);

        const emp = await models.tb_empresas.find({ where: { id: id_empresa } });
        logger.create(id_empresa).info({
            "Empresa": emp.dataValues.tx_razao_social,
            "user_id": tokenDecoded.id,
            "empr_id": id_empresa,
            "name": tokenDecoded.name,
            "acao": acao,
            "status": status,
            "data": moment().format("DD/MM/YYYY"),
            "hora": moment().format("HH:mm"),
            "segundos": moment().format("ss")
        });
    },

    vinculationVeiculoCliente: async (headers, id_cliente, acao, status) => {

        var tokens = headers.authorization.slice(7);
        var tokenDecoded = jwt.decode(tokens, cfg.jwtSecret);

        const emp = await models.tb_clientes.find({ where: { id: id_cliente }, attibutes: ['id_empresa'] });

        const razao = await models.tb_empresas.find({ where: { id: emp.dataValues.id_empresa } });

        logger.create(emp.dataValues.id_empresa).info({
            "Empresa": razao.dataValues.tx_razao_social,
            "user_id": tokenDecoded.id,
            "empr_id": emp.dataValues.id_empresa,
            "name": tokenDecoded.name,
            "acao": acao,
            "status": status,
            "data": moment().format("DD/MM/YYYY"),
            "hora": moment().format("HH:mm"),
            "segundos": moment().format("ss")
        });
    },

    vinculationUserEmp: async (headers, id, acao, status) => {

        var tokens = headers.authorization.slice(7);
        var tokenDecoded = jwt.decode(tokens, cfg.jwtSecret);

        const emp = await models.tb_empresas.find({ where: { id: id } });

        logger.create(id).info({
            "Empresa": emp.dataValues.tx_razao_social,
            "user_id": tokenDecoded.id,
            "empr_id": id,
            "name": tokenDecoded.name,
            "acao": acao,
            "status": status,
            "data": moment().format("DD/MM/YYYY"),
            "hora": moment().format("HH:mm"),
            "segundos": moment().format("ss")
        });
    },

    remessaBoleto: async (headers, boleto, acao, status) => {

        var tokens = headers.authorization.slice(7);
        var tokenDecoded = jwt.decode(tokens, cfg.jwtSecret);
        var array = [];

        const empresa = await models.tb_boleto.findAll({ where: { id: { [Op.in]: boleto } }, attributes: ['id_empresa'] });
        const txrazao = await models.tb_empresas.find({ Where: { id: { [Op.in]: empresa } }, attibutes: ['tx_razao_social'] });

        empresa.forEach(element => {
            array.push(element.dataValues.id_empresa);
        });

        let arrayEmpresas = array.filter((este, i) => {
            return array.indexOf(este) === i;
        });

        arrayEmpresas.forEach(element => {
            logger.create(element).info({
                "Empresa": txrazao.tx_razao_social,
                "user_id": tokenDecoded.id,
                "empr_id": element,
                "name": tokenDecoded.name,
                "acao": acao,
                "status": status,
                "data": moment().format("DD/MM/YYYY"),
                "hora": moment().format("HH:mm"),
                "segundos": moment().format("ss")
            });
        });
    },

    retornoBoleto: async (headers, conta, acao, status) => {

        var tokens = headers.authorization.slice(7);
        var tokenDecoded = jwt.decode(tokens, cfg.jwtSecret);

        const idemp = await models.tb_conta_bancaria.find({ where: { id: conta } });
        const emp = await models.tb_empresas.find({ where: { id: idemp.dataValues.id_empresa } });
        
        logger.create(idemp.dataValues.id_empresa).info({
            "Empresa": emp.dataValues.tx_razao_social,
            "user_id": tokenDecoded.id,
            "empr_id": idemp.dataValues.id_empresa,
            "name": tokenDecoded.name,
            "acao": acao,
            "status": status,
            "data": moment().format("DD/MM/YYYY"),
            "hora": moment().format("HH:mm"),
            "segundos": moment().format("ss")
        });


    }
}

module.exports = loggs;
