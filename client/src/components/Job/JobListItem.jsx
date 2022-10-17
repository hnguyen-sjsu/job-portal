import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

function JobListItem(props) {
	const { job } = props;

	return (
		<>
			{job && (
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar src={job.companyLogo} />
					</ListItemAvatar>
					<ListItemText
						primary={job.title}
						secondary={
							<Stack>
								<Typography variant="body2">
									{job.type + " - " + job.experience_level}
								</Typography>
								<Typography variant="body2">
									{job.location}
								</Typography>
								<Typography variant="body2">
									{"$" +
										job.salary_min +
										" - $" +
										job.salary_max}
								</Typography>
							</Stack>
						}
					/>
				</ListItem>
			)}
		</>
	);
}

export default JobListItem;
