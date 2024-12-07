const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  registrationOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Team;