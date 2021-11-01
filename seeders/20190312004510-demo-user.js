'use strict';
var repository = require('../repository/usuarios');
const bcrypt = require('bcrypt');
module.exports = {
  up: async(queryInterface, Sequelize) => {
    var retorno =  await repository.saveUser({
      name: "Admin",
      type: "AD",
      email: "admin@mail.com",
      password: "123456",
      lo_pago: 'S'

    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
