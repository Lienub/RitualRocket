const { Tasks } = require("../models");

const createTask = async (req, res) => {
  try {
    const { name, description, habitId, categoryId } = req.body;
    const task = await Tasks.create({ name, description, habitId, categoryId });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTasksByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await TasksTasks.findAll({ where: { userId } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Tasks.findByPk(taskId);
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updatedTask = await Tasks.update(req.body, { where: { id: taskId } });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    await Tasks.destroy({ where: { id: taskId } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getTasksByUserId,
  getTaskById,
  updateTask,
  deleteTask,
  createTask,
  getAllTasks,
};
