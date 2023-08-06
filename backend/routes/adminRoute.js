const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  removeTeacher,
  removeStudent,
} = require("../controllers/adminController");
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

router
  .route("/removeTeacher/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("admin"),
    removeTeacher
  );

router
  .route("/removeStudent/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("admin"),
    removeStudent
  );

module.exports = router;
