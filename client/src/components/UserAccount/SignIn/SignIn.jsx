import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import googleLogo from "../../../assets/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  let navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/login";
    const user = { ...loginInfo };
    const params = { withCredentials: true };

    axios
      .post(url, user, params)
      .then((res) => {
        // Set isLogin to true to access protected route
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  };

  return (
    <>
      <Grid container className="signin-container">
        <Grid item xs={0} md={6} alignItems="center">
          <Grid container style={{ margin: "16px" }}>
            <Grid item>
              <Typography variant="h4" fontWeight="bold">
                Find the job that best describes you
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack style={{ margin: "16px" }}>
            <Typography variant="h4" fontWeight="bold">
              Login
            </Typography>
            <Typography variant="h6">
              Your next career opportunity start here!
            </Typography>
            <Stack
              component="form"
              spacing={2}
              style={{ paddingTop: "32px" }}
              autoComplete="false"
              onSubmit={handleSubmit}
            >
              <TextField
                variant="outlined"
                id="email"
                placeholder="Email address"
                type="email"
                size="small"
                name="email"
                value={loginInfo.email}
                onChange={handleChange}
                required
              />
              <TextField
                variant="outlined"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                size="small"
                value={loginInfo.password}
                onChange={handleChange}
                required
              />
              <Link
                to="/account/reset-password"
                className=".uncolored-link"
                style={{ textAlign: "right" }}
              >
                Forgot password?
              </Link>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                // href="/account/build-profile"
              >
                Login
              </Button>

              <Stack direction="row" spacing={1} justifyContent="center">
                <Typography>Not registered?</Typography>
                <div className=".uncolored-link">
                  <Link to="/account/signup">Create an Account</Link>
                </div>
              </Stack>
              <Divider />
              <Button
                startIcon={
                  <>
                    <img height={18} width={18} src={googleLogo} />
                  </>
                }
                variant="outlined"
                disableElevation
                className="google-button"
              >
                Login with Google
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default SignIn;
