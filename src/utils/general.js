import instance from "../utils/interceptor.js";
import { toast } from "react-toastify";

export const isValidUser = async () => {
  const pathname = window.location.pathname;
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  const firstEndpoint = pathSegments[0];

  if (
    // ["profile"].includes(firstEndpoint) &&
    !localStorage.getItem("access_token")
  ) {
    // window.location.href = `${window.location.protocol}//${window.location.host}/login`;
    return true;
  } else {
    await instance
      .post("/auth/refresh", {
        refreshToken: localStorage.getItem("access_token"),
      })
      .then((response) => {
        console.log(response);
        // returnedValue = response.data.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
};

export const notifySuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 1000, // Auto close the notification after 3000 milliseconds (3 seconds)
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const notifyError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const navigate = (endpoint) => {
  window.location.href = `${window.location.protocol}//${window.location.host}${endpoint}`;
};

export const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};
