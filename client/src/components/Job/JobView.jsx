import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../../providers/AuthProvider";

function JobView(props) {
	var numeral = require("numeral");
	let { job, isPreview } = props;
	let { jobId } = useParams();
	const { user } = useContext(UserContext);

	const [jobInfo, setJobInfo] = useState(null);

	useEffect(() => {
		if (job) {
			setJobInfo({ ...job });
		}

		if (jobId) {
			const id = jobId.split(":")[1];
			JobServices.getJob(id).then((response) => {
				console.log(response);
				setJobInfo({
					...response,
					company: {
						name: response.company.companyName,
						size: response.company.companySize,
						industryField: response.company.industry,
					},
					noApplicants: 0,
					minSalary: response.salaryMin,
					maxSalary: response.salaryMax,
				});
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
					<Typography variant="h4" fontWeight="bold">
						<SkeletonLabel text={jobInfo.title} width={300} />
						{user && user.role === "recruiter" && (
							<Button>Edit</Button>
						)}
					</Typography>
					<Stack direction="row" divider={<>{" • "}</>}>
						{jobInfo.company.name}
						<SkeletonLabel text={jobInfo.location} />
						<SkeletonLabel text={jobInfo.category} />
						<SkeletonLabel
							text={
								jobInfo.noApplicants +
								" applicant" +
								(jobInfo.noApplicants > 1 ? "s" : "")
							}
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
											numeral(jobInfo.minSalary).format(
												"($0a)"
											)
										}
									/>

									<SkeletonLabel
										text={
											jobInfo.maxSalary &&
											numeral(jobInfo.maxSalary).format(
												"($0a)"
											)
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
										text={numeral(
											jobInfo.company.size
										).format("0,0")}
									/>
									<SkeletonLabel
										text={jobInfo.company.industryField}
									/>
								</Stack>
							</ListItemText>
						</ListItem>
					</List>
					{!isPreview && user && user.role === "candidate" && (
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
