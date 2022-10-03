import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ReactQuill from "react-quill";

import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";

import "react-quill/dist/quill.bubble.css";

function JobView(props) {
	const { job } = props;
	// const [job, setJob] = useState({
	// 	category: "Software",
	// 	experienceLevel: "Senior Level",
	// 	location: "Cupertino, CA",
	// 	maxSalary: "200000",
	// 	minSalary: "116000",
	// 	title: "Sr. Front-End Engineer",
	// 	type: "Full Time",
	// 	description: "Job description",
	// 	noApplicants: 150,
	// 	company: {
	// 		name: "Apple",
	// 		size: "10,001+ employees",
	// 		industryField: "Computers Electronics",
	// 	},
	// });

	return (
		<>
			{job && (
				<>
					<Typography variant="h4" fontWeight="bold">
						{job.title}
					</Typography>
					<Typography>
						{job.company.name} • {job.location} • {job.category} •{" "}
						{job.noApplicants} applicant
						{job.noApplicants > 1 && "s"}
					</Typography>
					<List disablePadding dense>
						<ListItem disableGutters>
							<ListItemIcon>
								<WorkRoundedIcon />
							</ListItemIcon>
							<ListItemText>
								{job.type} • {job.experienceLevel} • $
								{job.minSalary}{" "}
								{job.maxSalary && "- $" + job.maxSalary}
							</ListItemText>
						</ListItem>
						<ListItem disableGutters>
							<ListItemIcon>
								<BusinessRoundedIcon />
							</ListItemIcon>
							<ListItemText>
								{job.company.size} • {job.company.industryField}
							</ListItemText>
						</ListItem>
					</List>
					<Stack direction="row" spacing={2}>
						<Button
							variant="contained"
							disableElevation
							endIcon={<SendRoundedIcon />}
						>
							Apply
						</Button>
						<Button
							variant="outlined"
							disableElevation
							endIcon={<BookmarkBorderRoundedIcon />}
						>
							Save
						</Button>
					</Stack>
					<Typography variant="h6" fontWeight="bold">
						Description
					</Typography>
					<div
						dangerouslySetInnerHTML={{ __html: job.description }}
					></div>
				</>
			)}
		</>
	);
}

export default JobView;
