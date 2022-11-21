import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import logoImg from "../../../assets/app-logo.svg";
import AuthenticationServices from "../../../services/AuthenticationServices";

function ResetPasswordForm(props) {
    document.title = "AKKA - Reset Password";
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [loading, setLoading] = useState(false);
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: "",
        showNewPassword: false,
        showConfirmPassword: false,
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleShowPassword = (currentPassword) => {
        if (currentPassword) {
            setPasswords({
                ...passwords,
                showNewPassword: !passwords.showNewPassword,
            });
        } else {
            setPasswords({
                ...passwords,
                showConfirmPassword: !passwords.showConfirmPassword,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (validate()) {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage("");
        setPasswords({
            ...passwords,
            [name]: value,
        });
    };

    const validate = () => {
        if (passwords.newPassword === passwords.confirmPassword) {
            setErrorMessage("");
            return true;
        } else {
            setErrorMessage("New Password and Confirm Password do not match.");
            return false;
        }
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
                sx={{ minWidth: fullScreen ? "100vw" : "40vw" }}
            >
                <Typography variant="h5" fontWeight={600}>
                    Set New Password
                </Typography>
                <InputLabel htmlFor="newPassword">New Password</InputLabel>
                <TextField
                    id="newPassword"
                    name="newPassword"
                    variant="outlined"
                    size="small"
                    placeholder="New password, 8-12 characters"
                    fullWidth
                    value={passwords.newPassword}
                    onChange={handleChange}
                    type={passwords.showNewPassword ? "text" : "password"}
                    required
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={() => {
                                    handleShowPassword(true);
                                }}
                            >
                                {passwords.showNewPassword ? (
                                    <VisibilityOffRoundedIcon />
                                ) : (
                                    <VisibilityRoundedIcon />
                                )}
                            </IconButton>
                        ),
                    }}
                    inputProps={{ maxLength: 12 }}
                    disabled={loading}
                />
                <InputLabel htmlFor="confirmPassword">
                    Confirm Password
                </InputLabel>
                <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    variant="outlined"
                    size="small"
                    placeholder="Confirm password"
                    fullWidth
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    type={passwords.showConfirmPassword ? "text" : "password"}
                    required
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={() => {
                                    handleShowPassword(false);
                                }}
                            >
                                {passwords.showConfirmPassword ? (
                                    <VisibilityOffRoundedIcon />
                                ) : (
                                    <VisibilityRoundedIcon />
                                )}
                            </IconButton>
                        ),
                    }}
                    inputProps={{ maxLength: 12 }}
                    error={passwords.newPassword !== passwords.confirmPassword}
                    disabled={loading}
                />
                <Alert
                    severity="error"
                    sx={{
                        display: errorMessage.length > 0 ? "flex" : "none",
                    }}
                >
                    {errorMessage}
                </Alert>
                <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    disabled={loading}
                >
                    Update Password
                </Button>
                <Button disabled={loading}>Cancel</Button>
            </Stack>
        </Stack>
    );
}

export default ResetPasswordForm;
