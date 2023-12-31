import {
  LOGIN_TEACHER_REQUEST,
  LOGIN_TEACHER_SUCCESS,
  LOGIN_TEACHER_FAIL,
  LOAD_TEACHER_REQUEST,
  LOAD_TEACHER_SUCCESS,
  LOAD_TEACHER_FAIL,
  LOGOUT_TEACHER_SUCCESS,
  LOGOUT_TEACHER_FAIL,
  COURSE_ACCEPT_REQUEST,
  COURSE_ACCEPT_SUCCESS,
  COURSE_ACCEPT_FAIL,
  COURSE_REJECT_REQUEST,
  COURSE_REJECT_SUCCESS,
  COURSE_REJECT_FAIL,
  SCHOLARSHIP_ACCEPT_REQUEST,
  SCHOLARSHIP_ACCEPT_SUCCESS,
  SCHOLARSHIP_ACCEPT_FAIL,
  SCHOLARSHIP_REJECT_REQUEST,
  SCHOLARSHIP_REJECT_SUCCESS,
  SCHOLARSHIP_REJECT_FAIL,
  GET_COURSE_APPROVAL_REQUEST,
  GET_COURSE_APPROVAL_SUCCESS,
  GET_COURSE_APPROVAL_FAIL,
  GET_SCHOLARSHIP_APPROVAL_REQUEST,
  GET_SCHOLARSHIP_APPROVAL_SUCCESS,
  GET_SCHOLARSHIP_APPROVAL_FAIL,
  SUBMIT_ATTENDANCE_ENTRY_REQUEST,
  SUBMIT_ATTENDANCE_ENTRY_SUCCESS,
  SUBMIT_ATTENDANCE_ENTRY_FAIL,
  SUBMIT_MARKS_ENTRY_REQUEST,
  SUBMIT_MARKS_ENTRY_SUCCESS,
  SUBMIT_MARKS_ENTRY_FAIL,
  GET_MARKS_BY_SUBJECT_REQUEST,
  GET_MARKS_BY_SUBJECT_SUCCESS,
  GET_MARKS_BY_SUBJECT_FAIL,
  GET_ATTENDANCE_BY_SUBJECT_REQUEST,
  GET_ATTENDANCE_BY_SUBJECT_SUCCESS,
  GET_ATTENDANCE_BY_SUBJECT_FAIL,
  UPDATE_TEACHER_DETAILS_REQUEST,
  UPDATE_TEACHER_DETAILS_SUCCESS,
  UPDATE_TEACHER_DETAILS_FAIL,
  GET_ATTENDANCE_BY_DEPARTMENT_REQUEST,
  GET_ATTENDANCE_BY_DEPARTMENT_SUCCESS,
  GET_ATTENDANCE_BY_DEPARTMENT_FAIL,
  GET_PRESENT_SESSION_REQUEST,
  GET_PRESENT_SESSION_SUCCESS,
  GET_PRESENT_SESSION_FAIL,
  CREATE_NEW_SESSION_REQUEST,
  CREATE_NEW_SESSION_SUCCESS,
  CREATE_NEW_SESSION_FAIL,
  GET_ALL_COURSES_FOR_DEAN_REQUEST,
  GET_ALL_COURSES_FOR_DEAN_SUCCESS,
  GET_ALL_COURSES_FOR_DEAN_FAIL,
  GET_ALL_ATTENDANCES_FOR_DEAN_REQUEST,
  GET_ALL_ATTENDANCES_FOR_DEAN_SUCCESS,
  GET_ALL_ATTENDANCES_FOR_DEAN_FAIL,
  GET_COURSE_SUBJECTS_FOR_MARKS_REQUEST,
  GET_COURSE_SUBJECTS_FOR_MARKS_SUCCESS,
  GET_COURSE_SUBJECTS_FOR_MARKS_FAIL,
} from "../constants/teacherConstant";
import {
  REGISTER_TEACHER_REQUEST,
  REGISTER_TEACHER_SUCCESS,
  REGISTER_TEACHER_FAIL,
} from "../constants/adminConstant";
import axios from "axios";

