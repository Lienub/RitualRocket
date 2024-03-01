const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  googleId: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = Users;
