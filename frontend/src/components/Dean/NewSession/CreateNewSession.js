import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./CreateNewSession.css";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import { createNewSessionByDean } from "../../../actions/teacherAction";
import Loader from "../../Loader/Loader";

const CreateNewSession = () => {
  const dispatch = useDispatch();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const { loading, message, error } = useSelector(
    (state) => state.createNewSessionByDean
  );

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);

  const departments = [
    "Department of Computer Science and Engineering",
    "Department of Information Technology",
    "Department of Electronics & Communication Engineering",
    "Department of Chemical Engineering",
    "Department of Civil Engineering",
    "Department of Mechanical Engineering",
    "Department of Industrial & Production Engineering",
  ];

  const [sessionDepartment, setSessionDepartment] = useState("");
  const [sessionName, setSessionName] = useState("");

  const createNewSession = () => {
    if (sessionDepartment.trim() === "") {
      return toast.error("Select department");
    }
    if (sessionName.trim() === "") {
      return toast.error("Fill session Name");
    }

    dispatch(
      createNewSessionByDean(teacher.course, sessionDepartment, sessionName)
    );
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="teacherDetails">
            <SidebarTeacher role={teacher.subRole} />
            <div>
              <h2>Creating New Session</h2>
              <div>
                <div>
                  <p>Department</p>
                  <select
                    id="label_input"
                    required
                    name="departmentStudent"
                    value={sessionDepartment}
                    onChange={(e) => setSessionDepartment(e.target.value)}>
                    {/* <option value="">Department</option> */}
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p>Session Name</p>
                  <input
                    type="text"
                    placeholder="July 2023"
                    required
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                  />
                </div>
                <div>
                  <p>*The changes cannot be reversed.</p>
                  <button onClick={createNewSession}>Create New Session</button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateNewSession;
