import React, { Fragment, useEffect, useState } from "react";
import "./TeacherList.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import Loader from "../../Loader/Loader";

const TeacherListDetails = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const departments = [
    "Department of Computer Science and Engineering",
    "Department of Information Technology",
    "Department of Electronics & Communication Engineering",
    "Department of Chemical Engineering",
    "Department of Civil Engineering",
    "Department of Mechanical Engineering",
    "Department of Industrial & Production Engineering",
  ];
  const designations = ["Professor", "Assistant Professor", "HOD"];

  const [newName, setNewName] = useState(state.name);
  const [newEmail, setNewEmail] = useState(state.email);
  const [newQualification, setNewQualification] = useState(state.qualification);
  const [newDepartment, setNewDepartment] = useState(state.department);
  const [newDesignation, setNewDesignation] = useState(state.designation);

  return (
    <Fragment>
      <div className="studentListAdmin">
        <SidebarTeacher role={teacher.subRole} />
        <div>
          <h3>Edit Teacher Details</h3>
          <div>
            <div>
              <p>Name</p>
              <input
                type="text"
                placeholder="Name"
                required
                name="nameTeacher"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div>
              <p>E-Mail</p>
              <input
                type="email"
                placeholder="Email"
                required
                name="emailTeacher"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div>
              <p>Qualification</p>
              <input
                type="text"
                placeholder="Qualification"
                required
                name="qualificationTeacher"
                value={newQualification}
                onChange={(e) => setNewQualification(e.target.value)}
              />
            </div>
            <div>
              <p>Department</p>
              <select
                id="label_input"
                required
                name="departmentTeacher"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}>
                {/* <option value="">Department</option> */}
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Designation</p>
              <select
                id="label_input"
                required
                name="designationTeacher"
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}>
                {/* <option value={designationTeacher}>Designation</option> */}
                {designations.map((designation) => (
                  <option key={designation} value={designation}>
                    {designation}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button>Update</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TeacherListDetails;
