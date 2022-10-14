import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AlertDialog(props) {
	const [open, setOpen] = useState(false);

	const { title, message, showDialog, onComplete } = props;

	const handleClose = () => {
		setOpen(false);
		onComplete();
	};

	useEffect(() => {
		setOpen(showDialog);
	}, [showDialog]);

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{title ? title : "Alert"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{message ? message : "Dialog message"}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default AlertDialog;
