'use-strict';
var repository = require('../repository/faq');
const fs = require('fs');
const path = require('path');

exports.get = async (req, res, next) => {
    const directoryPath = path.join(__dirname, 'files');
    let arrayRetorno = [];
    let response = undefined;

    await fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            const content = fs.readFileSync(path.join(__dirname, `files/${file}`), { encoding: 'base64' });
            arrayRetorno.push({ file: content });

        });

        console.log(arrayRetorno);

        res.status(200).json(arrayRetorno);
    });

}

exports.getByName = async (req, res, next) => {
    let arrayRetorno = [];

    await fs.readdir('usuarios/processos', function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            if (file.includes(req.params.id_processo + "_" + req.params.id_user)) {
                console.log()
                arrayRetorno.push({ name: file });
            }


        });
        res.status(200).json(arrayRetorno);
    });
}


exports.deleteFile = async (req, res, next) => {

    console.log(req.body);

    await fs.readdir('usuarios/processos', function (err, files) {
        //handling error
        if (err) {
            console.log(err);
            return res.status(400).json({ msg: "Ocorreu um erro!" });
        }
        files.forEach(function (file) {
            if (file.includes(req.body.name)) {
                console.log(file);
                fs.unlinkSync('usuarios/processos/' + file);
            }

        });
    });

    res.status(200).json({ msg: "Processo deletado com sucesso", status: 200 })
}