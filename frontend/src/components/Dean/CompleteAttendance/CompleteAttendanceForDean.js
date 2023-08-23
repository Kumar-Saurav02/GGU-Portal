import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./CompleteAttendanceForDean.css";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import { getAllAttendancesForDean } from "../../../actions/teacherAction";
import Loader from "../../Loader/Loader";

const CompleteAttendanceForDean = () => {
  const dispatch = useDispatch();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    attendances,
    loading: attendancesLoading,
    error,
  } = useSelector((state) => state.getAllAttendancesForDean);

  useEffect(() => {
    dispatch(getAllAttendancesForDean());
  }, []);

  return (
    <Fragment>
      {attendancesLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="teacherDetails">
            <SidebarTeacher role={teacher.subRole} />
            <div className="approvBox">
              <div className="subsection">
                <h2>Attendance</h2>
                <hr />
                <br />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CompleteAttendanceForDean;
