const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Match = sequelize.define('Match', {
  round: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  team1Score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  team2Score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  team1Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  team2Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  championshipId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'Matches',  
});

module.exports = Match;