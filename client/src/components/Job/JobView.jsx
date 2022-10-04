import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";

import moment from "moment/dist/moment.js";
import "react-quill/dist/quill.bubble.css";
import SkeletonLabel from "../Utils/SkeletonLabel";

function JobView(props) {
	const { job, isPreview } = props;
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
						<SkeletonLabel text={job.title} width={300} />
					</Typography>
					<Stack direction="row" divider={<>{" • "}</>}>
						{job.company.name}
						<SkeletonLabel text={job.location} />
						<SkeletonLabel text={job.category} />
						<SkeletonLabel
							text={
								job.noApplicants +
								" applicant" +
								(job.noApplicants > 1 && "s")
							}
							animation={false}
						/>
					</Stack>
					<List disablePadding dense>
						<ListItem disableGutters>
							<ListItemIcon>
								<WorkRoundedIcon />
							</ListItemIcon>
							<ListItemText>
								<Stack direction="row" divider={<>{" • "}</>}>
									<SkeletonLabel text={job.type} />
									<SkeletonLabel text={job.experienceLevel} />
									<SkeletonLabel
										text={
											job.minSalary && "$" + job.minSalary
										}
									/>
									<SkeletonLabel
										text={
											job.maxSalary && "$" + job.maxSalary
										}
									/>
								</Stack>
							</ListItemText>
						</ListItem>
						<ListItem disableGutters>
							<ListItemIcon>
								<EventAvailableRoundedIcon />
							</ListItemIcon>
							<ListItemText>
								<Stack direction="row" divider={<>{" • "}</>}>
									<SkeletonLabel
										text={
											job.startDate &&
											moment(job.startDate).format(
												"MM/DD/YYYY"
											)
										}
									/>
									<SkeletonLabel
										text={
											job.endDate &&
											moment(job.endDate).format(
												"MM/DD/YYYY"
											)
										}
									/>
								</Stack>
							</ListItemText>
						</ListItem>
						<ListItem disableGutters>
							<ListItemIcon>
								<BusinessRoundedIcon />
							</ListItemIcon>
							<ListItemText>
								<Stack direction="row" divider={<>{" • "}</>}>
									<SkeletonLabel text={job.company.size} />
									<SkeletonLabel
										text={job.company.industryField}
									/>
								</Stack>
							</ListItemText>
						</ListItem>
					</List>
					{!isPreview && (
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
					)}
					<Typography variant="h6" fontWeight="bold">
						Description
					</Typography>
					{job.description ? (
						<div
							dangerouslySetInnerHTML={{
								__html: job.description,
							}}
						></div>
					) : (
						[...Array(10).keys()].map((n) => (
							<Skeleton key={"skeleton-" + n} />
						))
					)}
				</>
			)}
		</>
	);
}

export default JobView;
