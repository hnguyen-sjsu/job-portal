import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import heroImage1 from "../../assets/job-hunt-concept-illustration_114360-326.jpg";
import heroImage2 from "../../assets/personal-site-concept-illustration_114360-2577.jpg";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

const HeroSection = ({ data }) => {
	const { primaryText, secondaryText, subtitle, image, imageLeft, actions } =
		data;

	const textContainer = (
		<Stack spacing={2}>
			<Box>
				<Typography variant="h4">{secondaryText}</Typography>
				<Typography variant="h4" fontWeight="bold" color="primary">
					{primaryText}
				</Typography>
				<Typography variant="body">{subtitle}</Typography>
			</Box>
			<Stack direction="row" spacing={2}>
				{actions.map((action) => action)}
			</Stack>
		</Stack>
	);

	const imageContainer = (
		<Stack alignItems="center">
			<img src={image} style={{ width: 400 }} />
		</Stack>
	);

	return (
		<Grid container style={{ minHeight: "50vh" }} alignItems="center">
			<Grid item xs={12} sm={6}>
				{imageLeft ? imageContainer : textContainer}
			</Grid>
			<Grid item xs={12} sm={6}>
				{imageLeft ? textContainer : imageContainer}
			</Grid>
		</Grid>
	);
};

const GetStartedSection = () => {
	const steps = [
		{
			title: "Create Account",
			icon: <AccountCircleRoundedIcon />,
			color: "#9BB1FF",
		},
		{ title: "Find Jobs", icon: <SearchRoundedIcon />, color: "#788BFF" },
		{ title: "Apply", icon: <EmailRoundedIcon />, color: "#5465FF" },
	];
	return (
		<Stack textAlign="center" spacing={2}>
			<Typography variant="h5" fontWeight="bold">
				Score your next job in 3 steps
			</Typography>
			<Grid container>
				{steps.map((step) => (
					<Grid item xs={4}>
						<Stack alignItems="center" spacing={2}>
							<Avatar sx={{ bgcolor: step.color }}>
								{step.icon}
							</Avatar>
							<Typography fontWeight="bold">
								{step.title}
							</Typography>
						</Stack>
					</Grid>
				))}
			</Grid>
		</Stack>
	);
};

export default function LandingPage() {
	const heroSections = [
		{
			secondaryText: "Your new journey",
			primaryText: "Start Here",
			subtitle: "A place where talents meet recruiters.",
			actions: [
				<Button variant="contained" color="primary" disableElevation>
					Find Jobs
				</Button>,
				<Button variant="outlined" color="primary" disableElevation>
					Find Talents
				</Button>,
			],
			image: heroImage1,
			imageLeft: false,
		},
		{
			secondaryText: "Customize your profile",
			primaryText: "Impress recruiters",
			subtitle: "Let your skills shine your profile.",
			actions: [
				<Button variant="contained" color="primary" disableElevation>
					Get Started
				</Button>,
			],
			image: heroImage2,
			imageLeft: true,
		},
	];

	return (
		<Stack spacing={2} style={{ marginBottom: 20 }}>
			<HeroSection data={heroSections[0]} />
			<GetStartedSection />
			<HeroSection data={heroSections[1]} />
		</Stack>
	);
}
