const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const User = sequelize.define('User', {
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
    type: DataTypes.TEXT
  },
});

User.associate = (db) => {
  User.hasMany(db.Task);
  User.hasMany(db.Category);
  User.hasMany(db.Habit);
};

module.exports = User;
