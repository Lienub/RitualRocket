const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

// Définition du modèle Statistics
const Statistics = sequelize.define("Statistics", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  habitCompletionCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastHabitId: {
    type: DataTypes.INTEGER,
  },
  lastCompletedDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Statistics;
