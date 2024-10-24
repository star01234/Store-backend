const { User, Store } = require("../models");

const checkStoreAdmin = async (req, res, next) => {
  try {
    const userId = req.userId; // รับ userId จาก token
    console.log("User ID from token:", userId);

    const store = await Store.findOne({ where: { id: req.params.id } }); //
    console.log("Store admin ID:", store.adminId);

    if (!store || store.adminId !== userId) {
      return res.status(403).send({
        message: "Access Denied! Only the store's admin is allowed.",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking store admin:", error);
    res.status(500).send({ message: "Internal server error." });
  }
};

module.exports = checkStoreAdmin;
