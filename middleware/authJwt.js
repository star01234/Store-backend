const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

// Verify token
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id; // แก้เป็น userId
    next();
  });
};

// Check if the user is an Admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const roles = await user.getRoles();
    for (let role of roles) {
      if (role.name === "admin") {
        return next();
      }
    }
    return res
      .status(403)
      .send({ message: "Unauthorized access, require Admin Role!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Check if the user is a Moderator
const isMod = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const roles = await user.getRoles();
    for (let role of roles) {
      if (role.name === "moderator") {
        return next();
      }
    }
    return res
      .status(403)
      .send({ message: "Unauthorized access, require Moderator Role!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Check if the user is either an Admin or a Moderator
const isModOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const roles = await user.getRoles();
    for (let role of roles) {
      if (role.name === "admin" || role.name === "moderator") {
        return next();
      }
    }
    return res
      .status(403)
      .send({ message: "Unauthorized access, require Mod or Admin Role!" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isMod,
  isModOrAdmin,
};

module.exports = authJwt;
