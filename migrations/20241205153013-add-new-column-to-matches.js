'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Matches',
      'championshipId',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Matches', 'championshipId');
  },
};