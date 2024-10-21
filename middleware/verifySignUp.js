const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Op } = require("sequelize");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check username
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res
        .status(400)
        .send({ message: "Failed! Username is already in use!" });
    }

    // Check email
    const emailUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailUser) {
      return res
        .status(400)
        .send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Check roles are valid
checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    try {
      const roles = await Role.findAll({
        where: {
          name: { [Op.or]: req.body.roles },
        },
      });

      if (roles.length !== req.body.roles.length) {
        return res
          .status(400)
          .send({ message: "Failed! Role does not exist!" });
      }

      next();
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    next();
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
