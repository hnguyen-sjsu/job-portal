import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

function JobForm(props) {
	const jobTypes = [
		{ value: "full-time", title: "Full Time" },
		{ value: "part-time", title: "Part Time" },
		{ value: "intern", title: "Intern" },
	];

	const expLevels = [
		{ value: "intern", title: "Intern Level" },
		{ value: "entry", title: "Entry Level" },
		{ value: "internmediate", title: "Intermediate Level" },
		{ value: "senior", title: "Senior Level" },
	];

	const categories = [
		{ title: "Business", value: "business" },
		{ title: "Retail", value: "retail" },
		{ title: "Healthcare", value: "healthcare" },
		{ title: "Technology", value: "technology" },
		{ title: "Software", value: "software" },
		{ title: "Manufacturing", value: "manufacturing" },
		{ title: "Food", value: "food" },
		{ title: "Finance and Insurance", value: "finance-insurance" },
		{ title: "Banking", value: "bank" },
	];

	return (
		<Stack>
			<Typography variant="h4">Post Job</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<InputLabel htmlFor="title">Title</InputLabel>
					<TextField
						id="title"
						name="title"
						size="small"
						placeholder="Job title"
						fullWidth
					/>
				</Grid>
				<Grid item xs={6}>
					<InputLabel htmlFor="type">Job Type</InputLabel>
					<Select id="type" name="type" size="small" fullWidth>
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
					<InputLabel htmlFor="experienceLevel">
						Experience Level
					</InputLabel>
					<Select
						id="experienceLevel"
						name="experienceLevel"
						size="small"
						fullWidth
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
					<TextField
						id="location"
						name="location"
						size="small"
						placeholder="Job location"
						fullWidth
					/>
				</Grid>
				<Grid item xs={6}>
					<InputLabel htmlFor="category">Job Category</InputLabel>
					<Autocomplete
						id="category"
						freeSolo
						options={categories.map((category) => category.title)}
						renderInput={(params) => (
							<TextField
								{...params}
								size="small"
								placeholder="Job category"
							/>
						)}
					/>
				</Grid>
				<Grid item xs={6}>
					<InputLabel htmlFor="salaryMin">Min Salary</InputLabel>
					<TextField
						id="salaryMin"
						name="salaryMin"
						size="small"
						type="number"
						placeholder="Min salary"
						fullWidth
					/>
				</Grid>
				<Grid item xs={6}>
					<InputLabel htmlFor="salaryMax">Max Salary</InputLabel>
					<TextField
						id="salaryMax"
						name="salaryMax"
						size="small"
						placeholder="Max salary"
						type="number"
						fullWidth
					/>
				</Grid>

				<Grid item xs={12}>
					<InputLabel htmlFor="description">Description</InputLabel>
					<TextField
						id="description"
						name="description"
						placeholder="Job description"
						multiline
						rows={5}
						fullWidth
					/>
				</Grid>
				<Grid item xs={6}>
					<Button variant="contained" disableElevation fullWidth>
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
	);
}

export default JobForm;
