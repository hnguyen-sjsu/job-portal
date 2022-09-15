import React, { useState } from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

function Profile() {
	const [userProfile, setUserProfile] = useState({
		userId: "",
		email: "",
		phoneNumber: "209-324",
		location: "",
		bio: "",
		resumeUrl: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserProfile({
			...userProfile,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(userProfile);
	};

	return (
		<Container disableGutters component="form" onSubmit={handleSubmit}>
			<Typography variant="h4" fontWeight="bold" gutterBottom>
				Tell us about yourself
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="phoneNumber">
							Phone Number
						</InputLabel>
						<TextField
							placeholder="Enter your contact phone number"
							id="phoneNumber"
							name="phoneNumber"
							size="small"
							required
							onChange={handleChange}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="location" required>
							Location
						</InputLabel>
						<TextField
							placeholder="Enter your location"
							id="location"
							name="location"
							size="small"
							required
							onChange={handleChange}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<Stack spacing={1}>
						<InputLabel htmlFor="location" required>
							Bio
						</InputLabel>
						<TextField
							placeholder="A brief introduction of yourself, this will be displayed on your profile"
							name="bio"
							size="small"
							required
							multiline
							rows={2}
							onChange={handleChange}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant="h6"
						fontWeight="bold"
						style={{ paddingTop: "16px" }}
					>
						Education
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Stack spacing={1}>
						<InputLabel htmlFor="schoolName">School</InputLabel>
						<TextField
							placeholder="Enter the school name"
							name="schoolName"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="degree">Degree</InputLabel>
						<TextField
							placeholder="Your degree"
							name="degree"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="major">Major</InputLabel>
						<TextField
							placeholder="Major"
							name="major"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="educationStartDate">
							Start Date
						</InputLabel>
						{/* <DatePicker
                        disableFuture
                        openTo="month"
                        views={["year", "month"]}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                placeholder="mm/yyyy"
                            />
                        )}
                    /> */}
						<TextField
							placeholder="MM/YYYY"
							name="educationStartDate"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="educationEndDate">
							End Date (or expected)
						</InputLabel>
						<TextField
							placeholder="MM/YYYY"
							name="companyLocation"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<Stack spacing={1}>
						<InputLabel htmlFor="schoolDescription">
							Description
						</InputLabel>
						<TextField
							name="schoolDescription"
							multiline
							minRows={2}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} textAlign="right">
					<Divider />
					<Button startIcon={<AddRoundedIcon fontSize="small" />}>
						Add Another Education History
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button type="submit">Submit</Button>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Profile;
