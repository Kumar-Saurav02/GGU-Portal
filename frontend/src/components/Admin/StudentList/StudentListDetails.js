import React, { Fragment, useEffect, useState } from "react";
import "./StudentList.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import Loader from "../../Loader/Loader";
import { State } from "country-state-city";

const StudentListDetails = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(state);

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const departments = [
    "Department of Computer Science and Engineering",
    "Department of Information Technology",
    "Department of Electronics & Communication Engineering",
    "Department of Chemical Engineering",
    "Department of Civil Engineering",
    "Department of Mechanical Engineering",
    "Department of Industrial & Production Engineering",
  ];

  const [newName, setNewName] = useState(state.name);
  const [newRollNumber, setNewRollNumber] = useState(state.rollNo);
  const [newAadhar, setNewAadhar] = useState(state.aadharNumber);
  const [newEmail, setNewEmail] = useState(state.email);
  const [newDepartment, setNewDepartment] = useState(state.department);
  const [newSemester, setNewSemester] = useState(state.currentSemester);
  const [newFatherName, setNewFatherName] = useState(state.fatherName);
  const [newMotherName, setNewMotherName] = useState(state.motherName);
  const [newBloodGroup, setNewBloodGroup] = useState(state.bloodGroup);
  const [newLocalAddress, setNewLocalAddress] = useState(
    state.localAddress.address
  );
  const [newLocalState, setNewLocalState] = useState(state.localAddress.state);
  const [newPinCode, setNewPinCode] = useState(state.localAddress.pinCode);
  const [newPermanentAddress, setNewPermanentAddress] = useState(
    state.permanentAddress.address
  );
  const [newPermanentState, setNewPermanentState] = useState(
    state.permanentAddress.state
  );
  const [newPermanentPinCode, setPermanentNewPinCode] = useState(
    state.permanentAddress.pinCode
  );

  const updateData = () => {};

  return (
    <Fragment>
      <div className="studentListAdmin">
        <SidebarTeacher role={teacher.subRole} />
        <div>
          <h3>Edit Student Details</h3>
          <div>
            <div>
              <p>Name</p>
              <input
                type="text"
                placeholder="Name"
                required
                name="nameStudent"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div>
              <p>Roll Number</p>
              <input
                type="number"
                placeholder="Roll Number"
                required
                name="rollNoStudent"
                value={newRollNumber}
                onChange={(e) => setNewRollNumber(e.target.value)}
              />
            </div>
            <div>
              <p>Aadhar Number</p>
              <input
                type="number"
                placeholder="Aadhar Number"
                required
                name="aadharNumberStudent"
                value={newAadhar}
                onChange={(e) => setNewAadhar(e.target.value)}
              />
            </div>
            <div>
              <p>E-mail ID</p>
              <input
                type="email"
                placeholder="Email"
                required
                name="emailStudent"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div>
              <p>Department</p>
              <select
                id="label_input"
                required
                name="departmentStudent"
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
              <p>Semester : {state.currentSemester}</p>
              <select
                id="label_input"
                required
                name="currentSemesterStudent"
                value={newSemester}
                onChange={(e) => setNewSemester(e.target.value)}>
                {/* <option value="">Semester</option> */}
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Father's Name</p>
              <input
                type="text"
                placeholder="Father's Name"
                required
                name="fatherNameStudent"
                value={newFatherName}
                onChange={(e) => setNewFatherName(e.target.value)}
              />
            </div>
            <div>
              <p>Mother's Name</p>
              <input
                type="text"
                placeholder="Mother's Name"
                required
                name="motherNameStudent"
                value={newMotherName}
                onChange={(e) => setNewMotherName(e.target.value)}
              />
            </div>
            <div>
              <p>Blood Group : {state.bloodGroup}</p>
              <select
                required
                name="bloodGroupStudent"
                value={newBloodGroup}
                onChange={(e) => setNewBloodGroup(e.target.value)}>
                {/* <option value="">Blood Group</option> */}
                {bloodGroups.map((bloodGroup) => (
                  <option key={bloodGroup} value={bloodGroup}>
                    {bloodGroup}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p>Local Address</p>
              <p>Address</p>
              <input
                // id="label_input"
                type="text"
                placeholder="Local Address"
                required
                name="localAddressStudent"
                value={newLocalAddress}
                onChange={(e) => setNewLocalAddress(e.target.value)}
              />
              <p>State</p>
              <select
                // required id="label_input"
                name="localStateStudent"
                value={newLocalState}
                onChange={(e) => setNewLocalState(e.target.value)}>
                {/* <option value="">State</option> */}
                {State &&
                  State.getStatesOfCountry("IN").map((item) => (
                    <option key={item.isoCode} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <p>Pin Code</p>
              <input
                // id="label_input"
                type="text"
                placeholder="Pin Code"
                required
                name="localPinCodeStudent"
                value={newPinCode}
                onChange={(e) => setNewPinCode(e.target.value)}
              />
            </div>
            <div>
              <p>Permanent Address</p>
              <p>Address</p>
              <input
                // id="label_input"
                type="text"
                placeholder="Permanent Address"
                required
                name="permanentAddressStudent"
                value={newPermanentAddress}
                onChange={(e) => setNewPermanentAddress(e.target.value)}
              />
              <p>State</p>
              <select
                // required id="label_input"
                name="permanentStateStudent"
                value={newPermanentState}
                onChange={(e) => setNewPermanentState(e.target.value)}>
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry("IN").map((item) => (
                    <option key={item.isoCode} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <p>Pin Code</p>
              <input
                // id="label_input"
                type="text"
                placeholder="Pin Code"
                required
                name="permanentPinCodeStudent"
                value={newPermanentPinCode}
                onChange={(e) => setPermanentNewPinCode(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button onClick={updateData}>Update</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StudentListDetails;
