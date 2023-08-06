import React, { Fragment, useEffect, useState } from "react";
import "./AllocateSubject.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarTeacher from "../../SidebarTeacher/SidebarTeacher";
import Loader from "../../../Loader/Loader";
import {
  clearMessages,
  getAllTeacherDetails,
} from "../../../../actions/adminAction";
import { getAllSubjects } from "../../../../actions/hodAction";
import AllocateSubjectTeacherMapping from "./AllocateSubjectTeacherMapping";
import { toast } from "react-toastify";

const AllocateSubject = () => {
  const dispatch = useDispatch();

  const { teacher } = useSelector((state) => state.registerLoginTeachers);

  const {
    loading: subjectLoading,
    subjects,
    error: subjectError,
  } = useSelector((state) => state.getAllSubjects);

  const {
    teachers,
    loading: teacherListLoading,
    error,
  } = useSelector((state) => state.getAllTeacherDetails);

  const {
    message: subjectAllocateMessage,
    loading: updatingSubjects,
    error: subjectAllocateError,
  } = useSelector((state) => state.assignSubjectsToTeacher);

  const [filterEmployeeID, setFilterEmployeeID] = useState("");

  useEffect(() => {
    dispatch(getAllTeacherDetails());
    dispatch(getAllSubjects());
  }, []);

  useEffect(() => {
    if (subjectAllocateMessage) {
      toast.success(subjectAllocateMessage + ". Refresh to see updated data");
      dispatch(clearMessages());
    }
    if (subjectAllocateError) {
      toast.error(subjectAllocateError);
      dispatch(clearMessages());
    }
  }, [subjectAllocateMessage, subjectAllocateError]);

  return (
    <Fragment>
      {teacherListLoading || subjectLoading || updatingSubjects ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="allocateSubject">
            <SidebarTeacher role={teacher.subRole} />
            <div>
              <h2>Allocate Subject</h2>
              <div>
                <h4>Search</h4>
                <input
                  type="text"
                  placeholder="Enter Employee ID"
                  required
                  value={filterEmployeeID}
                  onChange={(e) => setFilterEmployeeID(e.target.value)}
                />
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              {teachers &&
                teachers
                  .filter((teachers) =>
                    teachers.department.includes(teacher.department)
                  )
                  .filter((teachers) =>
                    teachers.employeeID
                      .toString()
                      .includes(filterEmployeeID.toString())
                  )
                  .map((teacher, i) => (
                    <div key={i}>
                      <AllocateSubjectTeacherMapping
                        data={teacher}
                        subjects={subjects}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllocateSubject;