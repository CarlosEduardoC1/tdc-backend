'use strict';

module.exports = (sequelize, DataTypes) => {
    const Processos = sequelize.define('processos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        face_reclamacao: DataTypes.STRING,
        servico_reclamado: DataTypes.STRING,
        circunstancia: DataTypes.STRING,
        pedido: DataTypes.STRING,
        info_adicionais: DataTypes.STRING,
        dano_pretendido: DataTypes.STRING,
        status: DataTypes.STRING,
        numProcesso: DataTypes.STRING
    }, {
        timestamps: true
    });

    Processos.associate = function (models) {
        models.processos.belongsToMany(models.users, {
            foreignKey: "id_processo"
            , through: "user_processo"
            , otherKey: "id_user"
            , as: "PrcUsr"
            , timestamps: false
        });

        models.processos.belongsTo(models.doc_processo, {
            foreignKey: "id_processo"
            , as: "PrcDoc"
            , timestamps: false
        });

        models.processos.belongsTo(models.faq, {
            foreignKey: 'id_processo'
            , as: "PrcFaq"
            , timestamps: false
        })
    };

    return Processos;
}