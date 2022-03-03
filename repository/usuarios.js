'use-strict';
var models = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');
const Op = models.sequelize.Op;

var UsuarioRepository = {

    usuarios: () => {
        return models.users.find({ order: [['id', 'ASC']], attributes: { exclude: ['password'] } }).then(async (result) => { return result; });
    },

    buscarUsuario: (email) => {
        return models.users.find({ where: { email: email } }, { attributes: { exclude: ['password'] } }).then(async (result) => { return result; });
    },

    listar: async (body, headers) => {
        console.log(body);
        const { cpf, type } = body
        const where = {};
        if (cpf) where.cpf = { [Op.like]: `%${cpf}%` };
        if (type) where.type = type;


        return models.users.findAndCountAll({
            attributes: { exclude: ['password'] },
            // limit: limit,
            // offset: offset,
            where
        }).then(async (result) => { return result; })
    },

    saveUser: (body) => {
        console.log(body);
        body.dados.password = bcrypt.hashSync(body.dados.password, 10);
        return models.users.create(body.dados).then(function (result) { return result; });
    },

    atualizaUsuario: (body) => {
        if (body.password != null && body.password.length > 0) { body.password = bcrypt.hashSync(body.password, 10); }
        return models.users.update(body, { where: { id: body.id } }).then(function (result) { return result; });
    },

    pesquisarUsuario: (body) => {
        return models.users.findOne({ where: { email: body.email } }).then(function (result) {
            if (result != null && result != undefined && result.image != null && result.image.length > 0) {
                let caminho = "public/fotos-usuarios/" + result.id;
                if (fs.existsSync(caminho + '/' + result.image)) {
                    let imagem = fs.readFileSync(caminho + '/' + result.image, (err, data) => {
                        if (err) { }
                        return data;
                    });
                    result.image = imagem.toString();
                }
            }
            return result;
        });
    },

    pesquisarUsuarioSemImagem: (body) => {
        return models.users.findOne({ where: { email: body.email } }).then(function (result) { return result; });
    },

    getImageUser: (caminho) => {
        return fs.readFileSync(caminho, (err, data) => {
            if (err) { }
            return data;
        });
    }

}

module.exports = UsuarioRepository;
