const { Category } = require('../models');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createCategoryByUserId = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const category = await Category.create({ name, userId });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const removeCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    await Category.destroy({ where: { id: categoryId } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAllCategpryByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const category = await Category.findAll({ where: { userId } });
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updatedCategory = await Category.update(req.body, { where: { id: categoryId } });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAllCategories = async (req, res) => {
  try {
    const category = await Category.findAll({ where: { userId: null } });
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { createCategory, getAllCategpryByUserId, getAllCategories, updateCategoryById, createCategoryByUserId, removeCategoryById};