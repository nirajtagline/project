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
  UPDATE_VIEW_EXAM,
} from "../constants/actionTypes";

import axiosInstance from "../../config/axios";

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
  axiosInstance
    .post("/dashboard/Teachers/Exam", body)
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
export const updateViewExam = (payload) => {
  return {
    type: UPDATE_VIEW_EXAM,
    payload: payload,
  };
};

export const getViewExamForStudent = () => async (dispatch) => {
  dispatch(viewExamForStudent());

  axiosInstance
    .get("/dashboard/Teachers/viewExam")
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

export const getDeleteExamForStudent =
  ({ id, index }) =>
  async (dispatch) => {
    dispatch(viewExamForStudent());

    axiosInstance
      .delete(`/dashboard/Teachers/deleteExam?id=${id}`)
      .then((res) => {
        dispatch(deleteExamForStudentSuccess(res.data.statusCode));
        dispatch(updateViewExam({ id, index }));
        return;
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

  axiosInstance
    .get(`/dashboard/Teachers/examDetail?id=${id}`)
    .then((res) => {
      dispatch(viewExamInDetailsSuccess(res.data));
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
  axiosInstance
    .put(`/dashboard/Teachers/editExam?id=${id}`, body)
    .then((res) => {
      dispatch(editExamForStudentSuccess(res));

      const cloneResData = { ...res };
      const { data } = cloneResData;
      const cloneData = { ...data?.data };
      delete cloneData?.status;
      delete cloneData?.questions;

      dispatch(updateViewExam({ id, cloneData }));
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

  axiosInstance
    .get(`/student/examPaper?id=${id}`)
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
  axiosInstance
    .post(`student/giveExam?id=${id}`, body)
    .then((res) => {
      dispatch(submitExamSuccess(res));
      return;
    })
    .catch((error) => {
      dispatch(submitExamFailure({ error: error.message }));
    });
};
