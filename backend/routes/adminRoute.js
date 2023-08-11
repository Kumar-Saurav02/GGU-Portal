const express = require("express");
const { sendOtp } = require("../controllers/emailController");
const { logout } = require("../controllers/studentController");
const {
  isAuthenticatedUser,
  authorizeRolesTeacher,
  authorizeSubRolesTeacher,
} = require("../middleware/auth");
const router = express.Router();

// router.route("/registerAdmin").post(registerAdmin);
// router.route("/loginAdmin").post(loginAdmin);
// router.route("logoutAdmin").get(logout);
router.route("/sendOtp").post(sendOtp);

module.exports = router;
