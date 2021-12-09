const express = require("express");
const router = express.Router();
// Controller
const authController = require('../controller/auth');


// User login
router.post("/Login", authController.postLogin);
// User signup
router.post("/Signup", authController.postUserRegister);
// Admin signup
router.post("/admin/Signup", authController.postAdminRegister);

module.exports = router