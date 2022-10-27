import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

import JobListItem from "./JobListItem";

function JobListView(props) {
	const { jobs, onJobSelected } = props;

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
			{jobs && jobs.length === 0 && <>No Jobs Available</>}
		</List>
	);
}

export default JobListView;
