import {
  FETCH_EXAM_STUDENTS_DETAILS,
  FETCH_EXAM_STUDENTS_DETAILS_SUCCESS,
  FETCH_EXAM_STUDENTS_DETAILS_FAILURE,
  FETCH_STUDENT_PROFILE,
  FETCH_STUDENT_PROFILE_SUCCESS,
  FETCH_STUDENT_PROFILE_FAILURE,
  UPDATE_STUDENT_PROFILE,
  UPDATE_STUDENT_PROFILE_SUCCESS,
  UPDATE_STUDENT_PROFILE_FAILURE,
} from "../constants/actionTypes";

import axiosInstance from "../../config/axios";

// Fetch exam for student data
export const fetchExamForStudentsDetails = (payload) => {
  return {
    type: FETCH_EXAM_STUDENTS_DETAILS,
    payload: payload,
  };
};
export const fetchExamForStudentsDetailsSuccess = (payload) => {
  return {
    type: FETCH_EXAM_STUDENTS_DETAILS_SUCCESS,
    payload: payload,
  };
};
export const fetchExamForStudentsDetailsFailure = (payload) => {
  return {
    type: FETCH_EXAM_STUDENTS_DETAILS_FAILURE,
    payload: payload,
  };
};

export const getExamForStudentsDetails = () => async (dispatch) => {
  dispatch(fetchExamForStudentsDetails());

  axiosInstance
    .get("/student/studentExam")
    .then((res) => {
      dispatch(fetchExamForStudentsDetailsSuccess(res.data.data));
    })
    .catch((error) => {
      dispatch(
        fetchExamForStudentsDetailsFailure({ error: error.data.message })
      );
    });
};

// Fetch student profile
export const fetchStudentProfile = (payload) => {
  return {
    type: FETCH_STUDENT_PROFILE,
    payload: payload,
  };
};
export const fetchStudentProfileSuccess = (payload) => {
  return {
    type: FETCH_STUDENT_PROFILE_SUCCESS,
    payload: payload,
  };
};
export const fetchStudentProfileFailure = (payload) => {
  return {
    type: FETCH_STUDENT_PROFILE_FAILURE,
    payload: payload,
  };
};

export const getStudentProfile = () => async (dispatch) => {
  dispatch(fetchStudentProfile());

  axiosInstance
    .get("/student/getStudentDetail")
    .then((res) => {
      dispatch(fetchStudentProfileSuccess(res.data.data));
    })
    .catch((error) => {
      dispatch(fetchStudentProfileFailure({ error: error.data.message }));
    });
};

// Update student profile
export const updateStudentProfile = (payload) => {
  return {
    type: UPDATE_STUDENT_PROFILE,
    payload: payload,
  };
};
export const updateStudentProfileSuccess = (payload) => {
  return {
    type: UPDATE_STUDENT_PROFILE_SUCCESS,
    payload: payload,
  };
};
export const updateStudentProfileFailure = (payload) => {
  return {
    type: UPDATE_STUDENT_PROFILE_FAILURE,
    payload: payload,
  };
};

export const updateStudentProfileData = (body) => async (dispatch) => {
  dispatch(updateStudentProfile());

  axiosInstance
    .put("/student/studentProfile", body)
    .then((res) => {
      dispatch(updateStudentProfileSuccess(res.data.data));
    })
    .catch((error) => {
      dispatch(updateStudentProfileFailure({ error: error.data.message }));
    });
};
