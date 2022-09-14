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

function ProfileForm() {
	const undefinedEducationHistory = {
		schoolName: "",
		degree: "",
		major: "",
		startDate: "",
		endDate: "",
		description: "",
	};

	const undefinedWorkExperience = {
		companyName: "",
		jobTitle: "",
		location: "",
		startDate: "",
		endDate: "",
		description: "",
		isCurrentJob: false,
	};

	const [activeStep, setActiveStep] = useState(0);

	const [userProfile, setUserProfile] = useState({
		userId: "",
		email: "",
		phoneNumber: "209-324",
		location: "",
		bio: "",
		resumeUrl: "",
	});

	const [educationItems, setEducationItems] = useState([]);
	const [experienceItems, setExperienceItems] = useState([]);
	const [skills, setSkills] = useState([]);

	const yearsOfExperience = [
		"< 1 year",
		"1 year",
		"2 years",
		"3 years",
		"4 years",
		"5 years",
		"> 5 years",
	];

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserProfile({
			...userProfile,
			[name]: value,
		});
	};

	const Profile = () => (
		<Container disableGutters component="form">
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
							value={userProfile.phoneNumber}
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
							value={userProfile.location}
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

	// const skills = ["ReactJS", "Python", "Java"];

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
						<InputLabel htmlFor="title">Title</InputLabel>
						<TextField
							placeholder="Your position/title"
							name="title"
							size="small"
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<InputLabel htmlFor="companyName">
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
						<InputLabel htmlFor="companyLocation">
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
						<InputLabel htmlFor="companyStartDate">
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
						<InputLabel htmlFor="companyEndDate">
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
						<InputLabel htmlFor="workDescription">
							Description
						</InputLabel>
						<TextField
							name="workDescription"
							multiline
							minRows={2}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} textAlign="right">
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
		{ title: "Profile" },
		{ title: "Skills & Experience" },
		{ title: "Resume/CV" },
		{ title: "Review & Submit" },
	];

	const totalSteps = () => {
		return steps.length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
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
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Container
				maxWidth="sm"
				style={{ paddingTop: "32px", paddingBottom: "32px" }}
			>
				<Stepper activeStep={activeStep} alternativeLabel>
					{steps.map((step) => (
						<Step key={step.title}>
							<StepLabel>{step.title}</StepLabel>
						</Step>
					))}
				</Stepper>
				{/* <Box style={{ paddingTop: "32px" }}> */}
				{/* {steps[activeStep].component} */}
				{/* </Box> */}
				<Profile />
				<SkillsExperience />
				<Resume />
				<ReviewAndSubmit />
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
		</LocalizationProvider>
	);
}

export default ProfileForm;
