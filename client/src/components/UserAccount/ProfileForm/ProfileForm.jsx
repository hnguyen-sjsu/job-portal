import React, { useState, useContext, useEffect } from "react";

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
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { UserContext } from "../../../providers/AuthProvider";

const ProfileForm = () => {
	const { user } = useContext(UserContext);

	const [userProfile, setUserProfile] = useState({});
	const [educationItems, setEducationItems] = useState([{}]);
	const [skills, setSkills] = useState([]);
	const [experienceItems, setExperienceItems] = useState([
		{ isCurrentJob: false },
	]);

	useEffect(() => {
		if (user) {
			setUserProfile({ ...userProfile, ...user });
		}
	}, [user]);

	const handleProfileChange = (e) => {
		const { name, value } = e.target;
		setUserProfile({ ...userProfile, [name]: value });
		console.log(userProfile);
	};

	const handleEducationChange = (e, index) => {
		const { name, value } = e.target;
		const updatedItems = educationItems.map((item, i) => {
			return index === i ? { ...item, [name]: value } : item;
		});

		setEducationItems([...updatedItems]);
		console.log(educationItems);
	};

	const handleAddNewEducation = () => {
		setEducationItems([...educationItems, {}]);
	};

	const handleAddSkill = (e) => {
		const { value } = e.target;
		if (e.key.toLowerCase() === "enter") {
			setSkills([...skills, value]);
			e.target.value = "";
		}
	};

	const handleExperienceChange = (e, index) => {
		const { name, value } = e.target;
		const updatedItems = experienceItems.map((item, i) => {
			return index === i ? { ...item, [name]: value } : item;
		});

		setExperienceItems([...updatedItems]);
		console.log(experienceItems);
	};

	const handleAddNewExperience = () => {
		setExperienceItems([...experienceItems, { isCurrentJob: false }]);
	};

	const [activeStep, setActiveStep] = useState(0);

	const steps = [
		{
			title: "Profile",
			component: (
				<Profile
					userProfile={userProfile}
					handleChange={handleProfileChange}
					disabled={false}
				/>
			),
		},
		{
			title: "Education History",
			component: (
				<EducationHistory
					educationItems={educationItems}
					handleChange={handleEducationChange}
					handleAddNewEducation={handleAddNewEducation}
				/>
			),
		},
		{
			title: "Skills & Experience",
			component: (
				<SkillsExperience
					skills={skills}
					experienceItems={experienceItems}
					handleAddSkill={handleAddSkill}
					handleChange={handleExperienceChange}
					handleAddNewExperience={handleAddNewExperience}
				/>
			),
		},
		{
			title: "Resume",
			component: <Resume />,
		},
		{
			title: "Review & Submit",
			component: (
				<Review
					userProfile={userProfile}
					skills={skills}
					educations={educationItems}
					experiences={experienceItems}
				/>
			),
		},
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
		<>
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
		</>
	);
};

const Profile = (props) => {
	const { userProfile, handleChange, disabled } = props;

	return (
		<Container disableGutters>
			<Typography variant="h5" fontWeight="bold" gutterBottom>
				Hi, {userProfile.full_name}
			</Typography>
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
						<InputLabel htmlFor="bio" required>
							Bio
						</InputLabel>
						<TextField
							placeholder="A brief introduction of yourself, this will be displayed on your profile"
							name="bio"
							size="small"
							value={userProfile.bio}
							required
							multiline
							rows={2}
							onChange={handleChange}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Container>
	);
};

const EducationHistory = (props) => {
	const { educationItems, handleChange, handleAddNewEducation } = props;
	return (
		<Stack spacing={2}>
			<Typography variant="h4" fontWeight="bold">
				Education History
			</Typography>
			{educationItems.map((item, index) => (
				<Grid container key={index} spacing={2}>
					<Grid item xs={12}>
						<Stack spacing={1}>
							<InputLabel htmlFor="schoolName">School</InputLabel>
							<TextField
								placeholder="Enter the school name"
								name="schoolName"
								size="small"
								value={item.schoolName}
								onChange={(e) => {
									handleChange(e, index);
								}}
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
								value={item.degree}
								onChange={(e) => {
									handleChange(e, index);
								}}
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
								value={item.major}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={6}>
						<Stack spacing={1}>
							<InputLabel htmlFor="startDate">
								Start Date
							</InputLabel>
							<TextField
								placeholder="MM/YYYY"
								name="startDate"
								size="small"
								value={item.startDate}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={6}>
						<Stack spacing={1}>
							<InputLabel htmlFor="endDate">
								End Date (or expected)
							</InputLabel>
							<TextField
								placeholder="MM/YYYY"
								name="endDate"
								size="small"
								value={item.endDate}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Stack spacing={1}>
							<InputLabel htmlFor="description">
								Description
							</InputLabel>
							<TextField
								name="description"
								multiline
								minRows={2}
								value={item.description}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12} textAlign="right">
						{index !== 0 && (
							<Button
								startIcon={
									<RemoveRoundedIcon fontSize="small" />
								}
							>
								Remove this Education History
							</Button>
						)}
						<Divider />
					</Grid>
				</Grid>
			))}
			<Button
				startIcon={<AddRoundedIcon fontSize="small" />}
				onClick={handleAddNewEducation}
				fullWidth
			>
				Add Another Education History
			</Button>
		</Stack>
	);
};

