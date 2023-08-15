import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scholarshipApprovalByIncharge } from "../../../../actions/teacherAction";
import Loader from "../../../Loader/Loader";
import SidebarTeacher from "../../SidebarTeacher/SidebarTeacher";
import "./ScholarshipApproval.css";
import { toast } from "react-toastify";
import { clearMessages } from "../../../../actions/adminAction";
import ScholarshipApprovalMapping from "./ScholarshipApprovalMapping";

const ScholarshipApproval = () => {
  const dispatch = useDispatch();

  const {
    scholarships,
    loading: scholarshipLoading,
    error: scholarshipError,
  } = useSelector((state) => state.getScholarshipsForApproval);

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    loading,
    message: ApproveRejectMessage,
    error: ApproveRejectError,
  } = useSelector((state) => state.courseScholarshipCheck);

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const [selectedSemester, setSelectedSemester] = useState("");

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

  useEffect(() => {
    dispatch(scholarshipApprovalByIncharge());

    if (scholarshipError) {
      toast.error(scholarshipError);
      dispatch(clearMessages());
    }
  }, [dispatch, scholarshipError]);
  return (
    <Fragment>
      {scholarshipLoading || loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="scholarshipApproval">
            <SidebarTeacher role={teacher.subRole} />
            <div className="approvBox">
              <div className="request">
                <h1>Scholarship Approval</h1>
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
                {scholarships &&
                  scholarships
                    .filter((scholarshipDepartment) =>
                      scholarshipDepartment.department.includes(
                        teacher.department
                      )
                    )
                    .filter((courseDepartment) =>
                      courseDepartment.semester
                        .toString()
                        .includes(selectedSemester.toString())
                    )
                    .map((scholarship, i) => (
                      <div key={i}>
                        <ScholarshipApprovalMapping data={scholarship} />
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

export default ScholarshipApproval;
