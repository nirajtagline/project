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

let initialState = {
  examForStudentData: {},
  examForStudentDataLoading: false,
  examForStudentDataError: "",
  studentProfileData: {},
  studentProfileDataLoading: false,
  studentProfileDataError: "",
  updatedStudentProfileData: {},
  updatedStudentProfileDataLoading: false,
  updatedStudentProfileDataError: "",
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

    // student profile
    case FETCH_STUDENT_PROFILE:
      return {
        ...state,
        studentProfileDataLoading: true,
      };
    case FETCH_STUDENT_PROFILE_SUCCESS:
      return {
        ...state,
        studentProfileDataLoading: false,
        studentProfileData: action.payload,
      };
    case FETCH_STUDENT_PROFILE_FAILURE:
      return {
        ...state,
        studentProfileDataError: action.payload.error,
      };

    // Update student profile
    case UPDATE_STUDENT_PROFILE:
      return {
        ...state,
        updatedStudentProfileDataLoading: true,
      };
    case UPDATE_STUDENT_PROFILE_SUCCESS:
      return {
        ...state,
        updatedStudentProfileDataLoading: false,
        updatedStudentProfileData: action.payload,
      };
    case UPDATE_STUDENT_PROFILE_FAILURE:
      return {
        ...state,
        updatedStudentProfileDataError: action.payload.error,
      };

    default:
      return state;
  }
};

export default examForStudentDataReducer;
