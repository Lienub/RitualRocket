const { Statistics } = require("../models");

const updateStatistics = async (userId, habitId) => {
  try {
    const statistics = await Statistics.findOne({ where: { userId, habitId } });
    if (!statistics) {
      await Statistics.create({ userId, habitId, count: 1 });
    } else {
      await Statistics.update(
        { count: statistics.count + 1 },
        { where: { userId, habitId } }
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const getStatistics = async (req, res) => {
  try {
    const userId = req.params.userId;
    const statistics = await Statistics.findAll({ where: { userId } });
    res.status(200).json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { updateStatistics, getStatistics };
