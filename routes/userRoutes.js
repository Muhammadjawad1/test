const express = require("express");

const route = express.Router();
const multer = require("multer");
const multiPart = multer();

const controller = require("../controllers/userController")

route.post("/register", multiPart.fields([]), controller.register);
route.post("/login", multiPart.fields([]), controller.login);

module.exports = route;
