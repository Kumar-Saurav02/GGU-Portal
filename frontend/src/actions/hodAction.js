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
  DETENTION_STUDENT_REQUEST,
  DETENTION_STUDENT_SUCCESS,
  DETENTION_STUDENT_FAIL,
  GET_ALL_DETAINED_REQUEST,
  GET_ALL_DETAINED_SUCCESS,
  GET_ALL_DETAINED_FAIL,
  PROMOTE_DETENTION_TO_STUDENT_REQUEST,
  PROMOTE_DETENTION_TO_STUDENT_SUCCESS,
  PROMOTE_DETENTION_TO_STUDENT_FAIL,
} from "../constants/hodConstant";
import axios from "axios";

//CREATE COURSE
export const createCourseByHOD =
  (session, semester, courses) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_COURSE_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/createCourse`,
        { session, semester, courses },
        config
      );

      dispatch({ type: CREATE_COURSE_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: CREATE_COURSE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//CREATE SUBJECT
export const createSubjectByHOD =
  (subjectName, subjectCode, subjectCredit) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_SUBJECT_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/createSubject`,
        { subjectName, subjectCode, subjectCredit },
        config
      );

      dispatch({ type: CREATE_SUBJECT_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: CREATE_SUBJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//GET ALL SUBJECTS
export const getAllSubjects = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBJECT_REQUEST });

    const { data } = await axios.get(`/api/getAllSubjects`);

    dispatch({
      type: GET_SUBJECT_SUCCESS,
      payload: data === null ? [] : data.subjects.subjects,
    });
  } catch (error) {
    dispatch({ type: GET_SUBJECT_FAIL, payload: error.response.data.message });
  }
};

//UPDATE ASSIGN SUBJECT FOR TEACHER
export const updateAssignSubjectToTeacher =
  (listOfAssignedSubjects, id) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SUBJECT_ASSIGNED_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/updateAssignSubjectForTeacher`,
        { listOfAssignedSubjects, id },
        config
      );

      dispatch({
        type: UPDATE_SUBJECT_ASSIGNED_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SUBJECT_ASSIGNED_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//GET ALL SESSIONS
export const getAllSessions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SESSION_LIST_REQUEST });

    const { data } = await axios.get(`/api/getAllSessions`);

    dispatch({
      type: GET_SESSION_LIST_SUCCESS,
      payload: data === null ? [] : data.session.session,
    });
  } catch (error) {
    dispatch({
      type: GET_SESSION_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//PROMOTE STUDENT
export const promoteStudentToNextSemester =
  (listOfStudentsToPromote, session) => async (dispatch) => {
    try {
      dispatch({ type: PROMOTE_STUDENT_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/promoteStudents`,
        { listOfStudentsToPromote, session },
        config
      );

      dispatch({
        type: PROMOTE_STUDENT_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: PROMOTE_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//DETAIN STUDENT
export const detainStudentsByHOD =
  (listOfStudentsToDetain) => async (dispatch) => {
    try {
      dispatch({ type: DETENTION_STUDENT_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `/api/detainStudents`,
        { listOfStudentsToDetain },
        config
      );

      dispatch({
        type: DETENTION_STUDENT_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: DETENTION_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//GET ALL DETAINED STUDENTS
export const getAllDetainedStudents = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_DETAINED_REQUEST });

    const { data } = await axios.get(`/api/getAllDetainedStudents`);

    dispatch({
      type: GET_ALL_DETAINED_SUCCESS,
      payload: data === null ? [] : data.detainedStudents,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_DETAINED_FAIL,
      payload: error.response.data.message,
    });
  }
};

//PROMOTE STUDENT FROM DETENTION
export const promoteStudentFromDetentionByHOD =
  (id, session, semester) => async (dispatch) => {
    try {
      dispatch({ type: PROMOTE_DETENTION_TO_STUDENT_REQUEST });

      const { data } = await axios.put(
        `/api/promoteDetainToStudent/${id}/${session}/${semester}`
      );

      dispatch({
        type: PROMOTE_DETENTION_TO_STUDENT_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: PROMOTE_DETENTION_TO_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
