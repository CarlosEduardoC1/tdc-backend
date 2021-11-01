'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nascimento: DataTypes.DATE,
    lo_pago: DataTypes.STRING,
    fone: DataTypes.STRING,
    cpf: DataTypes.STRING,
    cep: DataTypes.STRING,
    endereco: DataTypes.STRING,
    type: DataTypes.STRING,
    appID: DataTypes.STRING,
    profile: DataTypes.STRING
  }, {
    timestamps: true
  });

  Users.associate = function (models) {
    models.users.belongsToMany(models.processos, {
      foreignKey: "id_user"
      , through: "user_processo"
      , otherKey: "id_processo"
      , as: "UsrPrc"
      , timestamps: false
    });

    models.users.belongsTo(models.img_identificacao, {
      foreignKey: "id_user"
      , as: "UsrImg"
      , timestamps: false
    });

    models.users.belongsTo(models.faq, {
      foreignKey: "id_user"
      , as: "UsrFaq"
      , timestamps: false
    });

  };


  return Users;
}