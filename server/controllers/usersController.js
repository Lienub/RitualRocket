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
    if(!username) {
      return res.status(400).json({status: "username_failed", message: "Username est requis !"})
    } else if(!email) {
      return res.status(400).json({status: "email_failed", message: "Email est requis !"})
    } else if(!password) {
      return res.status(400).json({status: "password_failed", message: "Password est requis !"})
    }
    if (googleId) {
      const existingUser = await Users.findOne({ where: { googleId } });
      if (existingUser) {
        return res.status(400).json({status: "failed", message: "Votre compte existe deja !"})
      }
    } else {
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({status: "email_failed", message: "Email a deja été utilisé !"})
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
    const userInfo = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    return res.json({ status: "success", token, user: userInfo });

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
      console.log(user)
      if (!user) {
        return res.status(401).json({ message: "Invalid Google ID" });
      }
    } else {
      user = await Users.findOne({ where: { email } })
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
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
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token de réinitialisation et nouveau mot de passe requis",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findByPk(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyGoogleId = async (googleId) => {
  const user = await Users.findOne({ where: { googleId } });
  return user;
}

module.exports = { register, login, getUserByGoogleId, resetPassword, verifyGoogleId };
