import * as yup from "yup";
import { useFormik } from "formik";
import {
  resetPasswordSchema,
  resetPasswordSchemaInitialValues,
} from "../utils/schemas/resetPasswordSchema";
import {
  Box,
  Button,
  CardMedia,
  FormHelperText,
  Input,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetUserEmail, resetUserPassword } from "../utils/apiCalls";
import { notifySuccess } from "../utils/general";

const loginSchema = yup.object().shape({
  newPassword: yup.string().required("Required"),
});

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = (values) => {
    token
      ? resetUserPassword(values, token)
          .then((res) => {
            notifySuccess(res.message);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            navigate("/login", { replace: true });
            resetForm();
            setSubmitting(false);
          })
      : resetUserEmail(values).finally(() => {
          resetForm();
          setSubmitting(false);
        });
  };

  const {
    values,
    errors,
    touched, // show error if you entered the input then go out [1) don't show error on first input enter 2) don't show error for other untouched inputs]
    isSubmitting,
    setSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: token
      ? {
          newPassword: "",
        }
      : resetPasswordSchemaInitialValues,
    validationSchema: token ? loginSchema : resetPasswordSchema,
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
        p: 3,
      }}
    >
      <CardMedia
        sx={{ width: { xs: "300px", md: "100%" }, mx: "auto" }}
        component="img"
        src="/allert.svg"
      />

      <Box sx={{ textAlign: "center", lineHeight: 1.5, mt: 2 }}>
        {token ? (
          <Typography variant="h5" component="h2">
            Enter your new password
          </Typography>
        ) : (
          <>
            <Typography variant="h5" component="h2">
              Reset Password
            </Typography>
            <Typography variant="body1">
              Enter your registered email address, we will send instructions to
              help reset the password.
            </Typography>
          </>
        )}
      </Box>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "16px",
        }}
        onSubmit={handleSubmit}
      >
        {token ? (
          // Password reset
          <>
            <Box>
              <Input
                id="newPassword"
                placeholder="New password"
                type="password"
                value={values.newPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: "4px",
                  padding: "8px",
                  height: "40px",
                }}
                disableUnderline
              />
              {errors.newPassword && touched.newPassword && (
                <FormHelperText error>{errors.newPassword}</FormHelperText>
              )}
            </Box>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "var(--brown)",
                "&:hover": { backgroundColor: "darken(var(--brown), 10%)" },
              }}
            >
              Confirm Password
            </Button>
          </>
        ) : (
          // Email confirmation
          <>
            <Box>
              <Input
                id="email"
                placeholder="Email address"
                type="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: "4px",
                  padding: "8px",
                  height: "40px",
                }}
                disableUnderline
              />
              {errors.email && touched.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </Box>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "var(--brown)",
                "&:hover": { backgroundColor: "var(--brown)" },
              }}
            >
              Send Instruction
            </Button>
          </>
        )}
      </form>
    </Box>
  );
}
