'use-strict';
var repository = require('../repository/usuarios');
var models = require('../models');
var log = require('../repository/log');
var fs = require('fs');
const Utils = require('../utils/utils');
const bcrypt = require('bcrypt');

exports.get = async (req, res, next) => {
    var results = await repository.usuarios();
    res.json(results);
}

exports.verificaEmail = async (req, res, next) => {
    models.users.findAll({ where: { email: req.body.email } })
        .then(function (result) {
            if (result && result.length > 0) { res.status(200).json({ possui: true }); }
            else { res.status(200).json({ possui: false }); }
        })
        .catch(() => { res.status(400).json({ msg: "E-mail não encontrado.", status: 400 }); });
}

exports.find = async (req, res, next) => {
    var results = await repository.buscarUsuario(req.body.email);
    if (results) { res.status(200).json(results); }
    else { res.status(400).json({ msg: "Falha ao buscar usuário.", status: 400 }); }
}

exports.save = async (req, res, next) => {
    let image = req.body.dados.profile;
    let id = req.body.img.id;
    let selfie = req.body.img.selfie;
    delete req.body.dados.profile;

    console.log(req.body.dados);

    let retorno = await repository.saveUser(req.body);
    if (retorno) {
        let nome_arquivo1 = retorno.dataValues.id + '_perfil.txt';
        let nome_arquivo2 = retorno.dataValues.id + '_id.txt';
        let nome_arquivo3 = retorno.dataValues.id + '_selfie.txt';

        let caminho = "usuarios/imagens/";
        if (!fs.existsSync(caminho)) {
            fs.mkdirSync(caminho, 0766, function (err) { if (err) { return ({ msg: "ERROR! Can't make the directory! \n" }); } });
        }

        if (image !== null) {
            fs.writeFile(caminho + '/' + nome_arquivo1, image, function (err) { if (err) throw err });
            await models.users.update({ profile: nome_arquivo1 }, { where: { id: retorno.dataValues.id } });
        }
        if (id !== null) { fs.writeFile(caminho + '/' + nome_arquivo2, id, function (err) { if (err) throw err }); }
        if (selfie !== null) { fs.writeFile(caminho + '/' + nome_arquivo3, selfie, function (err) { if (err) throw err }); }

        await models.img_identificacao.create({ id_user: retorno.dataValues.id, img_identidade: nome_arquivo2, img_selfie: nome_arquivo3 });

        // await Utils.enviaConfirmacao(req.body.dados.email);
        res.status(200).json(retorno);
    }
    else {
        res.status(400).json({ msg: "Ocorreu um erro!" });
    }

}

exports.getUserData = async (req, res, next) => {
    await models.users.find({ where: { id: req.params.id } })
        .then(async (result) => {
            const processo = await models.processos.findAndCountAll({
                include: [{
                    model: models.users, as: "PrcUsr", through: { attributes: [] },
                    where: { id: req.params.id },
                }]
            }).then(response => { return response });
            delete processo.rows;
            let caminho = "usuarios/imagens/" + req.params.id + "_perfil.txt";
            await fs.readFile(caminho, 'utf8', (err, data) => {
                if (err) {
                    res.status(200).json({ result, processo });
                } else {
                    result.profile = data;
                    res.status(200).json({ result, processo });
                }
            });

        })
        .catch((error) => { console.log(error); res.status(400).json({ msg: "Erro ao buscar dados" }) });


}

exports.getUserInfo = async (req, res, next) => {
    await models.users.findOne({ where: { id: req.params.id } })
        .then(async (result) => {

            let caminho = "usuarios/imagens/" + req.params.id + "_perfil.txt";
            let caminho2 = "usuarios/imagens/" + req.params.id + "_id.txt";
            let caminho3 = "usuarios/imagens/" + req.params.id + "_selfie.txt";

            await fs.readFile(caminho, 'utf8', async (err, data_profile) => {
                if (err) {
                    console.log(caminho);
                    res.status(200).json({ result });
                } else {
                    await fs.readFile(caminho2, 'utf8', async (err, data_id) => {
                        if (err) {
                            res.status(200).json({ result });
                        } else {
                            await fs.readFile(caminho3, 'utf8', async (err, data_selfie) => {
                                if (err) {
                                    console.log("IF");
                                    res.status(200).json({ result });
                                } else {
                                    result.profile = data_profile;
                                    result.id_user = data_id;
                                    res.status(200).json({ result, data_selfie });
                                }
                            });
                        }
                    });
                }
            });

        })
        .catch((error) => { console.log(error); res.status(400).json({ msg: "Erro ao buscar dados" }) });


}


exports.atualizar = async (req, res, next) => {
    let image = req.body.profile;
    let nome_arquivo1 = req.params.id + '_perfil.txt';
    // delete req.body.profile;

    const caminho = "usuarios/imagens/" + req.params.id + "_perfil.txt";
    if (fs.existsSync(caminho)) {
        fs.rmSync(caminho);
    }
    fs.writeFile("usuarios/imagens/" + nome_arquivo1, image, function (err) { if (err) throw err });

    req.body.profile = nome_arquivo1;

    delete req.body.password;

    if (req.body.atualizaSenha === true) {
        req.body.password = bcrypt.hashSync(body.dados.password, 10);
    }

    await models.users.update(req.body, { where: { id: req.params.id } })
        .then((response) => {
            console.log(response);
            res.status(200).json({ msg: "Atualizado com sucesso!" });
        })
        .catch(err => res.status(400).json({ msg: "Erro ao atualizar dados" }));


}

exports.deletar = async (req, res, next) => {

    const verificaUser = await models.users.findAndCountAll({ where: { id: req.params.id } });
    if (verificaUser.count > 0) {
        const caminho = "usuarios/imagens/";
        const arq_1 = req.params.id + "_perfil.txt";
        const arq_2 = req.params.id + "_id.txt";
        const arq_3 = req.params.id + "_selfie.txt";

        if (fs.existsSync(caminho + "/" + arq_1)) { fs.rmSync(caminho + "/" + arq_1); }
        if (fs.existsSync(caminho + "/" + arq_2)) { fs.rmSync(caminho + "/" + arq_2); }
        if (fs.existsSync(caminho + "/" + arq_3)) { fs.rmSync(caminho + "/" + arq_3); }

        models.users.destroy({ where: { id: req.params.id } })
            .then(() => { res.status(200).json({ msg: "deletado com sucesso.", status: 200 }); })
            .catch(() => { res.status(400).json({ msg: "não deletado.", status: 400 }); });
    }
    else { res.status(400).json({ msg: "Erro: !usuário não encontrado.", status: 400 }); }
}

exports.listarUsuario = async (req, res, next) => {

    var results = await repository.listar(req.body, req.headers);
    if (results) {
        // log.writeNEmpresas(req.headers, "Listou os usuário", "Usuários listados com sucesso");
        res.status(200).json(results);
    }
    else {
        // log.writeNEmpresas(req.headers, "Listou os usuário", "Erro ao listar usuários");
        res.status(400).json({ msg: "Falha ao buscar usuário.", status: 400 });
    }
}