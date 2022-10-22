import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

import JobServices from "../../services/JobServices";
import JobListItem from "./JobListItem";

function JobListView(props) {
	const { onJobSelected } = props;
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
		<List disablePadding>
			{jobs.map((job, idx) => (
				<div key={job.id}>
					<ListItemButton
						onClick={() => {
							onJobSelected({ ...job, jobId: job.id });
						}}
						disableGutters
					>
						<JobListItem job={job} />
					</ListItemButton>
					{idx !== jobs.length - 1 && <Divider />}
				</div>
			))}
		</List>
	);
}

export default JobListView;
