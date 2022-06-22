import {
  FETCH_EXAM_STUDENTS_DETAILS,
  FETCH_EXAM_STUDENTS_DETAILS_SUCCESS,
  FETCH_EXAM_STUDENTS_DETAILS_FAILURE,
} from "../constants/actionTypes";

let initialState = {
  examForStudentData: {},
  examForStudentDataLoading: false,
  examForStudentDataError: "",
};

const examForStudentDataReducer = (state = initialState, action) => {
  switch (action.type) {
    // Exam for student data
    case FETCH_EXAM_STUDENTS_DETAILS:
      return {
        ...state,
        examForStudentDataLoading: true,
      };
    case FETCH_EXAM_STUDENTS_DETAILS_SUCCESS:
      return {
        ...state,
        examForStudentDataLoading: false,
        examForStudentData: action.payload,
      };
    case FETCH_EXAM_STUDENTS_DETAILS_FAILURE:
      return {
        ...state,
        examForStudentDataError: action.payload.error,
      };

    default:
      return state;
  }
};

export default examForStudentDataReducer;
