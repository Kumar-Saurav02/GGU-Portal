import { CLEAR_MESSAGES } from "../constants/adminConstant";
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

export const getPresentSessionOfWorkReducer = (
  state = { session: {} },
  action
) => {
  switch (action.type) {
    case GET_PRESENT_SESSION_REQUEST:
      return {
        loading: true,
      };
    case GET_PRESENT_SESSION_SUCCESS:
      return {
        loading: false,
        session: action.payload,
      };
    case GET_PRESENT_SESSION_FAIL:
      return {
        ...state,
        loading: false,
        session: null,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const registerLoginTeachersReducer = (
  state = { teacher: {} },
  action
) => {
  switch (action.type) {
    case LOGIN_TEACHER_REQUEST:
    case LOAD_TEACHER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_TEACHER_SUCCESS:
    case LOAD_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        teacher: action.payload,
      };
    case LOGOUT_TEACHER_SUCCESS:
      return {
        loading: false,
        teacher: null,
        isAuthenticated: false,
      };
    case LOGIN_TEACHER_FAIL:
    case LOAD_TEACHER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        teacher: null,
        error: action.payload,
      };
    case LOGOUT_TEACHER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const courseScholarshipCheckReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_ACCEPT_REQUEST:
    case COURSE_REJECT_REQUEST:
    case SCHOLARSHIP_ACCEPT_REQUEST:
    case SCHOLARSHIP_REJECT_REQUEST:
      return {
        loading: true,
      };
    case COURSE_ACCEPT_SUCCESS:
    case COURSE_REJECT_SUCCESS:
    case SCHOLARSHIP_ACCEPT_SUCCESS:
    case SCHOLARSHIP_REJECT_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case COURSE_ACCEPT_FAIL:
    case COURSE_REJECT_FAIL:
    case SCHOLARSHIP_ACCEPT_FAIL:
    case SCHOLARSHIP_REJECT_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
        error: null,
      };
    default:
      return state;
  }
};

export const getCoursesForApprovalReducer = (
  state = { courses: [] },
  action
) => {
  switch (action.type) {
    case GET_COURSE_APPROVAL_REQUEST:
      return {
        loading: true,
      };
    case GET_COURSE_APPROVAL_SUCCESS:
      return {
        loading: false,
        courses: action.payload,
      };
    case GET_COURSE_APPROVAL_FAIL:
      return {
        ...state,
        loading: false,
        courses: null,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getScholarshipsForApprovalReducer = (
  state = { scholarships: [] },
  action
) => {
  switch (action.type) {
    case GET_SCHOLARSHIP_APPROVAL_REQUEST:
      return {
        loading: true,
      };
    case GET_SCHOLARSHIP_APPROVAL_SUCCESS:
      return {
        loading: false,
        scholarships: action.payload,
      };
    case GET_SCHOLARSHIP_APPROVAL_FAIL:
      return {
        ...state,
        loading: false,
        scholarships: null,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const submitAttendanceEntryBySubjectTeacherReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case SUBMIT_ATTENDANCE_ENTRY_REQUEST:
      return {
        loading: true,
      };
    case SUBMIT_ATTENDANCE_ENTRY_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case SUBMIT_ATTENDANCE_ENTRY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
        error: null,
      };
    default:
      return state;
  }
};

export const getAttendanceEntryBySubjectReducer = (
  state = { attendanceDetails: {} },
  action
) => {
  switch (action.type) {
    case GET_ATTENDANCE_BY_SUBJECT_REQUEST:
    case GET_ATTENDANCE_BY_DEPARTMENT_REQUEST:
      return {
        loading: true,
      };
    case GET_ATTENDANCE_BY_SUBJECT_SUCCESS:
    case GET_ATTENDANCE_BY_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        attendanceDetails: action.payload,
      };
    case GET_ATTENDANCE_BY_SUBJECT_FAIL:
    case GET_ATTENDANCE_BY_DEPARTMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const submitMarksEntryBySubjectTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_MARKS_ENTRY_REQUEST:
      return {
        loading: true,
      };
    case SUBMIT_MARKS_ENTRY_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case SUBMIT_MARKS_ENTRY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
        error: null,
      };
    default:
      return state;
  }
};

export const getMarksEntryBySubjectReducer = (
  state = { marksDetails: {} },
  action
) => {
  switch (action.type) {
    case GET_MARKS_BY_SUBJECT_REQUEST:
      return {
        loading: true,
      };
    case GET_MARKS_BY_SUBJECT_SUCCESS:
      return {
        loading: false,
        marksDetails: action.payload,
      };
    case GET_MARKS_BY_SUBJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateTeacherDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TEACHER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_TEACHER_DETAILS_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case UPDATE_TEACHER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
        error: null,
      };
    default:
      return state;
  }
};

export const createNewSessionByDeanReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NEW_SESSION_REQUEST:
      return {
        loading: true,
      };
    case CREATE_NEW_SESSION_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case CREATE_NEW_SESSION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
        error: null,
      };
    default:
      return state;
  }
};

//GET ALL COURSES FOR DEAN
export const getAllCoursesForDeanReducer = (
  state = { courses: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_COURSES_FOR_DEAN_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_COURSES_FOR_DEAN_SUCCESS:
      return {
        loading: false,
        courses: action.payload,
      };
    case GET_ALL_COURSES_FOR_DEAN_FAIL:
      return {
        ...state,
        loading: false,
        courses: null,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//GET ALL ATTENDANCES FOR DEAN
export const getAllAttendancesForDeanReducer = (
  state = { attendances: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_ATTENDANCES_FOR_DEAN_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_ATTENDANCES_FOR_DEAN_SUCCESS:
      return {
        loading: false,
        attendances: action.payload,
      };
    case GET_ALL_ATTENDANCES_FOR_DEAN_FAIL:
      return {
        ...state,
        loading: false,
        attendances: null,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//GET COURSE SUBJECT FOR MARKS
export const getCourseSubjectsForMarksReducer = (
  state = { subjects: [], marksList: [] },
  action
) => {
  switch (action.type) {
    case GET_COURSE_SUBJECTS_FOR_MARKS_REQUEST:
      return {
        loading: true,
      };
    case GET_COURSE_SUBJECTS_FOR_MARKS_SUCCESS:
      return {
        loading: false,
        subjects: action.payload.subjects,
        marksList: action.payload.marksList,
      };
    case GET_COURSE_SUBJECTS_FOR_MARKS_FAIL:
      return {
        ...state,
        loading: false,
        subjects: null,
        marksList: null,
        error: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
