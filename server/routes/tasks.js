const router = require("express").Router();
const controller = require("../controllers/taskController");

module.exports = [
  {
    url: "/tasks",
    method: "get",
    func: controller.getAllTasks,
  },
  {
    url: "/tasks",
    method: "post",
    func: controller.createTask,
  },
  {
    url: "/tasks/:userId",
    method: "get",
    func: controller.getTasksByUserId,
  },
  {
    url: "/tasks/:id",
    method: "get",
    func: controller.getTaskById,
  },
  {
    url: "/tasks/:id",
    method: "delete",
    func: controller.deleteTask,
  },
  {
    url: "/tasks/:id",
    method: "put",
    func: controller.updateTask,
  },
];
