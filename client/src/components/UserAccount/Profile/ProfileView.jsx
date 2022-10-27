import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import Stack from "@mui/material/Stack";

import { UserContext } from "../../../providers/AuthProvider";

function ProfileView(props) {
	const { user } = useContext(UserContext);

	const { userProfile, skills, educations, experiences } = props;

	const [profile, setProfile] = useState({
		userProfile: {},
		skills: [],
		educations: [],
		experiences: [],
	});

	useEffect(() => {
		if (userProfile && skills && educations && experiences) {
			// Profile Review - Data not submitted to database
			setProfile({
				userProfile: { ...userProfile },
				skills: [...skills],
				educations: [...educations],
				experiences: [...experiences],
			});
		} else {
			// Profile View - Data loading from database
			if (user) {
				console.log(user);
				setProfile({
					userProfile: { ...user },
					skills: [],
					educations: [],
					experiences: [],
				});
			}
		}
	}, [user]);

	return (
		<>
			<Stack spacing={2}>
				<Stack direction="row" justifyContent="space-between">
					<Typography variant="h4" color="primary" fontWeight="bold">
						{profile.userProfile.fullName}
					</Typography>
					{user && user.role === "candidate" && (
						<Button
							variant="contained"
							disableElevation
							href="/candidate/build-profile"
						>
							Edit
						</Button>
					)}
				</Stack>

				<Typography>{profile.userProfile.bio}</Typography>
				<Grid container>
					<Grid item xs={12} sm={4}>
						<div className="container">
							<Stack style={{ marginTop: "16px" }}>
								<Typography
									variant="h5"
									fontWeight="bold"
									color="primary"
								>
									Contact
								</Typography>
								<Grid container>
									<Grid item xs={2}>
										<PlaceRoundedIcon fontSize="small" />
									</Grid>
									<Grid item xs={10}>
										<Typography>
											{profile.userProfile.location}
										</Typography>
									</Grid>
									<Grid item xs={2}>
										<CallRoundedIcon fontSize="small" />
									</Grid>
									<Grid item xs={10}>
										<Typography>
											{profile.userProfile.phoneNumber}
										</Typography>
									</Grid>
									<Grid item xs={2}>
										<EmailRoundedIcon fontSize="small" />
									</Grid>
									<Grid item xs={10}>
										<Typography>
											{profile.userProfile.email}
										</Typography>
									</Grid>
								</Grid>
							</Stack>
						</div>
						<div
							className="container"
							style={{ marginTop: "16px" }}
						>
							<Stack spacing={2}>
								<Typography
									variant="h5"
									fontWeight="bold"
									color="primary"
								>
									Skills
								</Typography>
								<Stack
									direction={{ xs: "row", sm: "column" }}
									spacing={{ xs: 2, sm: 0 }}
								>
									{profile.skills.map((skill, index) => (
										<Typography key={"skill-" + index}>
											{skill}
										</Typography>
									))}
								</Stack>
							</Stack>
						</div>
					</Grid>
					<Grid item xs={12} sm={8}>
						<Stack spacing={2}>
							<Typography
								variant="h5"
								fontWeight="bold"
								color="primary"
							>
								Education
							</Typography>
							{profile.educations.map((item, index) => (
								<Grid container key={"education-" + index}>
									<Grid item xs={6}>
										<Typography fontWeight="bold">
											{item.schoolName}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography align="right">
											{item.startDate +
												" - " +
												item.endDate}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography>
											{item.degree + ", " + item.major}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography paragraph={true}>
											{item.description}
										</Typography>
									</Grid>
								</Grid>
							))}
							<Typography
								variant="h5"
								fontWeight="bold"
								color="primary"
							>
								Experience
							</Typography>
							{profile.experiences.map((item, index) => (
								<Grid container key={"experience-" + index}>
									<Grid item xs={6}>
										<Typography fontWeight="bold">
											{item.companyName}
											{item.companyLocation}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography align="right">
											{item.startDate + " - "}
											{item.isCurrentJob
												? "Present"
												: item.endDate}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography>{item.title}</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography paragraph={true}>
											{item.description}
										</Typography>
									</Grid>
								</Grid>
							))}
						</Stack>
					</Grid>
				</Grid>
			</Stack>
		</>
	);
}

export default ProfileView;
