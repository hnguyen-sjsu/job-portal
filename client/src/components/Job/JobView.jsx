import React, { useState, useEffect } from "react";
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

import { useParams } from "react-router-dom";
import SkeletonLabel from "../Utils/SkeletonLabel";
import JobServices from "../../services/JobServices";

function JobView(props) {
	let { job, isPreview } = props;
	const [jobInfo, setJobInfo] = useState(null);
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

	let { jobId } = useParams();

	useEffect(() => {
		if (job) {
			setJobInfo({ ...job });
		}
		if (jobId) {
			const id = jobId.split(":")[1];
			JobServices.getJob(id).then((response) => {
				console.log(response);
			});
		}
	}, []);

	useEffect(() => {
		if (job) {
			setJobInfo({ ...job });
		}
	}, [job]);

	return (
		<>
			{jobInfo && (
				<>
<<<<<<< HEAD
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography variant="h4" fontWeight="bold">
							<SkeletonLabel text={jobInfo.title} width={300} />
						</Typography>
						{user && user.role === "recruiter" && (
							<Button variant="contained" disableElevation>
								Edit
							</Button>
						)}
					</Stack>
=======
					<Typography variant="h4" fontWeight="bold">
						<SkeletonLabel text={jobInfo.title} width={300} />
					</Typography>
>>>>>>> parent of 508ac34 (Implement View Job List, Job Detail, Company Profile)
					<Stack direction="row" divider={<>{" • "}</>}>
						{jobInfo.company.name}
						<SkeletonLabel text={jobInfo.location} />
						<SkeletonLabel text={jobInfo.category} />
						<SkeletonLabel
							text={
								jobInfo.noApplicants +
								" applicant" +
								(jobInfo.noApplicants > 1 && "s")
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
									<SkeletonLabel text={jobInfo.type} />
									<SkeletonLabel
										text={jobInfo.experienceLevel}
									/>
									<SkeletonLabel
										text={
											jobInfo.minSalary &&
											"$" + jobInfo.minSalary
										}
									/>
									<SkeletonLabel
										text={
											jobInfo.maxSalary &&
											"$" + jobInfo.maxSalary
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
											jobInfo.startDate &&
											moment(jobInfo.startDate).format(
												"MM/DD/YYYY"
											)
										}
									/>
									<SkeletonLabel
										text={
											jobInfo.endDate &&
											moment(jobInfo.endDate).format(
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
									<SkeletonLabel
										text={jobInfo.company.size}
									/>
									<SkeletonLabel
										text={jobInfo.company.industryField}
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
					{jobInfo.description ? (
						<div
							dangerouslySetInnerHTML={{
								__html: jobInfo.description,
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
