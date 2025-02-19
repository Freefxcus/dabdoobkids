import { useFormik } from "formik";
import {
  resetPasswordSchema,
  resetPasswordSchemaInitialValues,
} from "../utils/schemas/resetPasswordSchema";
import { Box, CardMedia } from "@mui/material";
import { resetPassword } from "../utils/apiCalls";
import { Helmet } from "react-helmet";
export default function ForgetPassword() {
  const onSubmit = (values) => {
    resetPassword(values).then((res) => {
      console.log(res, "resetapiresponse");
    });
  };
  const {
    values,
    // show error if you entered the input then go out [1) don't show error on first input enter 2) don't show error for other untouched inputs]
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: resetPasswordSchemaInitialValues,
    validationSchema: resetPasswordSchema,
    onSubmit,
  });
  return (
    <Box
      sx={{
        maxWidth: "440px",
        borderRadius: "10px",
        mx: "auto",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        mb: "35px",
      }}
    >
      <Helmet>
        <title>{"Dabdoob Kidz | Forget Password page"}</title>
        <meta
          name="description"
          content={
            "No worries! We can help you get back into your account. Enter the email address associated with your account and we'll send you instructions to reset your password"
          }
        />
      </Helmet>
      <CardMedia
        sx={{ width: { xs: "300px", md: "100%" }, mx: "auto" }}
        component={"img"}
        src="/allert.svg"
      />

      <Box
        sx={{
          textAlign: "center",
          lineHeight: "1.5",
        }}
      >
        <h2>Reset Password</h2>
        <p>
          Enter your registered email address, we will send instructions to help
          reset the password
        </p>
      </Box>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "4px" }}
        onSubmit={handleSubmit}
      >
        <h5>Email</h5>
        <input
          id="email"
          className="input-field"
          style={{
            height: "40px",
            border: "1px solid #E5E7EB",
            padding: "0px 8px",
          }}
          type="email"
          placeholder="Email address"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <button
          type="submit"
          style={{
            marginTop: "12px",
            backgroundColor: "var(--brown)",
            color: "white",
            border: "none",
            padding: "12px 48px",
            fontWeight: "400",
            fontSize: "18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Send Instruction
        </button>
      </form>
    </Box>
  );
}
