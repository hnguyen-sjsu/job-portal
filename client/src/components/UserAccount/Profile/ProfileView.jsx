import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import { UserContext } from "../../../providers/AuthProvider";

function ProfileView(props) {
	const { user } = useContext(UserContext);

	const undefinedProfile = {
		full_name: "",
		email: "",
		role: "",
		bio: "",
		phoneNo: "",
		location: "",
		skills: [],
		educations: [],
		experiences: [],
	};

	const [profile, setProfile] = useState({ ...undefinedProfile });

	useEffect(() => {
		if (user) {
			const dummyData = {
				bio: "San Jose State University Software Engineering Student looks for internship",
				phoneNo: "(209) 123-4567",
				location: "San Jose, CA",
				skills: [
					"Python",
					"Java",
					"ReactJS",
					"SwiftUI",
					"Full Stack Development",
				],
				educations: [],
				experiences: [],
			};
			console.log(user);
			setTimeout(() => {
				setProfile({ ...profile, ...user, ...dummyData });
			}, 1000);
		}
	}, [user]);

	return (
		<Stack {...props}>
			<>
				<Typography variant="h5" fontWeight="bold">
					{profile.full_name}
				</Typography>
				<Card>
					<CardContent>
						<Typography>{profile.bio}</Typography>
						<Typography>{profile.phoneNo}</Typography>
						<Typography>{profile.email}</Typography>
					</CardContent>
				</Card>
			</>
		</Stack>
	);
}

export default ProfileView;
