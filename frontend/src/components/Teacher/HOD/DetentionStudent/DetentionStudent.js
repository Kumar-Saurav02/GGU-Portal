import React, { Fragment, useEffect, useState } from "react";
import "./DetentionStudent.css";
import SidebarTeacher from "../../SidebarTeacher/SidebarTeacher";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../Loader/Loader";
import { getAllDetainedStudents } from "../../../../actions/hodAction";
import DetentionStudentList from "./DetentionStudentList";
import { getAllSessions } from "../../../../actions/hodAction";
import { clearMessages } from "../../../../actions/adminAction";

const DetentionStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const { sessions, loading: sessionsLoading } = useSelector(
    (state) => state.getAllSessions
  );

  const {
    loading: detentionStudentLoading,
    students,
    error: detentionStudentError,
  } = useSelector((state) => state.getAllDetainStudents);

  const {
    message: promoteStudentMessage,
    loading: promoteStudentLoading,
    error: promoteStudentError,
  } = useSelector((state) => state.promoteStudentByHOD);

  useEffect(() => {
    dispatch(getAllSessions());
    dispatch(getAllDetainedStudents());
  }, []);

  useEffect(() => {
    if (promoteStudentMessage) {
      toast.success(promoteStudentMessage);
      dispatch(clearMessages());
      dispatch(getAllDetainedStudents());
      dispatch(getAllSessions());
    }
    if (promoteStudentError) {
      toast.error(promoteStudentError);
      dispatch(clearMessages());
    }
  }, [promoteStudentMessage, promoteStudentError]);


  return (
    <Fragment>
      {detentionStudentLoading || promoteStudentLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="detentionStudent">
            <SidebarTeacher role={teacher.subRole} />
            <div className="approvBox">
              <div className="subsection">
            <div>
              <h2>Detention List</h2>
              <br></br>
              <br></br>
              <div>
                {students &&
                  sessions &&
                  students
                    .reverse()
                    .map((student) => (
                      <DetentionStudentList
                        data={student}
                        sessions={sessions}
                      />
                    ))}
              </div>
            </div>
            </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DetentionStudent;
