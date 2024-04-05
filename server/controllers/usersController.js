const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Users = require("../models/users");

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, googleId } = req.body;
    if (!username) {
      return res
        .status(400)
        .json({ status: "username_failed", message: "Username est requis !" });
    } else if (!email) {
      return res
        .status(400)
        .json({ status: "email_failed", message: "Email est requis !" });
    } else if (!password) {
      return res
        .status(400)
        .json({ status: "password_failed", message: "Password est requis !" });
    }
    if (googleId) {
      const existingUser = await Users.findOne({ where: { googleId } });
      if (existingUser) {
        const token = jwt.sign(
          { userId: existingUser.id },
          process.env.JWT_SECRET
        );
        const responseData = {
          userId: existingUser.id,
          email: existingUser.email,
          username: existingUser.username,
          googleId: existingUser.googleId,
          token,
        };
        return res.status(200).json({ responseData });
      }
    } else {
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({
            status: "email_failed",
            message: "Email a deja été utilisé !",
          });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
      googleId,
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);
    const responseData = {
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username,
      googleId: newUser.googleId,
      token,
    };
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, googleId } = req.body;
    let user = null;
    if (googleId) {
      user = await Users.findOne({ where: { googleId } });
      if (!user) {
        return res.status(401).json({ message: "Invalid Google ID" });
      }
    } else {
      user = await Users.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    const responseData = {
      userId: user.id,
      email: user.email,
      username: user.username,
      googleId: user.googleId,
      token,
    };
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserByGoogleId = async (googleId) => {
  const user = await Users.findOne({ where: { googleId } });
  return user;
};

const resetPassword = async (req, res) => {

  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "L'e-mail et le nouveau mot de passe sont requis",
      });
    }

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};


const verifyGoogleId = async (req, res) => {
  try {
    const { googleId } = req.body;
    const user = await Users.findOne({ where: { googleId } });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const changeInformations = async (req, res) => {
  try {
    const { email, username, userId } = req.body;
    const user = await Users.findByPk(userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.update({ email, username });

    res.status(200).json({ message: "Informations mises à jour avec succès" });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
}

module.exports = {
  register,
  login,
  getUserByGoogleId,
  resetPassword,
  verifyGoogleId,
  changeInformations,
};
