const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Users = require('../models/users');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, googleId } = req.body;

    // Vérifier si l'utilisateur s'inscrit avec Google
    if (googleId) {
      const existingUser = await Users.findOne({ where: { googleId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Google ID already registered' });
      }
    } else {
      // Si l'utilisateur s'inscrit avec e-mail et mot de passe
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
      googleId
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, googleId } = req.body;

    if (googleId) {
      const user = await Users.findOne({ where: { googleId } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid Google ID' });
      }
    } else {
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { register, login };
