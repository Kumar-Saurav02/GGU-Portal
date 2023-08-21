import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeStudentByAdmin } from "../../../actions/adminAction";
import "./StudentList.css";

const StudentListMapping = ({ data, role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editDetails = () => {
    navigate("/studentListDetails", {
      state: data,
    });
  };

  const removeStudent = () => {
    dispatch(removeStudentByAdmin(data._id));
  };

  return (
    <Fragment>
      <div className="content">
        <div className="col">
          <div className="field">Name </div>
          <div className="field">Enrollment Number</div>
          <div className="field">Roll Number </div>
          <div className="field">Department </div>
        </div>

        <div className="briefinfo">
          <div className="field">{data.name} </div>
          <div className="field">{data.enrollmentNo} </div>
          <div className="field">{data.rollNo} </div>
          <div className="field">{data.department} </div>
        </div>

        <div className="btn_acceptReject">
          <button onClick={editDetails} class="signInbtn btn_ed_rm border hover">
            Edit
          </button>
          {role === "dean" && (
            <button onClick={removeStudent} class="signInbtn btn_ed_rm border hover">
              Remove
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default StudentListMapping;
