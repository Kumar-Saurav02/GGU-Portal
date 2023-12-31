import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./CreateCourse.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourseByHOD,
  getAllSessions,
  getAllSubjects,
} from "../../../../actions/hodAction";
import Loader from "../../../Loader/Loader";
import { clearMessages } from "../../../../actions/adminAction";
import SidebarTeacher from "../../SidebarTeacher/SidebarTeacher";
import { getPresentSession } from "../../../../actions/teacherAction";

const CreateCourse = () => {
  const dispatch = useDispatch();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    loading: courseLoading,
    message,
    error: courseError,
  } = useSelector((state) => state.createCourseByHOD);

  const {
    loading: subjectLoading,
    subjects,
    error: subjectError,
  } = useSelector((state) => state.getAllSubjects);

  const { sessions, loading: sessionsLoading } = useSelector(
    (state) => state.getAllSessions
  );

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const [semester, setSemester] = useState(1);
  const [course, setCourse] = useState([]);
  const [subjectCode, setSubjectCode] = useState();
  const [subjectCategory, setSubjectCategory] = useState("Compulsory");
  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    if (sessions !== null && sessions !== undefined && sessions.length > 0) {
      setSelectedSession(sessions.slice(-2)[0].sessionName);
    } else {
      dispatch(getAllSessions());
    }
  }, [dispatch, sessions]);

  const addingCourseDetail = () => {
    if (subjectCode.trim() === "") {
      return toast.error("Select Subjects Properly");
    }
    const data = subjects.filter(function (d) {
      return d.subjectCode === subjectCode;
    });

    for (let i = 0; i < course.length; i++) {
      if (course[i][1].toString() === subjectCode.toString()) {
        return toast.error("Same subject selected twice");
      }
    }

    setCourse((previous) => [
      ...previous,
      [
        data[0].subjectName,
        subjectCode,
        data[0].subjectCredit,
        subjectCategory,
      ],
    ]);
  };

  const submitCreateCourseDetail = () => {
    if (
      selectedSession !== null &&
      selectedSession !== undefined &&
      selectedSession.trim() === ""
    ) {
      return toast.error("Some error occurred");
    }
    dispatch(createCourseByHOD(selectedSession, semester, course));
  };

  useEffect(() => {
    dispatch(getAllSubjects());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
    }
    if (courseError) {
      toast.error(courseError);
      dispatch(clearMessages());
    }
    if (subjectError) {
      toast.error(subjectError);
      dispatch(clearMessages());
    }
  }, [message, courseError, subjectError]);

  return (
    <Fragment>
      {courseLoading || subjectLoading || sessionsLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="createCourse">
            <SidebarTeacher role={teacher.subRole} />
            <div className="registerBox_more">
              <div className="Data_entry">
                <h2>Create Course</h2>
                <hr></hr>
                <br></br>

                <div className="entry">
                  <label className="label_name" for="{sem}">
                    Session
                  </label>
                  <select
                    className="label_name"
                    required
                    onChange={(e) => setSelectedSession(e.target.value)}>
                    {sessions &&
                      sessions.slice(-2).map((ses, id) => (
                        <option key={ses.sessionName} value={ses.sessionName}>
                          {ses.sessionName}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="entry">
                  <label className="label_name" for="{sem}">
                    Semester
                  </label>
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
                <div className="entry">
                  <label className="label_name" for="{sem}">
                    Department
                  </label>
                  <p>{teacher.department}</p>
                </div>
                <div className="entry">
                  <label className="label_name" for="{sem}">
                    Subject Name
                  </label>
                  <select
                    className="label_name"
                    required
                    onChange={(e) => setSubjectCode(e.target.value)}>
                    <option>Subjects</option>
                    {subjects &&
                      subjects.map((sub) => (
                        <option key={sub._id} value={sub.subjectCode}>
                          {sub.subjectName} - {sub.subjectCode}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="entry">
                  <label className="label_name" for="{subjectCategory}">
                    Subject Category
                  </label>
                  <input
                    className="label_name"
                    type="text"
                    placeholder="Subject Category"
                    disabled
                    required
                    value={subjectCategory}
                    onChange={(e) => setSubjectCategory(e.target.value)}
                  />
                </div>
                <br></br>

                <div className="btn">
                  <button
                    className="normal_sb_btn border hover"
                    onClick={addingCourseDetail}>
                    Add Course
                  </button>
                </div>
                <br></br>

                <div>
                  <table>
                    <tr>
                      <th className="tble">Subject Name</th>
                      <th className="tble">Subject Code</th>
                      <th className="tble">Subject Credit</th>
                      <th className="tble">Category</th>
                    </tr>
                    {course &&
                      course.map((cou, i) => (
                        <tr key={i}>
                          <td className="tble">{cou[0]}</td>
                          <td className="tble">{cou[1]}</td>
                          <td className="tble">{cou[2]}</td>
                          <td className="tble">{cou[3]}</td>
                        </tr>
                      ))}
                  </table>
                  {course && course.length === 0 && (
                    <div>
                      <h2>No subject selected</h2>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    className="normal_sb_btn border hover"
                    onClick={submitCreateCourseDetail}>
                    Create Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateCourse;
