const express = require("express");
const { sendOtp } = require("../controllers/emailController");
const { logout } = require("../controllers/studentController");
const {
  updateRoleOfTeacherByAdmin,
  getAllStudentsByAdmin,
  getAllTeachersForAdmin,
} = require("../controllers/adminController");
const {
  isAuthenticatedUser,
  authorizeRolesTeacher,
  authorizeSubRolesTeacher,
} = require("../middleware/auth");
const router = express.Router();

router.route("/sendOtp").post(sendOtp);

router
  .route("/updateTeacherRoleByAdmin/:id")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("admin"),
    updateRoleOfTeacherByAdmin
  );

router
  .route("/getAllStudentsByAdmin")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("admin"),
    getAllStudentsByAdmin
  );

router
  .route("/getAllTeachersForAdmin")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("admin"),
    getAllTeachersForAdmin
  );

module.exports = router;
