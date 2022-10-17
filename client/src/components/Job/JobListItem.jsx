import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

function JobListItem(props) {
	var numeral = require("numeral");
	const { job } = props;
	console.log(job);
	return (
		<>
			{job && (
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar
							src={job.company.companyLogoUrl}
							alt={job.company.companyName}
						/>
					</ListItemAvatar>
					<Stack>
						<Typography>{job.title}</Typography>
						<Typography variant="body2">
							{job.type + " - " + job.experienceLevel}
						</Typography>
						<Typography variant="body2">{job.location}</Typography>
						<Typography variant="body2">
							{numeral(job.salaryMin).format("($0a)") +
								" - " +
								numeral(job.salaryMax).format("($0a)")}
						</Typography>
					</Stack>
				</ListItem>
			)}
		</>
	);
}

export default JobListItem;
