"use client";
import * as React from "react";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMediaQuery, useTheme } from "@mui/material";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { AuthContext } from "@/context/AuthContext";
import {
  requestPermissionLoginPage,
  udpateTokenDeviceId,
} from "@/util/Notification";
import { ModalContext } from "@/context/ModalContext";
import { DeviceInfoContext } from "@/context/DeviceInfoContext";
import axiosInstance from "@/config/axiosConfig";

const ERROR_MSG_MAP = {
  "auth/invalid-credential": "Invalid Email or Password",
  "auth/too-many-request": "Account has been disabled",
};

const getUserIdApi = async (uid) => {
  try {
    const { data } = await axiosInstance.get(`/users?firebase_id=${uid}`);
    return data?.[0]?.id;
  } catch (error) {
    throw error;
  }
};

export default function SignIn() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const { handleOnMessage } = useContext(ModalContext);
  const { deviceInfo } = useContext(DeviceInfoContext);

  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  const theme = useTheme(); // Access the theme for breakpoint values
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
  console.log("isDesktop", isDesktop);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values) => {
    setError("");
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const id = await getUserIdApi(userCredential.user?.uid);
      if (!!id) {
        const userId = Number.parseInt(id);
        setUser({ ...userCredential.user, userId });
        localStorage.setItem("token", userCredential?.user?.accessToken);
        localStorage.setItem("userId", userId);

        deviceInfo?.isActiveNotification &&
          (await requestPermissionLoginPage(
            handleOnMessage,
            udpateTokenDeviceId
          ));
        router.push("/");
      }
    } catch (error) {
      console.error({ ...error });
      setError(ERROR_MSG_MAP[error.code]);
    }
  };
  const handleChange = (e) => {
    const { target } = e;
    formik.setFieldValue(target.name, target.value);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { sm: "space-evenly", xs: "end" },

        flexDirection: { xs: "column", lg: "row" },
        alignItems: "center",
        justifyContent: {
          xs: "space-evenly",
          sm: "space-evenly",
          lg: "flex-end",
        },
        gap: { lg: "8rem" },
        height: "80%",
        // gap: { xs: "4rem" },
        backgroundImage: {
          xs: "url('/assets/img/login-bg-phone.png')",
          sm: "url('/assets/img/login-bg-tablet.png')",
          md: "url('/assets/img/login-bg-large.png')",
        },
        // backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Box
        id="tma-log"
        sx={{
          backgroundImage: "url(/assets/img/tma-logo.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: { xs: "75px", sm: "120px" },
          height: { xs: "40px", sm: "60px" },
          position: "fixed",
          top: "10px",
          left: "10px",
          cursor: "pointer",
        }}
      >
        <Link href="/" />
      </Box>

      <Box sx={{ padding: "1rem" }}>
        <span></span>
      </Box>

      <Box sx={{ padding: "1rem" }}>
        <span></span>
      </Box>

      <Box sx={{ padding: "1rem" }}>
        <span></span>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "center", lg: "flex-end" },
          mb: { lg: "10rem" },
          // pt: { xs: "10rem", md: "3rem", lg: "3rem" },
          mt: { lg: "5rem" },
          // pr: { lg: "10rem" },
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{
            fontSize: {
              xs: "1.75rem",
              lg: "2rem",
            },
            ml: { xs: "-19px" },
            fontWeight: "700",
            marginBottom: "2rem",
          }}
        >
          <p>Welcome back!</p> <p>Glad to see you, Again!</p>
        </Typography>
        {error?.length > 0 && (
          <Alert
            severity="error"
            sx={{ mt: 1.5, width: { xs: "20rem", lg: "320px" } }}
          >
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: "10rem",
              width: "20rem",
            }}
          >
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                name="email"
                required
                formik={formik}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                id="outlined-adornment-email"
                label="Email"
                error={formik.errors["email"] && formik.touched["email"]}
              />
              {formik.errors["email"] && formik.touched["email"] && (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{ color: "red" }}
                >
                  {formik.errors["email"]}
                </Typography>
              )}
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                required
                formik={formik}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                error={formik.errors["password"] && formik.touched["password"]}
              />
              {formik.errors["password"] && formik.touched["password"] && (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{ color: "red" }}
                >
                  {formik.errors["password"]}
                </Typography>
              )}
            </FormControl>
          </Box>

          {formik?.isSubmitting ? (
            <LoadingButton
              endIcon={<SendIcon />}
              loading
              fullWidth
              loadingPosition="end"
              variant="contained"
              sx={{
                mt: 5,
                mb: 2,
                pt: 2,
                pb: 2,
              }}
            >
              <span>Login</span>
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 5,
                mb: 2,
                backgroundColor: "#F4721E",
                pt: 2,
                pb: 2,
                "&:hover": {
                  backgroundColor: "#BF5816",
                  cursor: "pointer",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ padding: "1rem" }}>
        <span></span>
      </Box>
    </Box>
  );
}
