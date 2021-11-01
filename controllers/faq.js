'use-strict';
var repository = require('../repository/faq');

exports.get = async (req, res, next) => {
    var results = await repository.getMessages(req.params.user, req.params.processo);
    res.json(results);
}

exports.save = async (req, res, next) => {
    var result = await repository.saveMessage(req.body);
    res.json(result);
}