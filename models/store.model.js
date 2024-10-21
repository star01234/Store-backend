const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require("./user.model")

// สร้าง Schema สำหรับ Store
const Store = sequelize.define("Stores", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    model: "user",
    key: "id",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lng: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// สร้างความสัมพันธ์
Store.belongsTo(User, { foreignKey: 'adminId' });
User.hasMany(Store, { foreignKey: 'adminId' });

Store.sync({ force: false })
  .then(() => {
    console.log("Table 'Store' created or already exists");
  })
  .catch((error) => {
    console.log("Error creating table", error);
  });

module.exports = Store;
