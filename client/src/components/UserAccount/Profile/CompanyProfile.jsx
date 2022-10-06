import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

function CompanyProfile(props) {
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [profile, setProfile] = useState({
		name: "",
		size: "",
		industry: "",
		companyLogoUrl: "",
	});

	const fileInput = useRef();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProfile({
			...profile,
			[name]: value,
		});
	};

	const handleFileInput = (e) => {
		if (e.target.files.length > 0) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	return (
		<Container maxWidth="md">
			<Typography variant="h5" fontWeight="bold">
				Edit Company Profile
			</Typography>
			<Grid
				container
				alignItems="center"
				spacing={2}
				component="form"
				onSubmit={handleSubmit}
			>
				<Grid item xs={12} sm={3}>
					<InputLabel htmlFor="name">Company Icon</InputLabel>
				</Grid>
				<Grid item xs={12} sm={9}>
					<IconButton
						size="large"
						color="primary"
						onClick={() => fileInput.current.click()}
						disabled={loading}
					>
						<AddPhotoAlternateRoundedIcon fontSize="large" />
						<input
							ref={fileInput}
							type="file"
							style={{ display: "none" }}
							onChange={handleFileInput}
							accept="image/*"
						/>
					</IconButton>
				</Grid>
				<Grid item xs={12} sm={3}>
					<InputLabel htmlFor="name">Company Name</InputLabel>
				</Grid>
				<Grid item xs={12} sm={9}>
					<TextField
						id="name"
						name="name"
						placeholder="Name of company"
						size="small"
						value={profile.name}
						onChange={handleChange}
						fullWidth
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<InputLabel htmlFor="size">Company Size</InputLabel>
				</Grid>
				<Grid item xs={12} sm={9}>
					<TextField
						id="size"
						name="size"
						placeholder="Size of company"
						size="small"
						type="number"
						value={profile.size}
						onChange={handleChange}
						fullWidth
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<InputLabel htmlFor="industry">Industry Field</InputLabel>
				</Grid>
				<Grid item xs={12} sm={9}>
					<TextField
						id="industry"
						name="industry"
						placeholder="Field of industry"
						size="small"
						value={profile.industry}
						onChange={handleChange}
						fullWidth
						disabled={loading}
					/>
				</Grid>
				<Grid item xs={12} sm={3}></Grid>
				<Grid item xs={12} sm={9}>
					<Stack direction="row" spacing={2}>
						<Button
							variant="contained"
							disableElevation
							fullWidth
							type="submit"
							disabled={loading}
						>
							Save
						</Button>
						<Button
							variant="outlined"
							disableElevation
							fullWidth
							disabled={loading}
						>
							Cancel
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</Container>
	);
}

export default CompanyProfile;
