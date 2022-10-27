import React, { useEffect } from "react";

import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

function SearchBar(props) {
	return (
		<Grid
			container
			direction="row"
			className="search-bar-container"
			justifyContent="space-between"
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
			<Grid item xs={1}>
				<Divider orientation="vertical" />
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
			<Grid item xs={3} sm={2} md={1}>
				<Button variant="contained" disableElevation fullWidth>
					Search
				</Button>
			</Grid>
		</Grid>
	);
}

function FilterSideBar(props) {
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

	return (
		<>
			<div>
				<FilterGroup title="Employment Types" options={types} />
				<FilterGroup
					title="Experience Levels"
					options={experienceLevels}
				/>
			</div>
		</>
	);
}

function FilterGroup(props) {
	const { title, options } = props;
	return (
		<div>
			<Accordion disableGutters>
				<AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
					{title}
				</AccordionSummary>
				<AccordionDetails>
					<List disablePadding dense>
						{options.map((option, index) => (
							<ListItem key={index} disableGutters>
								<FormControlLabel
									control={<Checkbox />}
									label={option.title}
								/>
							</ListItem>
						))}
					</List>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}

function JobSearchForm(props) {
	document.title = "AKKA - Search Jobs";

	useEffect(() => {});

	return (
		<>
			<SearchBar />
			<FilterSideBar />
		</>
	);
}

export default JobSearchForm;
