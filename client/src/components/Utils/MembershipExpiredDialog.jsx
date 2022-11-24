import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

function MembershipExpiredDialog() {
    const [open, setOpen] = useState(true);
    const closeDialog = () => {
        setOpen(false);
    };
    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Message</DialogTitle>
            <DialogContent>
                <Typography>
                    This service is only available for active membership plan.
                </Typography>
                <Typography>
                    Please visit{" "}
                    <b>
                        <a href="/recruiter/membership">Manage Memberships</a>
                    </b>{" "}
                    to view available membership options.
                </Typography>
            </DialogContent>
        </Dialog>
    );
}
export default MembershipExpiredDialog;
