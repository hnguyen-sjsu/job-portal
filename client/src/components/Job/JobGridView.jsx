import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import JobServices from "../../services/JobServices";
import JobListItem from "./JobListItem";

function JobGridView(props) {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(false);

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
		</>
	);
}

export default JobGridView;
