import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "https://nodejsexamination.herokuapp.com/",
  timeout: 100000,
});

// request inceptors for taking token
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["access-token"] = `${localStorage.getItem("user-token")}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// response inceptors for handling response
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.message === "jwt_expired") {
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
