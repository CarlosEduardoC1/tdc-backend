'use strict';

module.exports = (sequelize, DataTypes) => {
    const ListaNegra = sequelize.define('lista_negra', {
        cpf: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        timestamps: true
    });


    return ListaNegra;
}