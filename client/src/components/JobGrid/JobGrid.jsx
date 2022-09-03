import React from "react";

import Grid from "@mui/material/Grid";
import {
	Avatar,
	Button,
	Card,
	Stack,
	CardContent,
	Typography,
	IconButton,
} from "@mui/material";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

function JobGrid() {
	const jobs = [
		{
			companyName: "Tiktok",
			companyLogoUrl:
				"https://media-exp1.licdn.com/dms/image/C510BAQGCdThXIss7UQ/company-logo_100_100/0/1539940587971?e=1669852800&v=beta&t=b1beRqizKA32xZQFV5epGcUuk0jkP8gWlzBlE9UzSUM",
			title: "Software Engineer - Backend",
			postedDate: "1 day ago",
			description:
				"TikTok's product engineering team is responsible for building backend support for various kinds of new experiences for the TikTok app: User Growth, Social and Privacy. This includes ensuring our systems are scaling to handle the ever-growing user base of TikTok and expanding our reach by making our tools accessible through our open platform.",
			location: "Mountain View, CA Hybrid",
			type: "Full Time",
			experienceLevel: "Mid-Senior Level",
			salary: "$103,000/yr - $187,000/yr",
		},
		{
			companyName: "Adobe",
			companyLogoUrl:
				"https://media-exp1.licdn.com/dms/image/C560BAQFrtK-ioO1rsQ/company-logo_100_100/0/1590681827578?e=1669852800&v=beta&t=9iKHirBfEdhuRA3hbb2atnVFFtipZ6uz0esOI5wqQmI",
			title: "Software Development Engineer",
			postedDate: "1 week ago",
			description:
				"Changing the world through digital experiences is what Adobe’s all about. We give everyone—from emerging artists to global brands—everything they need to design and deliver exceptional digital experiences! We’re passionate about empowering people to create beautiful and powerful images, videos, and apps, and transform how companies interact with customers across every screen.",
			location: "Mountain View, CA Hybrid",
			type: "Full Time",
			experienceLevel: "Mid-Senior Level",
			salary: "$122,000/yr - $179,000/yr",
		},
		{
			companyName: "Tiktok",
			companyLogoUrl:
				"https://media-exp1.licdn.com/dms/image/C510BAQGCdThXIss7UQ/company-logo_100_100/0/1539940587971?e=1669852800&v=beta&t=b1beRqizKA32xZQFV5epGcUuk0jkP8gWlzBlE9UzSUM",
			title: "Software Engineer - Backend",
			postedDate: "1 day ago",
			description:
				"TikTok's product engineering team is responsible for building backend support for various kinds of new experiences for the TikTok app: User Growth, Social and Privacy. This includes ensuring our systems are scaling to handle the ever-growing user base of TikTok and expanding our reach by making our tools accessible through our open platform.",
			location: "Mountain View, CA Hybrid",
			type: "Full Time",
			experienceLevel: "Mid-Senior Level",
			salary: "$103,000/yr - $187,000/yr",
		},
		{
			companyName: "Adobe",
			companyLogoUrl:
				"https://media-exp1.licdn.com/dms/image/C560BAQFrtK-ioO1rsQ/company-logo_100_100/0/1590681827578?e=1669852800&v=beta&t=9iKHirBfEdhuRA3hbb2atnVFFtipZ6uz0esOI5wqQmI",
			title: "Software Development Engineer",
			postedDate: "1 week ago",
			description:
				"Changing the world through digital experiences is what Adobe’s all about. We give everyone—from emerging artists to global brands—everything they need to design and deliver exceptional digital experiences! We’re passionate about empowering people to create beautiful and powerful images, videos, and apps, and transform how companies interact with customers across every screen.",
			location: "Mountain View, CA Hybrid",
			type: "Full Time",
			experienceLevel: "Mid-Senior Level",
			salary: "$122,000/yr - $179,000/yr",
		},
		{
			companyName: "Tiktok",
			companyLogoUrl:
				"https://media-exp1.licdn.com/dms/image/C510BAQGCdThXIss7UQ/company-logo_100_100/0/1539940587971?e=1669852800&v=beta&t=b1beRqizKA32xZQFV5epGcUuk0jkP8gWlzBlE9UzSUM",
			title: "Software Engineer - Backend",
			postedDate: "1 day ago",
			description:
				"TikTok's product engineering team is responsible for building backend support for various kinds of new experiences for the TikTok app: User Growth, Social and Privacy. This includes ensuring our systems are scaling to handle the ever-growing user base of TikTok and expanding our reach by making our tools accessible through our open platform.",
			location: "Mountain View, CA Hybrid",
			type: "Full Time",
			experienceLevel: "Mid-Senior Level",
			salary: "$103,000/yr - $187,000/yr",
		},
		{
			companyName: "Adobe",
			companyLogoUrl:
				"https://media-exp1.licdn.com/dms/image/C560BAQFrtK-ioO1rsQ/company-logo_100_100/0/1590681827578?e=1669852800&v=beta&t=9iKHirBfEdhuRA3hbb2atnVFFtipZ6uz0esOI5wqQmI",
			title: "Software Development Engineer",
			postedDate: "1 week ago",
			description:
				"Changing the world through digital experiences is what Adobe’s all about. We give everyone—from emerging artists to global brands—everything they need to design and deliver exceptional digital experiences! We’re passionate about empowering people to create beautiful and powerful images, videos, and apps, and transform how companies interact with customers across every screen.",
			location: "Mountain View, CA Hybrid",
			type: "Full Time",
			experienceLevel: "Mid-Senior Level",
			salary: "$122,000/yr - $179,000/yr",
		},
	];

	return (
		<>
			<Grid container spacing={2}>
				{jobs.map((job, idx) => (
					<Grid item key={idx} xs={12} sm={6} md={4}>
						<Card variant="outlined" elevation={0}>
							<CardContent>
								<Stack spacing={1}>
									<Grid
										container
										alignItems="center"
										spacing={2}
									>
										<Grid item xs={2}>
											<Avatar
												alt={job.companyName}
												src={job.companyLogoUrl}
											/>
										</Grid>
										<Grid item xs={8}>
											<Stack>
												<Typography
													style={{ fontWeight: 600 }}
												>
													{job.companyName}
												</Typography>
												<Typography variant="body2">
													{job.postedDate}
												</Typography>
											</Stack>
										</Grid>
										<Grid item xs={2} textAlign="end">
											<IconButton>
												<FavoriteBorderRoundedIcon />
											</IconButton>
										</Grid>
									</Grid>
									<Typography
										variant="body1"
										style={{ fontWeight: 800 }}
										gutterBottom
									>
										{job.title}
									</Typography>
									<Grid container>
										<Grid item xs={8}>
											<Stack direction="row" spacing={1}>
												<PlaceRoundedIcon fontSize="small" />
												<Typography variant="body2">
													{job.location}
												</Typography>
											</Stack>
										</Grid>
										<Grid item xs={4}>
											<Stack direction="row" spacing={1}>
												<AccessTimeRoundedIcon fontSize="small" />
												<Typography
													variant="body2"
													textAlign="end"
												>
													{job.type}
												</Typography>
											</Stack>
										</Grid>
									</Grid>
									<Grid container alignItems="center">
										<Grid item xs={8}>
											<Typography variant="body2">
												{job.salary}
											</Typography>
										</Grid>
										<Grid item xs={4} textAlign="end">
											<Button
												variant="contained"
												size="small"
												disableElevation
											>
												Apply
											</Button>
										</Grid>
									</Grid>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default JobGrid;
