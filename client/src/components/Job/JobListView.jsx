import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import JobServices from "../../services/JobServices";
import JobListItem from "./JobListItem";

function JobListView(props) {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(false);
	const { layout } = props;

	useEffect(() => {
		setLoading(true);
		JobServices.getPostedJobs().then((response) => {
			if (response) {
				console.log(response);
				setJobs(response);
			}
		});
	}, []);

	return (
		<>
			{layout === "grid" && (
				<Grid container spacing={2}>
					{jobs.map((job, idx) => (
						<Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
							<Link
								to={{
									pathname: `/job/jobId:${job.id}`,
								}}
								style={{
									color: "inherit",
									textDecoration: "none",
								}}
							>
								<Card variant="outlined">
									<JobListItem job={job} />
								</Card>
							</Link>
						</Grid>
					))}
				</Grid>
			)}
			{layout === "list" && (
				<>
					<List style={{ backgroundColor: "#fff" }}>
						{jobs.map((job) => (
							<Link
								to={{
									pathname: `/job/jobId:${job.id}`,
								}}
								style={{
									color: "inherit",
									textDecoration: "none",
								}}
							>
								<JobListItem job={job} />
								<Divider />
							</Link>
						))}
					</List>
				</>
			)}
		</>
	);
}

export default JobListView;
