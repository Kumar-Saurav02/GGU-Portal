import React, { Fragment, useEffect, useState } from "react";
import "./PromoteStudent.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Loader/Loader";
import {
  clearMessages,
  getAllStudentDetailForHOD,
} from "../../../../actions/adminAction";
import SidebarTeacher from "../../SidebarTeacher/SidebarTeacher";
import {
  detainStudentsByHOD,
  getAllSessions,
  promoteStudentToNextSemester,
} from "../../../../actions/hodAction";
import { toast } from "react-toastify";

const PromoteStudent = () => {
  const dispatch = useDispatch();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const { sessions, loading: sessionsLoading } = useSelector(
    (state) => state.getAllSessions
  );

  const {
    message: promoteStudentMessage,
    loading: promoteStudentLoading,
    error: promoteStudentError,
  } = useSelector((state) => state.promoteStudentByHOD);

  const {
    students,
    loading: studentListLoading,
    error,
  } = useSelector((state) => state.getAllStudentsDetails);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const [semester, setSemester] = useState(1);
  const [selectedSession, setSelectedSession] = useState("");
  const [approvalChecked, setApprovalChecked] = useState([]);
  const [detentionChecked, setDetentionChecked] = useState([]);
  const [listOfStudentsApproval, setListOfStudentsApproval] = useState([]);
  const [listOfStudentsDetention, setListOfStudentsDetention] = useState([]);

  useEffect(() => {
    if (sessions !== null && sessions !== undefined && sessions.length > 0) {
      setSelectedSession(sessions.slice(-2)[0].sessionName);
    } else {
      dispatch(getAllSessions());
    }
  }, [dispatch, sessions]);

  useEffect(() => {
    if (students !== null && students !== undefined) {
      var approvalTemp = [];
      var detentionTemp = [];
      var creatingListOfStudentsApproval = [];
      var creatingListOfStudentsDetention = [];
      for (let i = 0; i < students.length; i++) {
        if (students[i].currentSemester.toString() === semester.toString()) {
          var flag = 0;
          for (let j = 0; j < students[i].courseSelected.length; j++) {
            if (
              students[i].courseSelected[j].semester.toString() ===
              semester.toString()
            ) {
              flag = 1;
              creatingListOfStudentsApproval.push(students[i]);
              approvalTemp.push(false);
              break;
            }
          }
          if (flag === 0) {
            creatingListOfStudentsDetention.push(students[i]);
            detentionTemp.push(false);
          }
        }
      }
      setApprovalChecked(approvalTemp);
      setListOfStudentsApproval(creatingListOfStudentsApproval);
      setDetentionChecked(detentionTemp);
      setListOfStudentsDetention(creatingListOfStudentsDetention);
    }
  }, [students, semester]);

  const getListOfStudents = () => {
    dispatch(getAllStudentDetailForHOD());
  };

  const handleApprovedStudentChange = (index) => {
    const checkingUncheckedState = approvalChecked.map((checkValue, id) =>
      id === index ? !checkValue : checkValue
    );

    setApprovalChecked(checkingUncheckedState);
  };

  const handleDetainedStudentChange = (index) => {
    const checkingUncheckedState = detentionChecked.map((checkValue, id) =>
      id === index ? !checkValue : checkValue
    );

    setDetentionChecked(checkingUncheckedState);
  };

  const promoteStudents = () => {
    if (selectedSession.trim() === "") {
      return toast.error("Select session first");
    }
    var approvalListFinal = [];
    for (let i = 0; i < listOfStudentsApproval.length; i++) {
      if (approvalChecked[i] === true) {
        approvalListFinal.push(listOfStudentsDetention[i]);
      }
    }
    dispatch(promoteStudentToNextSemester(approvalListFinal, selectedSession));
  };

  const detainStudents = () => {
    var detainedListFinal = [];
    for (let i = 0; i < listOfStudentsDetention.length; i++) {
      if (detentionChecked[i] === true) {
        detainedListFinal.push(listOfStudentsDetention[i]);
      }
    }
    dispatch(detainStudentsByHOD(detainedListFinal));
  };

  useEffect(() => {
    if (promoteStudentMessage) {
      toast.success(promoteStudentMessage);
      dispatch(clearMessages());
      dispatch(getAllStudentDetailForHOD());
    }
    if (promoteStudentError) {
      toast.error(promoteStudentError);
      dispatch(clearMessages());
    }
  }, [promoteStudentMessage, promoteStudentError]);

  return (
    <Fragment>
      {sessionsLoading || studentListLoading || promoteStudentLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="promoteStudent">
            <SidebarTeacher role={teacher.subRole} />
            <div className="approvBox">
              <div className="subsection">
            <div>
              <h1>Promote Student</h1>
              <br /><br />
              <div>
                <div>
                  <div className="entry">
                    <label className="label_name">Semester</label>
                    <select
                      className="label_name"
                      required
                      onChange={(e) => setSemester(e.target.value)}>
                      {semesters.map((sem) => (
                        <option key={sem} value={sem}>
                          {sem}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button onClick={getListOfStudents}>Get Student List</button>
                </div>
                <div>
                  {/* {students.length === 0 && (
                    <div>
                      <h5>Nothing to show.</h5>
                    </div>
                  )} */}
                  {students.length > 0 && (
                    <div>
                      <div>
                        <h3 className="entry">To Promote</h3>
                        {listOfStudentsApproval.length === 0 && (
                          <div>
                            <h5>Nothing to show.</h5>
                          </div>
                        )}
                        {listOfStudentsApproval &&
                          listOfStudentsApproval.map((student, i) => (
                            <div key={i} style={{ display: "flex" }}>
                              <input
                                type="checkbox"
                                id={i}
                                onChange={(e) => handleApprovedStudentChange(i)}
                              />
                              <p>{student.name}</p>
                              <p>{student.currentSemester}</p>
                            </div>
                          ))}
                        {listOfStudentsApproval.length > 0 && (
                          <div>
                            <div>
                              <label className="label_name">Session</label>
                              <select
                                className="label_name"
                                required
                                onChange={(e) =>
                                  setSelectedSession(e.target.value)
                                }>
                                {sessions &&
                                  sessions.slice(-2).map((ses, id) => (
                                    <option
                                      key={ses.sessionName}
                                      value={ses.sessionName}>
                                      {ses.sessionName}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <p>*Action cannot be reversed</p>
                            <button onClick={promoteStudents}>Promote</button>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="entry">To Detain</h3>
                        <div className="grid_promote">
                          <p>Select</p>
                          <p>Name</p>
                          <p>Semester</p>
                        </div>
                        {listOfStudentsDetention.length === 0 && (
                          <div>
                            <h5>Nothing to show.</h5>
                          </div>
                        )}
                        {listOfStudentsDetention &&
                          listOfStudentsDetention.map((student, i) => (
                            <div className="grid_promote" key={i} >
                              <input
                                type="checkbox"
                                id={i}
                                onChange={(e) => handleDetainedStudentChange(i)}
                              />
                              <p>{student.name}</p>
                              <p>{student.currentSemester}</p>
                            </div>
                          ))}
                        {listOfStudentsDetention.length > 0 && (
                          <div className="last_promote">
                            <button onClick={detainStudents}>Detain</button>
                            <p>*Action cannot be reversed</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
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

export default PromoteStudent;
