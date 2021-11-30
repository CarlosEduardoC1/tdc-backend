'use-strict';
var repository = require('../repository/processos');
var repositoryNUserProcesso = require('../repository/user_processo');
var models = require('../models');
var log = require('../repository/log');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');
const path = require('path');

exports.create = async (req, res, next) => {
    let files = req.body.files;
    let names = req.body.names;

    const response = await repository.save(req.body);
    result = await repositoryNUserProcesso.save(req.body, response);

    if (response && result) {

        let caminho = "usuarios/processos/";
        files.forEach((element, index) => {
            let nome_arquivo = response.dataValues.id + "_" + req.body.id_user + '_' + names[index] + '.txt';
            if (!fs.existsSync(caminho)) {
                fs.mkdirSync(caminho, 0766, function (err) { if (err) { return ({ msg: "ERROR! Can't make the directory! \n" }); } });
            }

            if (element !== null) {
                fs.writeFile(caminho + '/' + nome_arquivo, element, function (err) { if (err) throw err });
            }
        });

        res.status(200).json(response);
    }
    else {
        res.status(400).json({ msg: "Ocorreu um erro!" });
    }
}

exports.getUsr = async (req, res, next) => {
    const response = await repository.getProcess(req.params);
    response ? res.status(200).json(response) : res.status(400).json({ msg: "Não foi possivel encontrar o processo", status: 400 });
}

exports.updateProcess = async (req, res, next) => {
    const response = await repository.update(req.body);
    response ? res.status(200).json({ msg: "Processo atualizado com sucesso", status: 200 }) : res.status(400).json({ msg: "Não foi possivel atualizar processo", status: 400 });
}


exports.deletar = async (req, res, next) => {
    const response = await repository.delete(req.params);
    const directoryPath = path.join(__dirname, 'usuarios/processos');

    if (response) {

        await fs.readdir('usuarios/processos', function (err, files) {
            //handling error
            if (err) {
                console.log(err);
                return res.status(400).json({ msg: "Ocorreu um erro!" });
            }
            files.forEach(function (file) {
                if (file.includes(req.params.id + "_" + req.params.id_user)) {
                    fs.unlinkSync('usuarios/processos/' + file);
                }

            });
        });

        res.status(200).json({ msg: "Processo deletado com sucesso", status: 200 })
    } else {
        res.status(400).json({ msg: "Ocorreu um erro!" });
    }

}

exports.fileUpdate = async (req, res, next) => {
    let files = req.body.files;
    let names = req.body.names;
    let caminho = "usuarios/processos/";


    files.forEach((element, index) => {
        let nome_arquivo = req.body.id_processo + "_" + req.body.id_user + '_' + names[index] + '.txt';
        if (!fs.existsSync(caminho)) {
            fs.mkdirSync(caminho, 0766, function (err) { if (err) { return ({ msg: "ERROR! Can't make the directory! \n" }); } });
        }

        if (element !== null) {
            fs.writeFile(caminho + '/' + nome_arquivo, element, function (err) { if (err) throw err });
        }
    });

    res.status(200).json({ msg: "ok" });

}

