import React, { Fragment, useEffect, useState } from "react";
import "./TeacherList.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import Loader from "../../Loader/Loader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  clearMessages,
  updateTeacherDataByDean,
} from "../../../actions/adminAction";
import { toast } from "react-toastify";

const TeacherListDetails = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const { loading, message, error } = useSelector(
    (state) => state.updateTeachersDataByDean
  );

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
      navigate("/teachersList");
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
  const designations = ["Professor", "Assistant Professor", "HOD"];

  const [newName, setNewName] = useState(state.name);
  const [newEmployeeID, setNewEmployeeID] = useState(state.employeeID);
  const [newEmail, setNewEmail] = useState(state.email);
  const [newQualification, setNewQualification] = useState(state.qualification);
  const [newDepartment, setNewDepartment] = useState(state.department);
  const [newDesignation, setNewDesignation] = useState(state.designation);
  const [newCourse, setNewCourse] = useState(state.course);
  const [newGender, setNewGender] = useState(state.gender);
  const [newDateOfBirthTeacher, setNewDateOfBirthTeacher] = useState(
    state.dateOfBirth
  );
  const [settingNewDateOfBirthTeacher, setSettingNewDateOfBirthTeacher] =
    useState();

  useEffect(() => {
    if (
      settingNewDateOfBirthTeacher !== undefined &&
      settingNewDateOfBirthTeacher !== null
    ) {
      const updatingDateOfBirth = settingNewDateOfBirthTeacher.$d
        .toString()
        .split(" ");
      const updatedDateOfBirth =
        updatingDateOfBirth[1] +
        " " +
        updatingDateOfBirth[2] +
        " " +
        updatingDateOfBirth[3];
      setNewDateOfBirthTeacher(updatedDateOfBirth);
    }
  }, [settingNewDateOfBirthTeacher]);

  const updateData = (e) => {
    e.preventDefault();

    if (newEmployeeID.trim() === "") {
      return toast.error("Fill the employeeID");
    }
    if (newEmail.trim() === "") {
      return toast.error("Fill the email");
    }
    if (newName.trim() === "") {
      return toast.error("Fill the name");
    }
    if (newGender.trim() === "") {
      return toast.error("Select the gender");
    }
    if (newCourse.trim() === "") {
      return toast.error("Select your course");
    }
    if (newDepartment.trim() === "") {
      return toast.error("Select your department");
    }
    if (newDesignation.trim() === "") {
      return toast.error("Select your designation");
    }
    if (newQualification.trim() === "") {
      return toast.error("Fill the qualification");
    }

    dispatch(
      updateTeacherDataByDean(
        state._id,
        newEmployeeID,
        newEmail,
        newName,
        newGender,
        newCourse,
        newDepartment,
        newDesignation,
        newQualification,
        newDateOfBirthTeacher
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
            
            <div className="approvBox">
              <div className="subsection">
              <h3>Edit Teacher Details</h3>
              <br></br>
              <div>
                <div className="entry">
                <div className="label_name">
                  <p>Name</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="nameTeacher"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="entry">
                <div className="label_name">
                  <p>Employee ID</p>
                  </div>
                  <input
                    type="text"
                    placeholder="EmployeeID"
                    required
                    name="employeeIDTeacher"
                    value={newEmployeeID}
                    onChange={(e) => setNewEmployeeID(e.target.value)}
                  />
                </div>
                <div className="entry">
                <div className="label_name">
                  <p>E-Mail</p>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="emailTeacher"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <div className="entry">
                <div className="label_name">
                  <label for="{dateOfBirthStudent}">
                    Date Of Birth: {newDateOfBirthTeacher}
                  </label>
                  </div>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="label_input"
                      label="Date Of Birth"
                      value={settingNewDateOfBirthTeacher}
                      onChange={(newValue) =>
                        setSettingNewDateOfBirthTeacher(newValue)
                      }
                    />
                  </LocalizationProvider>
                </div>
                <div className="entry">
                <div className="label_name">
                  <p>Qualification</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Qualification"
                    required
                    name="qualificationTeacher"
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                  />
                </div>
                <div className="entry">
                <div className="label_name">
                  <p>Course</p>
                  </div>
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
                <div className="entry">
                <div className="label_name">
                  <p>Department</p>
                  </div>
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
                <div className="entry">
                <div className="label_name">
                  <p>Designation</p>
                  </div>
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
                <div className="entry">
                <div className="label_name">
                  <p>Gender</p>
                  </div>
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
                  <button className="normal_sb_btn border hover" onClick={updateData}>Update</button>
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

export default TeacherListDetails;
