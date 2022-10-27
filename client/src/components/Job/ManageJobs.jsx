import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import JobListView from "./JobListView";
import JobView from "./JobView";
import JobServices from "../../services/JobServices";

function ManageJobs(props) {
	const [selectedJob, setSelectedJob] = useState(null);
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		document.title = "AKKA - Manage Jobs";
	}, []);

	useEffect(() => {
		console.log(selectedJob);
	}, [selectedJob]);

	useEffect(() => {
		JobServices.getPostedJobs().then((response) => {
			if (response) {
				console.log(response);
				setJobs(response);
			}
		});
	}, []);

	return (
		<div>
			<Typography variant="h5" fontWeight="bold">
				Manage Jobs
			</Typography>
			<Grid container>
				<Grid item className="list-container" xs={12} sm={4}>
					<JobListView jobs={jobs} onJobSelected={setSelectedJob} />
				</Grid>
				<Grid item xs={12} sm={8} style={{ paddingLeft: "20px" }}>
					{selectedJob && <JobView job={selectedJob} />}
				</Grid>
			</Grid>
		</div>
	);
}

export default ManageJobs;
