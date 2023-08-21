import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./CompleteCourseForDean.css";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";

const CompleteCourseForDean = () => {
  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  return (
    <Fragment>
      <div className="teacherDetails">
        <SidebarTeacher role={teacher.subRole} />
        <div className="approvBox">
              <div className="subsection">
          <h2>Courses</h2>
          <hr />
          <br />
        </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CompleteCourseForDean;
