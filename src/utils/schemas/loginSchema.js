import * as yup from "yup";

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "At least 8 characters")
    .matches(/[a-z]/, "Include at least one lowercase letter")
    .matches(/[A-Z]/, "Include at least one uppercase letter")
    .matches(/\d/, "Include at least one number")
    .matches(
      /[@$!%*?&]/,
      "Include at least one special character (@, $, etc.)"
    ),
});
