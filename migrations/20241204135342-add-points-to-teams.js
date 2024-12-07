'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Teams', 'points', {
      type: Sequelize.INTEGER,
      defaultValue: 0, 
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Teams', 'points');
  },
};