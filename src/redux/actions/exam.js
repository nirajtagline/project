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
  EDIT_EXAM_DETAILS,
  EDIT_EXAM_DETAILS_SUCCESS,
  EDIT_EXAM_DETAILS_FAILURE,
  FETCH_EXAM_PAPER,
  FETCH_EXAM_PAPER_SUCCESS,
  FETCH_EXAM_PAPER_FAILURE,
  SUBMIT_EXAM_PAPER,
  SUBMIT_EXAM_PAPER_SUCCESS,
  SUBMIT_EXAM_PAPER_FAILURE,
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
  axios
    .post("/dashboard/Teachers/Exam", body, {
      headers: { "access-token": `${localStorage.getItem("user-token")}` },
    })
    .then((res) => {
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

// View exam details
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
      return;
    })
    .catch((error) => {
      dispatch(viewExamInDetailsFailure({ error: error.message }));
    });
};

// Edit exam
export const editExamForStudent = (payload) => {
  return {
    type: EDIT_EXAM_DETAILS,
    payload: payload,
  };
};

export const editExamForStudentSuccess = (payload) => {
  return {
    type: EDIT_EXAM_DETAILS_SUCCESS,
    payload: payload,
  };
};
export const editExamForStudentFailure = (payload) => {
  return {
    type: EDIT_EXAM_DETAILS_FAILURE,
    payload: payload,
  };
};

export const getEditExamForStudent = (id, body) => async (dispatch) => {
  dispatch(editExamForStudent());
  axios
    .put(`/dashboard/Teachers/editExam?id=${id}`, body, {
      headers: { "access-token": `${localStorage.getItem("user-token")}` },
    })
    .then((res) => {
      dispatch(editExamForStudentSuccess(res));
    })
    .catch((error) => {
      dispatch(editExamForStudentFailure({ error: error.message }));
    });
};

// Fetch exam paper

export const fetchExamPaper = (payload) => {
  return {
    type: FETCH_EXAM_PAPER,
    payload: payload,
  };
};
export const fetchExamPaperSuccess = (payload) => {
  return {
    type: FETCH_EXAM_PAPER_SUCCESS,
    payload: payload,
  };
};
export const fetchExamPaperFailure = (payload) => {
  return {
    type: FETCH_EXAM_PAPER_FAILURE,
    payload: payload,
  };
};

export const getExamPaper = (id) => async (dispatch) => {
  dispatch(fetchExamPaper());

  axios
    .get(`/student/examPaper?id=${id}`, {
      headers: { "access-token": `${localStorage.getItem("user-token")}` },
    })
    .then((res) => {
      dispatch(fetchExamPaperSuccess(res.data));
    })
    .catch((error) => {
      dispatch(fetchExamPaperFailure({ error: error.message }));
    });
};

// Submit exam
export const submitExam = (payload) => {
  return {
    type: SUBMIT_EXAM_PAPER,
    payload: payload,
  };
};
export const submitExamSuccess = (payload) => {
  return {
    type: SUBMIT_EXAM_PAPER_SUCCESS,
    payload: payload,
  };
};
export const submitExamFailure = (payload) => {
  return {
    type: SUBMIT_EXAM_PAPER_FAILURE,
    payload: payload,
  };
};

export const submitExamOfStudent = (body, id) => async (dispatch) => {
  dispatch(submitExam());
  axios
    .post(`student/giveExam?id=${id}`, body, {
      headers: { "access-token": `${localStorage.getItem("user-token")}` },
    })
    .then((res) => {
      dispatch(submitExamSuccess(res));
      return;
    })
    .catch((error) => {
      dispatch(submitExamFailure({ error: error.message }));
    });
};
