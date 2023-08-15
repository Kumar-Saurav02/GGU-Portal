import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  courseAcceptByIncharge,
  courseRejectByIncharge,
} from "../../../../actions/teacherAction";
import "./CourseApproval.css";
import { toast } from "react-toastify";

const CourseApprovalMapping = ({ data, attendanceDetails }) => {
  const dispatch = useDispatch();

  // console.log(attendanceDetails);
  // console.log(data);

  const [attendanceSelect, setAttendanceSelect] = useState("");
  const [attendanceFinder, setAttendanceFinder] = useState();
  const [attendanceSubject, setAttendanceSubject] = useState([]);

  const acceptCourse = () => {
    if (attendanceSelect.trim() === "") {
      toast.error("Select Attendance Option");
    }
    dispatch(
      courseAcceptByIncharge(
        data,
        data._id,
        data.enrollmentNumber,
        attendanceSelect
      )
    );
  };

  const rejectCourse = () => {
    dispatch(courseRejectByIncharge(data._id));
  };

  const attendanceOptions = [
    "Attendance more than 75%",
    "Attendance more than 66%",
  ];

  useEffect(() => {
    for (let i = 0; i < attendanceDetails.length; i++) {
      if (
        attendanceDetails[i].semester.toString() === data.semester.toString()
      ) {
        for (let j = 0; j < attendanceDetails[i].students.length; j++) {
          if (
            attendanceDetails[i].students[j].enrollmentNumber.toString() ===
            data.enrollmentNumber.toString()
          ) {
            setAttendanceFinder(attendanceDetails[i].students[j]);
          }
        }
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (attendanceFinder !== null && attendanceFinder !== undefined) {
      let updatingSubjectsAttendance = [];
      for (let i = 0; i < attendanceFinder.subjects.length; i++) {
        var totalAttendanceForSubject = 0;
        var acquiredAttendanceForSubject = 0;
        for (let j = 0; j < attendanceFinder.subjects[i].months.length; j++) {
          acquiredAttendanceForSubject += Number(
            attendanceFinder.subjects[i].months[j].attendance
          );
          totalAttendanceForSubject += Number(
            attendanceFinder.subjects[i].months[j].totalAttendance
          );
        }
        updatingSubjectsAttendance.push({
          subjectName: attendanceFinder.subjects[i].subjectName,
          totalAttendance: totalAttendanceForSubject,
          acquiredAttendance: acquiredAttendanceForSubject,
          percentageCalculation: Number(
            (acquiredAttendanceForSubject / totalAttendanceForSubject) * 100
          ),
        });
      }
      setAttendanceSubject(updatingSubjectsAttendance);
    }
  }, [attendanceFinder]);

  return (
    <Fragment>
      <div className="content">
        <div className="approvBox">
          <div className="entry">
            <label className="label_name">Enrollment Number</label>
            <p>{data.enrollmentNumber}</p>
          </div>
          <div className="entry">
            <label className="label_name">Name</label>
            <p>{data.name}</p>
          </div>
          <div className="entry">
            <label className="label_name">Semester</label>
            <p>{data.semester}</p>
          </div>
          <div className="entry">
            <label className="label_name">Department</label>
            <p>{data.department}</p>
          </div>
          <div className="showdata">
            <div className="Field_data_val">
              <span>
                <h4>S. No</h4>
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
              <span>
                <h4>Category</h4>
              </span>
              <span>
                <h4>Term</h4>
              </span>
            </div>
            {data.subjects &&
              data.subjects.map((subject, i) => {
                return (
                  <div key={i} className="show_data_val">
                    <span>
                      <h4>{i + 1}</h4>
                    </span>
                    <span>
                      <h4> {subject.subjectName}</h4>
                    </span>
                    <span>
                      <h4> {subject.subjectCode}</h4>
                    </span>
                    <span>
                      <h4> {subject.subjectCredit}</h4>
                    </span>
                    <span>
                      <h4> {subject.category}</h4>
                    </span>
                    <span>
                      <h4> {subject.term} </h4>
                    </span>
                  </div>
                );
              })}
          </div>
          <br></br>
          <br></br>

          <div>
            {attendanceSubject && (
              <div>
                {attendanceSubject &&
                  attendanceSubject.map((attendance) => (
                    <div>
                      <p>Subject: {attendance.subjectName}</p>
                      <p>Attendance: {attendance.acquiredAttendance}</p>
                      <p>Total Attendance: {attendance.totalAttendance}</p>
                      <p>Percentage: {attendance.percentageCalculation}%</p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div>
            <select
              required
              onChange={(e) => setAttendanceSelect(e.target.value)}>
              <option value="">Select Attendance</option>
              {attendanceOptions &&
                attendanceOptions.map((attendance, i) => (
                  <option key={i} value={attendance}>
                    {attendance}
                  </option>
                ))}
            </select>
          </div>

          <div className="btn">
            <button class="signInbtn border hover" onClick={acceptCourse}>
              Accept
            </button>
            <button class="signInbtn border hover" onClick={rejectCourse}>
              Reject
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CourseApprovalMapping;
