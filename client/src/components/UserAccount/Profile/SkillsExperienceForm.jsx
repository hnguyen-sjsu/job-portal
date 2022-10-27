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
import CandidateServices from "../../../services/CandidateServices";

function SkillsExperienceForm(props) {
	const { skills, setSkills, experienceItems, setExperienceItems, loading } =
		props;

	const [isLoading, setIsLoading] = useState(false);

	const handleAddSkill = (e) => {
		const { value } = e.target;
		if (e.key.toLowerCase() === "enter") {
			setIsLoading(true);
			CandidateServices.addSkill(value).then((response) => {
				console.log(response);
				setSkills([...skills, response]);
				setIsLoading(false);
				e.target.value = "";
			});
		}
	};

	const handleChange = (e, index) => {
		const { name, value } = e.target;
		const updatedItems = experienceItems.map((item, i) => {
			return index === i ? { ...item, [name]: value } : item;
		});

		setExperienceItems([...updatedItems]);
		console.log(experienceItems);
	};

	const handleDeleteSkill = (skillId) => {
		setIsLoading(true);
		CandidateServices.deleteSkill(skillId).then((response) => {
			if (response) {
				setIsLoading(false);
				const updatedSkills = skills.filter(
					(skill) => skill.id !== skillId
				);
				setSkills(updatedSkills);
			}
		});
	};

	const handleAddNewExperience = () => {
		setExperienceItems([...experienceItems, { isCurrentJob: false }]);
	};

	return (
		<Container disableGutters>
			<Typography variant="h4" fontWeight="bold">
				Skills & Experience
			</Typography>
			<div className="container">
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
								<Grid item key={skill.id}>
									<Chip
										label={skill.name}
										color="primary"
										onDelete={() => {
											handleDeleteSkill(skill.id);
										}}
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
										endAdornment: (
											<Button onClick={handleAddSkill}>
												Add
											</Button>
										),
									}}
									disabled={isLoading}
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
								<InputLabel htmlFor="endDate">
									End Date
								</InputLabel>
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
			</div>
		</Container>
	);
}
export default SkillsExperienceForm;
