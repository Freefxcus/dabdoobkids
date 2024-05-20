import * as yup from "yup";

export const addressSchema = yup.object().shape({
  address_label: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .required("Required"),
  country: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .required("Required"),
  address: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .required("Required"),
  province: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .required("Required"),
  city: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .required("Required"),
  district: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .required("Required"),
  postal_code: yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .required("Required"),
});

export const addressSchemaInitialValues = {
  address_label: "",
  country: "",
  address: "",
  province: "",
  city: "",
  district: "",
  postal_code: "",
};
