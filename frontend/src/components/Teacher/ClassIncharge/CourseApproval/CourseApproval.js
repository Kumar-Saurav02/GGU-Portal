import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearMessages } from "../../../../actions/adminAction";
import { courseApprovalByIncharge } from "../../../../actions/teacherAction";
import Loader from "../../../Loader/Loader";
import SidebarTeacher from "../../SidebarTeacher/SidebarTeacher";
import "./CourseApproval.css";
import CourseApprovalMapping from "./CourseApprovalMapping";

const CourseApproval = () => {
  const dispatch = useDispatch();

  const {
    courses,
    loading: courseLoading,
    error: courseError,
  } = useSelector((state) => state.getCoursesForApproval);

  const {
    loading,
    message: ApproveRejectMessage,
    error: ApproveRejectError,
  } = useSelector((state) => state.courseScholarshipCheck);

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const [selectedSemester, setSelectedSemester] = useState("");

  useEffect(() => {
    dispatch(courseApprovalByIncharge());
  }, [dispatch]);

  useEffect(() => {
    if (courseError) {
      toast.error(courseError);
      dispatch(clearMessages());
    }
  }, [courseError]);

  useEffect(() => {
    if (ApproveRejectMessage) {
      toast.success(ApproveRejectMessage);
      dispatch(clearMessages());
    }
    if (ApproveRejectError) {
      toast.success(ApproveRejectError);
      dispatch(clearMessages());
    }
  }, [dispatch, ApproveRejectMessage, ApproveRejectError]);

  return (
    <Fragment>
      {courseLoading || loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="courseApproval">
            <SidebarTeacher role={teacher.subRole} />
            <div className="approvBox">
              <div className="request">
                <h1>Course Approval</h1>
                <hr></hr>
                <br></br>
                <div>
                  <select onChange={(e) => setSelectedSemester(e.target.value)}>
                    <option value="">Semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
                {courses &&
                  courses
                    .filter((courseDepartment) =>
                      courseDepartment.department.includes(teacher.department)
                    )
                    .filter((courseDepartment) =>
                      courseDepartment.semester
                        .toString()
                        .includes(selectedSemester.toString())
                    )
                    .map((course, i) => (
                      <div key={i}>
                        <CourseApprovalMapping data={course} />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CourseApproval;
