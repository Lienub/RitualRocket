const router = require("express").Router();
const controller = require("../controllers/usersController");

module.exports = [
  {
    url: "/auth/register",
    method: "post",
    func: controller.register,
  },
  {
    url: "/auth/login",
    method: "post",
    func: controller.login,
  },
  {
    url: "/auth/reset-password",
    method: "post",
    func: controller.resetPassword,
  },
  {
    url: "/auth/google",
    method: "post",
    func: controller.getUserByGoogleId,
  },
  {
    url: "/auth/verify-google-id",
    method: "post",
    func: controller.verifyGoogleId,
  },
  {
    url : "/auth/change-informations",
    method : "post",
    func : controller.changeInformations,
  },
];
