'use strict';

module.exports = (sequelize, DataTypes) => {
    const UserProcesso = sequelize.define('user_processo', {
        id_user: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        id_processo: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    }, {
        timestamps: false
    });


    return UserProcesso;
}