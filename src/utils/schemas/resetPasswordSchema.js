import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});

export const resetPasswordSchemaInitialValues = {
  email: "",
};
