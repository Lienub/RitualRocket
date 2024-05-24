const { Timer } = require("../models");

const createTimer = async (req, res) => {
  try {
    const { userId, taskId, date, durationSeconds } = req.body;
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    const timer = await Timer.create({
      userId,
      taskId,
      date: currentDate,
      durationSeconds,
    });
    console.log(currentDate);
    res.status(201).json(timer);
  } catch (error) {
    console.error(error);
  }
};

const getAllTimers = async (req, res) => {
  try {
    const timers = await Timer.findAll();
    res.status(200).json(timers);
  } catch (error) {
    console.error(error);
  }
};

const getTimersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const timers = await Timer.findAll({ where: { userId } });
    res.status(200).json(timers);
  } catch (error) {
    console.error(error);
  }
};

const getTimersByTaskIdUserId = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.params.userId;
    const timers = await Timer.findAll({ where: { taskId, userId } });
    res.status(200).json(timers);
  } catch (error) {
    console.error(error);
  }
};

const deleteTimer = async (req, res) => {
  try {
    const timerId = req.params.timerId;
    await Timer.destroy({ where: { id: timerId } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createTimer,
  getAllTimers,
  getTimersByUserId,
  getTimersByTaskIdUserId,
  deleteTimer,
};
