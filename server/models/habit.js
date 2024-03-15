const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Habit = sequelize.define('Habit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
});

Habit.associate = (db) => {
  Habit.belongsToMany(db.Category, { through: 'HabitCategory' });
};

module.exports = Habit;
