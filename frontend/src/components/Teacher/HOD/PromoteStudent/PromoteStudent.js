import React, { Fragment } from "react";
import "./PromoteStudent.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Loader/Loader";
import { clearMessages } from "../../../../actions/adminAction";
import SidebarTeacher from "../../SidebarTeacher/SidebarTeacher";

const PromoteStudent = () => {
  const dispatch = useDispatch();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  return (
    <Fragment>
      <div className="promoteStudent">
        <SidebarTeacher role={teacher.subRole} />
        <div>
          <h1>Promote Student</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default PromoteStudent;
