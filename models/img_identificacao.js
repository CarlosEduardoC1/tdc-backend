'use strict';

module.exports = (sequelize, DataTypes) => {
    const ImgIdentificacao = sequelize.define('img_identificacao', {
        id_user: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        img_identidade: DataTypes.STRING,
        img_selfie: DataTypes.STRING
    }, {
        timestamps: true
    });

    ImgIdentificacao.associate = function (models) {
        models.img_identificacao.hasMany(
            models.users, {
            foreignKey: "id_user"
            , as: "ImgUsr"
        })
    };

    return ImgIdentificacao;
}