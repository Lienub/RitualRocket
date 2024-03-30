const router = require("express").Router();
const controller = require("../controllers/timersController");

module.exports = [
  {
    url: "/timers",
    method: "get",
    func: controller.getAllTimers,
  },
  {
    url: "/timers",
    method: "post",
    func: controller.createTimer,
  },
  {
    url: "/timers/user/:userId",
    method: "get",
    func: controller.getTimersByUserId,
  },
  {
    url: "/timers/task/:taskId/user/:userId",
    method: "get",
    func: controller.getTimersByTaskIdUserId,
  },
  {
    url: "/timers/:timerId",
    method: "delete",
    func: controller.deleteTimer,
  },
];
