import * as yup from "yup";
const phoneRules = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

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
  // phone: yup
  //   .string()
  //   .matches(phoneRules, { message: "Please create a stronger password" })
  //   .required("Required"),
});

export const profileSchemaInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};
