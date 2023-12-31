import { CLEAR_MESSAGES } from "../constants/adminConstant";
import {
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  CREATE_SUBJECT_REQUEST,
  CREATE_SUBJECT_SUCCESS,
  CREATE_SUBJECT_FAIL,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAIL,
  GET_SUBJECT_REQUEST,
  GET_SUBJECT_SUCCESS,
  GET_SUBJECT_FAIL,
  UPDATE_SUBJECT_ASSIGNED_REQUEST,
  UPDATE_SUBJECT_ASSIGNED_SUCCESS,
  UPDATE_SUBJECT_ASSIGNED_FAIL,
  GET_SESSION_LIST_REQUEST,
  GET_SESSION_LIST_SUCCESS,
  GET_SESSION_LIST_FAIL,
  PROMOTE_STUDENT_REQUEST,
  PROMOTE_STUDENT_SUCCESS,
  PROMOTE_STUDENT_FAIL,
  DETENTION_STUDENT_SUCCESS,
  DETENTION_STUDENT_REQUEST,
  DETENTION_STUDENT_FAIL,
  GET_ALL_DETAINED_REQUEST,
  GET_ALL_DETAINED_SUCCESS,
  GET_ALL_DETAINED_FAIL,
  PROMOTE_DETENTION_TO_STUDENT_REQUEST,
  PROMOTE_DETENTION_TO_STUDENT_SUCCESS,
  PROMOTE_DETENTION_TO_STUDENT_FAIL,
} from "../constants/hodConstant";

//CREATE COURSE
export const createCourseByHODReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return {
        loading: true,
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CREATE_COURSE_FAIL:
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

//CREATE SUBJECT
export const createSubjectByHODReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUBJECT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CREATE_SUBJECT_FAIL:
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

//GET ALL SUBJECTS
export const getAllSubjectsReducer = (state = { subjects: [] }, action) => {
  switch (action.type) {
    case GET_SUBJECT_REQUEST:
      return {
        loading: true,
      };
    case GET_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        subjects: action.payload,
      };
    case GET_SUBJECT_FAIL:
      return {
        ...state,
        loading: false,
        subjects: null,
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

//CREATE COURSE
export const assignSubjectsToTeacherReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SUBJECT_ASSIGNED_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_SUBJECT_ASSIGNED_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case UPDATE_SUBJECT_ASSIGNED_FAIL:
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

//GET ALL SESSIONS
export const getAllSessionsReducer = (state = { sessions: [] }, action) => {
  switch (action.type) {
    case GET_SESSION_LIST_REQUEST:
      return {
        loading: true,
      };
    case GET_SESSION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        sessions: action.payload,
      };
    case GET_SESSION_LIST_FAIL:
      return {
        ...state,
        loading: false,
        sessions: null,
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

//CREATE COURSE
export const promoteStudentByHODReducer = (state = {}, action) => {
  switch (action.type) {
    case PROMOTE_STUDENT_REQUEST:
    case DETENTION_STUDENT_REQUEST:
    case PROMOTE_DETENTION_TO_STUDENT_REQUEST:
      return {
        loading: true,
      };
    case PROMOTE_STUDENT_SUCCESS:
    case DETENTION_STUDENT_SUCCESS:
    case PROMOTE_DETENTION_TO_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case PROMOTE_STUDENT_FAIL:
    case DETENTION_STUDENT_FAIL:
    case PROMOTE_DETENTION_TO_STUDENT_FAIL:
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

//GET ALL SUBJECTS
export const getAllDetainStudentsReducer = (
  state = { students: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_DETAINED_REQUEST:
      return {
        loading: true,
      };
    case GET_ALL_DETAINED_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload,
      };
    case GET_ALL_DETAINED_FAIL:
      return {
        ...state,
        loading: false,
        students: null,
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
