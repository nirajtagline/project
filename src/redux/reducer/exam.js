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
} from "../constants/actionTypes";

let initialState = {
  createExamData: {},
  createExamDataLoading: false,
  createExamDataError: "",
  createExamBody: {},
  viewExamData: [],
  viewExamDataLoading: false,
  viewExamDataError: "",
  deleteExamData: {},
  deleteExamDataLoading: false,
  deleteExamDataError: "",
  isDeleteExamData: false,
  viewExamInDetailsData: {},
  isFetchExamInDetailsData: false,
  viewExamInDetailsDataLoading: false,
  viewExamInDetailsDataError: "",
  editExamData: {},
  editExamDataLoading: false,
  editExamDataError: "",
  isEditExamData: false,
  examPaper: {},
  examPaperLoading: false,
  examPaperError: "",
};

const createExamReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create exam data
    case CREATE_EXAM:
      return {
        ...state,
        createExamDataLoading: true,
      };
    case CREATE_EXAM_SUCCESS:
      return {
        ...state,
        createExamDataLoading: false,
        createExamData: action.payload,
      };
    case CREATE_EXAM_FAILURE:
      return {
        ...state,
        createExamDataError: action.payload.error,
      };

    // created exambody
    case CREATED_EXAM_BODY:
      return {
        ...state,
        createExamBody: action.payload,
      };

    // view exam data
    case VIEW_EXAM:
      return {
        ...state,
        viewExamDataLoading: true,
      };
    case VIEW_EXAM_SUCCESS:
      return {
        ...state,
        viewExamDataLoading: false,
        viewExamData: action.payload,
      };
    case VIEW_EXAM_FAILURE:
      return {
        ...state,
        viewExamDataError: action.payload.error,
      };

    // Delete exam data
    case DELETE_EXAM:
      return {
        ...state,
        deleteExamDataLoading: true,
      };
    case DELETE_EXAM_SUCCESS:
      return {
        ...state,
        deleteExamDataLoading: false,
        isDeleteExamData: true,
      };
    case DELETE_EXAM_FAILURE:
      return {
        ...state,
        deleteExamDataError: action.payload.error,
      };

    // Edit exam data
    case EDIT_EXAM_DETAILS:
      return {
        ...state,
        editExamDataLoading: true,
      };
    case EDIT_EXAM_DETAILS_SUCCESS:
      return {
        ...state,
        editExamDataLoading: false,
        editExamData: action.payload,
        isEditExamData: true,
      };
    case EDIT_EXAM_DETAILS_FAILURE:
      return {
        ...state,
        editExamDataError: action.payload.error,
      };

    // View exam in details
    case VIEW_EXAM_DETAILS:
      return {
        ...state,
        viewExamInDetailsDataLoading: true,
      };
    case VIEW_EXAM_DETAILS_SUCCESS:
      return {
        ...state,
        viewExamInDetailsDataLoading: false,
        viewExamInDetailsData: action.payload,
        isFetchExamInDetailsData: true,
      };
    case VIEW_EXAM_DETAILS_FAILURE:
      return {
        ...state,
        viewExamInDetailsDataError: action.payload.error,
      };
    // get exam paper
    case FETCH_EXAM_PAPER:
      return {
        ...state,
        examPaperLoading: true,
      };
    case FETCH_EXAM_PAPER_SUCCESS:
      return {
        ...state,
        examPaperLoading: false,
        examPaperData: action.payload,
      };
    case FETCH_EXAM_PAPER_FAILURE:
      return {
        ...state,
        examPaperError: action.payload.error,
      };

    default:
      return state;
  }
};

export default createExamReducer;
