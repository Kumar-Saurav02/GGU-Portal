import React, { Fragment, useEffect, useState } from "react";
import "./StudentList.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearMessages,
  getAllStudentDetailForDean,
  getAllStudentDetailForHOD,
} from "../../../actions/adminAction";
import { getAllSessions } from "../../../actions/hodAction";
import { useNavigate } from "react-router-dom";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import Loader from "../../Loader/Loader";
import StudentListMapping from "./StudentListMapping.js";

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    loading: studentRemoveLoading,
    message: studentRemoveMessage,
    error: studentRemoveError,
  } = useSelector((state) => state.removeStudentTeacher);

  const {
    students,
    loading: studentListLoading,
    error,
  } = useSelector((state) => state.getAllStudentsDetails);

  const { sessions, loading: sessionsLoading } = useSelector(
    (state) => state.getAllSessions
  );

  const [selectedSession, setSelectedSession] = useState([]);

  useEffect(() => {
    if (sessions !== null && sessions !== undefined && sessions.length > 0) {
      setSelectedSession(sessions.slice(-2));
    } else {
      dispatch(getAllSessions());
    }
  }, [dispatch, sessions]);

  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    if (studentRemoveMessage) {
      toast.success(studentRemoveMessage);
      dispatch(clearMessages());
    }
    if (studentRemoveError) {
      toast.error(studentRemoveError);
      dispatch(clearMessages());
    }
  }, [studentRemoveMessage, studentRemoveError]);

  useEffect(() => {
    if (teacher.subRole.toString() === "dean") {
      dispatch(getAllStudentDetailForDean());
    }
    if (teacher.subRole.toString() === "hod") {
      dispatch(getAllStudentDetailForHOD());
    }
  }, []);

  return (
    <Fragment>
      {studentListLoading || studentRemoveLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="studentListAdmin">
            <SidebarTeacher role={teacher.subRole} />
            <div>
              <div>
                <h4>Search</h4>
                <input
                  type="text"
                  placeholder="Enter Enrollment Number"
                  required
                  value={searchResult}
                  onChange={(e) => setSearchResult(e.target.value)}
                />
              </div>

              {students &&
                students
                  .filter((students) =>
                    students.enrollmentNo.includes(searchResult)
                  )
                  .map((student, i) => (
                    <div key={i}>
                      <StudentListMapping
                        data={student}
                        role={teacher.subRole}
                        selectedSession={selectedSession}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default StudentList;
