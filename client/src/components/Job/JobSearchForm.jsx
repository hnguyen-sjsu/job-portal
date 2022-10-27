import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slider from "@mui/material/Slider";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import JobServices from "../../services/JobServices";
import JobListView from "./JobListView";
import JobView from "./JobView";

function JobSearchForm(props) {
	document.title = "AKKA - Search Jobs";

	const [openDialog, setOpenDialog] = useState(false);
	const [jobs, setJobs] = useState([]);
	const [selectedJob, setSelectedJob] = useState(null);

	useEffect(() => {
		JobServices.getJobs().then((response) => {
			if (response) {
				console.log(response);
				setJobs(response);
			}
		});
	}, []);

	return (
		<Stack spacing={2}>
			<SearchBar setOpenDialog={setOpenDialog} />
			<FilterDialog open={openDialog} setOpen={setOpenDialog} />
			<Grid container>
				<Grid item className="list-container" xs={12} sm={4}>
					<JobListView jobs={jobs} onJobSelected={setSelectedJob} />
				</Grid>
				<Grid item xs={12} sm={8} style={{ paddingLeft: "20px" }}>
					{selectedJob && <JobView job={selectedJob} />}
				</Grid>
			</Grid>
		</Stack>
	);
}

function SearchBar(props) {
	const { setOpenDialog } = props;

	const handleOpenFilters = () => {
		setOpenDialog(true);
	};

	return (
		<Grid
			container
			direction="row"
			className="search-bar-container"
			justifyContent="space-between"
			alignItems="center"
		>
			<Grid item xs={4}>
				<Input
					disableUnderline
					placeholder="Job title"
					startAdornment={
						<SearchRoundedIcon
							color="disabled"
							sx={{ mr: "10px" }}
						/>
					}
				/>
			</Grid>
			<Grid item xs={4}>
				<Input
					disableUnderline
					placeholder="Location"
					startAdornment={
						<LocationOnOutlinedIcon
							color="disabled"
							sx={{ mr: "10px" }}
						/>
					}
				/>
			</Grid>
			<Grid item xs={3} sm={2} md={2}>
				<Stack direction="row" justifyContent="flex-end">
					<IconButton onClick={handleOpenFilters}>
						<TuneRoundedIcon />
					</IconButton>
					<Button variant="contained" disableElevation>
						Search
					</Button>
				</Stack>
			</Grid>
		</Grid>
	);
}

function FilterDialog(props) {
	let numeral = require("numeral");

	const { open, setOpen } = props;
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const [value, setValue] = React.useState([0, 120000]);

	const types = [
		{ title: "Full Time", checked: false },
		{ title: "Part Time", checked: false },
		{ title: "Intern", checked: false },
		{ title: "Contract", checked: false },
	];

	const experienceLevels = [
		{ title: "Entry Level", checked: false },
		{ title: "Junior Level", checked: false },
		{ title: "Intermediate Level", checked: false },
		{ title: "Senior Level", checked: false },
		{ title: "Intern Level", checked: false },
	];

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const formatValue = (x) => {
		return numeral(x).format("($0.00a)");
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullScreen={fullScreen}
			maxWidth="md"
		>
			<DialogTitle>Search Filters</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<FilterGroup title="Employment Types" options={types} />
					</Grid>
					<Grid item xs={12}>
						<FilterGroup
							title="Experience Levels"
							options={experienceLevels}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography>Salary Range</Typography>

						<Stack direction="row" spacing={2} alignItems="center">
							<Typography>
								{numeral(value[0]).format("($0.00a)")}
							</Typography>
							<Slider
								value={value}
								onChange={handleChange}
								valueLabelDisplay="auto"
								max={500000}
								min={0}
								step={10000}
								valueLabelFormat={(x) =>
									numeral(x).format("($0.00a)")
								}
							/>
							<Typography>
								{numeral(value[1]).format("($0.00a)")}
							</Typography>
						</Stack>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
				<Button onClick={handleClose}>Clear</Button>
				<Button onClick={handleClose}>Apply</Button>
			</DialogActions>
		</Dialog>
	);
}

function FilterGroup(props) {
	const { title, options } = props;
	return (
		<Stack>
			<Typography>{title}</Typography>
			<Grid container>
				{options.map((option, index) => (
					<Grid item key={index} xs={4} sm={3}>
						<FormControlLabel
							control={<Checkbox />}
							label={option.title}
						/>
					</Grid>
				))}
			</Grid>
		</Stack>
	);
}

export default JobSearchForm;
