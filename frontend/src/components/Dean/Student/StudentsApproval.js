import React, { Fragment, useEffect, useState } from "react";
import "./StudentApproval.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  studentApprovalRequest,
} from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import StudentApprovalDataMapping from "./StudentApprovalDataMapping";
import { toast } from "react-toastify";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import { getAllSessions } from "../../../actions/hodAction";

const StudentsApproval = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    studentApproval,
    loading: studentApprovalLoading,
    error,
  } = useSelector((state) => state.studentsApprovalRequests);

  const {
    loading: acceptRejectLoading,
    message,
    error: acceptRejectError,
  } = useSelector((state) => state.acceptingRejectingStudentTeacherApproval);

  const { sessions, loading: sessionsLoading } = useSelector(
    (state) => state.getAllSessions
  );

  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    if (sessions !== null && sessions !== undefined && sessions.length > 0) {
      setSelectedSession(sessions[sessions.length - 1].sessionName);
    } else {
      dispatch(getAllSessions());
    }
  }, [dispatch, sessions]);

  useEffect(() => {
    if (acceptRejectError) {
      toast.error(acceptRejectError);
      dispatch(clearMessages());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
      navigate("/studentsApproval");
      dispatch(studentApprovalRequest());
    }
  }, [acceptRejectError, message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [error]);

  useEffect(() => {
    dispatch(studentApprovalRequest());
  }, []);

  return (
    <Fragment>
      {studentApprovalLoading || acceptRejectLoading || sessionsLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="studentDetails">
            <SidebarTeacher role={teacher.subRole} />
            <div className="approvBox">
              <div className="request">
                <h1> Student's Approval ({selectedSession})</h1>
                <hr></hr>
                <br></br>
                {studentApproval && studentApproval.length === 0 && (
                  <div>
                    <h3>Nothing to show here.</h3>
                  </div>
                )}
                {studentApproval &&
                  studentApproval.map((studentData, i) => (
                    <div>
                      <StudentApprovalDataMapping
                        data={studentData}
                        selectedSession={selectedSession}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default StudentsApproval;
