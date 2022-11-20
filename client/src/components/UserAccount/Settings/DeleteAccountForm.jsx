import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import ConfirmDialog from "../../Utils/ConfirmDialog";
import AuthenticationServices from "../../../services/AuthenticationServices";

function DeleteAccountForm(props) {
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Stack {...props}>
            <Typography>
                This will make your account permanently unusable. This action is
                irreversable. To continue, please enter your password.
            </Typography>
            <Grid
                container
                alignItems="center"
                spacing={2}
                component="form"
                onSubmit={handleSubmit}
            >
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
                    <Alert
                        severity="error"
                        sx={{
                            display: errorMessage.length > 0 ? "flex" : "none",
                        }}
                    >
                        {errorMessage}
                    </Alert>
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

export default DeleteAccountForm;
