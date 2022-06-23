import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentProfile,
  updateStudentProfileData,
} from "../../../redux/actions";
import InputField from "../../../shared/InputField/InputField";
import Button from "../../../shared/Button/Button";

const StudentProfile = () => {
  const dispatch = useDispatch();

  const { studentProfileData, updatedStudentProfileData } = useSelector(
    ({ student }) => student
  );

  const [userName, setUserName] = useState(studentProfileData?.name);

  useEffect(() => {
    dispatch(getStudentProfile());
    setUserName(studentProfileData?.name);
  }, [studentProfileData?.name]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdateProfile = () => {
    dispatch(updateStudentProfileData({ name: userName }));
  };

  return (
    <div>
      <h2>Student Profile</h2>
      <h3>
        {!!updatedStudentProfileData?.message
          ? updatedStudentProfileData?.message
          : ""}
      </h3>
      <InputField
        type="text"
        isReadOnly={true}
        value={studentProfileData?.email}
        isDisable={true}
      />
      <InputField
        type="text"
        isReadOnly={false}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <InputField
        type="text"
        isReadOnly={true}
        value={studentProfileData?._id}
        isDisable={true}
      />
      <InputField
        type="text"
        isReadOnly={true}
        value={studentProfileData?.role}
        isDisable={true}
      />

      <Button
        type="button"
        className="submit-form"
        buttonText="Update profile"
        onClick={() => handleUpdateProfile()}
      />
    </div>
  );
};

export default StudentProfile;
