const router = require("express").Router();
const controller = require("../controllers/categoryController");

module.exports = [
  {
    url: "/categories",
    method: "get",
    func: controller.getAllCategories,
  },
  {
    url: "/categories",
    method: "post",
    func: controller.createCategory,
  },
  {
    url: "/categories/:userId",
    method: "post",
    func: controller.createCategoryByUserId,
  },
  {
    url: "/categories/:userId",
    method: "get",
    func: controller.getAllCategpryByUserId,
  },
  {
    url: "/categories/:categoryId",
    method: "delete",
    func: controller.removeCategoryById,
  },
  {
    url: "/categories/:categoryId",
    method: "put",
    func: controller.updateCategoryById,
  },
];
