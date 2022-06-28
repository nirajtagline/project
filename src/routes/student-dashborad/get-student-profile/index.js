import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentProfile,
  updateStudentProfileData,
} from "../../../redux/actions";
import InputField from "../../../shared/InputField/InputField";
import CustomForm from "../../../shared/Form/Form";
import Loader from "../../../shared/Loader";
import { Validation } from "../../../Validation";

const initialState = {
  name: "",
};

const StudentProfile = () => {
  const dispatch = useDispatch();

  const {
    studentProfileData,
    updatedStudentProfileData,
    studentProfileDataLoading,
    updatedStudentProfileDataLoading,
  } = useSelector(({ student }) => student);

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: Validation(name, value) });
  };

  const studentFormData = [
    {
      label: "Email :-",
      name: "email",
      value: studentProfileData?.email,
      type: "text",
      isShowValidate: false,
      disable: true,
    },
    {
      label: "Name :-",
      name: "name",
      value: formData?.name ?? studentProfileData?.name,
      type: "text",
      isShowValidate: true,
      placeholder: "Enter your Name",
      message: error?.name,
      handleChange,
    },
    {
      label: "Id :-",
      value: studentProfileData?._id,
      type: "text",
      isShowValidate: false,
      disable: true,
    },
    {
      label: "Role :-",
      value: studentProfileData?.role,
      type: "text",
      isShowValidate: false,
      disable: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateError = {};
    Object.keys(formData).forEach((key) => {
      const message = Validation(key, formData[key]);
      if (message) {
        validateError[key] = message;
      }
    });
    if (Object.keys(validateError).length) {
      setError({ ...error, ...validateError });
      return;
    }
    dispatch(updateStudentProfileData(formData));
  };

  useEffect(() => {
    dispatch(getStudentProfile());
    setFormData({ name: studentProfileData?.name });
  }, [studentProfileData?.name, updatedStudentProfileData.message]); // eslint-disable-line react-hooks/exhaustive-deps

  return !studentProfileDataLoading && !updatedStudentProfileDataLoading ? (
    <div>
      <h2>Student Profile</h2>
      <h3>
        {!!updatedStudentProfileData?.message
          ? updatedStudentProfileData?.message
          : ""}
      </h3>

      <CustomForm handleSubmit={(e) => handleSubmit(e)} buttonText="Update">
        {studentFormData.map((data, id) => {
          return <InputField key={id} {...data} />;
        })}
      </CustomForm>
    </div>
  ) : (
    <Loader />
  );
};

export default StudentProfile;
