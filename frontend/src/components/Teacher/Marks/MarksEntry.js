import React, { Fragment, useEffect, useState } from "react";
import "./MarksEntry.css";

import SidebarTeacher from "../SidebarTeacher/SidebarTeacher";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseSubjectsList,
  getStudentSemesterDepartment,
} from "../../../actions/studentAction";
import { getAllSessions } from "../../../actions/hodAction";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { clearMessages } from "../../../actions/adminAction";
import {
  getCourseSubjectsForMarks,
  marksEntryBySubjectTeacher,
} from "../../../actions/teacherAction";

const MarksEntry = () => {
  const dispatch = useDispatch();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    loading: studentsListLoading,
    students: studentDetails,
    error: studentDetailsError,
  } = useSelector((state) => state.getStudentsBaseOnSemesterAndDepartment);

  const {
    loading: marksDetailsLoading,
    marksDetails,
    error: marksDetailsError,
  } = useSelector((state) => state.getMarksEntryBySubject);

  const {
    loading: marksSubmissionLoading,
    message: marksSubmissionMessage,
    error: marksSubmissionError,
  } = useSelector((state) => state.submitMarksEntryBySubjectTeacher);

  const {
    loading: subjectsLoading,
    subjects,
    marksList,
    error: subjectsError,
  } = useSelector((state) => state.getCourseSubjectsForMarks);

  const { sessions, loading: sessionsLoading } = useSelector(
    (state) => state.getAllSessions
  );

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const [semester, setSemester] = useState(1);
  const [listOfSubjects, setListOfSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [loadInput, setLoadInput] = useState(false);
  const [marksClassTest1, setMarksClassTest1Student] = useState([]);
  const [marksClassTest2, setMarksClassTest2Student] = useState([]);
  const [marksEndSemester, setMarksEndSemesterStudent] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [courseSubjects, setCourseSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubjectMarks, setSelectedSubjectMarks] = useState();
  const [classTest1File, setClassTest1File] = useState("");
  const [classTest1Preview, setClassTest1Preview] = useState("");
  const [classTest2File, setClassTest2File] = useState("");
  const [classTest2Preview, setClassTest2Preview] = useState("");
  const [endSemesterFile, setEndSemesterFile] = useState("");
  const [endSemesterPreview, setEndSemesterPreview] = useState("");

  useEffect(() => {
    if (sessions !== null && sessions !== undefined && sessions.length > 0) {
      setSelectedSession(sessions.slice(-2)[0].sessionName);
    } else {
      dispatch(getAllSessions());
    }
  }, [dispatch, sessions]);

  useEffect(() => {
    if (studentDetailsError) {
      toast.error(studentDetailsError);
      dispatch(clearMessages());
    }
    if (marksSubmissionError) {
      toast.error(marksSubmissionError);
      dispatch(clearMessages());
    }
    if (marksSubmissionMessage) {
      toast.success(marksSubmissionMessage);
      dispatch(clearMessages());
      setMarksClassTest1Student([]);
    }
    if (marksDetailsError) {
      toast.error(marksDetailsError);
      dispatch(clearMessages());
    }
  }, [
    studentDetailsError,
    marksSubmissionError,
    marksSubmissionMessage,
    marksDetailsError,
  ]);

  useEffect(() => {
    if (
      subjects !== null &&
      subjects !== undefined &&
      teacher !== null &&
      teacher !== undefined
    ) {
      var assignedSubjectsList = [];
      for (let i = 0; i < subjects.length; i++) {
        for (let j = 0; j < teacher.assignSubject.length; j++) {
          if (
            teacher.assignSubject[j].subjectCode.toString() ===
            subjects[i].subjectCode.toString()
          ) {
            assignedSubjectsList.push(subjects[i]);
          }
        }
      }
      setCourseSubjects(assignedSubjectsList);
    }
  }, [subjects]);

  useEffect(() => {
    //use session and semester and get course list usme se subject match
  }, []);

  const getSubjectsForCourse = () => {
    dispatch(getCourseSubjectsForMarks(selectedSession, semester));
  };

  const handleChangeSelectedSubject = (e) => {
    setSelectedSubject(
      e.target.options[e.target.selectedIndex].dataset.complete !== null &&
        e.target.options[e.target.selectedIndex].dataset.complete !== undefined
        ? JSON.parse(e.target.options[e.target.selectedIndex].dataset.complete)
        : null
    );
  };

  useEffect(() => {
    let flag = 0;
    if (selectedSubject !== null && selectedSubject !== undefined) {
      for (let i = 0; i < marksList.length; i++) {
        if (
          marksList[i].subjectCode.toString() ===
          selectedSubject.subjectCode.toString()
        ) {
          flag = 1;
          setSelectedSubjectMarks(marksList[i]);
          break;
        }
      }
    }
    if (flag === 0) setSelectedSubjectMarks(null);
  }, [selectedSubject]);

  const uploadingMarksForExams = (e) => {
    if (e.target.name === "classTest1") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setClassTest1File(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setClassTest1Preview(e.target.value);
    } else if (e.target.name === "classTest2") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setClassTest2File(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setClassTest2Preview(e.target.value);
    } else if (e.target.name === "endSemester") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setEndSemesterFile(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setEndSemesterPreview(e.target.value);
    }
  };

  const updateMarkDetails = () => {
    if (selectedSubject === null) {
      return toast.error("Select Subject");
    }
    var settingClassTest1 = null,
      settingClassTest2 = null,
      settingEndSemester = null;
    if (classTest1File.trim() !== "") {
      settingClassTest1 = classTest1File;
    }
    if (classTest2File.trim() !== "") {
      settingClassTest2 = classTest2File;
    }
    if (endSemesterFile.trim() !== "") {
      settingEndSemester = endSemesterFile;
    }
    dispatch(
      marksEntryBySubjectTeacher(
        selectedSession,
        semester,
        selectedSubject,
        settingClassTest1,
        settingClassTest2,
        settingEndSemester
      )
    );
  };

  const getStudentListForMarks = () => {};

  return (
    <Fragment>
      {studentsListLoading ||
      marksSubmissionLoading ||
      marksDetailsLoading ||
      sessionsLoading ||
      subjectsLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="marksEntry">
            <SidebarTeacher role={teacher.subRole} />
            <div className="approvBox">
              <div className="subsection">
                <h1>Mark's Entry</h1>
                <hr></hr>
                <br></br>
                <div>
                  <div>
                    <div className="entry">
                      <label className="label_name">Session</label>
                      <select
                        className="label_name"
                        required
                        onChange={(e) => setSelectedSession(e.target.value)}>
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
                    <div>
                      <button onClick={getSubjectsForCourse}>
                        Get Subjects
                      </button>
                    </div>
                  </div>
                  <div>
                    {subjects && courseSubjects && (
                      <div>
                        {courseSubjects.length === 0 && (
                          <div>
                            <p>No alloted subjects in current semester.</p>
                          </div>
                        )}
                        {courseSubjects.length > 0 && (
                          <div>
                            <label className="label_name">Subjects</label>
                            <select
                              className="label_name"
                              required
                              value={
                                selectedSubject !== null &&
                                selectedSubject !== undefined &&
                                selectedSubject.subjectName !== null &&
                                selectedSubject.subjectName !== undefined
                                  ? selectedSubject.subjectName
                                  : ""
                              }
                              onChange={handleChangeSelectedSubject}>
                              <option value="">Subjects</option>
                              {courseSubjects &&
                                courseSubjects.map((subject, id) => (
                                  <option
                                    key={subject.subjectCode}
                                    value={subject.subjectName}
                                    data-complete={
                                      subject !== null && subject !== undefined
                                        ? JSON.stringify(subject)
                                        : null
                                    }>
                                    {subject.subjectName}
                                  </option>
                                ))}
                            </select>
                            <div>
                              {selectedSubject !== null && (
                                <div>
                                  <div>
                                    <div>
                                      <p>Class Test 1 Marks</p>
                                      {selectedSubjectMarks !== null &&
                                        selectedSubjectMarks.detailsOfMarks
                                          .classTest1 !== undefined && (
                                          <div>
                                            <p>Previous:-</p>
                                            <a
                                              href={
                                                selectedSubjectMarks
                                                  .detailsOfMarks.classTest1.url
                                              }>
                                              View
                                            </a>
                                          </div>
                                        )}
                                      <input
                                        type="file"
                                        required
                                        name="classTest1"
                                        value=""
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        onChange={uploadingMarksForExams}
                                      />
                                      <p>File Chosen:- {classTest1Preview}</p>
                                    </div>
                                    <div>
                                      <p>Class Test 2 Marks</p>
                                      {selectedSubjectMarks !== null &&
                                        selectedSubjectMarks.detailsOfMarks
                                          .classTest2 !== undefined && (
                                          <div>
                                            <p>Previous:-</p>
                                            <a
                                              href={
                                                selectedSubjectMarks
                                                  .detailsOfMarks.classTest2.url
                                              }>
                                              View
                                            </a>
                                          </div>
                                        )}
                                      <input
                                        type="file"
                                        required
                                        name="classTest2"
                                        value=""
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        onChange={uploadingMarksForExams}
                                      />
                                      <p>File Chosen:- {classTest2Preview}</p>
                                    </div>
                                    <div>
                                      <p>End Semester Marks</p>
                                      {selectedSubjectMarks !== null &&
                                        selectedSubjectMarks.detailsOfMarks
                                          .endSemester !== undefined && (
                                          <div>
                                            <p>Previous:-</p>
                                            <a
                                              href={
                                                selectedSubjectMarks
                                                  .detailsOfMarks.endSemester
                                                  .url
                                              }>
                                              View
                                            </a>
                                          </div>
                                        )}
                                      <input
                                        type="file"
                                        required
                                        name="endSemester"
                                        value=""
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        onChange={uploadingMarksForExams}
                                      />
                                      <p>File Chosen:- {endSemesterPreview}</p>
                                    </div>
                                    <div>
                                      <button onClick={updateMarkDetails}>
                                        Update
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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

export default MarksEntry;
