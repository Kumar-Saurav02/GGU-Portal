import React, { Fragment, useEffect, useState } from "react";
import "./StudentList.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearMessages,
  getAllStudentDetail,
} from "../../../actions/adminAction";
import { useNavigate } from "react-router-dom";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import Loader from "../../Loader/Loader";
import StudentListMapping from "./StudentListMapping.js";

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    students,
    loading: studentListLoading,
    error,
  } = useSelector((state) => state.getAllStudentsDetails);

  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    dispatch(getAllStudentDetail());
  }, []);

  return (
    <Fragment>
      {studentListLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="studentListAdmin">
            <SidebarTeacher role={teacher.subRole} />
            <div>
              <div>
                <h4>Search</h4>
                <input
                  type="text"
                  placeholder="Enter Enrollment Number"
                  required
                  value={searchResult}
                  onChange={(e) => setSearchResult(e.target.value)}
                />
              </div>

              {students &&
                students
                  .filter((students) =>
                    students.enrollmentNo.includes(searchResult)
                  )
                  .map((student, i) => (
                    <div key={i}>
                      <StudentListMapping data={student} />
                    </div>
                  ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default StudentList;
