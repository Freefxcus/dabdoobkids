import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "../styles/components/Popup.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import remove from "../images/remove.png";
import reset from "../images/reset-password.png";
import resetPassword from "../images/reset-new-password.png";
import resetSuccess from "../images/reset-success.png";
import Rating from "@mui/material/Rating";
import { useFormik } from "formik";
import { notifySuccess } from "../utils/general.js";
import { addAddress } from "../utils/apiCalls.js";
import {
  reviewSchema,
  reviewSchemaInitialValues,
} from "../utils/schemas/reviewSchema.js";
import {
  addressSchema,
  addressSchemaInitialValues,
} from "../utils/schemas/addressSchema.js";
import {
  profileSchema,
  profileSchemaInitialValues,
} from "../utils/schemas/profileSchema.js";
import {
  resetPasswordSchema,
  resetPasswordSchemaInitialValues,
} from "../utils/schemas/resetPasswordSchema.js";
import {
  setNewPasswordSchema,
  setNewPasswordSchemaInitialValues,
} from "../utils/schemas/setNewPasswordSchema.js";
import instance from "../utils/interceptor.js";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  // maxWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
  padding: "20px",
  outline: "none",
  border: "none",
  borderRadius: "10px",
};

export default function Popup({
  open,
  setOpen,
  type,
  setPopupType,
  setForceReload,
  setAddress,
  option,
  address,
}) {
  const onSubmit = async (values, actions) => {
    let endpoint;
    let body;
    let method;
    switch (type) {
      case "create_address":
        endpoint = "/addresses";
        method = "post";
        console.log(values);
        console.log(errors);
        body = {
          country: values.country,
          city: values.city,
          province: values.province,
          // district: values.district,
          address: values.address,
          // postalCode: values.postalCode,
          phone: "string",
          name: values.address_label,
        };
        setAddress(values);
        break;
    }

    option == "no_api" && setOpen(false);
    option !== "no_api" &&
      (await instance[method](endpoint, body)
        .then((response) => {
          notifySuccess("Success!");
          setOpen(false);
          setForceReload && setForceReload((prev) => !prev);
        })
        .catch((error) => {
          console.log("Error!");
        }));
  };
  let validationSchema;
  let initialValues;
  switch (type) {
    case "review":
      validationSchema = reviewSchema;
      initialValues = reviewSchemaInitialValues;
      break;
    case "create_address":
      validationSchema = addressSchema;
      initialValues = addressSchemaInitialValues;
      break;
    case "profile":
      validationSchema = profileSchema;
      initialValues = profileSchemaInitialValues;
      break;
    case "reset_password":
      validationSchema = resetPasswordSchema;
      initialValues = resetPasswordSchemaInitialValues;
      break;
    case "set_new_password":
      validationSchema = setNewPasswordSchema;
      initialValues = setNewPasswordSchemaInitialValues;
      break;
    default:
  }

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });
  const handleClose = () => {
    setOpen(false);
    setPopupType && setPopupType("");
  };
  useEffect(() => {
    address && setValues(address);
  }, []);

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        {type === "review" && (
          <Box sx={style} className={styles.form_container}>
            <div className={`${styles.title} ${styles.item}`}>
              Address Label
            </div>
            {/* name */}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Name</span>
                <span className={styles.error}> *</span>
                {errors.name && touched.name && (
                  <span className="error">{errors.name}</span>
                )}
              </div>
              <input
                value={values.name}
                onChange={handleChange}
                id="name"
                type="name"
                onBlur={handleBlur}
                className={
                  errors.name && touched.name
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Your name"
              ></input>
            </div>
            {/* email */}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
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
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Email address"
              ></input>
            </div>
            {/* rating */}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Rating</span>
                <span className={styles.error}> *</span>
                {errors.rating && touched.rating && (
                  <span className="error">{errors.rating}</span>
                )}
              </div>
              <Rating
                name="rating"
                value={values.rating}
                onChange={(event, newValue) => {
                  setFieldValue("rating", newValue);
                }}
                id="rating"
                type="rating"
                onBlur={handleBlur}
                className={
                  errors.rating && touched.rating
                    ? `${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.item} ${styles.bottom_margin}`
                }
              />
            </div>
            {/* review title */}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Review Title (max 10 word)</span>
                <span className={styles.error}> *</span>
                {errors.review_title && touched.review_title && (
                  <span className="error">{errors.review_title}</span>
                )}
              </div>
              <input
                value={values.review_title}
                onChange={handleChange}
                id="review_title"
                type="review_title"
                onBlur={handleBlur}
                className={
                  errors.review_title && touched.review_title
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Your review a title"
              ></input>
            </div>
            {/* review description */}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Address</span>
                <span className={styles.error}> *</span>
                {errors.review_description && touched.review_description && (
                  <span className="error">{errors.review_description}</span>
                )}
              </div>
              <textarea
                value={values.review_description}
                onChange={handleChange}
                id="review_description"
                type="review_description"
                onBlur={handleBlur}
                className={
                  errors.review_description && touched.review_description
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="write your review...."
                rows="4"
                // cols="50"
              ></textarea>
            </div>

            <button className={`${styles.brown_button} ${styles.item}`}>
              Submit review
            </button>
          </Box>
        )}
        {type === "create_address" && (
          <Box
            sx={style}
            className={styles.form_container}
            style={{ maxHeight: "650px", overflow: "auto" }}
          >
            <div className={`${styles.title} ${styles.item}`}>
              Address Label
            </div>
            {/* address label */}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Address Label</span>
                <span className={styles.error}> *</span>
                {errors.address_label && touched.address_label && (
                  <span className="error">{errors.address_label}</span>
                )}
              </div>
              <input
                value={values.address_label}
                onChange={handleChange}
                id="address_label"
                type="address_label"
                onBlur={handleBlur}
                className={
                  errors.address_label && touched.address_label
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Eg. home or office"
              ></input>
            </div>
            {/* country */}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Country</span>
                <span className={styles.error}> *</span>

                {errors.country && touched.country && (
                  <span className="error">{errors.country}</span>
                )}
              </div>
              <input
                value={values.country}
                onChange={handleChange}
                id="country"
                type="country"
                onBlur={handleBlur}
                className={
                  errors.country && touched.country
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Add your country"
              ></input>
            </div>
            {/* address */}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Address</span>
                <span className={styles.error}> *</span>

                {errors.address && touched.address && (
                  <span className="error">{errors.address}</span>
                )}
              </div>
              <input
                value={values.address}
                onChange={handleChange}
                id="address"
                type="address"
                onBlur={handleBlur}
                className={
                  errors.address && touched.address
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Your address"
              ></input>
            </div>
            {/* province */}
            <div className={styles.semi_item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Province</span>
                <span className={styles.error}> *</span>

                {errors.province && touched.province && (
                  <span className="error">{errors.province}</span>
                )}
              </div>
              <input
                value={values.province}
                onChange={handleChange}
                id="province"
                type="province"
                onBlur={handleBlur}
                className={
                  errors.province && touched.province
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Province"
              ></input>
            </div>
            {/* city */}
            <div className={styles.semi_item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>City</span>
                <span className={styles.error}> *</span>

                {errors.city && touched.city && (
                  <span className="error">{errors.city}</span>
                )}
              </div>
              <input
                value={values.city}
                onChange={handleChange}
                id="city"
                type="city"
                onBlur={handleBlur}
                className={
                  errors.city && touched.city
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="City"
              ></input>
            </div>
            {/* {/* district */}
           {/*   <div className={styles.semi_item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>District</span>
                <span className={styles.error}> *</span>

                {errors.district && touched.district && (
                  <span className="error">{errors.district}</span>
                )}
              </div>
              <input
                value={values.district}
                onChange={handleChange}
                id="district"
                type="district"
                onBlur={handleBlur}
                className={
                  errors.district && touched.district
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="District"
              ></input>
            </div> */}
            {/* postal code */}
            {/* <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Postal code</span>
                <span className={styles.error}> *</span>

                {errors.postalCode && touched.postalCode && (
                  <span className="error">{errors.postalCode}</span>
                )}
              </div>
              <input
                value={values.postalCode}
                onChange={handleChange}
                id="postalCode"
                type="postalCode"
                onBlur={handleBlur}
                className={
                  errors.postalCode && touched.postalCode
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Enter Code"
              ></input>
            </div> */}

            <button className={`${styles.brown_button} ${styles.item}`}>
              Save
            </button>
          </Box>
        )}
        {type === "profile" && (
          <Box sx={style} className={styles.form_container}>
            <div className={`${styles.title} ${styles.item}`}>Profile</div>

            {/* first name */}
            <div className={styles.semi_item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>First Name</span>
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
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Your first name"
              ></input>
            </div>

            {/* last name */}
            <div className={styles.semi_item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Last Name</span>
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
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Your last name"
              ></input>
            </div>
            {/* phone */}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Phone Number </span>
                <span className={styles.error}> *</span>
                {errors.phone && touched.phone && (
                  <span className="error">{errors.phone}</span>
                )}
              </div>
              {/* <PhoneInput
                className={
                  errors.phone && touched.phone
                    ? `phone-input-error`
                    : `phone-input`
                }
                placeholder="Enter phone number"
                name="rating"
                country="EGY"
defaultCountry="EG"
                value={values.phone}
                onChange={(event, newValue) => {
                  // setFieldValue("phone", newValue);
                  if (event) {
                    setFieldValue("phone", event);
                  } else {
                    setFieldValue("phone", "");
                  }
                }}
                id="phone"
                type="phone"
                onBlur={handleBlur}
              /> */}
              <input
              value={values.phone}
              style={{width:"100%",boxSizing:"border-box"}}
              onChange={handleChange}
              id="phone"
              type="phone"
            
              country="EGY"

              onBlur={handleBlur}
              className={
                
                errors.phone && touched.phone
                  ? `phone-input-error`
                  : `phone-input`}
           placeholder="Enter phone number"
            />
            </div>
            {/* email*/}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
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
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Your email"
              ></input>
            </div>

            <button className={`${styles.brown_button} ${styles.item}`}>
              Save
            </button>
          </Box>
        )}
        {type === "reset_password" && (
          <Box sx={style} className={styles.card_container}>
            <img src={reset} width="50%" className={styles.card_img} alt="reset" />
            <div className={styles.card_title}>Reset Password</div>
            <div className={styles.card_description}>
              Enter your registered email address, we will send instructions to
              help reset the password
            </div>
            {/* email*/}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
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
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Your email"
              ></input>
            </div>
            <button className={`${styles.brown_button} ${styles.item}`}>
              Send instruction
            </button>
          </Box>
        )}
        {type === "set_new_password" && (
          <Box sx={style} className={styles.card_container}>
            <img src={resetPassword} width="50%" className={styles.card_img} alt="reset"/>
            <div className={styles.card_title}>Reset Password</div>
            <div className={styles.card_description}>
              Enter a new password for&nbsp;
              <strong style={{ color: "var(--black)" }}>
                haveafriend@nijaworks.ac.id
              </strong>
            </div>
            {/* password*/}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
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
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="New password"
              ></input>
            </div>
            {/* confirm password*/}
            <div className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Confirm password</span>
                <span className={styles.error}> *</span>
                {errors.confirmPassword && touched.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </div>
              <input
                value={values.confirmPassword}
                onChange={handleChange}
                id="confirmPassword"
                type="confirmPassword"
                onBlur={handleBlur}
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="Confirm new password"
              ></input>
            </div>
            <button className={`${styles.brown_button} ${styles.item}`}>
              Reset password
            </button>
          </Box>
        )}
        {type === "successful_reset_new_password" && (
          <Box sx={style} className={styles.card_container}>
            <img src={resetSuccess} width="50%" className={styles.card_img} alt="reset" />
            <div className={styles.card_title}>Successfully Reset Password</div>
            <div className={styles.card_description}>
              Password has been changed successfully
            </div>
            <button className={`${styles.brown_button} ${styles.item}`}>
              Login
            </button>
          </Box>
        )}
        {type === "reset_success" && (
          <Box sx={style} className={styles.card_container}>
            <img src={resetSuccess} width="50%" className={styles.card_img} alt="reset"/>
            <div className={styles.card_title}>Reset Password</div>
            <div className={styles.card_description}>
              Check your email, we’ve sent you an email with a link to update
              your password.
            </div>
            <button className={`${styles.brown_button} ${styles.item}`}>
              Okay
            </button>
          </Box>
        )}
        {type === "remove_account" && (
          <Box sx={style} className={styles.card_container}>
            <img src={remove} width="50%" className={styles.card_img} alt="reset"/>
            <div className={styles.card_title}>Remove Account</div>
            <div className={styles.card_description}>
              Are you sure you want to remove your account?
            </div>
            <div className={styles.btn_container}>
              <button className={styles.btn_a}>Remove</button>
              <button className={styles.btn_b}>Cancel</button>
            </div>
          </Box>
        )}
        {type === "remove_address" && (
          <Box sx={style} className={styles.card_container}>
            <img src={remove} width="50%" className={styles.card_img} alt="reset" />
            <div className={styles.card_title}>Remove Address</div>
            <div className={styles.card_description}>
              Are you sure you want to remove your address?
            </div>
            <div className={styles.btn_container}>
              <button className={styles.btn_a}>Remove</button>
              <button className={styles.btn_b}>Cancel</button>
            </div>
          </Box>
        )}
        {type === "terms" && (
          <Box sx={style} className={styles.terms_container}>
            <div className={styles.terms_title}>Term & Condition</div>
            <ol className={styles.terms_content}>
              <li>Free shipping up to $50 minimum spending $250.</li>
              <li>
                The promo period only lasts from 25 November - 6 December 2022.
              </li>
              <li>Valid for all payment and shipping methods.</li>
              <li>
                Valid for purchases of all products, except Casual Express.
              </li>
              <li>Ordering using a coupon code cannot get Casual Coins.</li>
              <li>Valid for orders via website.</li>
              <li>
                The brand has the full right to change the terms and conditions
                without prior notification.
              </li>
            </ol>
            <div className={styles.terms_title}>How to use</div>
            <ol className={styles.terms_content}>
              <li>Select the product you want to buy here </li>
              <li>Select the desired size then add to cart </li>
              <li>
                Your order will be directed to the cart/checkout page which can
                be clicked on the shopping bag icon.
              </li>
              <li>
                Register (register) if you don't have an account or login to
                enter order data.
              </li>
              <li>
                Select your address if you already have address data or add an
                address to add new data.
              </li>
              <li>
                Select the delivery you want, then click "Proceed to Payment",
                you will be directed to the payment page.
              </li>
              <li>Select a payment method then confirm payment.</li>
              <li>
                Payment will be confirmed automatically when you have paid.
              </li>
            </ol>
          </Box>
        )}
      </form>
    </Modal>
  );
}
