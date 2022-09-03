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

function SignUp() {
  let navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    fullName: "",
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
    const url = "http://localhost:5000/register";
    const userInfo = { ...loginInfo, full_name: loginInfo.fullName };
    const params = { withCredentials: true };

    axios
      .post(url, userInfo, params)
      .then((res) => {
        navigate("/account/login");
        console.log(res);
      })
      .catch((err) => {
        console.error(err.response.data);
      });
    // alert("Submit clicked");
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
              Create Account
            </Typography>
            <Typography variant="h6">
              Your next career opportunity start here!
            </Typography>
            <Stack
              component="form"
              spacing={2}
              style={{ paddingTop: "32px" }}
              onSubmit={handleSubmit}
            >
              <Stack>
                <InputLabel htmlFor="fullName">Full Name</InputLabel>
                <TextField
                  variant="standard"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                />
              </Stack>
              <Stack>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <TextField
                  variant="standard"
                  id="email"
                  name="email"
                  placeholder="name@domain.com"
                  type="email"
                  onChange={handleChange}
                  required
                />
              </Stack>
              <Stack>
                <InputLabel htmlFor="password">Password</InputLabel>
                <TextField
                  variant="standard"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="minimum 8 characters"
                  onChange={handleChange}
                  required
                />
              </Stack>
              <Button type="submit" variant="contained" disableElevation>
                Sign Up
              </Button>
              <Stack direction="row" spacing={1} justifyContent="center">
                <Typography>Already have an account?</Typography>
                <Link to="/account/login" className=".uncolored-link">
                  Login
                </Link>
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
                Sign up with Google
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default SignUp;
