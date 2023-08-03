const express = require("express");
const {
  studentsBasedOnSemesterAndDepartment,
} = require("../controllers/attendanceController");
const {
  registerStudentAccept,
  loginStudent,
  logout,
  updateDetails,
  getAllStudents,
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
    authorizeSubRolesTeacher("admin"),
    registerStudentAccept
  );
router
  .route("/rejectApprovalStudent/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("admin"),
    rejectApprovalStudent
  );
router.route("/loginStudent").post(loginStudent);
router.route("/logoutStudent").get(logout);
router.route("/updateStudent").put(isAuthenticatedUser, updateDetails);
router.route("/getStudentDetail").get(isAuthenticatedUser, getStudent);

router
  .route("/getCourseForSelection")
  .get(isAuthenticatedUser, getCourseSelectionForSemester);
router
  .route("/checkIfCourseSentForApproval")
  .get(isAuthenticatedUser, checkIfCourseSentForApproval);

router
  .route("/getAllStudents")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("admin"),
    getAllStudents
  );
router.route("/getAllRequestsStudents").get(getAllStudentsApproval);
router.route("/getParticularStudent").get(getParticularStudent);
router
  .route("/studentsBasedOnSemesterAndDepartment/:semester/:department")
  .get(studentsBasedOnSemesterAndDepartment);
router
  .route("/getCourseSubjectsList/:semester/:department")
  .get(isAuthenticatedUser, getCourseSubjectList);

module.exports = router;
