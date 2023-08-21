import React, { Fragment, useEffect, useState } from "react";
import "./MarksEntry.css";

import SidebarTeacher from "../SidebarTeacher/SidebarTeacher";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseSubjectsList,
  getStudentSemesterDepartment,
} from "../../../actions/studentAction";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import { clearMessages } from "../../../actions/adminAction";
import {
  getMarksDetailBySubject,
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
    subjects,
    loading: subjectListsLoading,
    error: subjectListError,
  } = useSelector((state) => state.getCourseSubjectsList);

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

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  // const departments = [
  //   "Department of Computer Science and Engineering",
  //   "Department of Information Technology",
  //   "Department of Electronics & Communication Engineering",
  //   "Department of Chemical Engineering",
  //   "Department of Civil Engineering",
  //   "Department of Mechanical Engineering",
  //   "Department of Industrial & Production Engineering",
  // ];
  const [semester, setSemester] = useState(1);
  const [listOfSubjects, setListOfSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [loadInput, setLoadInput] = useState(false);
  const [marksClassTest1, setMarksClassTest1Student] = useState([]);
  const [marksClassTest2, setMarksClassTest2Student] = useState([]);
  const [marksEndSemester, setMarksEndSemesterStudent] = useState([]);

  const handleChangeMarksClassTest1 = (i, e) => {
    const values = [...marksClassTest1];
    values[i] = e.target.value;
    setMarksClassTest1Student(values);
  };
  const handleChangeMarksClassTest2 = (i, e) => {
    const values = [...marksClassTest2];
    values[i] = e.target.value;
    setMarksClassTest2Student(values);
  };
  const handleChangeMarksEndSemester = (i, e) => {
    const values = [...marksEndSemester];
    values[i] = e.target.value;
    setMarksEndSemesterStudent(values);
  };

  const submitMarks = () => {
    if (subject === undefined || subject.trim() === "") {
      return toast.error("Select Subject");
    }
    var allDetails = [];
    for (let j = 0; j < studentDetails.length; j++) {
      if (
        Number(marksClassTest1[j]) < 0 ||
        Number.isNaN(marksClassTest1[j]) === true ||
        Number(marksClassTest1[j]) > 15
      ) {
        return toast.error(
          `${studentDetails[j].name} Marks Of Class Test 1 Is Not Filled Properly`
        );
      }
      if (
        Number(marksClassTest2[j]) < 0 ||
        Number.isNaN(marksClassTest2[j]) === true ||
        Number(marksClassTest2[j]) > 15
      ) {
        return toast.error(
          `${studentDetails[j].name} Marks Of Class Test 2 Is Not Filled Properly`
        );
      }
      if (
        Number(marksEndSemester[j]) < 0 ||
        Number.isNaN(marksEndSemester[j]) === true ||
        Number(marksEndSemester[j]) > 70
      ) {
        return toast.error(
          `${studentDetails[j].name} Marks Of End Semester Is Not Filled Properly`
        );
      }
      allDetails.push({
        name: studentDetails[j].name,
        rollNumber: studentDetails[j].rollNo,
        enrollmentNumber: studentDetails[j].enrollmentNo,
        subjectName: subject,
        classTest1: Number(marksClassTest1[j]),
        classTest2: Number(marksClassTest2[j]),
        endSemester: Number(marksEndSemester[j]),
      });
    }

    dispatch(
      marksEntryBySubjectTeacher(semester, teacher.department, allDetails)
    );
  };

  const getStudentListForMarks = () => {
    if (semester.trim() === "" || teacher.department.trim() === "") {
      return toast.error("Select semester and department properly");
    }
    dispatch(getStudentSemesterDepartment(semester, teacher.department));
    dispatch(getCourseSubjectsList(semester, teacher.department));
  };

  useEffect(() => {
    if (
      studentDetails !== null &&
      subjects !== null &&
      studentDetails !== undefined &&
      subjects !== undefined &&
      studentDetails.length > 0 &&
      subjects.length > 0
    ) {
      let tempSubjects = [];
      for (let i = 0; i < subjects.length; i++) {
        for (let j = 0; j < teacher.assignSubject.length; j++) {
          if (
            teacher.assignSubject[j].subjectCode.toString() ===
            subjects[i].subjectCode.toString()
          ) {
            tempSubjects.push(subjects[i]);
          }
        }
      }
      setListOfSubjects(tempSubjects);
      setLoadInput(true);
    }
  }, [subjects, studentDetails]);

  useEffect(() => {
    if (studentDetailsError) {
      toast.error(studentDetailsError);
      dispatch(clearMessages());
    }
    if (subjectListError) {
      toast.error(subjectListError);
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
    subjectListError,
    marksSubmissionError,
    marksSubmissionMessage,
    marksDetailsError,
  ]);

  useEffect(() => {
    if (teacher.department.trim() !== "" && subject.trim() !== "") {
      dispatch(getMarksDetailBySubject(semester, teacher.department, subject));
    }
  }, [subject]);

  useEffect(() => {
    if (
      marksDetails !== undefined &&
      marksDetails !== null &&
      Object.keys(marksDetails).length !== 0
    ) {
      var ct1 = [],
        ct2 = [],
        endSem = [];
      for (let x = 0; x < marksDetails.students.length; x++) {
        for (let y = 0; y < marksDetails.students[x].subjects.length; y++) {
          if (
            marksDetails.students[x].subjects[y].subjectName
              .trim()
              .toString() === subject.trim().toString()
          ) {
            ct1[x] = marksDetails.students[x].subjects[y].classTest1;
            ct2[x] = marksDetails.students[x].subjects[y].classTest2;
            endSem[x] = marksDetails.students[x].subjects[y].endSemester;
            break;
          } else {
            ct1[x] = 0;
            ct2[x] = 0;
            endSem[x] = 0;
          }
        }
      }
      setMarksClassTest1Student(ct1);
      setMarksClassTest2Student(ct2);
      setMarksEndSemesterStudent(endSem);
    } else if (
      studentDetails !== null &&
      subjects !== null &&
      studentDetails !== undefined &&
      subjects !== undefined &&
      studentDetails.length > 0 &&
      subjects.length > 0
    ) {
      var ct1 = [],
        ct2 = [],
        endSem = [];
      for (let i = 0; i < studentDetails.length; i++) {
        ct1[i] = 0;
        ct2[i] = 0;
        endSem[i] = 0;
      }
      setMarksClassTest1Student(ct1);
      setMarksClassTest2Student(ct2);
      setMarksEndSemesterStudent(endSem);
    }
  }, [marksDetails]);

  return (
    <Fragment>
      {studentsListLoading ||
      subjectListsLoading ||
      marksSubmissionLoading ||
      marksDetailsLoading ? (
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
                <div className="entry">
                  <label className="label_name" for="">
                    Semester
                  </label>
                  <select
                    id="label_input"
                    required
                    onChange={(e) => setSemester(e.target.value)}>
                    <option>Semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
                <div div className="entry">
                  <label className="label_name" for="">
                    Semester
                  </label>
                  <p>{teacher.department}</p>
                </div>
                <br></br>
                <div className="btn">
                  <button
                    className="normal_sb_btn border hover"
                    onClick={getStudentListForMarks}>
                    Get Students Lists
                  </button>
                </div>
              </div>
              {loadInput && (
                <div>
                  <div>
                    <h3>Semester : {semester}</h3>
                    <h3>Department : {teacher.department}</h3>
                  </div>
                  <div>
                    <h2>LIST OF SUBJECTS</h2>
                    <div>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}>
                        <option>Subjects</option>
                        {listOfSubjects &&
                          listOfSubjects.map((sub, i) => (
                            <option key={i} value={sub.subjectName}>
                              {sub.subjectName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <p>*Select subject to load previous data</p>
                  </div>

                  <div>
                    {studentDetails &&
                      studentDetails.sort(function (a, b) {
                        return a.rollNo - b.rollNo;
                      }) &&
                      studentDetails.map((sub, i) => (
                        <div>
                          <p>{sub.name}</p>
                          <p>{sub.rollNo}</p>
                          <input
                            type="number"
                            placeholder="Enter Marks CT1"
                            value={marksClassTest1[i]}
                            onChange={(e) => handleChangeMarksClassTest1(i, e)}
                          />
                          <input
                            type="number"
                            placeholder="Enter Marks CT2"
                            value={marksClassTest2[i]}
                            onChange={(e) => handleChangeMarksClassTest2(i, e)}
                          />
                          <input
                            type="number"
                            placeholder="Enter Marks End Semester"
                            value={marksEndSemester[i]}
                            onChange={(e) => handleChangeMarksEndSemester(i, e)}
                          />
                        </div>
                      ))}
                  </div>
                  <button onClick={submitMarks}>Submit Marks</button>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MarksEntry;
