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

let initialState = {
  allStudentsList: {},
  allStudentsListLoading: false,
  allStudentsListError: "",
  varifiedStudentList: {},
  varifiedStudentListLoading: false,
  varifiedStudentListError: "",
  studentDetails: {},
  studentDetailsLoading: false,
  studentDetailsError: "",
};

const allStudentDataReducer = (state = initialState, action) => {
  switch (action.type) {
    // All student data
    case FETCH_ALL_STUDENTS_DATA:
      return {
        ...state,
        allStudentsListLoading: true,
      };
    case FETCH_ALL_STUDENTS_DATA_SUCCESS:
      return {
        ...state,
        allStudentsListLoading: false,
        allStudentsList: action.payload,
      };
    case FETCH_ALL_STUDENTS_DATA_FAILURE:
      return {
        ...state,
        allStudentsListError: action.payload.error,
      };

    // Fetch varified student data
    case FETCH_VARIFIED_STUDENTS_DATA:
      return {
        ...state,
        varifiedStudentListLoading: true,
      };
    case FETCH_VARIFIED_STUDENTS_DATA_SUCCESS:
      return {
        ...state,
        varifiedStudentListLoading: false,
        varifiedStudentList: action.payload,
      };
    case FETCH_VARIFIED_STUDENTS_DATA_FAILURE:
      return {
        ...state,
        varifiedStudentListError: action.payload.error,
      };
    // Fetch student details
    case FETCH_STUDENTS_DETAILS:
      return {
        ...state,
        studentDetailsLoading: true,
      };
    case FETCH_STUDENTS_DETAILS_SUCCESS:
      return {
        ...state,
        studentDetailsLoading: false,
        studentDetails: action.payload,
      };
    case FETCH_STUDENTS_DETAILS_FAILURE:
      return {
        ...state,
        studentDetailsError: action.payload.error,
      };

    default:
      return state;
  }
};

export default allStudentDataReducer;
