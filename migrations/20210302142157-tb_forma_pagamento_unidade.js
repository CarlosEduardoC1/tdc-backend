'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_forma_pagamento_unidade',{
      id_unidade: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_unidades',
          key: 'id'
        },
        allowNull: false
      },
      id_forma_pagamento: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_forma_pagamento',
          key: 'id'
        },
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tb_forma_pagamento_unidade', null, {});
  }
};
