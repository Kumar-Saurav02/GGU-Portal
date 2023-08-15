import React, { Fragment, useEffect, useState } from "react";
import "./TeacherList.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearMessages,
  getAllTeacherDetailsForDean,
} from "../../../actions/adminAction";
import { useNavigate } from "react-router-dom";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import Loader from "../../Loader/Loader";
import TeacherListMapping from "./TeacherListMapping.js";

const TeacherList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    loading: teacherRemoveLoading,
    message: teacherRemoveMessage,
    error: teacherRemoveError,
  } = useSelector((state) => state.removeStudentTeacher);

  const {
    teachers,
    loading: teacherListLoading,
    error,
  } = useSelector((state) => state.getAllTeacherDetails);

  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    if (teacherRemoveMessage) {
      toast.success(teacherRemoveMessage);
      dispatch(clearMessages());
    }
    if (teacherRemoveError) {
      toast.error(teacherRemoveError);
      dispatch(clearMessages());
    }
  }, [teacherRemoveMessage, teacherRemoveError]);

  useEffect(() => {
    dispatch(getAllTeacherDetailsForDean());
  }, []);

  return (
    <Fragment>
      {teacherListLoading || teacherRemoveLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="teacherListAdmin">
            <SidebarTeacher role={teacher.subRole} />
            <div>
              <div>
                <h4>Search</h4>
                <input
                  type="text"
                  placeholder="Enter Employee ID"
                  required
                  value={searchResult}
                  onChange={(e) => setSearchResult(e.target.value)}
                />
              </div>

              {teachers &&
                teachers
                  .filter((teachers) =>
                    teachers.employeeID.includes(searchResult)
                  )
                  .map((teacher, i) => (
                    <div key={i}>
                      <TeacherListMapping data={teacher} />
                    </div>
                  ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TeacherList;
