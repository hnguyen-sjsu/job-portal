import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import LinearProgress from "@mui/material/LinearProgress";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import JobView from "./JobView";
import JobServices from "../../services/JobServices";
import AlertDialog from "../Utils/AlertDialog";

import { useNavigate, useParams } from "react-router-dom";

function JobForm(props) {
	let navigate = useNavigate();
	let { jobId } = useParams();

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

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [showDialog, setShowDialog] = useState(false);

	let undefinedJob = {
		id: undefined,
		title: "",
		type: "",
		experienceLevel: "",
		location: "",
		category: "",
		salaryMin: "",
		salaryMax: "",
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
	};

	const [job, setJob] = useState({
		...undefinedJob,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setJob({
			...job,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setShowDialog(false);
		try {
			const response = await JobServices.saveJob(job);
			console.log(response);
			setMessage(response.data.message);
			setShowDialog(true);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	const handleClear = (e) => {
		e.preventDefault();
		setJob({ ...undefinedJob });
	};

	const loadJob = async (jobId) => {
		console.log("Edit Form");
		setLoading(true);
		try {
			const job = await JobServices.getJob(jobId);
			setJob({ ...job });
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (jobId) {
			loadJob(jobId.split(":")[1]);
		} else {
			console.log("Create Form");
		}
	}, []);

	return (
		<>
			<Box
				sx={{
					width: "100vw",
					display: loading ? "block" : "none",
					position: "fixed",
					left: 0,
					zIndex: 1999,
				}}
			>
				<LinearProgress />
			</Box>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Stack component="form" onSubmit={handleSubmit}>
					<Typography variant="h4">
						{job.id ? "Edit Job" : "Post Job"}
					</Typography>
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
								disabled={loading}
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
								disabled={loading}
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
								disabled={loading}
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
							<InputLabel htmlFor="location">Location</InputLabel>
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
								disabled={loading}
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
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={6}>
							<InputLabel htmlFor="salaryMin">
								Min Salary
							</InputLabel>
							<TextField
								id="salaryMin"
								name="salaryMin"
								size="small"
								type="number"
								placeholder="Min salary"
								value={job.salaryMin}
								onChange={handleChange}
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											$
										</InputAdornment>
									),
								}}
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={6}>
							<InputLabel htmlFor="maxSalary">
								Max Salary
							</InputLabel>
							<TextField
								id="salaryMax"
								name="salaryMax"
								size="small"
								placeholder="Max salary"
								type="number"
								value={job.salaryMax}
								onChange={handleChange}
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											$
										</InputAdornment>
									),
								}}
								disabled={loading}
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
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={6}>
							<InputLabel htmlFor="endDate">End Date</InputLabel>
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
								disabled={loading}
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
								readOnly={loading}
							/>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								disableElevation
								fullWidth
								type="submit"
								disabled={loading}
							>
								Save
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="outlined"
								disableElevation
								fullWidth
								disabled={loading}
								onClick={handleClear}
							>
								Clear
							</Button>
						</Grid>
					</Grid>
				</Stack>
			</LocalizationProvider>
			<AlertDialog
				message={message}
				showDialog={showDialog}
				onComplete={() => {
					navigate("/recruiter/manage-jobs");
				}}
			/>
		</>
	);
}

export default JobForm;
