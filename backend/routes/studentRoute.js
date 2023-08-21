const express = require("express");
const {
  studentsBasedOnSemesterAndDepartment,
} = require("../controllers/attendanceController");
const {
  registerStudentAccept,
  loginStudent,
  logout,
  updateDetails,
  getAllStudentsForHOD,
  getAllStudentsForDean,
  getParticularStudent,
  getStudent,
  getCourseSelectionForSemester,
  registerApprovalStudent,
  rejectApprovalStudent,
  getAllStudentsApproval,
  getCourseSubjectList,
  checkIfCourseSentForApproval,
} = require("../controllers/studentController");
const {
  isAuthenticatedUser,
  authorizeRolesStudent,
  authorizeRolesTeacher,
  authorizeSubRolesTeacher,
} = require("../middleware/auth");
const router = express.Router();

router.route("/registerApprovalStudent").post(registerApprovalStudent);
router
  .route("/registerStudentAccept/:id")
  .post(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    registerStudentAccept
  );
router
  .route("/rejectApprovalStudent/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    rejectApprovalStudent
  );
router.route("/loginStudent").post(loginStudent);
router.route("/logoutStudent").get(logout);
router.route("/updateStudent").put(isAuthenticatedUser, updateDetails);
router.route("/getStudentDetail").get(isAuthenticatedUser, getStudent);

router
  .route("/getCourseForSelection/:session")
  .get(isAuthenticatedUser, getCourseSelectionForSemester);
router
  .route("/checkIfCourseSentForApproval")
  .get(isAuthenticatedUser, checkIfCourseSentForApproval);

router
  .route("/getAllStudentsForHOD")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    getAllStudentsForHOD
  );

router
  .route("/getAllStudentsForDean")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    getAllStudentsForDean
  );
router.route("/getAllRequestsStudents").get(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("admin"),
  getAllStudentsApproval
);
router.route("/getParticularStudent").get(getParticularStudent);
router
  .route("/studentsBasedOnSemesterAndDepartment/:semester/:department")
  .get(studentsBasedOnSemesterAndDepartment);
router
  .route("/getCourseSubjectsList/:semester/:department")
  .get(isAuthenticatedUser, getCourseSubjectList);

module.exports = router;
