"use strict";

require('dotenv').config();
const fs = require("fs");
const sequelize = require("../database/connection");

const db = {};
db.sequelize = sequelize;
db.Sequelize = sequelize.constructor;

fs.readdirSync(__dirname)
  .filter((filename) => filename !== "index.js")
  .forEach((filename) => {
    console.log(filename)
    const model = require(`./${filename}`);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

module.exports = db;
