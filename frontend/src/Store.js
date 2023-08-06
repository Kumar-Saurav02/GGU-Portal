import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  checkIfCourseIsSentForApprovalToClassInchargeReducer,
  getCourseForStudentReducer,
  getCourseSubjectsListReducer,
  getStudentsBaseOnSemesterAndDepartmentReducer,
  marksFeesCourseUpdateReducer,
  registerLoginStudentsReducer,
} from "./reducers/studentReducer";
import {
  courseScholarshipCheckReducer,
  getAttendanceEntryBySubjectReducer,
  getCoursesForApprovalReducer,
  getMarksEntryBySubjectReducer,
  getScholarshipsForApprovalReducer,
  registerLoginTeachersReducer,
  submitAttendanceEntryBySubjectTeacherReducer,
  submitMarksEntryBySubjectTeacherReducer,
  updateTeacherDetailsReducer,
} from "./reducers/teacherReducer";
import {
  acceptingRejectingStudentTeacherApprovalReducer,
  getAllStudentsDetailsReducer,
  getAllTeacherDetailsReducer,
  getStudentApprovalRequestReducer,
  getTeacherApprovalRequestReducer,
  removeStudentTeacherReducer,
  updateTeacherRoleReducer,
} from "./reducers/adminReducer";
import {
  assignSubjectsToTeacherReducer,
  createCourseByHODReducer,
  createSubjectByHODReducer,
  getAllSubjectsReducer,
} from "./reducers/hodReducer";

const reducer = combineReducers({
  registerLoginStudents: registerLoginStudentsReducer,
  registerLoginTeachers: registerLoginTeachersReducer,
  courseForStudents: getCourseForStudentReducer,
  studentsApprovalRequests: getStudentApprovalRequestReducer,
  teachersApprovalRequests: getTeacherApprovalRequestReducer,
  acceptingRejectingStudentTeacherApproval:
    acceptingRejectingStudentTeacherApprovalReducer,
  createCourseByHOD: createCourseByHODReducer,
  createSubjectByHOD: createSubjectByHODReducer,
  getAllSubjects: getAllSubjectsReducer,
  marksFeesCourseUpdate: marksFeesCourseUpdateReducer,
  updateTeacherRole: updateTeacherRoleReducer,
  getAllTeacherDetails: getAllTeacherDetailsReducer,
  getAllStudentsDetails: getAllStudentsDetailsReducer,
  courseScholarshipCheck: courseScholarshipCheckReducer,
  getCoursesForApproval: getCoursesForApprovalReducer,
  getScholarshipsForApproval: getScholarshipsForApprovalReducer,
  getStudentsBaseOnSemesterAndDepartment:
    getStudentsBaseOnSemesterAndDepartmentReducer,
  getCourseSubjectsList: getCourseSubjectsListReducer,
  submitAttendanceEntryBySubjectTeacher:
    submitAttendanceEntryBySubjectTeacherReducer,
  submitMarksEntryBySubjectTeacher: submitMarksEntryBySubjectTeacherReducer,
  getAttendanceEntryBySubject: getAttendanceEntryBySubjectReducer,
  getMarksEntryBySubject: getMarksEntryBySubjectReducer,
  updateTeacherDetails: updateTeacherDetailsReducer,
  checkIfCourseIsSentForApprovalToClassIncharge:
    checkIfCourseIsSentForApprovalToClassInchargeReducer,
  assignSubjectsToTeacher: assignSubjectsToTeacherReducer,
  removeStudentTeacher: removeStudentTeacherReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
