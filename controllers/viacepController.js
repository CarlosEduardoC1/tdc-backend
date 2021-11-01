'use-strict';
var repository = require('../repository/utils');
var models = require('../models');
var fs = require('fs');

exports.buscarcepjson = async (req, res, next) => {
    text = req.body.cep.replace(/(\d{2})?(\d{3})?(\d{3})/, "$1.$2-$3");
    text = text.toString().replace(/\D/g, '');
    console.log(req.body.cep);
    console.log(text);


    let results = await repository.viacep(text);
    if (results.type === 200) { res.status(200).json(results); }
    else { res.status(400).json({ msg: "Falha ao buscar cep.", status: 400 }); }
}




