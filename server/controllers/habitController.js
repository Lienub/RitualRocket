const { Habit } = require('../models');

const createHabit = async (req, res) => {
  try {
    const { name, description } = req.body;
    const habit = await Habit.create({ name, description });
    res.status(201).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createHabitByUserId = async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    const habit = await Habit.create({ name, description, userId });
    res.status(201).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const removeHabitById = async (req, res) => {
  try {
    const habitId = req.params.habitId;
    await Habit.destroy({ where: { id: habitId } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateHabitById = async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const updatedHabit = await Habit.update(req.body, { where: { id: habitId } });
    res.status(200).json(updatedHabit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAllHabits = async (req, res) => {
  try {
    const userId = req.params.userId;
    const habits = await Habit.findAll({ where: { userId } });
    res.status(200).json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAllHabitsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const habits = await Habit.findAll({ where: { category } });
    res.status(200).json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAllHabitsByUserId = async (req, res) => {
  try {
    const habits = await Habit.findAll({ where: { userId: null } });
    res.status(200).json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { createHabit, createHabitByUserId, removeHabitById, updateHabitById, getAllHabits, getAllHabitsByUserId, getAllHabitsByCategory};