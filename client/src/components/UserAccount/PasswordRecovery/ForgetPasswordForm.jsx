import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import logoImg from "../../../assets/app-logo.svg";
import AuthenticationServices from "../../../services/AuthenticationServices";

function ForgetPasswordForm(props) {
    document.title = "AKKA - Forgot Password";
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthenticationServices.requestRecoverPassword(email).then(
            (response) => {
                console.log(response);
            }
        );
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    };

    return (
        <Stack
            sx={{ minHeight: "100vh" }}
            alignItems="center"
            justifyContent={fullScreen ? "flex-start" : "center"}
            className={fullScreen ? "" : "signin-container"}
        >
            <img src={logoImg} style={{ width: fullScreen ? "30%" : "25%" }} />
            <Stack
                spacing={2}
                className="forgot-password-form"
                component="form"
                onSubmit={handleSubmit}
            >
                <Typography variant="h5" fontWeight={600}>
                    Forgot Password?
                </Typography>
                <Typography variant="subtitle1">
                    Enter the email address you signed up with us to recover
                    your password.
                </Typography>
                <TextField
                    name="email"
                    size="small"
                    type="email"
                    placeholder="Email address"
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" disableElevation>
                    Reset Password
                </Button>
                <Button>Cancel</Button>
            </Stack>
        </Stack>
    );
}
export default ForgetPasswordForm;
