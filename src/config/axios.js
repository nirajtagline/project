import axios from "axios";
import { getLocalItems } from "../utils/localStorage";

let axiosInstance = axios.create({
  baseURL: "https://nodejsexamination.herokuapp.com/",
  timeout: 100000,
});

// request inceptors for taking token
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["access-token"] = `${getLocalItems("user-token")}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// response inceptors for handling response
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.message === "jwt expired") {
      localStorage.clear();
      window.location.href = "/";
      return;
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
