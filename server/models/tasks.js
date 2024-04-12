const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Task = sequelize.define("Task", {
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
    allowNull: true,
    type: DataTypes.STRING,
  },
  iconType: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  color: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  repeat: {
    allowNull: true,
    type: DataTypes.ENUM("none", "daily", "weekly", "monthly"),
  },
  repeatDays: {
    allowNull: true,
    type: DataTypes.STRING, // Ex: "monday,tuesday,wednesday"
  },
  repeatWeeks: {
    allowNull: true,
    type: DataTypes.STRING, // Ex: "1,2,3,4,5,6"
  },
  repeatMonths: {
    allowNull: true,
    type: DataTypes.STRING, // Ex: "1,14,31,15"
  },
  startDate: {
    allowNull: false,
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  endDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  is_completed: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  completedDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  rappelTime: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  goalTimeByDay: {
    allowNull: true,
    defaultValue: 0,
    type: DataTypes.BIGINT,
  },
  totalTime: {
    allowNull: true,
    defaultValue: 0,
    type: DataTypes.BIGINT,
  },
});

Task.associate = (db) => {
  Task.belongsTo(db.Habit);
  Task.belongsTo(db.User);
  Task.belongsTo(db.Category);
}

module.exports = Task;
