import {
  FETCH_EXAM_STUDENTS_DETAILS,
  FETCH_EXAM_STUDENTS_DETAILS_SUCCESS,
  FETCH_EXAM_STUDENTS_DETAILS_FAILURE,
} from "../constants/actionTypes";

import axios from "../../config/axios";

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

  axios
    .get("/student/studentExam", {
      headers: {
        "access-token": `${localStorage.getItem("user-token")}`,
      },
    })
    .then((res) => {
      dispatch(fetchExamForStudentsDetailsSuccess(res.data.data));
    })
    .catch((error) => {
      dispatch(
        fetchExamForStudentsDetailsFailure({ error: error.data.message })
      );
    });
};
