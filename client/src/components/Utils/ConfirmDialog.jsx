import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ConfirmDialog(props) {
	const [open, setOpen] = useState(false);

	const { title, message, showDialog, actions } = props;

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		setOpen(showDialog);
	}, [showDialog]);

	return (
		<>
			<Dialog
				open={open}
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
					{actions.map((action) => (
						<Button
							key={action.title}
							onClick={() => {
								setOpen(false);
								action.action();
							}}
							variant={action.primary ? "contained" : "outlined"}
							color={action.color ? action.color : "primary"}
							disableElevation
							fullWidth={actions.length === 1}
						>
							{action.title}
						</Button>
					))}
				</DialogActions>
			</Dialog>
		</>
	);
}

export default ConfirmDialog;