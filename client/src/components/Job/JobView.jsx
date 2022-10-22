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
	let numeral = require("numeral");
	let { job } = props;
	let { jobId } = useParams();

	const { user } = useContext(UserContext);
	const [jobInfo, setJobInfo] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		if (job) {
			setJobInfo({ ...job });
			setLoading(false);
		}
		if (jobId) {
			const id = jobId.split(":")[1];
			JobServices.getJob(id).then((response) => {
				if (response) {
					setJobInfo({ ...response });
					setLoading(false);
				} else {
					setJobInfo({ company: {} });
				}
			});
		}
	}, []);

	useEffect(() => {
		if (job) {
			setJobInfo({ ...job });
			setLoading(false);
		}
	}, [job]);

	return (
		<>
			{jobInfo && (
				<div className="container">
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography variant="h4" fontWeight="bold">
							<SkeletonLabel text={jobInfo.title} width={300} />
						</Typography>
						{user && user.role === "recruiter" && (
							<Button
								variant="contained"
								disableElevation
								href={`/recruiter/edit-job/${
									jobId || "jobId:" + jobInfo.id
								}`}
								disabled={loading}
							>
								Edit
							</Button>
						)}
					</Stack>
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
											jobInfo.salaryMin &&
											numeral(jobInfo.salaryMin).format(
												"($0.00a)"
											)
										}
									/>
									<SkeletonLabel
										text={
											jobInfo.salaryMax &&
											numeral(jobInfo.salaryMax).format(
												"($0.00a)"
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
								<Stack direction="row">
									<SkeletonLabel
										text={
											jobInfo.startDate &&
											"Available from " +
												moment(
													jobInfo.startDate
												).format("MMM DD, YYYY")
										}
									/>
									<SkeletonLabel
										text={
											jobInfo.endDate &&
											" to " +
												moment(jobInfo.endDate).format(
													"MMM DD, YYYY"
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
										text={
											numeral(
												jobInfo.company.companySize
											).format("0,0") + " employees"
										}
									/>
									<SkeletonLabel
										text={jobInfo.company.industry}
									/>
								</Stack>
							</ListItemText>
						</ListItem>
					</List>
					{user && user.role === "candidate" && (
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
					<div>
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
					</div>
				</div>
			)}
		</>
	);
}

export default JobView;
