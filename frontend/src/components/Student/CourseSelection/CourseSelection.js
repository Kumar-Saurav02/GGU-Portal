import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIfCourseIsSentForApproval,
  getCourseForStudent,
  submitCourse,
} from "../../../actions/studentAction";
import { getPresentSession } from "../../../actions/teacherAction";
import Loader from "../../Loader/Loader";
import "./CourseSelection.css";
import "../StudentScholarship/StudentScholarship.css";
import SidebarStudent from "../SidebarStudent/SidebarStudent";
import { clearMessages } from "../../../actions/adminAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CourseSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { course, loading: courseLoading } = useSelector(
    (state) => state.courseForStudents
  );

  const {
    isPresent,
    message: approvalMessage,
    loading: approvalLoading,
    error: approvalError,
  } = useSelector(
    (state) => state.checkIfCourseIsSentForApprovalToClassIncharge
  );

  const {
    student,
    loading: studentLoading,
    isAuthenticated,
  } = useSelector((state) => state.registerLoginStudents);

  const {
    loading: uploading,
    message,
    error,
  } = useSelector((state) => state.marksFeesCourseUpdate);

  const [courseSelected, setCourseSelected] = useState(false);
  const [credits, setCredits] = useState(0);
  const [courseChecked, setCourseChecked] = useState([]);
  const [undertakingChecked, setUndertakingChecked] = useState(false);
  const [sentForApproval, setSentForApproval] = useState();

  useEffect(() => {
    setSentForApproval(approvalMessage);
  }, [approvalMessage]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
      navigate("/studentProfile");
    }
  }, [error, message]);

  useEffect(() => {
    dispatch(getCourseForStudent(student.currentSession));
    dispatch(checkIfCourseIsSentForApproval());

    if (
      student !== undefined &&
      student.courseSelected &&
      student.courseSelected.length != 0
    ) {
      for (let i = 0; i < student.courseSelected.length; i++) {
        if (
          student.courseSelected[i].semester.toString() ===
          student.currentSemester.toString()
        ) {
          setCourseSelected(true);
        }
      }
    }
  }, [student]);

  const submitCourseDetails = () => {
    if (undertakingChecked === false) {
      return toast.error("Select the undertaking");
    }
    const checkingUncheckedState = [];
    if (courseChecked) {
      for (let i = 0; i < courseChecked.length; i++) {
        if (courseChecked[i] === false) {
          return toast.error("Please select all subjects");
        }
        checkingUncheckedState[i] = false;
      }
    }
    setCourseChecked(checkingUncheckedState);
    setUndertakingChecked(false);
    dispatch(submitCourse(course, student.currentSession));
  };

  useEffect(() => {
    if (
      credits === 0 &&
      course !== null &&
      course !== undefined &&
      course.courses !== undefined &&
      course.courses
    ) {
      var totalCredits = 0;
      var checkedBoxTemp = [];
      for (let i = 0; i < course.courses.length; i++) {
        checkedBoxTemp[i] = false;
        totalCredits += course.courses[i].subjectCredit;
      }
      setCredits(totalCredits);
    }
    setCourseChecked(checkedBoxTemp);
  }, [course]);

  const handleCourseSelectChange = (index) => {
    const checkingUncheckedState = courseChecked.map((checkValue, id) =>
      id === index ? !checkValue : checkValue
    );

    setCourseChecked(checkingUncheckedState);
  };

  return (
    <Fragment>
      {courseLoading || studentLoading || uploading || approvalLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="courseSelectionMain">
            <SidebarStudent />
            <div className="course_Selection_full">
              <h1>Course Selection</h1>
              {courseSelected === false && sentForApproval === undefined && (
                <div className="courseSelection">
                  <div className="detailsOfStudent">
                    <p>Name: {student.name}</p>
                    <p>Enrollment Number: {student.enrollmentNo}</p>
                    <p>Current Semester: {student.currentSemester}</p>
                  </div>
                  <div className="courseDetails">
                    <h2>Courses</h2>
                    <div>
                      <div className="showdata">
                        <div className="grid_container heading_name">
                          <span>
                            <h3>S. No</h3>
                          </span>
                          <span>
                            <h3>Select</h3>
                          </span>
                          <span>
                            <h3>Subject Name</h3>
                          </span>
                          <span>
                            <h3>Subject Code</h3>
                          </span>
                          <span>
                            <h3>Credits</h3>
                          </span>
                          <span>
                            <h3>Category</h3>
                          </span>
                          <span>
                            <h3>Term</h3>
                          </span>
                        </div>

                        {course &&
                          course.courses &&
                          course.courses.map((courses, i) => {
                            return (
                              <div key={i} className="grid_container">
                                <span>
                                  <h4>{i + 1}</h4>
                                </span>
                                <span>
                                  <input
                                    type="checkbox"
                                    id={i}
                                    onChange={(e) =>
                                      handleCourseSelectChange(i)
                                    }
                                  />
                                </span>
                                <span className="sub_left">
                                  <h4> {courses.subjectName}</h4>
                                </span>
                                <span>
                                  <h4> {courses.subjectCode}</h4>
                                </span>
                                <span>
                                  <h4> {courses.subjectCredit}</h4>
                                </span>
                                <span>
                                  <h4> {courses.category}</h4>
                                </span>
                                <span>
                                  <h4> {student.currentSemester} Semester</h4>
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  {student.currentSemester !== "1" ||
                    (student.currentSemester !== "2" && (
                      <div className="backSubjects">
                        <h2>Back Subjects</h2>
                        <div>
                          {student.backSubject &&
                          student.backSubject.length === 0 ? (
                            <p>No active backlogs</p>
                          ) : (
                            <div className="showdata">
                              <div className="Field_data_val">
                                <span>
                                  <h4>S. No</h4>
                                </span>
                                <span>
                                  <h4>Select</h4>
                                </span>
                                <span>
                                  <h4>Subject Name</h4>
                                </span>
                                <span>
                                  <h4>Subject Code</h4>
                                </span>
                                <span>
                                  <h4>Credits</h4>
                                </span>
                              </div>
                              {student.backSubject &&
                                student.backSubject.map((back, i) => (
                                  <div key={i} className="show_data_val">
                                    <span>
                                      <h4> {back.semester}</h4>
                                    </span>
                                    <span>
                                      <h4>{back.subjectName} </h4>
                                    </span>
                                    <span>
                                      <h4>{back.subjectCode} </h4>
                                    </span>
                                    <span>
                                      <h4>{back.subjectCredit} </h4>
                                    </span>
                                  </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                  <div className="course_selection_below">
                    <h4 className="mr_CS">Total Credits : </h4>
                    <p>{credits}</p>
                  </div>

                  <div>
                    <div>
                      <div className="course_selection_below">
                        <input
                          className="mr_CS"
                          type="checkbox"
                          onChange={(e) =>
                            setUndertakingChecked(!undertakingChecked)
                          }
                        />
                        <p>
                          I hereby declare that the entries made by me in the
                          aforesaid form are complete and true to the best of my
                          knowledge.
                        </p>
                      </div>
                      <button onClick={submitCourseDetails}>
                        Submit Course
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {(courseSelected || sentForApproval !== undefined) && (
                <div>
                  <h3>Course is already submitted for current semester.</h3>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CourseSelection;
