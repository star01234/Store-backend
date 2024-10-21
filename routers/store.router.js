const express = require("express");
const router = express.Router();
const StoreControllers = require("../controllers/store.controller");
const authJwt = require("../middleware/authJwt");

// Create a course
// POST http://localhost:5000/api/v1/courses/
router.post(
  //"/",[authJwt.verifyToken, authJwt.isModOrAdmin],StoreControllers.create);
  "/",StoreControllers.create);

// Get all courses
// GET http://localhost:5000/api/v1/Store/
router.get("/", StoreControllers.getAll);

// Get a course by ID
// GET http://localhost:5000/api/v1/Store/:id
router.get(
  //"/:id",[authJwt.verifyToken, authJwt.isModOrAdmin],StoreControllers.getById);
  "/:id",StoreControllers.getById);
  
// Update a course
// PUT http://localhost:5000/api/v1/Store/:id
router.put(
  //"/:id",[authJwt.verifyToken, authJwt.isModOrAdmin],StoreControllers.update);
  "/:id",StoreControllers.update);

// Delete a course
// DELETE http://localhost:5000/api/v1/Store/:id
router.delete(
  //"/:id",[authJwt.verifyToken, authJwt.isAdmin],StoreControllers.delete);
  "/:id",StoreControllers.delete);




module.exports = router;

//