const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");
const Task = require("./tasks");

const Timer = sequelize.define("Timer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  taskId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  durationSeconds: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
});

module.exports = Timer;
