import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./CompleteCourseForDean.css";
import SidebarTeacher from "../../Teacher/SidebarTeacher/SidebarTeacher";
import { getAllCoursesForDean } from "../../../actions/teacherAction";
import Loader from "../../Loader/Loader";

const CompleteCourseForDean = () => {
  const dispatch = useDispatch();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    courses,
    loading: coursesLoading,
    error,
  } = useSelector((state) => state.getAllCoursesForDean);

  useEffect(() => {
    dispatch(getAllCoursesForDean());
  }, []);

  return (
    <Fragment>
      {coursesLoading ? (
        <Loader />
      ) : (
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
      )}
    </Fragment>
  );
};

export default CompleteCourseForDean;
