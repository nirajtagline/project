import axios from "axios";

axios.defaults.baseURL = "https://nodejsexamination.herokuapp.com/";

// let axiosInstance = axios.create({
//   baseURL: "hhttps://nodejsexamination.herokuapp.com/",
//   timeout: 100000,
// });

// request inceptors for taking token
// axiosInstance.interceptors.request.use(
//     config => {
//       config.headers.authorization = `bearer ${localStorage.getItem(
//         "user-token")}`
//       return config;
//     },
//     error => Promise.reject(error),
//   );

// response inceptors for handling response
// axiosInstance.interceptors.response.use(
//   (response) => {
//     if (response.data.status === "token_expired") {
//       localStorage.clear();
//       window.location.href = "/login";
//       return;
//     }
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.clear();
//       window.location.href = "/login";
//     } else {
//       return Promise.reject(error);
//     }
//   },
// );

export default axios;
