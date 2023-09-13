const express = require("express");
const { logout } = require("../controllers/studentController");
const {
  registerTeacherAccept,
  loginTeacher,
  updateDetailsTeacher,
  getAllTeachersForDean,
  getAllTeachersForHOD,
  getParticularTeacher,
  getTeacher,
  registerApprovalTeacher,
  rejectApprovalTeacher,
  getAllTeachersApproval,
  updateRoleOfTeacherByDean,
  acceptCourseSelection,
  rejectCourseSelection,
  acceptScholarshipSelection,
  rejectScholarshipSelection,
  getAllCoursesApproval,
  getAllScholarshipsApproval,
} = require("../controllers/teacherController");
const {
  createSubject,
  createCourse,
  getAllSubjects,
  assignSubjectToTeacher,
  removeSubject,
  promoteStudent,
  detainStudent,
  promoteDetainToStudent,
  getAllDetainedStudents,
} = require("../controllers/hodController");
const {
  removeTeacher,
  removeStudent,
  createNewSession,
  getPresentSession,
  getAllStudentsForDean,
  updateStudentsDataByDeanOrHOD,
  updateTeachersDataByDean,
  getAllAttendanceForDean,
  getAllCourseForDean,
  removeCourseForSession,
  removeAttendanceForSession,
} = require("../controllers/deanController");
const {
  isAuthenticatedUser,
  authorizeRolesTeacher,
  authorizeSubRolesTeacher,
} = require("../middleware/auth");
const {
  fillAttendanceDetails,
  getAttendanceDetailsOfParticularSubject,
  getAttendanceDetailsOfParticularDepartment,
} = require("../controllers/attendanceController");
const {
  fillMarksDetails,
  getMarksDetailsOfParticularSubject,
} = require("../controllers/marksController");
const router = express.Router();

router.route("/registerApprovalTeacher").post(registerApprovalTeacher);
router
  .route("/registerTeacherAccept/:id")
  .post(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    registerTeacherAccept
  );
router
  .route("/rejectApprovalTeacher/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    rejectApprovalTeacher
  );
router.route("/loginTeacher").post(loginTeacher);
router.route("/logoutTeacher").get(logout);
router
  .route("/updateTeacher")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    updateDetailsTeacher
  );
router
  .route("/updateTeacherRoleByDean/:id")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    updateRoleOfTeacherByDean
  );
router
  .route("/getTeacherDetail")
  .get(isAuthenticatedUser, authorizeRolesTeacher("teacher"), getTeacher);
router
  .route("/getAllTeachersForHOD")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    getAllTeachersForHOD
  );

router
  .route("/getAllTeachersForDean")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    getAllTeachersForDean
  );
router
  .route("/getAllRequestsTeachers")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    getAllTeachersApproval
  );
router
  .route("/getParticularTeacher")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    getParticularTeacher
  );

//HOD
router
  .route("/createSubject")
  .post(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    createSubject
  );
router
  .route("/removeSubject")
  .post(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    removeSubject
  );
router
  .route("/createCourse")
  .post(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    createCourse
  );
router.route("/getAllSubjects").get(
  isAuthenticatedUser,
  // authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("hod"),
  getAllSubjects
);
router
  .route("/updateAssignSubjectForTeacher")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    assignSubjectToTeacher
  );

router
  .route("/promoteStudents")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    promoteStudent
  );

router
  .route("/detainStudents")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    detainStudent
  );

router
  .route("/getAllDetainedStudents")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    getAllDetainedStudents
  );

router
  .route("/promoteDetainToStudent/:id/:session")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("hod"),
    promoteDetainToStudent
  );

//CLASS INCHARGE
router
  .route("/acceptCourseSelection")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("classIncharge"),
    acceptCourseSelection
  );
router
  .route("/rejectCourseSelection/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("classIncharge"),
    rejectCourseSelection
  );
router
  .route("/acceptScholarshipSelection")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("classIncharge"),
    acceptScholarshipSelection
  );
router
  .route("/rejectScholarshipSelection")
  .delete(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("classIncharge"),
    rejectScholarshipSelection
  );
router
  .route("/getAllCoursesApproval")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("classIncharge"),
    getAllCoursesApproval
  );
router
  .route("/getAllScholarshipsApproval")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("classIncharge"),
    getAllScholarshipsApproval
  );

//ATTENDANCE
router.route("/attendanceEntryByTeacher").put(
  isAuthenticatedUser,
  authorizeRolesTeacher("teacher"),
  // authorizeSubRolesTeacher("admin"),
  fillAttendanceDetails
);
router
  .route(
    "/getAttendanceDetailsOfParticularSubject/:semester/:department/:subject"
  )
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    getAttendanceDetailsOfParticularSubject
  );

router
  .route("/getAttendanceDetailsOfParticularDepartment/:department")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    getAttendanceDetailsOfParticularDepartment
  );

//MARKS
// router.route("/marksEntryByTeacher").put(fillMarksDetails);
router
  .route("/getMarksDetailsOfParticularSubject/:semester/:department/:subject")
  .get(getMarksDetailsOfParticularSubject);

//DEAN

router
  .route("/removeTeacher/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    removeTeacher
  );

router
  .route("/removeStudent/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    removeStudent
  );

router
  .route("/createNewSession")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    createNewSession
  );

router
  .route("/getAllStudentsForDean")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    getAllStudentsForDean
  );

router
  .route("/updateStudentDataByDeanOrHOD")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    updateStudentsDataByDeanOrHOD
  );

router
  .route("/updateTeacherDataByDean")
  .put(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    updateTeachersDataByDean
  );

router
  .route("/getAllAttendanceForDean")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    getAllAttendanceForDean
  );

router
  .route("/getAllCourseForDean")
  .get(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    getAllCourseForDean
  );

router
  .route("/removeAttendanceForSession")
  .delete(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    removeAttendanceForSession
  );

router
  .route("/removeCourseForSession")
  .delete(
    isAuthenticatedUser,
    authorizeRolesTeacher("teacher"),
    authorizeSubRolesTeacher("dean"),
    removeCourseForSession
  );

router.route("/getAllSessions").get(isAuthenticatedUser, getPresentSession);

module.exports = router;
