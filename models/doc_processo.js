'use strict';

module.exports = (sequelize, DataTypes) => {
    const Documentos = sequelize.define('doc_processo', {
        id_processo: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        comprovante_residencia: DataTypes.STRING,
        comprobatorios: DataTypes.STRING,
        outros: DataTypes.STRING,
    }, {
        timestamps: true
    });
    Documentos.associate = function (models) {
        models.doc_processo.hasMany(
            models.processos, {
            foreignKey: "id_processo"
            , as: "DocPrc"
        })
    };

    return Documentos;
}