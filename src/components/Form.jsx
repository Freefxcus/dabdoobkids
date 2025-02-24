import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import closed from "../images/closed.png";
import google from "../images/google.png";
import open from "../images/open.png";
import { userAuthAction } from "../Redux/store.js";
import styles from "../styles/components/Form.module.css";
import { notifyError, notifySuccess } from "../utils/general.js";
import instance from "../utils/interceptor.js";
import { loginSchema } from "../utils/schemas/loginSchema.js";
import { registerSchema } from "../utils/schemas/registerSchema.js";
import Loader from "./Loader";
export default function Form({ type, toggleDrawer }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const endpoint = type === "register" ? "/auth/register" : "/auth/login";
    const body =
      type === "register"
        ? {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          }
        : {
            email: values.email,
            password: values.password,
          };

    await instance
      .post(endpoint, body)
      .then((response) => {
        actions.resetForm();
        notifySuccess("Success!");

        if (type === "register") {
          navigate("/login");
        }
        if (type === "login") {
          dispatch(userAuthAction.login(response.data.data.accessToken));

          localStorage.setItem("access_token", response.data.data.accessToken);
          localStorage.setItem(
            "refresh_token",
            response.data.data.refreshToken
          );
          toggleDrawer && toggleDrawer();
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error, error.response, "<<<<errrrrrrrrrrrrr");
        if (type === "login") {
          console.log(error);
          notifyError("Wrong username or password!");
          return;
        } else {
          if (error === "Internal Server Error") {
            navigate("/login");
            notifySuccess("Success!");
            return;
          }

          notifyError(
            error.response?.data?.errors[0]?.message ||
              error.response?.data?.message ||
              error
          );
        }
      });
  };

  const handleGoogleAuth = async () => {
    window.open(`${process.env.REACT_APP_BASE_URL}/auth/google`, "_self");
  };

  const loginInitialValues = {
    email: "",
    password: "",
    remember_me: "",
  };
  const registerInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    values,
    errors,
    touched, // show error if you entered the input then go out [1) don't show error on first input enter 2) don't show error for other untouched inputs]
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues:
      type === "register" ? registerInitialValues : loginInitialValues,
    validationSchema: type === "register" ? registerSchema : loginSchema,
    onSubmit,
  });
  console.log(values);
  console.log(errors);
  useEffect(() => {
    document.querySelectorAll(".password").forEach((item) => {
      item.type = show ? "text" : "password";
    });
  }, [show]);
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {type === "login" && (
        <>
          <div className={styles.title}>Welcome back</div>
          <div className={`${styles.sub_title} ${styles.bottom_margin}`}>
            Please enter your detail and find your look
          </div>
          {/* email */}
          <div className={styles.label}>
            <span>Email</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            onBlur={handleBlur}
            className={
              errors.email && touched.email
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your email"
          ></input>

          {/* password */}
          <div className={styles.label}>
            <span>Password</span>
            <span className={styles.error}> *</span>
            {errors.password && touched.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div
            className={
              errors.password && touched.password
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            style={{
              border: "1px solid var(--dreamy-cloud)",
              borderRadius: "8px",
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
              height: "15px",
              gap: "20px",
            }}
          >
            <input
              placeholder="Your password"
              value={values.password}
              onChange={handleChange}
              id="password"
              type="password"
              onBlur={handleBlur}
              className={`${styles.input} password`}
              style={{
                border: "none",
                outline: "none",
                padding: "0",
                margin: "0",
                borderRadius: "initial",
                width: "100%",
                height: "100%",
              }}
              // className={
              //   errors.email && touched.email
              //     ? `${styles.input} ${styles.bottom_margin} input-error`
              //     : `${styles.input} ${styles.bottom_margin}`
              // }
            ></input>
            <img
              src={show ? open : closed}
              onClick={() => {
                setShow((prev) => !prev);
              }}
              width="20px"
              height="20px"
              style={{ cursor: "pointer" }}
              alt="show/hide password"
            />
          </div>

          <div className={`${styles.remember_me_line} ${styles.bottom_margin}`}>
            <input
              value={values.remember_me}
              type="checkbox"
              onChange={handleChange}
              id="remember_me"
              name="remember_me"
              onBlur={handleBlur}
              className={
                errors.email && touched.email
                  ? `${styles.checkbox} input-error`
                  : `${styles.checkbox}`
              }
            />
            <div className={styles.remember_me_label}>Remember for 30 days</div>
            <div
              onClick={() => {
                navigate("/reset-password");
              }}
              className={styles.remember_me_link}
            >
              Forgot password
            </div>
          </div>

          <button className={styles.brown_button}>Login</button>
          <button className={styles.grey_button} onClick={handleGoogleAuth}>
            <img src={google} width="25px" alt="google" /> <div>Google</div>
          </button>
          <div className={styles.footer}>
            <div className={styles.footer_main}>Don't have account yet?</div>
            <div
              className={styles.footer_sub}
              onClick={() => {
                if (toggleDrawer) {
                  toggleDrawer();
                }
                navigate("/register");
              }}
            >
              Register here
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {type === "register" && (
        <>
          <div className={styles.title}>Create an Account</div>
          <div className={`${styles.sub_title} ${styles.bottom_margin}`}>
            Register for faster checkout, track your order's status, and more
          </div>
          {/* first name */}
          <div className={styles.label}>
            <span>First name</span>
            <span className={styles.error}> *</span>
            {errors.firstName && touched.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>
          <input
            value={values.firstName}
            onChange={handleChange}
            id="firstName"
            type="firstName"
            onBlur={handleBlur}
            className={
              errors.firstName && touched.firstName
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your first name"
          ></input>
          {/* last name */}
          <div className={styles.label}>
            <span>Last name</span>
            <span className={styles.error}> *</span>
            {errors.lastName && touched.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
          <input
            value={values.lastName}
            onChange={handleChange}
            id="lastName"
            type="lastName"
            onBlur={handleBlur}
            className={
              errors.lastName && touched.lastName
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last name"
          ></input>
          {/* email */}
          <div className={styles.label}>
            <span>Email</span>
            <span className={styles.error}> *</span>
            {errors.email && touched.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>
          <input
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            onBlur={handleBlur}
            className={
              errors.email && touched.email
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last email"
          ></input>
          {/* password */}
          <div className={styles.label}>
            <span>Password</span>
            <span className={styles.error}> *</span>
            {errors.password && touched.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <input
            value={values.password}
            onChange={handleChange}
            id="password"
            type="password"
            onBlur={handleBlur}
            className={
              errors.password && touched.password
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your last password"
          ></input>
          {/* repeat password */}
          <div className={styles.label}>
            <span>Repeat password</span>
            <span className={styles.error}> *</span>
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          <input
            value={values.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            type="password"
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Repeat your password"
          ></input>

          <button className={styles.brown_button} type="submit">
            Register
          </button>
          <button className={styles.grey_button} onClick={handleGoogleAuth}>
            <img src={google} width="25px" alt="google" /> <div>Google</div>
          </button>
          <div className={styles.footer}>
            <div className={styles.footer_main}>Already have an account?</div>
            <div
              className={styles.footer_sub}
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign-in here
            </div>
          </div>
        </>
      )}
      <Loader open={isSubmitting} />
      {/* <ToastContainer /> */}
    </form>
  );
}