const SkillsExperience = (props) => {
	const {
		skills,
		experienceItems,
		handleAddSkill,
		handleAddNewExperience,
		handleChange,
	} = props;
	return (
		<Container disableGutters>
			<Typography variant="h4" fontWeight="bold">
				Skills & Experience
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
								onKeyDown={handleAddSkill}
								InputProps={{
									endAdornment: <Button>Add</Button>,
								}}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Typography
				variant="h6"
				fontWeight="bold"
				style={{ paddingTop: "16px" }}
			>
				Work Experience
			</Typography>
			{experienceItems.map((item, index) => (
				<Grid container spacing={2} key={index}>
					<Grid item xs={12}>
						<Stack spacing={1}>
							<InputLabel htmlFor="title">Title</InputLabel>
							<TextField
								placeholder="Your position/title"
								name="title"
								size="small"
								value={item.title}
								onChange={(e) => {
									handleChange(e, index);
								}}
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
								value={item.companyName}
								onChange={(e) => {
									handleChange(e, index);
								}}
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
								value={item.companyLocation}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									checked={item.isCurrentJob}
									name="isCurrentJob"
									onChange={(e) => {
										const event = {
											target: {
												name: e.target.name,
												value: e.target.checked,
											},
										};
										handleChange(event, index);
									}}
								/>
							}
							label="Currently work here"
						/>
					</Grid>
					<Grid item xs={6}>
						<Stack spacing={1}>
							<InputLabel htmlFor="startDate">
								Start Date
							</InputLabel>
							<TextField
								placeholder="MM/YYYY"
								name="startDate"
								size="small"
								value={item.startDate}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={6}>
						<Stack spacing={1}>
							<InputLabel htmlFor="endDate">End Date</InputLabel>
							<TextField
								placeholder="MM/YYYY"
								name="endDate"
								size="small"
								value={item.endDate}
								onChange={(e) => {
									handleChange(e, index);
								}}
								disabled={item.isCurrentJob}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Stack spacing={1}>
							<InputLabel htmlFor="description">
								Description
							</InputLabel>
							<TextField
								name="description"
								multiline
								minRows={2}
								value={item.description}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12} textAlign="right">
						<Divider />
						<Button
							onClick={handleAddNewExperience}
							startIcon={<AddRoundedIcon fontSize="small" />}
						>
							Add Another Work Experience
						</Button>
					</Grid>
				</Grid>
			))}
		</Container>
	);
};

const Resume = (props) => {
	return (
		<>
			<Typography variant="h4" fontWeight="bold">
				Upload Resume/CV
			</Typography>
			<Stack>
				<Input type="file" />
			</Stack>
		</>
	);
};

const Review = (props) => {
	const { userProfile, skills, educations, experiences } = props;
	return (
		<>
			<Typography variant="h4" fontWeight="bold">
				Review & Submit
			</Typography>
			<Typography variant="h4" color="primary" fontWeight="bold">
				{userProfile.full_name}
			</Typography>
			<Typography>{userProfile.bio}</Typography>
			<Grid container>
				<Grid item xs={12} sm={4}>
					<Stack>
						<Typography variant="h5" fontWeight="bold">
							Contact
						</Typography>
						<Grid container>
							<Grid item xs={2}>
								<PlaceRoundedIcon fontSize="small" />
							</Grid>
							<Grid item xs={10}>
								<Typography>{userProfile.location}</Typography>
							</Grid>
							<Grid item xs={2}>
								<CallRoundedIcon fontSize="small" />
							</Grid>
							<Grid item xs={10}>
								<Typography>
									{userProfile.phoneNumber}
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<EmailRoundedIcon fontSize="small" />
							</Grid>
							<Grid item xs={10}>
								<Typography>{userProfile.email}</Typography>
							</Grid>
						</Grid>
					</Stack>
					<Stack>
						<Typography variant="h5" fontWeight="bold">
							Skills
						</Typography>
						<Stack
							direction={{ xs: "row", sm: "column" }}
							spacing={{ xs: 2, sm: 0 }}
						>
							{skills.map((skill, index) => (
								<Typography key={"skill-" + index}>
									{skill}
								</Typography>
							))}
						</Stack>
					</Stack>
				</Grid>
				<Grid item xs={12} sm={8}>
					<Stack>
						<Typography variant="h5" fontWeight="bold">
							Education
						</Typography>
						{educations.map((item, index) => (
							<Grid container key={"education-" + index}>
								<Grid item xs={6}>
									<Typography fontWeight="bold">
										{item.schoolName}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography align="right">
										{item.startDate + " - " + item.endDate}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography>
										{item.degree + ", " + item.major}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography paragraph={true}>
										{item.description}
									</Typography>
								</Grid>
							</Grid>
						))}
					</Stack>
					<Stack>
						<Typography variant="h5" fontWeight="bold">
							Experience
						</Typography>
						{experiences.map((item, index) => (
							<Grid container key={"experience-" + index}>
								<Grid item xs={6}>
									<Typography fontWeight="bold">
										{item.companyName}
										{item.companyLocation}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography align="right">
										{item.startDate + " - "}
										{item.isCurrentJob
											? "Present"
											: item.endDate}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography>{item.title}</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography paragraph={true}>
										{item.description}
									</Typography>
								</Grid>
							</Grid>
						))}
					</Stack>
				</Grid>
			</Grid>
		</>
	);
};

export default ProfileForm;
