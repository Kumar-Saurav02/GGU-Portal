import React, { Fragment, useEffect, useState } from "react";
import "./StudentList.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import Loader from "../../Loader/Loader";
import { State } from "country-state-city";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import {
  clearMessages,
  updateStudentDataByDeanOrHOD,
} from "../../../actions/adminAction";

const StudentListDetails = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);
  const { loading, message, error } = useSelector(
    (state) => state.updateStudentsDataByDeanOrHOD
  );

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
      navigate("/studentsList");
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);

  const genders = ["Male", "Female"];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const religions = ["Hindu", "Christians", "Sikh", "Muslim", "Jain", "Others"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const categories = ["OPEN", "OBC", "OBC(NCL)", "SC", "ST", "EWS"];
  const yesNo = ["Yes", "No"];
  const departments = [
    "Department of Computer Science and Engineering",
    "Department of Information Technology",
    "Department of Electronics & Communication Engineering",
    "Department of Chemical Engineering",
    "Department of Civil Engineering",
    "Department of Mechanical Engineering",
    "Department of Industrial & Production Engineering",
  ];
  const courses = ["Bachelor's Of Technology"];

  const [newName, setNewName] = useState(state.name);
  const [newEnrollmentNumber, setNewEnrollmentNumber] = useState(
    state.enrollmentNo
  );
  const [newRollNumber, setNewRollNumber] = useState(state.rollNo);
  const [newAadhar, setNewAadhar] = useState(state.aadharNumber);
  const [newEmail, setNewEmail] = useState(state.email);
  const [newCourse, setNewCourse] = useState(state.course);
  const [newDepartment, setNewDepartment] = useState(state.department);
  const [newSemester, setNewSemester] = useState(state.currentSemester);
  const [newFatherName, setNewFatherName] = useState(state.fatherName);
  const [newMotherName, setNewMotherName] = useState(state.motherName);
  const [newBloodGroup, setNewBloodGroup] = useState(state.bloodGroup);
  const [newGender, setNewGender] = useState(state.gender);
  const [newReligion, setNewReligion] = useState(state.religion);
  const [newCategory, setNewCategory] = useState(state.category);
  const [newHosteler, setNewHosteler] = useState(state.hosteler);
  const [newYearOfJoining, setNewYearOfJoining] = useState(state.yearOfJoining);
  const [newCurrentSession, setNewCurrentSession] = useState(
    state.currentSession
  );
  const [newDateOfBirthStudent, setNewDateOfBirthStudent] = useState(
    state.dateOfBirth
  );
  const [settingNewDateOfBirthStudent, setSettingNewDateOfBirthStudent] =
    useState();
  const [newPhysicallyHandicapped, setNewPhysicallyHandicapped] = useState(
    state.physicallyHandicapped
  );
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

  useEffect(() => {
    if (
      settingNewDateOfBirthStudent !== undefined &&
      settingNewDateOfBirthStudent !== null
    ) {
      const updatingDateOfBirth = settingNewDateOfBirthStudent.$d
        .toString()
        .split(" ");
      const updatedDateOfBirth =
        updatingDateOfBirth[1] +
        " " +
        updatingDateOfBirth[2] +
        " " +
        updatingDateOfBirth[3];
      setNewDateOfBirthStudent(updatedDateOfBirth);
    }
  }, [settingNewDateOfBirthStudent]);

  const updateData = (e) => {
    e.preventDefault();

    if (newEnrollmentNumber.toString().trim() === "") {
      return toast.error("Fill the enrollment number");
    }
    if (newRollNumber.toString().trim() === "") {
      return toast.error("Fill the roll number");
    }
    if (newName.toString().trim() === "") {
      return toast.error("Fill the name");
    }
    if (newFatherName.toString().trim() === "") {
      return toast.error("Fill the father's name");
    }
    if (newMotherName.toString().trim() === "") {
      return toast.error("Fill the mother's name");
    }
    if (newSemester.toString().trim() === "") {
      return toast.error("Select current semester");
    }
    if (newEmail.toString().trim() === "") {
      return toast.error("Fill the email");
    }
    if (newGender.toString().trim() === "") {
      return toast.error("Select your gender");
    }
    if (newDepartment.toString().trim() === "") {
      return toast.error("Select your department");
    }
    if (newCourse.toString().trim() === "") {
      return toast.error("Select your course");
    }
    if (newReligion.toString().trim() === "") {
      return toast.error("Select your religion");
    }
    if (newBloodGroup.toString().trim() === "") {
      return toast.error("Select your blood Group");
    }
    if (newCategory.toString().trim() === "") {
      return toast.error("Select your category");
    }
    if (newPhysicallyHandicapped.toString().trim() === "") {
      return toast.error("Select your handicapped status");
    }
    if (newYearOfJoining.toString().trim() === "") {
      return toast.error("Fill year of joining properly");
    }
    if (newCurrentSession.toString().trim() === "") {
      return toast.error("Select your current session");
    }
    if (
      newAadhar.toString().trim() === "" ||
      newAadhar.toString().length !== 12
    ) {
      return toast.error("Aadhar number should be of 12 digits");
    }
    if (newHosteler.toString().trim() === "") {
      return toast.error("Select your hosteler identity");
    }
    if (newLocalAddress.toString().trim() === "") {
      return toast.error("Fill your local address properly");
    }
    if (newLocalState.toString().trim() === "") {
      return toast.error("Fill your local address properly");
    }
    if (
      newPinCode.toString().trim() === "" ||
      newPinCode.toString().length !== 6
    ) {
      return toast.error("Pin Code should be of 6 length");
    }
    if (newPermanentAddress.toString().trim() === "") {
      return toast.error("Fill your permanent address properly");
    }
    if (newPermanentState.toString().trim() === "") {
      return toast.error("Fill your permanent address properly");
    }
    if (
      newPermanentPinCode.toString().trim() === "" ||
      newPermanentPinCode.toString().length !== 6
    ) {
      return toast.error("Pin Code should be of 6 length");
    }

    dispatch(
      updateStudentDataByDeanOrHOD(
        state._id,
        newEnrollmentNumber.toString().toString().trim(),
        newRollNumber.toString().trim(),
        newName.toString().trim(),
        newFatherName.toString().trim(),
        newMotherName.toString().trim(),
        newSemester.toString().trim(),
        newEmail.toString().trim(),
        newGender.toString().trim(),
        newDepartment.toString().trim(),
        newCourse.toString().trim(),
        newReligion.toString().trim(),
        newBloodGroup.toString().trim(),
        newCategory.toString().trim(),
        newPhysicallyHandicapped.toString().trim(),
        newAadhar.toString().trim(),
        newHosteler.toString().trim(),
        newYearOfJoining.toString().trim(),
        newCurrentSession.toString().trim(),
        newLocalAddress.toString().trim(),
        newLocalState.toString().trim(),
        newPinCode.toString().trim(),
        newPermanentAddress.toString().trim(),
        newPermanentState.toString().trim(),
        newPermanentPinCode.toString().trim(),
        newDateOfBirthStudent.toString().trim()
      )
    );
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
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
                  <p>Enrollment Number</p>
                  <input
                    type="text"
                    placeholder="EnrollmentNumber"
                    required
                    name="nameStudent"
                    value={newEnrollmentNumber}
                    onChange={(e) => setNewEnrollmentNumber(e.target.value)}
                  />
                </div>
                <div>
                  <p>Roll Number</p>
                  <input
                    type="text"
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
                    type="text"
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
                  <p>Course</p>
                  <select
                    id="label_input"
                    required
                    name="courseStudent"
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}>
                    {/* <option value={courseStudent}>Courses</option> */}
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
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
                  <p>Semester</p>
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
                  <p>Gender</p>
                  <select
                    id="label_input"
                    required
                    name="genderStudent"
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value)}>
                    {/* <option value="">Department</option> */}
                    {genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p>Religion</p>
                  <select
                    id="label_input"
                    required
                    name="religionStudent"
                    value={newReligion}
                    onChange={(e) => setNewReligion(e.target.value)}>
                    {/* <option value="">Department</option> */}
                    {religions.map((religion) => (
                      <option key={religion} value={religion}>
                        {religion}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p>Category</p>
                  <select
                    id="label_input"
                    required
                    name="categoryStudent"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}>
                    {/* <option value="">Department</option> */}
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p>Physically Handicapped</p>
                  <select
                    id="label_input"
                    required
                    name="physicallyHandicappedStudent"
                    value={newPhysicallyHandicapped}
                    onChange={(e) =>
                      setNewPhysicallyHandicapped(e.target.value)
                    }>
                    {/* <option value="">Department</option> */}
                    {yesNo.map((physicallyHandicapped) => (
                      <option
                        key={physicallyHandicapped}
                        value={physicallyHandicapped}>
                        {physicallyHandicapped}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p>Hosteler</p>
                  <select
                    id="label_input"
                    required
                    name="hostelerStudent"
                    value={newHosteler}
                    onChange={(e) => setNewHosteler(e.target.value)}>
                    {yesNo.map((hosteler) => (
                      <option key={hosteler} value={hosteler}>
                        {hosteler}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  // id="label_input"
                  type="text"
                  placeholder="Year Of Joining"
                  required
                  name="yearOfJoining"
                  value={newYearOfJoining}
                  onChange={(e) => setNewYearOfJoining(e.target.value)}
                />
                <div>
                  <p>Current Session : {newCurrentSession}</p>
                  <select
                    id="label_input"
                    required
                    name="sessionStudent"
                    value={newCurrentSession}
                    onChange={(e) => setNewCurrentSession(e.target.value)}>
                    {state.selectedSession &&
                      state.selectedSession.map((sessionName) => (
                        <option
                          key={sessionName.sessionName}
                          value={sessionName.sessionName}>
                          {sessionName.sessionName}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label for="{dateOfBirthStudent}">
                    Date Of Birth: {newDateOfBirthStudent}
                  </label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="label_input"
                      label="Date Of Birth"
                      value={settingNewDateOfBirthStudent}
                      onChange={(newValue) =>
                        setSettingNewDateOfBirthStudent(newValue)
                      }
                    />
                  </LocalizationProvider>
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
      )}
    </Fragment>
  );
};

export default StudentListDetails;
