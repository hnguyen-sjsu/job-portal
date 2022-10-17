import React, { useEffect, useState, useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { UserContext } from "../../../providers/AuthProvider";

function CompanyProfileView() {
	const { user } = useContext(UserContext);
	const [loading, setLoading] = useState(false);
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		setLoading(true);
		if (user && user.role === "recruiter") {
			setProfile({ ...user });
		}
	}, [user]);
	return (
		<>
			{profile && (
				<Container maxWidth="md" disableGutters>
					<Paper elevation={0}>
						<Stack style={{ padding: "16px" }}>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="space-between"
							>
								<Typography
									variant="h5"
									fontWeight="bold"
									color="primary"
								>
									Company Profile
								</Typography>
								<Button
									disableElevation
									endIcon={<EditRoundedIcon />}
									href="/recruiter/edit-profile"
								>
									Update Profile
								</Button>
							</Stack>
							<Grid container alignItems="center" spacing={2}>
								<Grid item xs={12} sm={3}>
									<InputLabel htmlFor="name">
										Company Icon
									</InputLabel>
								</Grid>
								<Grid item xs={12} sm={9}>
									<Avatar src={profile.companyLogoUrl} />
								</Grid>
								<Grid item xs={12} sm={3}>
									<InputLabel htmlFor="name">
										Company Name
									</InputLabel>
								</Grid>
								<Grid item xs={12} sm={9}>
									<Typography>
										{profile.companyName}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={3}>
									<InputLabel htmlFor="name">
										Company Size
									</InputLabel>
								</Grid>
								<Grid item xs={12} sm={9}>
									<Typography>
										{profile.companySize} employees
									</Typography>
								</Grid>
								<Grid item xs={12} sm={3}>
									<InputLabel htmlFor="name">
										Industry
									</InputLabel>
								</Grid>
								<Grid item xs={12} sm={9}>
									<Typography>{profile.industry}</Typography>
								</Grid>
							</Grid>
						</Stack>
					</Paper>
				</Container>
			)}
		</>
	);
}

export default CompanyProfileView;
