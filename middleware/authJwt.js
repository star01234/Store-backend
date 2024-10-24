const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

// Verify token
const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id; // ตั้งค่า req.userId จาก decoded token
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

// isAdmin middleware
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const roles = await user.getRoles();
    const isAdminRole = roles.some((role) => role.name === "admin");
    if (isAdminRole) {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// isMod middleware
const isMod = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const roles = await user.getRoles();
    const isModRole = roles.some((role) => role.name === "moderator");
    if (isModRole) {
      next();
    } else {
      res.status(403).send({ message: "Require Moderator Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// isModOrAdmin middleware
const isModOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const roles = await user.getRoles();
    const isModOrAdminRole = roles.some(
      (role) => role.name === "admin" || role.name === "moderator"
    );
    if (isModOrAdminRole) {
      next();
    } else {
      res.status(403).send({ message: "Require Moderator or Admin Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isMod,
  isModOrAdmin,
};

module.exports = authJwt;
