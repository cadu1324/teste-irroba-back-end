'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matches', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      round: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      team1Score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      team2Score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      team1Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      team2Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matches');
  }
};