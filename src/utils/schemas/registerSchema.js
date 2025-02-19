import * as yup from "yup";

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "First name must be at least 3 characters long")
    .required("Required"),
  lastName: yup
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8, "At least 8 characters")
    .matches(/[a-z]/, "Include at least one lowercase letter")
    .matches(/[A-Z]/, "Include at least one uppercase letter")
    .matches(/\d/, "Include at least one number")
    .matches(/[@$!%*?&]/, "Include at least one special character (@, $, etc.)")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
