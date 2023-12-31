import React, { useState } from "react";
import "./SidebarTeacher.css";
import { Link, useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import { useDispatch } from "react-redux";
import { logoutTeacher } from "../../../actions/teacherAction";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const SidebarTeacher = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutTeacher());
    navigate("/");
  };

  const [expanded, setExpaned] = useState(false);
  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-65%",
    },
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "49%" } : { left: "2%" }}
        onClick={() => setExpaned(!expanded)}>
        <MenuIcon />
      </div>
      <motion.div
        className="sidebarss"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}>
        <Link to="/teacherProfile">
          <p>
            <PeopleIcon />
            Profile
          </p>
        </Link>
        {role !== "dean" && (
          <div className="sidebar">
            <Link to="/attendanceEntry">
              <p>
                <PeopleIcon />
                Attendance Entry
              </p>
            </Link>
            <Link to="/marksEntry">
              <p>
                <PeopleIcon />
                Marks Entry
              </p>
            </Link>
          </div>
        )}

        {role === "hod" && (
          <div className="sidebar">
            <Link to="/hod/createSubject">
              <p>
                <PeopleIcon />
                Create Subject
              </p>
            </Link>
            <Link to="/hod/createCourse">
              <p>
                <PeopleIcon />
                Create Course
              </p>
            </Link>
            <Link to="/hod/allocateSubject">
              <p>
                <PeopleIcon />
                Allocate Subject
              </p>
            </Link>
            <Link to="/hod/promoteStudent">
              <p>
                <PeopleIcon />
                Student's Promotion
              </p>
            </Link>
            <Link to="/studentsApproval">
              <p>
                <PeopleIcon />
                Students Approval
              </p>
            </Link>
            <Link to="/hod/detentionStudentList">
              <p>
                <PeopleIcon />
                Detention List
              </p>
            </Link>
          </div>
        )}

        {role === "classIncharge" && (
          <div className="sidebar">
            <Link to="/classIncharge/courseApproval">
              <p>
                <PeopleIcon />
                Course Approval
              </p>
            </Link>
            <Link to="/classIncharge/scholarshipApproval">
              <p>
                <PeopleIcon />
                Scholarship Approval
              </p>
            </Link>
          </div>
        )}

        {role === "dean" && (
          <div className="sidebar">
            {/* <Link to="/dean">
              <p>
                <PeopleIcon />
                Dashboard
              </p>
            </Link> */}

            <Link to="/teachersApproval">
              <p>
                <PeopleIcon />
                Teachers Approval
              </p>
            </Link>
            <Link to="/HODApproval">
              <p>
                <PeopleIcon />
                HOD Approval
              </p>
            </Link>
            <Link to="/updateTeacherRole">
              <p>
                <PeopleIcon />
                Teacher Role
              </p>
            </Link>

            <Link to="/teachersList">
              <p>
                <PeopleIcon />
                Teacher List
              </p>
            </Link>

            <Link to="/createNewSessionByDean">
              <p>
                <PeopleIcon />
                New Session
              </p>
            </Link>

            <Link to="/attendanceForDean">
              <p>
                <PeopleIcon />
                Attendances
              </p>
            </Link>
            <Link to="/courseForDean">
              <p>
                <PeopleIcon />
                Courses
              </p>
            </Link>
          </div>
        )}

        {(role === "dean" || role === "hod") && (
          <Link to="/studentsList">
            <p>
              <PeopleIcon />
              Student List
            </p>
          </Link>
        )}

        <button class="signInbtn border hover" onClick={logout}>
          Logout
        </button>
      </motion.div>
    </>
  );
};

export default SidebarTeacher;
