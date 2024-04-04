const { Habit, Category } = require("../models");

const createHabit = async (req, res) => {
  try {
    const { name, description, categoryId, userId } = req.body;

    const habit = await Habit.create({ name, description, UserId: userId });

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.addHabit(habit);

    res.status(201).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createHabitByUserId = async (req, res) => {
  try {
    const { name, description, userId, categoryId } = req.body;
    const habit = await Habit.create({ name, description, userId, categoryId });
    res.status(201).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeHabitById = async (req, res) => {
  try {
    const habitId = req.params.habitId;
    await Habit.destroy({ where: { id: habitId } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateHabitById = async (req, res) => {
  try {
    const habitId = req.params.habitId;
    const updatedHabit = await Habit.update(req.body, {
      where: { id: habitId },
    });
    res.status(200).json(updatedHabit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllHabits = async (req, res) => {
  try {
    const userId = req.params.userId;
    const habits = await Habit.findAll({
      where: { userId },
      include: [{ model: Category }],
    });
    res.status(200).json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllHabitsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const habits = await Habit.findAll({
      include: [
        {
          model: Category,
          where: { id: categoryId, UserId: null },
        },
      ],
      where: { UserId: null },
    });
    res.status(200).json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllHabitsByUserId = async (req, res) => {
  try {
    const habits = await Habit.findAll({
      where: { userId: null },
      include: [{ model: Category }],
    });
    res.status(200).json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createHabit,
  createHabitByUserId,
  removeHabitById,
  updateHabitById,
  getAllHabits,
  getAllHabitsByUserId,
  getAllHabitsByCategory,
};
