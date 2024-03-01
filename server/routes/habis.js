const router = require("express").Router();
const controller = require("../controllers/habitController");

module.exports = [
  {
    url: "/habits",
    method: "get",
    func: controller.getAllHabits,
  },
  {
    url: "/habits",
    method: "post",
    func: controller.createHabit,
  },
  {
    url: "/habits/:userId",
    method: "post",
    func: controller.createHabitByUserId,
  },
  {
    url: "/habits/:userId",
    method: "get",
    func: controller.getAllHabitsByUserId,
  },
  {
    url: "/habits/:habitId",
    method: "delete",
    func: controller.removeHabitById,
  },
  {
    url: "/habits/:habitId",
    method: "put",
    func: controller.updateHabitById,
  },
];
