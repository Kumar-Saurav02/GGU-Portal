import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StudentListMapping = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editDetails = () => {
    navigate("/studentListDetails", {
      state: data,
    });
  };

  const removeStudent = () => {
    console.log("Deleted");
  };

  return (
    <Fragment>
      <div className="content">
        <div className="col">
          <div className="field">Name </div>
          <div className="field">Enrollment Number</div>
          <div className="field">Roll Number </div>
          <div className="field">Email </div>
        </div>

        <div className="briefinfo">
          <div className="field">{data.name} </div>
          <div className="field">{data.enrollmentNo} </div>
          <div className="field">{data.rollNo} </div>
          <div className="field">{data.email} </div>
        </div>

        <div className="btn_acceptReject">
          <button onClick={editDetails} class="signInbtn border hover">
            Edit
          </button>
          <button onClick={removeStudent} class="signInbtn border hover">
            Remove
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default StudentListMapping;
