import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp !== undefined && decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
const HandleMessageIsAuth = (Fn) => {
  const isAuthenticated =
    localStorage.getItem("access_token") &&
    isTokenExpired(localStorage.getItem("access_token"));
  localStorage.getItem("refresh_token");

  if (!isAuthenticated) {
    return toast.error("Please login first");
  }
  return Fn && Fn();
};

export default HandleMessageIsAuth;
