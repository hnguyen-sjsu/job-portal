import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import ProfileView from "../UserAccount/Profile/ProfileView";

function ProcessApplicationDialog(props) {
    const { candidateProfile, showDialog, closeDialog } = props;

    return (
        <>
            {candidateProfile && (
                <Dialog open={showDialog} fullWidth maxWidth="lg">
                    <AppBar
                        color="inherit"
                        sx={{ position: "relative" }}
                        className="menu-bar"
                        elevation={0}
                    >
                        <Toolbar>
                            <Typography
                                sx={{ flex: 1 }}
                                variant="h6"
                                component="div"
                            >
                                Process Application
                            </Typography>
                            <IconButton onClick={closeDialog}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <Stack>
                            <Typography>
                                Current Application Status:{" "}
                                <b>{candidateProfile.applicationInfo.status}</b>
                            </Typography>
                            <Typography variant="h5" fontWeight={500}>
                                Candidate Profile Preview
                            </Typography>

                            <Typography variant="subtitle">
                                Below is the preview of the candidate who
                                applies for the position.
                            </Typography>
                            <Divider sx={{ m: 2 }} />
                        </Stack>
                        <ProfileView
                            editable={false}
                            candidateProfile={candidateProfile}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            disableElevation
                            onClick={closeDialog}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            disableElevation
                            endIcon={<CloseRoundedIcon />}
                        >
                            Reject
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            disableElevation
                            endIcon={<AccessTimeRoundedIcon />}
                        >
                            Pending
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            disableElevation
                            endIcon={<CheckRoundedIcon />}
                        >
                            Accept
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default ProcessApplicationDialog;
