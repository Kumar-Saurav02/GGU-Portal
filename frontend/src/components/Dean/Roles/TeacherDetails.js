import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearMessages,
  updateTeacherRoleByDean,
} from "../../../actions/adminAction";
import Loader from "../../Loader/Loader";
import './ChangingTeacherRole.css'

const TeacherDetails = ({ key, data }) => {
  const dispatch = useDispatch();

  const updateRole = () => {
    if (role === undefined || role === "") {
      return toast.error("Select Role");
    }
    var updatingRole = "";
    if (role === "Teacher") updatingRole = "teacher";
    if (role === "Class Incharge") updatingRole = "classIncharge";
    if (role === "HOD") updatingRole = "hod";
    dispatch(updateTeacherRoleByDean(updatingRole, data._id));
  };

  const [role, setRole] = useState();
  const roles = ["Teacher", "Class Incharge", "HOD"];

  return (
    <Fragment>
      <div className="subsection">
        <div className="entry">
          <label className="label_name">Employee ID.</label>
          <p>{data.employeeID}</p>
        </div>
        <div className="entry">
          <label className="label_name">Name</label>
          <p>{data.name}</p>
        </div>
        <div className="entry">
          <label className="label_name">Department</label>
          <p>{data.department}</p>
        </div>
        {data.subRole === "hod" && (
          <div className="entry">
            <label className="label_name">Current Designation</label>
            <p>HOD</p>
          </div>
        )}
        {data.subRole === "classIncharge" && (
          <div className="entry">
            <label className="label_name">Current Designation</label>
            <p>Class Incharge</p>
          </div>
        )}
        {data.subRole === "teacher" && (
          <div className="entry">
            <label className="label_name">Current Designation</label>
            <p>Teacher</p>
          </div>
        )}
        <div className="entry">
          <select
            id="label_input"
            required
            onChange={(e) => setRole(e.target.value)}>
            <option value={role}>Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <button className="normal_btn hover border" onClick={updateRole}>
          Update
        </button>
      </div>
    </Fragment>
  );
};

export default TeacherDetails;
