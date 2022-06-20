import {
  CREATE_EXAM,
  CREATE_EXAM_SUCCESS,
  CREATE_EXAM_FAILURE,
  CREATED_EXAM_BODY,
  VIEW_EXAM,
  VIEW_EXAM_SUCCESS,
  VIEW_EXAM_FAILURE,
  DELETE_EXAM,
  DELETE_EXAM_SUCCESS,
  DELETE_EXAM_FAILURE,
  VIEW_EXAM_DETAILS,
  VIEW_EXAM_DETAILS_SUCCESS,
  VIEW_EXAM_DETAILS_FAILURE,
} from "../constants/actionTypes";

import axios from "../../config/axios";

// Create exam
export const createExamForStudent = (payload) => {
  return {
    type: CREATE_EXAM,
    payload: payload,
  };
};
export const createExamForStudentSuccess = (payload) => {
  return {
    type: CREATE_EXAM_SUCCESS,
    payload: payload,
  };
};
export const createExamForStudentFailure = (payload) => {
  return {
    type: CREATE_EXAM_FAILURE,
    payload: payload,
  };
};

export const getCreateExamForStudent = (body) => async (dispatch) => {
  dispatch(createExamForStudent());
  console.log("body", body);

  axios
    .post("/dashboard/Teachers/Exam", body, {
      headers: { "access-token": `${localStorage.getItem("user-token")}` },
    })
    .then((res) => {
      console.log("res", res);
      dispatch(createExamForStudentSuccess(res));
    })
    .catch((error) => {
      dispatch(createExamForStudentFailure({ error: error.message }));
    });
};

export const createdExamBody = (payload) => {
  return {
    type: CREATED_EXAM_BODY,
    payload: payload,
  };
};

// View exam
export const viewExamForStudent = (payload) => {
  return {
    type: VIEW_EXAM,
    payload: payload,
  };
};
export const viewExamForStudentSuccess = (payload) => {
  return {
    type: VIEW_EXAM_SUCCESS,
    payload: payload,
  };
};
export const viewExamForStudentFailure = (payload) => {
  return {
    type: VIEW_EXAM_FAILURE,
    payload: payload,
  };
};

export const getViewExamForStudent = () => async (dispatch) => {
  dispatch(viewExamForStudent());

  axios
    .get("/dashboard/Teachers/viewExam", {
      headers: { "access-token": `${localStorage.getItem("user-token")}` },
    })
    .then((res) => {
      dispatch(viewExamForStudentSuccess(res.data.data));
    })
    .catch((error) => {
      dispatch(viewExamForStudentFailure({ error: error.message }));
    });
};

// Delete exam
export const deleteExamForStudent = (payload) => {
  return {
    type: DELETE_EXAM,
    payload: payload,
  };
};

export const deleteExamForStudentSuccess = (payload) => {
  return {
    type: DELETE_EXAM_SUCCESS,
    payload: payload,
  };
};
export const deleteExamForStudentFailure = (payload) => {
  return {
    type: DELETE_EXAM_FAILURE,
    payload: payload,
  };
};

export const getDeleteExamForStudent = (id) => async (dispatch) => {
  dispatch(viewExamForStudent());

  axios
    .delete(`/dashboard/Teachers/deleteExam?id=${id}`, {
      headers: { "access-token": `${localStorage.getItem("user-token")}` },
    })
    .then((res) => {
      dispatch(deleteExamForStudentSuccess(res.data.data));
    })
    .catch((error) => {
      dispatch(deleteExamForStudentFailure({ error: error.message }));
    });
};

// View exam detais
export const viewExamInDetails = (payload) => {
  return {
    type: VIEW_EXAM_DETAILS,
    payload: payload,
  };
};

export const viewExamInDetailsSuccess = (payload) => {
  return {
    type: VIEW_EXAM_DETAILS_SUCCESS,
    payload: payload,
  };
};
export const viewExamInDetailsFailure = (payload) => {
  return {
    type: VIEW_EXAM_DETAILS_FAILURE,
    payload: payload,
  };
};

export const getViewExamInDetails = (id) => async (dispatch) => {
  dispatch(viewExamInDetails());

  axios
    .get(`/dashboard/Teachers/examDetail?id=${id}`, {
      headers: { "access-token": `${localStorage.getItem("user-token")}` },
    })
    .then((res) => {
      dispatch(viewExamInDetailsSuccess(res.data.data));
    })
    .catch((error) => {
      dispatch(viewExamInDetailsFailure({ error: error.message }));
    });
};
