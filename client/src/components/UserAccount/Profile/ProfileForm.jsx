import React, { useState, useContext, useEffect } from "react";

import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { UserContext } from "../../../providers/AuthProvider";
import CandidateProfileForm from "./CandidateProfileForm";
import CandidateServices from "../../../services/CandidateServices";
import EducationHistoryForm from "./EducationHistoryForm";
import SkillsExperienceForm from "./SkillsExperienceForm";
import ResumeForm from "./ResumeForm";

function ProfileForm(props) {
	const { user } = useContext(UserContext);

	const [loading, setLoading] = useState(false);

	const [userProfile, setUserProfile] = useState({
		fullName: "",
		phoneNumber: "",
		location: "",
		bio: "",
		resumeUrl: "",
	});

	const [educationItems, setEducationItems] = useState([
		{
			schoolName: "",
			degree: "",
			major: "",
			startDate: "",
			endDate: "",
			description: "",
		},
	]);
	const [skills, setSkills] = useState([]);
	const [experienceItems, setExperienceItems] = useState([
		{ isCurrentJob: false },
	]);
	const [activeStep, setActiveStep] = useState(0);

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
		setLoading(true);

		switch (activeStep) {
			case 0:
				CandidateServices.updateCandidateProfile(userProfile).then(
					(response) => {
						console.log(response);
						moveNext();
					}
				);
				break;
			case 1:
			case 2:
			case 3:
			case 4:
			default:
				moveNext();
		}
	};

	const moveNext = () => {
		if (activeStep < totalSteps() - 1) {
			setActiveStep(activeStep + 1);
		}
		setLoading(false);
	};

	const steps = [
		{
			title: "Profile",
			component: (
				<CandidateProfileForm
					userProfile={userProfile}
					setUserProfile={setUserProfile}
					loading={loading}
				/>
			),
		},
		{
			title: "Education History",
			component: (
				<EducationHistoryForm
					loading={loading}
					educationItems={educationItems}
					setEducationItems={setEducationItems}
				/>
			),
		},
		{
			title: "Skills & Experience",
			component: (
				<SkillsExperienceForm
					skills={skills}
					setSkills={setSkills}
					experienceItems={experienceItems}
					setExperienceItems={setExperienceItems}
					loading={loading}
				/>
			),
		},
		{
			title: "Resume",
			component: <ResumeForm />,
		},
		{
			title: "Review & Submit",
		},
	];

	useEffect(() => {
		console.log(user);
		CandidateServices.getCandidateProfile().then((response) => {
			setUserProfile({ ...response });
		});
	}, []);

	return (
		<>
			<Container maxWidth="md">
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
				<Stack
					direction="row"
					justifyContent="space-between"
					style={{ paddingTop: "16px" }}
				>
					<Button
						variant="contained"
						disableElevation
						disabled={activeStep === 0 || loading}
						onClick={handleBack}
					>
						Previous
					</Button>
					<Stack direction="row" spacing={2}>
						<Button
							variant="outlined"
							disableElevation
							href="/candidate/profile"
							type="submit"
							disabled={loading}
						>
							Skip and Complete Later
						</Button>
						<Button
							variant="contained"
							disableElevation
							sx={{
								display: isLastStep() ? "none" : "block",
							}}
							onClick={handleNext}
							type="submit"
							disabled={loading}
						>
							Next
						</Button>
						{isLastStep() && (
							<Button
								variant="contained"
								disableElevation
								onClick={handleNext}
								sx={{ ml: 2 }}
								disabled={loading}
							>
								Submit
							</Button>
						)}
					</Stack>
				</Stack>
			</Container>
		</>
	);
}

export default ProfileForm;
