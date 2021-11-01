'use strict';

module.exports = (sequelize, DataTypes) => {
    const Faq = sequelize.define('faq', {
        id_processo: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        duvida: DataTypes.JSON
    }, {
        timestamps: true
    });

    Faq.associate = function (models) {
        models.faq.hasMany(
            models.users, {
            foreignKey: "id_user"
            , as: "FaqUsr"
        })

        models.faq.hasMany(
            models.processos, {
            foreignKey: 'id_processo'
            , as: "FaqPrc"
        }
        )
    };

    return Faq;
}