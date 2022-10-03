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

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function JobForm(props) {
	const jobTypes = [
		{ value: "full-time", title: "Full Time" },
		{ value: "part-time", title: "Part Time" },
		{ value: "intern", title: "Intern" },
	];

	const expLevels = [
		{ value: "entry", title: "Entry Level" },
		{ value: "internmediate", title: "Intermediate Level" },
		{ value: "senior", title: "Senior Level" },
		{ value: "intern", title: "Intern Level" },
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

	const [convertedText, setConvertedText] = useState("");

	const [job, setJob] = useState({
		title: "",
		type: "",
		experienceLevel: "",
		location: "",
		category: "",
		minSalary: "",
		maxSalary: "",
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
		console.log(convertedText);
	};

	return (
		<>
			<Stack component="form" onSubmit={handleSubmit}>
				<Typography variant="h4">Post Job</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<InputLabel htmlFor="title">Title</InputLabel>
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
								<MenuItem key={type.value} value={type.value}>
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
								<MenuItem key={level.value} value={level.value}>
									{level.title}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid item xs={6}>
						<InputLabel htmlFor="location">Location</InputLabel>
						<Autocomplete
							id="location"
							name="location"
							freeSolo
							options={["Remote"]}
							inputValue={job.location}
							onInputChange={(e, newValue) => {
								setJob({ ...job, location: newValue });
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
						<InputLabel htmlFor="category">Job Category</InputLabel>
						<Autocomplete
							id="category"
							name="category"
							freeSolo
							options={categories.map(
								(category) => category.title
							)}
							inputValue={job.category}
							onInputChange={(e, newValue) => {
								setJob({ ...job, category: newValue });
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
						<InputLabel htmlFor="minSalary">Min Salary</InputLabel>
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
						<InputLabel htmlFor="maxSalary">Max Salary</InputLabel>
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

					<Grid item xs={12}>
						<InputLabel htmlFor="description">
							Description
						</InputLabel>
						<ReactQuill
							theme="snow"
							value={convertedText}
							onChange={setConvertedText}
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
						<Button variant="outlined" disableElevation fullWidth>
							Clear
						</Button>
					</Grid>
				</Grid>
			</Stack>
		</>
	);
}

export default JobForm;
