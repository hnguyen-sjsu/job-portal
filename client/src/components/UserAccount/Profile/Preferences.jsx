import React, { useState, useContext } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { UserContext } from "../../../providers/AuthProvider";

function Preferences() {
	const { user } = useContext(UserContext);

	console.log(user);

	const [jobTypes, setJobTypes] = useState([
		{ title: "Full Time", selected: false },
		{ title: "Part Time", selected: false },
		{ title: "Intern", selected: false },
	]);

	const handleJobTypeChange = (selectedValue) => {
		const newJobTypes = jobTypes.map((type) => {
			return type.title === selectedValue
				? { ...type, selected: !type.selected }
				: type;
		});
		setJobTypes(newJobTypes);
	};

	const [locationTypes, setLocationTypes] = useState([
		{ title: "In-Person", selected: false },
		{ title: "Remote", selected: false },
		{ title: "Hybrid", selected: false },
	]);

	const handleLocationTypeChange = (selectedValue) => {
		const newLocationTypes = locationTypes.map((type) => {
			return type.title === selectedValue
				? { ...type, selected: !type.selected }
				: type;
		});
		setLocationTypes(newLocationTypes);
	};

	const [industries, setIndustries] = useState([
		{ title: "Business", selected: false },
		{ title: "Retail", selected: false },
		{ title: "Healthcare", selected: false },
		{ title: "Technology", selected: false },
		{ title: "Software", selected: false },
		{ title: "Manufacturing", selected: false },
		{ title: "Food", selected: false },
		{ title: "Finance and Insurance", selected: false },
	]);

	const handleIndustryChanged = (selectedValue) => {
		const newIndustries = industries.map((type) => {
			return type.title === selectedValue
				? { ...type, selected: !type.selected }
				: type;
		});
		setIndustries(newIndustries);
	};

	const [skills, setSkills] = useState([]);

	const JobTypePreference = (props) => (
		<Stack {...props}>
			{jobTypes.map((type, index) => (
				<FormGroup
					onClick={() => {
						handleJobTypeChange(type.title);
					}}
				>
					<FormControlLabel
						control={<Checkbox checked={type.selected} />}
						label={type.title}
					/>
				</FormGroup>
			))}
		</Stack>
	);

	const LocationTypePreference = (props) => (
		<Stack {...props}>
			{locationTypes.map((type, index) => (
				<FormGroup
					onClick={() => {
						handleLocationTypeChange(type.title);
					}}
				>
					<FormControlLabel
						control={<Checkbox checked={type.selected} />}
						label={type.title}
					/>
				</FormGroup>
			))}
			<InputLabel htmlFor="location">Your preferred location</InputLabel>
			<TextField
				id="location"
				placeholder="Location"
				size="small"
				fullWidth
			/>
		</Stack>
	);

	const InterestedIndustryPreference = (props) => (
		<Stack {...props}>
			<Typography variant="h6" fontWeight="bold">
				Select any industry that you're interested in.
			</Typography>
			{industries.map((industry, index) => (
				<FormGroup
					onClick={() => {
						handleIndustryChanged(industry.title);
					}}
				>
					<FormControlLabel
						control={<Checkbox checked={industry.selected} />}
						label={industry.title}
					/>
				</FormGroup>
			))}
		</Stack>
	);

	const ReviewSection = (props) => (
		<Stack {...props}>
			<Typography variant="h6" fontWeight="bold">
				Click Submit to save your preferences.
			</Typography>
		</Stack>
	);

	const [activeStep, setActiveStep] = useState(0);

	const steps = [
		{
			title: "What type of job are you looking for?",
			component: (
				<JobTypePreference
					style={{ display: activeStep === 0 ? "block" : "none" }}
				/>
			),
		},
		{
			title: "Where do you want to work?",
			component: (
				<LocationTypePreference
					style={{ display: activeStep === 1 ? "block" : "none" }}
				/>
			),
		},
		{
			title: "Are there any specific industries you're interested in?",
			component: (
				<InterestedIndustryPreference
					style={{ display: activeStep === 2 ? "block" : "none" }}
				/>
			),
		},
		{
			title: "You're almost there!",
			component: (
				<ReviewSection
					style={{ display: activeStep === 3 ? "block" : "none" }}
				/>
			),
		},
	];

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<>
			<Grid container>
				<Grid item xs={12} sm={4} md={6}>
					<Container maxWidth="sm">
						<Typography
							variant="h5"
							fontWeight="bold"
							color="inherit"
						>
							{steps[activeStep].title}
						</Typography>
					</Container>
				</Grid>
				<Grid item xs={12} sm={8} md={6} style={{ height: "100vh" }}>
					<Container maxWidth="sm">
						{steps.map((step) => (
							<>{step.component}</>
						))}
					</Container>
					<MobileStepper
						variant="progress"
						steps={steps.length}
						activeStep={activeStep}
						position="bottom"
						nextButton={
							<Button
								size="small"
								onClick={handleNext}
								disabled={activeStep === steps.length - 1}
							>
								Next
								<KeyboardArrowRight />
							</Button>
						}
						backButton={
							<Button
								size="small"
								onClick={handleBack}
								disabled={activeStep === 0}
							>
								<KeyboardArrowLeft />
								Back
							</Button>
						}
					/>
				</Grid>
			</Grid>
		</>
	);
}

export default Preferences;
