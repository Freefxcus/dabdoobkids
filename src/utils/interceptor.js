import axios from "axios";
console.log("url", process.env.REACT_APP_BASE_URL);
const instance = axios.create({
  // baseURL: "https://api.dabdoobkidz.com", // Set your API base URL
  baseURL: process.env.REACT_APP_BASE_URL, // Set your API base URL
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (localStorage.getItem("access_token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "access_token"
      )}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.error("Request Error Interceptor:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response.data.message);
  }
);

export default instance;
