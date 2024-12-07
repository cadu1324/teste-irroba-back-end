const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Championship = sequelize.define('Championship', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Championship;