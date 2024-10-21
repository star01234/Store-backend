const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const storeRouter = require("./routers/store.router");
const authRouter = require("./routers/auth.router");
const PORT = process.env.PORT || 5000;
const frontend_url = process.env.FRONTEND_URL;
const db = require("./models");
const Role = db.Role

const corsOption = {
  origin: frontend_url,
};

// Dev mode: ใช้สำหรับทดสอบเท่านั้น
// db.sequelize.sync({ force: true }).then(() => {
//   initRole();
//   console.log("Drop and Sync DB");
// });

const initRole = () => {
  Role.create({ id: 1, name: "user" });
  Role.create({ id: 2, name: "moderator" });
  Role.create({ id: 3, name: "admin" });
};

// ใช้ middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ใช้ router
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Store Management API</h1>"); 
});

app.listen(PORT, () => {
  console.log("Server running on port" + PORT);
});
