import React, { Fragment, useEffect, useState } from "react";
import "./TeacherList.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import Loader from "../../Loader/Loader";

const TeacherListDetails = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  return (
    <Fragment>
      <div className="studentListAdmin">
        <SidebarTeacher role={teacher.subRole} />
        <div>
          <h3>Teacher Details</h3>
        </div>
      </div>
    </Fragment>
  );
};

export default TeacherListDetails;
