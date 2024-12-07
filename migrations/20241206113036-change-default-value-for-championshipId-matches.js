'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Matches', 'championshipId', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Matches', 'championshipId', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false
    });
  },
};