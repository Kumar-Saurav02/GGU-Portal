import React, { Fragment, useEffect, useState } from "react";
import "./DetentionStudent.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { promoteStudentFromDetentionByHOD } from "../../../../actions/hodAction";

const DetentionStudentList = ({ data, sessions }) => {
  const dispatch = useDispatch();

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const [semester, setSemester] = useState(data.currentSemester);
  const [selectedSession, setSelectedSession] = useState("");
  useEffect(() => {
    if (sessions !== null && sessions !== undefined && sessions.length > 0) {
      setSelectedSession(sessions.slice(-2)[0].sessionName);
    }
  });

  const promoteStudentFromDetain = () => {
    console.log(selectedSession);
    //     dispatch(promoteStudentFromDetentionByHOD(data._id,selectedSession));
  };
  return (
    <Fragment>
      <div>
        <p>Enrollment Number: {data.enrollmentNo}</p>
        <p>Roll Number: {data.rollNo}</p>
        <p>Name: {data.name}</p>
        <h4>To:</h4>
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
        <button onClick={promoteStudentFromDetain}>Promote</button>
      </div>
      <br></br>
    </Fragment>
  );
};

export default DetentionStudentList;
