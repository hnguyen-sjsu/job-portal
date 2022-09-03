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

import AddRoundedIcon from "@mui/icons-material/AddRounded";

function ProfileForm() {
	const [activeStep, setActiveStep] = useState(0);

	const yearsOfExperience = [
		"< 1 year",
		"1 year",
		"2 years",
		"3 years",
		"4 years",
		"5 years",
		"> 5 years",
	];

	const Profile = () => (
		<Container disableGutters>
			<Typography variant="h4" fontWeight="bold" gutterBottom>
				Tell us about yourself
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="phoneNumber" required>
							Phone Number
						</InputLabel>
						<TextField
							placeholder="Enter your contact phone number"
							name="location"
							size="small"
							required
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
							name="location"
							size="small"
							required
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
							name="location"
							size="small"
							required
							multiline
							rows={2}
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
						<InputLabel htmlFor="schoolName" required>
							School
						</InputLabel>
						<TextField
							placeholder="Enter the school name"
							name="schoolName"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="degree" required>
							Degree
						</InputLabel>
						<TextField
							placeholder="Your degree"
							name="degree"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="major" required>
							Major
						</InputLabel>
						<TextField
							placeholder="Major"
							name="major"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="companyStartDate" required>
							Start Date
						</InputLabel>
						<TextField
							placeholder="MM/YYYY"
							name="companyName"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="companyEndDate" required>
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
						<InputLabel htmlFor="workDescription" required>
							Description
						</InputLabel>
						<TextField
							name="workDescription"
							multiline
							minRows={2}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} textAlign="right" spacing={2}>
					<Divider />
					<Button startIcon={<AddRoundedIcon fontSize="small" />}>
						Add Another Education History
					</Button>
				</Grid>
				{/* <Grid item xs={12} sm={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="currentRole" required>
							Current Role
						</InputLabel>
						<TextField
							placeholder="Select your current role"
							name="currentRole"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="expYears" required>
							Years of Experience
						</InputLabel>
						<Select name="expYears" size="small">
							<MenuItem disabled value="">
								Select years of experience
							</MenuItem>
							{yearsOfExperience.map((exp) => (
								<MenuItem key={exp} value={exp}>
									{exp}
								</MenuItem>
							))}
						</Select>
					</Stack>
				</Grid> */}
			</Grid>
		</Container>
	);

	const skills = ["ReactJS", "Python", "Java"];

	const SkillsExperience = () => (
		<Container disableGutters>
			<Typography variant="h4" fontWeight="bold">
				Skills & Work Experience
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography
						variant="h6"
						fontWeight="bold"
						style={{ paddingTop: "16px" }}
					>
						Skills
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						{skills.map((skill) => (
							<Grid item key={skill}>
								<Chip
									label={skill}
									color="primary"
									onDelete={() => {}}
								/>
							</Grid>
						))}
						<Grid item xs={12}>
							<TextField
								placeholder="Enter a skill"
								size="small"
								fullWidth
								onKeyDown={(e) => {
									if (e.key.toLowerCase() === "enter") {
										console.log("WIP");
									}
								}}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant="h6"
						fontWeight="bold"
						style={{ paddingTop: "16px" }}
					>
						Work Experience
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Stack spacing={1}>
						<InputLabel htmlFor="title" required>
							Title
						</InputLabel>
						<TextField
							placeholder="Your position/title"
							name="title"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="companyName" required>
							Company Name
						</InputLabel>
						<TextField
							placeholder="Enter the company name"
							name="companyName"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="companyLocation" required>
							Location
						</InputLabel>
						<TextField
							placeholder="Company Location"
							name="companyLocation"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox />}
						label="Currently work here"
					/>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="companyStartDate" required>
							Start Date
						</InputLabel>
						<TextField
							placeholder="MM/YYYY"
							name="companyName"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="companyEndDate" required>
							End Date
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
						<InputLabel htmlFor="workDescription" required>
							Description
						</InputLabel>
						<TextField
							name="workDescription"
							multiline
							minRows={2}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} textAlign="right" spacing={2}>
					<Divider />
					<Button startIcon={<AddRoundedIcon fontSize="small" />}>
						Add Another Work Experience
					</Button>
				</Grid>
			</Grid>
		</Container>
	);

	const Resume = () => (
		<>
			<Typography variant="h4" fontWeight="bold">
				Upload Resume/CV
			</Typography>
			<Stack>
				<Input type="file" />
			</Stack>
		</>
	);

	const ReviewAndSubmit = () => (
		<>
			<Typography variant="h4" fontWeight="bold">
				Review & Submit
			</Typography>
		</>
	);

	const steps = [
		{ title: "Profile", component: <Profile /> },
		{ title: "Skills & Experience", component: <SkillsExperience /> },
		{ title: "Resume/CV", component: <Resume /> },
		{ title: "Review & Submit", component: <ReviewAndSubmit /> },
	];

	const totalSteps = () => {
		return steps.length;
	};

	const isLastStep = () => {
		return activeStep == totalSteps() - 1;
	};

	const handleBack = () => {
		if (activeStep > 0) {
			setActiveStep(activeStep - 1);
		}
	};

	const handleNext = () => {
		if (activeStep < totalSteps() - 1) {
			setActiveStep(activeStep + 1);
		}
	};

	return (
		<>
			<Container maxWidth="sm" style={{ paddingTop: "32px" }}>
				<Stepper activeStep={activeStep} alternativeLabel>
					{steps.map((step) => (
						<Step key={step.title}>
							<StepLabel>{step.title}</StepLabel>
						</Step>
					))}
				</Stepper>
				<Box style={{ paddingTop: "32px" }}>
					{steps[activeStep].component}
				</Box>
				<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
					<Button
						variant="contained"
						disableElevation
						disabled={activeStep === 0}
						onClick={handleBack}
					>
						Previous
					</Button>
					<Box sx={{ flex: "1 1 auto" }} />
					<Button
						variant="contained"
						disableElevation
						sx={{ display: isLastStep() ? "none" : "block" }}
						onClick={handleNext}
						type="submit"
					>
						Next
					</Button>
					{isLastStep() && (
						<Button
							variant="contained"
							disableElevation
							onClick={handleNext}
							sx={{ ml: 2 }}
						>
							Submit
						</Button>
					)}
				</Box>
			</Container>
		</>
	);
}

export default ProfileForm;
