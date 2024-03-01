const router = require("express").Router();
const controller = require("../controllers/usersController");

module.exports = [
  {
    url: "/users/register",
    method: "post",
    func: controller.register,
  },
  {
    url: "/users/login",
    method: "post",
    func: controller.login,
  },
];
