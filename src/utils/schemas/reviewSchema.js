import * as yup from "yup";

export const reviewSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "First name must be at least 3 characters long")
    .required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  rating: yup.number().required("Required"),
  review_title: yup
    .string()
    .min(3, "At least 3 characters long")
    .max(10, "At most 10 characters long")
    .required("Required"),
  review_description: yup
    .string()
    .min(3, "At least 3 characters long")
    .required("Required"),
});

export const reviewSchemaInitialValues = {
  name: "",
  email: "",
  rating: "",
  review_title: "",
  review_description: "",
};
