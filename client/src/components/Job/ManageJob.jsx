import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import JobListView from "./JobListView";
import JobView from "./JobView";

function ManageJob(props) {
	const [selectedJob, setSelectedJob] = useState(null);

	useEffect(() => {
		console.log(selectedJob);
	}, [selectedJob]);

	return (
		<div>
			<Grid container>
				<Grid item className="list-container" xs={12} sm={4}>
					<JobListView onJobSelected={setSelectedJob} />
				</Grid>
				<Grid item xs={12} sm={8} style={{ paddingLeft: "20px" }}>
					{selectedJob && <JobView job={selectedJob} />}
				</Grid>
			</Grid>
		</div>
	);
}

export default ManageJob;
