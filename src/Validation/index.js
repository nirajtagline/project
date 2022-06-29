import {
  nameRegex,
  emailRegex,
  passwordRegex,
  confirmPasswordRegex,
} from "../utils/regex";

export const Validation = (key, value, formData) => {
  switch (key) {
    case "name":
      if (!value && value.trim() === "") {
        return "Name is required";
      } else if (!nameRegex.test(value)) {
        return "Name should be maximum 3 character";
      }
      break;
    case "email":
      if (!value && value.trim() === "") {
        return "Email is required";
      } else if (!emailRegex.test(value)) {
        return "Email is invalid, email should be xyz@abcd.xyz";
      }
      break;
    case "password":
    case "Password":
    case "oldPassword":
      if (!value && value.trim() === "") {
        return key === "Password" || key === "password"
          ? "Password is required"
          : "Old Password is required";
      } else if (!passwordRegex.test(value)) {
        return "Password is invalid, password should be number and minimum 8 character and maximum 16 character.";
      }
      break;
    case "ConfirmPassword":
      if (!value && value.trim() === "") {
        return "Confirm Password is required";
      } else if (!confirmPasswordRegex.test(value)) {
        return "Password is invalid, password should be number and manimum 8 character and maximum 16 character and match with new password.";
      } else if (value !== formData?.Password) {
        return "Password is invalid, password should be match with new password.";
      }
      break;
    default:
      return;
  }
};
