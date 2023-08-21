import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./CompleteAttendanceForDean.css";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";

const CompleteAttendanceForDean = () => {
  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  return (
    <Fragment>
      <div className="teacherDetails">
        <SidebarTeacher role={teacher.subRole} />
        <div>
          <h2>Attendance</h2>
        </div>
      </div>
    </Fragment>
  );
};

export default CompleteAttendanceForDean;
