import {
  FETCH_ALL_STUDENTS_DATA,
  FETCH_ALL_STUDENTS_DATA_FAILURE,
  FETCH_ALL_STUDENTS_DATA_SUCCESS,
  FETCH_VARIFIED_STUDENTS_DATA,
  FETCH_VARIFIED_STUDENTS_DATA_FAILURE,
  FETCH_VARIFIED_STUDENTS_DATA_SUCCESS,
  FETCH_STUDENTS_DETAILS,
  FETCH_STUDENTS_DETAILS_SUCCESS,
  FETCH_STUDENTS_DETAILS_FAILURE,
} from "../constants/actionTypes";

import axiosInstance from "../../config/axios";

// Fetch all student data
export const fetchAllStudentsData = (payload) => {
  return {
    type: FETCH_ALL_STUDENTS_DATA,
    payload: payload,
  };
};
export const fetchAllStudentsDataSuccess = (payload) => {
  return {
    type: FETCH_ALL_STUDENTS_DATA_SUCCESS,
    payload: payload,
  };
};
export const fetchAllStudentsDataFailure = (payload) => {
  return {
    type: FETCH_ALL_STUDENTS_DATA_FAILURE,
    payload: payload,
  };
};

export const getfetchAllStudentsData = () => async (dispatch) => {
  dispatch(fetchAllStudentsData());

  axiosInstance
    .get("/dashboard/Teachers")
    .then((res) => {
      dispatch(fetchAllStudentsDataSuccess(res.data));
    })
    .catch((error) => {
      dispatch(fetchAllStudentsDataFailure({ error: error.data.message }));
    });
};
// Fetch varified student data
export const fetchVarifiedStudentsData = (payload) => {
  return {
    type: FETCH_VARIFIED_STUDENTS_DATA,
    payload: payload,
  };
};
export const fetchVarifiedStudentsDataSuccess = (payload) => {
  return {
    type: FETCH_VARIFIED_STUDENTS_DATA_SUCCESS,
    payload: payload,
  };
};
export const fetchVarifiedStudentsDataFailure = (payload) => {
  return {
    type: FETCH_VARIFIED_STUDENTS_DATA_FAILURE,
    payload: payload,
  };
};

export const getVarifiedStudentsData = () => async (dispatch) => {
  dispatch(fetchVarifiedStudentsData());

  axiosInstance
    .get("/dashboard/Teachers/StudentForExam")

    .then((res) => {
      dispatch(fetchVarifiedStudentsDataSuccess(res.data));
    })
    .catch((error) => {
      dispatch(fetchVarifiedStudentsDataFailure({ error: error.data.message }));
    });
};

// fetch student details
export const fetchStudentsDetails = (payload) => {
  return {
    type: FETCH_STUDENTS_DETAILS,
    payload: payload,
  };
};
export const fetchStudentsDetailsSuccess = (payload) => {
  return {
    type: FETCH_STUDENTS_DETAILS_SUCCESS,
    payload: payload,
  };
};
export const fetchStudentsDetailsFailure = (payload) => {
  return {
    type: FETCH_STUDENTS_DETAILS_FAILURE,
    payload: payload,
  };
};

export const getStudentsDetails = (studentId) => async (dispatch) => {
  dispatch(fetchStudentsDetails());

  axiosInstance
    .get(`/dashboard/Teachers/viewStudentDetail?id=${studentId}`)
    .then((res) => {
      dispatch(fetchStudentsDetailsSuccess(res.data));
    })
    .catch((error) => {
      dispatch(fetchStudentsDetailsFailure({ error: error.data.message }));
    });
};
