import * as yup from "yup";

export const addressSchema = yup.object().shape({
  phone_number: yup
    .string()
    .min(11, "Phone must be at least 11 characters long")
    .required("Required"),
  first_name: yup
    .string()
    .min(2, "Phone must be at least 2 characters long")
    .required("Required"),
  last_name: yup
    .string()
    .min(2, "Phone must be at least 2 characters long")
    .required("Required"),

  address: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .required("Required"),

  primary: yup.boolean().required("Required"),
  type: yup.string().required("Required"),
  governorate: yup
    .number()
    .required("Required"),
  city: yup
    .number().required("Required"),
  // district: yup
  //   .string()
  //   .min(3, "Must be at least 3 characters long")
  //   .required("Required"),
  // postalCode: yup
  //   .string()
  //   .min(3, "Must be at least 3 characters long")
  //   .required("Required"),
});

export const addressSchemaInitialValues = {
  phone_number: "",
  first_name: "",
  last_name: "",
  type: "",
  primary: "",
  address: "",
  governorate: "",
  city: "",
  // district: "",
  postalCode: "",
};
