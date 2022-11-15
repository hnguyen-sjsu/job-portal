import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import AuthenticationServices from "../../../services/AuthenticationServices";

function Settings(props) {
    const options = [
        {
            title: "Update Email Address",
            icon: <EmailRoundedIcon color="primary" />,
            content: <UpdateEmailForm />,
            expanded: true,
        },
        {
            title: "Update Password",
            icon: <LockRoundedIcon color="primary" />,
            content: <UpdatePasswordForm />,
            expanded: false,
        },
        {
            title: "Delete Account",
            icon: <DeleteRoundedIcon color="primary" />,
            content: <DeleteAccountForm />,
            expanded: false,
        },
    ];
    return (
        <Stack spacing={2}>
            <Typography variant="h4" fontWeight="bold">
                Settings
            </Typography>
            {options.map((item, index) => (
                <div key={index}>
                    <Accordion
                        disableGutters
                        square
                        defaultExpanded={item.expanded}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreRoundedIcon />}
                        >
                            <Stack direction="row" spacing={2}>
                                {item.icon}
                                <Typography fontWeight="bold">
                                    {item.title}
                                </Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>{item.content}</AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </Stack>
    );
}

function UpdateEmailForm(props) {
    const [email, setEmail] = useState("");
    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        AuthenticationServices.updateEmail(email).then(() => {
            console.log("Hello");
        });
    };

    return (
        <>
            <Grid
                container
                alignItems="center"
                spacing={2}
                component="form"
                onSubmit={handleSubmit}
            >
                <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor="emailAddress">
                        Email Address
                    </InputLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        id="emailAddress"
                        name="emailAddress"
                        variant="outlined"
                        size="small"
                        placeholder="Email address"
                        fullWidth
                        value={email}
                        onChange={handleChange}
                        type="email"
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={4}></Grid>
                <Grid item xs={12} sm={8}>
                    <Button variant="contained" disableElevation type="submit">
                        Update Email Address
                    </Button>
                    <Button variant="outlined" disableElevation sx={{ ml: 2 }}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

function UpdatePasswordForm(props) {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        showCurrentPassword: false,
        showNewPassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords({
            ...passwords,
            [name]: value,
        });
    };

    const handleShowPassword = (currentPassword) => {
        if (currentPassword) {
            setPasswords({
                ...passwords,
                showCurrentPassword: !passwords.showCurrentPassword,
            });
        } else {
            setPasswords({
                ...passwords,
                showNewPassword: !passwords.showNewPassword,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Grid container alignItems="center" spacing={2} component="form">
                <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor="currentPassword">
                        Current Password
                    </InputLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        id="currentPassword"
                        name="currentPassword"
                        variant="outlined"
                        size="small"
                        placeholder="Current password"
                        fullWidth
                        value={passwords.currentPassword}
                        onChange={handleChange}
                        type={
                            passwords.showCurrentPassword ? "text" : "password"
                        }
                        required
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => {
                                        handleShowPassword(true);
                                    }}
                                >
                                    {passwords.showCurrentPassword ? (
                                        <VisibilityOffRoundedIcon />
                                    ) : (
                                        <VisibilityRoundedIcon />
                                    )}
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor="newPassword">New Password</InputLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        id="newPassword"
                        name="newPassword"
                        variant="outlined"
                        size="small"
                        placeholder="New password"
                        autoComplete="new-password"
                        fullWidth
                        value={passwords.newPassword}
                        onChange={handleChange}
                        type={passwords.showNewPassword ? "text" : "password"}
                        required
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => {
                                        handleShowPassword(false);
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
                    />
                </Grid>
                <Grid item xs={12} sm={4}></Grid>
                <Grid item xs={12} sm={8}>
                    <Button variant="contained" disableElevation type="submit">
                        Update Password
                    </Button>
                    <Button variant="outlined" disableElevation sx={{ ml: 2 }}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

function DeleteAccountForm(props) {
    const [password, setPassword] = useState({
        value: "",
        showPassword: false,
    });
    const handleChange = (e) => {
        const { value } = e.target;
        setPassword({ ...password, password: value });
    };
    const handleShowPassword = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
    };
    return (
        <Stack>
            <Typography>
                This will make your account permanently unusable. This action is
                irreversable. To continue, please enter your password.
            </Typography>
            <Grid container alignItems="center" spacing={2} component="form">
                <Grid item xs={12} sm={4}>
                    <InputLabel htmlFor="deletePassword">
                        Current Password
                    </InputLabel>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        id="deletePassword"
                        name="deletePassword"
                        variant="outlined"
                        size="small"
                        placeholder="Enter your current password"
                        fullWidth
                        value={password.value}
                        onChange={handleChange}
                        type={password.value ? "text" : "password"}
                        required
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleShowPassword}>
                                    {password ? (
                                        <VisibilityOffRoundedIcon />
                                    ) : (
                                        <VisibilityRoundedIcon />
                                    )}
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}></Grid>
                <Grid item xs={12} sm={8}>
                    <Button
                        variant="contained"
                        color="error"
                        disableElevation
                        type="submit"
                    >
                        Delete Account
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Settings;
