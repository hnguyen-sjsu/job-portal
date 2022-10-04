import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import JobView from "./JobView";

function JobForm(props) {
	const jobTypes = [
		{ title: "Full Time" },
		{ title: "Part Time" },
		{ title: "Intern" },
	];

	const expLevels = [
		{ title: "Entry Level" },
		{ title: "Intermediate Level" },
		{ title: "Senior Level" },
		{ title: "Intern Level" },
	];

	const categories = [
		{ title: "Business" },
		{ title: "Retail" },
		{ title: "Healthcare" },
		{ title: "Technology" },
		{ title: "Software" },
		{ title: "Manufacturing" },
		{ title: "Food" },
		{ title: "Finance and Insurance" },
		{ title: "Banking" },
	];

	const [job, setJob] = useState({
		title: "",
		type: "",
		experienceLevel: "",
		location: "",
		category: "",
		minSalary: "",
		maxSalary: "",
		description: "",
		noApplicants: 150,
		company: {
			name: "Apple",
			size: "10,001+ employees",
			industryField: "Computers Electronics",
		},
		startDate: null,
		endDate: null,
		postedDate: new Date(),
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setJob({
			...job,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(job);
	};

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Stack component="form" onSubmit={handleSubmit}>
							<Typography variant="h4">Post Job</Typography>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<InputLabel htmlFor="title">
										Title
									</InputLabel>
									<TextField
										id="title"
										name="title"
										size="small"
										placeholder="Job title"
										value={job.title}
										onChange={handleChange}
										fullWidth
										required
									/>
								</Grid>
								<Grid item xs={6}>
									<InputLabel id="type" htmlFor="type">
										Job Type
									</InputLabel>
									<Select
										id="type"
										labelId="type"
										name="type"
										size="small"
										value={job.type}
										fullWidth
										onChange={handleChange}
										required
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{jobTypes.map((type) => (
											<MenuItem
												key={type.title}
												value={type.title}
											>
												{type.title}
											</MenuItem>
										))}
									</Select>
								</Grid>
								<Grid item xs={6}>
									<InputLabel id="experienceLevel">
										Experience Level
									</InputLabel>
									<Select
										labelId="experienceLevel"
										id="experienceLevel"
										name="experienceLevel"
										size="small"
										fullWidth
										value={job.experienceLevel}
										onChange={handleChange}
										required
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{expLevels.map((level) => (
											<MenuItem
												key={level.title}
												value={level.title}
											>
												{level.title}
											</MenuItem>
										))}
									</Select>
								</Grid>
								<Grid item xs={6}>
									<InputLabel htmlFor="location">
										Location
									</InputLabel>
									<Autocomplete
										id="location"
										name="location"
										freeSolo
										options={["Remote"]}
										inputValue={job.location}
										onInputChange={(e, newValue) => {
											setJob({
												...job,
												location: newValue,
											});
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												name="location"
												size="small"
												placeholder="Job location"
												required
											/>
										)}
									/>
								</Grid>
								<Grid item xs={6}>
									<InputLabel htmlFor="category">
										Job Category
									</InputLabel>
									<Autocomplete
										id="category"
										name="category"
										freeSolo
										options={categories.map(
											(category) => category.title
										)}
										inputValue={job.category}
										onInputChange={(e, newValue) => {
											setJob({
												...job,
												category: newValue,
											});
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size="small"
												name="category"
												placeholder="Job category"
												required
											/>
										)}
									/>
								</Grid>
								<Grid item xs={6}>
									<InputLabel htmlFor="minSalary">
										Min Salary
									</InputLabel>
									<TextField
										id="minSalary"
										name="minSalary"
										size="small"
										type="number"
										placeholder="Min salary"
										value={job.minSalary}
										onChange={handleChange}
										fullWidth
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													$
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item xs={6}>
									<InputLabel htmlFor="maxSalary">
										Max Salary
									</InputLabel>
									<TextField
										id="maxSalary"
										name="maxSalary"
										size="small"
										placeholder="Max salary"
										type="number"
										value={job.maxSalary}
										onChange={handleChange}
										fullWidth
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													$
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item xs={6}>
									<InputLabel htmlFor="startDate">
										Start Date
									</InputLabel>
									<DatePicker
										value={job.startDate}
										onChange={(newValue) => {
											setJob({
												...job,
												startDate: newValue,
											});
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												id="startDate"
												name="startDate"
												size="small"
												fullWidth
												required
											/>
										)}
									/>
								</Grid>
								<Grid item xs={6}>
									<InputLabel htmlFor="endDate">
										End Date
									</InputLabel>
									<DatePicker
										value={job.endDate}
										onChange={(newValue) => {
											setJob({
												...job,
												endDate: newValue,
											});
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												id="endDate"
												name="endDate"
												size="small"
												fullWidth
												required
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<InputLabel htmlFor="description">
										Description
									</InputLabel>
									<ReactQuill
										theme="snow"
										value={job.description}
										onChange={(content) => {
											setJob({
												...job,
												description: content,
											});
										}}
									/>
								</Grid>
								<Grid item xs={6}>
									<Button
										variant="contained"
										disableElevation
										fullWidth
										type="submit"
									>
										Save
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button
										variant="outlined"
										disableElevation
										fullWidth
									>
										Clear
									</Button>
								</Grid>
							</Grid>
						</Stack>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography variant="h4">Job Posting Review</Typography>
						<JobView job={job} isPreview={true} />
					</Grid>
				</Grid>
			</LocalizationProvider>
		</>
	);
}

export default JobForm;
