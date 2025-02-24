import { useFormik } from "formik";
import styles from "../../styles/components/Popup.module.css";
import {
  profileSchema,
  profileSchemaInitialValues,
} from "../../utils/schemas/profileSchema.js";
import PhoneInput from "react-phone-number-input";
import { Box, Modal } from "@mui/material";
import { updateProfile } from "../../utils/apiCalls.js";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
export default function UpdateProfileModal({
  ProfileData,
  open,
  setOpen,
  setForceReload,
}) {
  const onSubmit = async (values) => {
    console.log(ProfileData, "profileData13123");
    const resUpdateProfile = await updateProfile(values);
    console.log(resUpdateProfile, "resUpdateProfile");
    if (resUpdateProfile === "success") {
      toast.success("Profile Updated Successfully");
      setForceReload((prev) => !prev);
    }
    setOpen(false);
  };
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
    initialValues: ProfileData,
    validationSchema: profileSchema,
    onSubmit,
  });

  return (
    <Modal open={open}>
      <Box sx={style} className={styles.form_container}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className={`${styles.title} ${styles.item}`}
          >
            Profile
            <CloseIcon
              onClick={() => setOpen(false)}
              className={styles.close_icon}
            />
          </div>
          <div className={styles.row}>
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
            <div className={styles.item}>
            <input
              value={values.phone}
            
              onChange={handleChange}
              id="phone"
              type="phone"
              style={{width:"100%",boxSizing:"border-box"}}
              country="EGY"
 placeholder="Enter phone number"
              onBlur={handleBlur}
              className={
                
                errors.phone && touched.phone
                  ? `phone-input-error`
                  : `phone-input`}
             
            />
          </div>
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

          <button
            type="submit"
            className={`${styles.brown_button} ${styles.item}`}
          >
            {isSubmitting ? (
              <span>
                loading
                <CircularProgress size={20} color="inherit" />
              </span>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </Box>
    </Modal>
  );
}

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
