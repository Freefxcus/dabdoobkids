import * as yup from "yup";
export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "First name must be at least 3 characters long")
    .required("Required"),
  lastName: yup
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
});
export const profileSchemaInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};
