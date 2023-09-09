import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/RegisterLogin/Register";
import Login from "./components/RegisterLogin/Login";
import StudentScholarship from "./components/Student/StudentScholarship/StudentScholarship";
import CourseSelection from "./components/Student/CourseSelection/CourseSelection";
import { useEffect } from "react";
import { loadStudent } from "./actions/studentAction";
import { loadTeacher } from "./actions/teacherAction";
import store from "./Store";
import StudentsApproval from "./components/Dean/Student/StudentsApproval";
import StudentApprovalDetails from "./components/Dean/Student/StudentApprovalDetails";
import TeacherApprovalDetails from "./components/Dean/Teacher/TeacherApprovalDetails";
import TeachersApproval from "./components/Dean/Teacher/TeachersApproval";
// import Dashboard from "./components/Dean/Dashboard/Dashboard";
import ProfileStudent from "./components/Student/Profile/ProfileStudent";
import DocumentUploadStudent from "./components/Student/DocumentUploadStudent/DocumentUploadStudent";
import ProfileTeacher from "./components/Teacher/Profile/ProfileTeacher";
import HODApproval from "./components/Dean/HOD/HODApproval";
import CreateSubject from "./components/Teacher/HOD/CreateSubject/CreateSubject";
import CreateCourse from "./components/Teacher/HOD/CreateCourse/CreateCourse";
import AllocateSubject from "./components/Teacher/HOD/AllocateSubject/AllocateSubject";
import PromoteStudent from "./components/Teacher/HOD/PromoteStudent/PromoteStudent";
import ChangingTeacherRole from "./components/Dean/Roles/ChangingTeacherRole";
import CourseApproval from "./components/Teacher/ClassIncharge/CourseApproval/CourseApproval";
import ScholarshipApproval from "./components/Teacher/ClassIncharge/ScholarshipApproval/ScholarshipApproval";
import AttendanceEntry from "./components/Teacher/Attendance/AttendanceEntry";
import MarksEntry from "./components/Teacher/Marks/MarksEntry";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import EditProfileStudent from "./components/Student/EditProfileStudent/EditProfileStudent";
import EditProfileTeacher from "./components/Teacher/EditProfileTeacher/EditProfileTeacher";
import StudentList from "./components/Dean/StudentList/StudentList";
import StudentListDetails from "./components/Dean/StudentList/StudentListDetails";
import TeacherList from "./components/Dean/TeacherList/TeacherList";
import TeacherListDetails from "./components/Dean/TeacherList/TeacherListDetails";
import CreateNewSession from "./components/Dean/NewSession/CreateNewSession";
import CompleteAttendanceForDean from "./components/Dean/CompleteAttendance/CompleteAttendanceForDean";
import CompleteCourseForDean from "./components/Dean/CompleteCourse/CompleteCourseForDean";
import NotFound from "../src/components/Layout/NotFound";
import ScrollToTop from "../src/components/Layout/ScrollToTop/ScrollToTop";

function App() {
  useEffect(() => {
    store.dispatch(loadStudent());
    store.dispatch(loadTeacher());
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dean */}
        {/* <Route
          path="/dean"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="dean"
              Component={Dashboard}
            />
          }
        /> */}
        <Route
          path="/studentsApproval"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="hod"
              Component={StudentsApproval}
            />
          }
        />
        <Route
          path="/studentApprovalDetails"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="dean"
              Component={StudentApprovalDetails}
            />
          }
        />
        <Route
          path="/teachersApproval"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="dean"
              Component={TeachersApproval}
            />
          }
        />
        <Route
          path="/teacherApprovalDetails"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="dean"
              Component={TeacherApprovalDetails}
            />
          }
        />
        <Route
          path="/HODApproval"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="dean"
              Component={HODApproval}
            />
          }
        />
        <Route
          path="/updateTeacherRole"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="dean"
              Component={ChangingTeacherRole}
            />
          }
        />

        <Route
          path="/studentsList"
          element={
            <ProtectedRoute role="teacher" subRole="" Component={StudentList} />
          }
        />
        <Route
          path="/studentListDetails"
          element={
            <ProtectedRoute
              role="teacher"
              subRole=""
              Component={StudentListDetails}
            />
          }
        />

        <Route
          path="/teachersList"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="dean"
              Component={TeacherList}
            />
          }
        />
        <Route
          path="/teacherListDetails"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="dean"
              Component={TeacherListDetails}
            />
          }
        />

        <Route
          path="/createNewSessionByDean"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="dean"
              Component={CreateNewSession}
            />
          }
        />

        <Route
          path="/attendanceForDean"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="dean"
              Component={CompleteAttendanceForDean}
            />
          }
        />

        <Route
          path="/courseForDean"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="dean"
              Component={CompleteCourseForDean}
            />
          }
        />

        {/* Student */}
        <Route
          path="/studentProfile"
          element={
            <ProtectedRoute
              role="student"
              subRole=""
              Component={ProfileStudent}
            />
          }
        />
        <Route
          path="/editStudentProfile"
          element={
            <ProtectedRoute
              role="student"
              subRole=""
              Component={EditProfileStudent}
            />
          }
        />
        <Route
          path="/studentDocumentUpload"
          element={
            <ProtectedRoute
              role="student"
              subRole=""
              Component={DocumentUploadStudent}
            />
          }
        />
        <Route
          path="/studentCourseSelection"
          element={
            <ProtectedRoute
              role="student"
              subRole=""
              Component={CourseSelection}
            />
          }
        />
        <Route
          path="/studentScholarship"
          element={
            <ProtectedRoute
              role="student"
              subRole=""
              Component={StudentScholarship}
            />
          }
        />

        {/* Teacher */}
        <Route
          path="/teacherProfile"
          element={
            <ProtectedRoute
              role="teacher"
              subRole=""
              Component={ProfileTeacher}
            />
          }
        />
        <Route
          path="/editTeacherProfile"
          element={
            <ProtectedRoute
              role="teacher"
              subRole=""
              Component={EditProfileTeacher}
            />
          }
        />
        <Route
          path="/attendanceEntry"
          element={
            <ProtectedRoute
              role="teacher"
              subRole=""
              Component={AttendanceEntry}
            />
          }
        />
        <Route
          path="/marksEntry"
          element={
            <ProtectedRoute role="teacher" subRole="" Component={MarksEntry} />
          }
        />

        {/* HOD */}
        <Route
          path="/hod/createSubject"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="hod"
              Component={CreateSubject}
            />
          }
        />
        <Route
          path="/hod/createCourse"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="hod"
              Component={CreateCourse}
            />
          }
        />
        <Route
          path="/hod/allocateSubject"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="hod"
              Component={AllocateSubject}
            />
          }
        />

        <Route
          path="/hod/promoteStudent"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="hod"
              Component={PromoteStudent}
            />
          }
        />

        {/* Class Incharge */}
        <Route
          path="/classIncharge/courseApproval"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="classIncharge"
              Component={CourseApproval}
            />
          }
        />
        <Route
          path="/classIncharge/scholarshipApproval"
          element={
            <ProtectedRoute
              role="teacher"
              subRole="classIncharge"
              Component={ScholarshipApproval}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