//TEACHER REGISTER
export const registerTeachers =
  (
    employeeID,
    email,
    name,
    gender,
    mobileNumber,
    course,
    department,
    designation,
    dateOfBirth,
    qualification,
    assignSubject,
    resume,
    profilePhoto,
    signature,
    password,
    confirmPassword
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_TEACHER_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/registerApprovalTeacher`,
        {
          employeeID,
          email,
          name,
          gender,
          mobileNumber,
          course,
          department,
          designation,
          dateOfBirth,
          qualification,
          assignSubject,
          resume,
          profilePhoto,
          signature,
          password,
          confirmPassword,
        },
        config
      );

      dispatch({ type: REGISTER_TEACHER_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: REGISTER_TEACHER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// TEACHER LOGIN
export const loginTeachers = (employeeID, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_TEACHER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/loginTeacher`,
      {
        employeeID,
        password,
      },
      config
    );

    dispatch({ type: LOGIN_TEACHER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_TEACHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout STUDENT
export const logoutTeacher = () => async (dispatch) => {
  try {
    await axios.get(`/api/logoutStudent`);

    dispatch({ type: LOGOUT_TEACHER_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_TEACHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// LOAD TEACHER
export const loadTeacher = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_TEACHER_REQUEST });

    const { data } = await axios.get(`/api/getTeacherDetail`);

    dispatch({ type: LOAD_TEACHER_SUCCESS, payload: data.teacher });
  } catch (error) {
    dispatch({ type: LOAD_TEACHER_FAIL, payload: error.response.data.message });
  }
};

// GET PRESENT SESSION
export const getPresentSession = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRESENT_SESSION_REQUEST });

    const { data } = await axios.get(`/api/getPresentSession`);

    dispatch({ type: GET_PRESENT_SESSION_SUCCESS, payload: data.session });
  } catch (error) {
    dispatch({
      type: GET_PRESENT_SESSION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE TEACHER DETAILS
export const updateTeacherDetails =
  (mobileNumber, profilePhoto, signature, resume) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TEACHER_DETAILS_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/updateTeacher`,
        {
          mobileNumber,
          profilePhoto,
          signature,
          resume,
        },
        config
      );

      dispatch({ type: UPDATE_TEACHER_DETAILS_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: UPDATE_TEACHER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//CLASS INCHARGE

// GET COURSE APPROVAL
export const courseApprovalByIncharge = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COURSE_APPROVAL_REQUEST });

    const { data } = await axios.get(`/api/getAllCoursesApproval`);

    dispatch({ type: GET_COURSE_APPROVAL_SUCCESS, payload: data.courses });
  } catch (error) {
    dispatch({
      type: GET_COURSE_APPROVAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//COURSE ACCEPT
export const courseAcceptByIncharge =
  (courseSubmission, id, enrollmentNumber, attendanceDetails) =>
  async (dispatch) => {
    try {
      dispatch({ type: COURSE_ACCEPT_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/acceptCourseSelection`,
        {
          courseSubmission,
          id,
          enrollmentNumber,
          attendanceDetails,
        },
        config
      );

      dispatch({ type: COURSE_ACCEPT_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: COURSE_ACCEPT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//COURSE REJECT
export const courseRejectByIncharge = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_REJECT_REQUEST });

    const { data } = await axios.delete(`/api/rejectCourseSelection/${id}`);

    dispatch({ type: COURSE_REJECT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: COURSE_REJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET SCHOLARSHIP APPROVAL
export const scholarshipApprovalByIncharge = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SCHOLARSHIP_APPROVAL_REQUEST });

    const { data } = await axios.get(`/api/getAllScholarshipsApproval`);

    dispatch({
      type: GET_SCHOLARSHIP_APPROVAL_SUCCESS,
      payload: data.scholarships,
    });
  } catch (error) {
    dispatch({
      type: GET_SCHOLARSHIP_APPROVAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//SCHOLARSHIP ACCEPT
export const scholarshipAcceptByIncharge =
  (
    session,
    state,
    scholarship,
    scholarshipDocument,
    enrollmentNumber,
    id,
    district,
    dateOfSubmission
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: SCHOLARSHIP_ACCEPT_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/acceptScholarshipSelection`,
        {
          session,
          state,
          scholarship,
          scholarshipDocument,
          enrollmentNumber,
          id,
          district,
          dateOfSubmission,
        },
        config
      );

      dispatch({ type: SCHOLARSHIP_ACCEPT_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: SCHOLARSHIP_ACCEPT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//COURSE ACCEPT
export const scholarshipRejectByIncharge = (id) => async (dispatch) => {
  try {
    dispatch({ type: SCHOLARSHIP_REJECT_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.delete(
      `/api/rejectScholarshipSelection`,
      {
        id,
      },
      config
    );

    dispatch({ type: SCHOLARSHIP_REJECT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: SCHOLARSHIP_REJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//ATTENDANCE ENTRY BY SUBJECT TEACHER
export const attendanceEntryBySubjectTeacher =
  (semester, department, students) => async (dispatch) => {
    try {
      dispatch({ type: SUBMIT_ATTENDANCE_ENTRY_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/attendanceEntryByTeacher`,
        {
          semester,
          department,
          students,
        },
        config
      );

      dispatch({
        type: SUBMIT_ATTENDANCE_ENTRY_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: SUBMIT_ATTENDANCE_ENTRY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//GET ATTENDANCE DETAILS BY SUBJECT
export const getAttendanceDetailBySubject =
  (semester, department, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_ATTENDANCE_BY_SUBJECT_REQUEST });

      const { data } = await axios.get(
        `/api/getAttendanceDetailsOfParticularSubject/${semester}/${department}/${subject}`
      );

      dispatch({
        type: GET_ATTENDANCE_BY_SUBJECT_SUCCESS,
        payload: data.attendanceDetails,
      });
    } catch (error) {
      dispatch({
        type: GET_ATTENDANCE_BY_SUBJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//MARKS ENTRY BY SUBJECT TEACHER
export const marksEntryBySubjectTeacher =
  (session, semester, subject, classTest1, classTest2, endSemester) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUBMIT_MARKS_ENTRY_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/updatingMarks/${session}/${semester}`,
        {
          subject,
          classTest1,
          classTest2,
          endSemester,
        },
        config
      );

      dispatch({
        type: SUBMIT_MARKS_ENTRY_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: SUBMIT_MARKS_ENTRY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//GET MARKS DETAILS BY SUBJECT
export const getMarksDetailBySubject =
  (semester, department, subject) => async (dispatch) => {
    try {
      dispatch({ type: GET_MARKS_BY_SUBJECT_REQUEST });

      const { data } = await axios.get(
        `/api/getMarksDetailsOfParticularSubject/${semester}/${department}/${subject}`
      );

      dispatch({
        type: GET_MARKS_BY_SUBJECT_SUCCESS,
        payload: data.marksDetails,
      });
    } catch (error) {
      dispatch({
        type: GET_MARKS_BY_SUBJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//GET ATTENDANCE DETAILS BY SUBJECT
export const getAttendanceDetailByDepartment =
  (department) => async (dispatch) => {
    try {
      dispatch({ type: GET_ATTENDANCE_BY_DEPARTMENT_REQUEST });

      const { data } = await axios.get(
        `/api/getAttendanceDetailsOfParticularDepartment/${department}`
      );

      dispatch({
        type: GET_ATTENDANCE_BY_DEPARTMENT_SUCCESS,
        payload: data.attendanceDetails,
      });
    } catch (error) {
      dispatch({
        type: GET_ATTENDANCE_BY_DEPARTMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// CREATE NEW SESSION BY DEAN
export const createNewSessionByDean =
  (course, department, session) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_NEW_SESSION_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/createNewSession`,
        {
          course,
          department,
          session,
        },
        config
      );

      dispatch({
        type: CREATE_NEW_SESSION_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: CREATE_NEW_SESSION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//GET ALL COURSES FOR DEAN
export const getAllCoursesForDean = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_COURSES_FOR_DEAN_REQUEST });

    const { data } = await axios.get(`/api/getAllCourseForDean`);

    dispatch({
      type: GET_ALL_COURSES_FOR_DEAN_SUCCESS,
      payload: data.course,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_COURSES_FOR_DEAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllAttendancesForDean = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ATTENDANCES_FOR_DEAN_REQUEST });

    const { data } = await axios.get(`/api/getAllAttendanceForDean`);

    dispatch({
      type: GET_ALL_ATTENDANCES_FOR_DEAN_SUCCESS,
      payload: data.attendance,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ATTENDANCES_FOR_DEAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//GET COURSE SUBJECT FOR MARKS
export const getCourseSubjectsForMarks =
  (session, semester) => async (dispatch) => {
    try {
      dispatch({ type: GET_COURSE_SUBJECTS_FOR_MARKS_REQUEST });

      const { data } = await axios.get(
        `/api/getCourseSubjectsForMarks/${session}/${semester}`
      );
      dispatch({
        type: GET_COURSE_SUBJECTS_FOR_MARKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_COURSE_SUBJECTS_FOR_MARKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
