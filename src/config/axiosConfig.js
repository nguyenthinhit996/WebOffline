import axios from "axios";

// const baseURL =
//   process.env.REACT_APP_API_URL || "https://pwdbackend.onrender.com"; // Replace with your actual API base URL

const baseURL = process.env.REACT_APP_API_URL || "https://english4lives.com"; // Replace with your actual API base URL

const instance = axios.create({
  baseURL,
  // Add additional default configurations here if needed (e.g., headers, interceptors)
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
