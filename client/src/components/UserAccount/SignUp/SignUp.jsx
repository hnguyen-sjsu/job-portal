import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../../assets/app-logo.svg";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import AuthenticationServices from "../../../services/AuthenticationServices";

function SignUp({ isRecruiter }) {
	let navigate = useNavigate();

	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const [loginInfo, setLoginInfo] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setLoginInfo({
			...loginInfo,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		const userInfo = {
			...loginInfo,
			role: isRecruiter ? "recruiter" : "candidate",
		};

		AuthenticationServices.signUp(userInfo).then((response) => {
			setLoading(false);
			if (response) {
				console.log(response);
				setTimeout(() => {
					setLoading(false);
					if (response) {
						navigate("/account/login");
					}
				}, 2000);
			}
		});
	};

	return (
		<>
			<Box sx={{ width: "100%", display: loading ? "block" : "none" }}>
				<LinearProgress />
			</Box>
			<Grid container className="signin-container">
				<Grid item xs={0} md={6} alignItems="center">
					<Grid container>
						<Grid item>
							<Stack
								alignItems="center"
								justifyContent="center"
								className="left-wizard-container"
							>
								<img src={logoImg} className="logo-img" />
								<Typography variant="h4" fontWeight="bold">
									{isRecruiter
										? "Find the talents that fit your company needs"
										: "Find the job that best describes you"}
								</Typography>
							</Stack>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={6}>
					<Stack
						className="right-wizard-container"
						justifyContent={{ sm: "flex-start", md: "center" }}
					>
						<Typography variant="h4" fontWeight="bold">
							{isRecruiter
								? "Create a Recruiter Account"
								: "Create an Account"}
						</Typography>
						<Typography variant="h6">
							{isRecruiter
								? "Your next talent pool is here!"
								: "Your next career opportunity start here!"}
						</Typography>
						<Stack
							component="form"
							spacing={2}
							style={{ paddingTop: "32px" }}
							onSubmit={handleSubmit}
						>
							<Stack>
								<InputLabel htmlFor="email">
									Email Address
								</InputLabel>
								<TextField
									variant="standard"
									id="email"
									name="email"
									placeholder="name@domain.com"
									type="email"
									onChange={handleChange}
									required
								/>
							</Stack>
							<Stack>
								<InputLabel htmlFor="password">
									Password
								</InputLabel>
								<TextField
									variant="standard"
									id="password"
									name="password"
									type={passwordVisible ? "text" : "password"}
									placeholder="minimum 8 characters"
									onChange={handleChange}
									required
									InputProps={{
										endAdornment: (
											<IconButton
												onClick={() => {
													setPasswordVisible(
														!passwordVisible
													);
												}}
											>
												{passwordVisible ? (
													<VisibilityOffRoundedIcon />
												) : (
													<VisibilityRoundedIcon />
												)}
											</IconButton>
										),
									}}
								/>
							</Stack>
							<Button
								type="submit"
								variant="contained"
								disableElevation
							>
								Sign Up
							</Button>
							<Stack
								direction="row"
								spacing={1}
								justifyContent="center"
							>
								<Typography>
									Already have an account?
								</Typography>
								<Link
									to="/account/login"
									className=".uncolored-link"
								>
									Login
								</Link>
							</Stack>
							<Divider />
							<Button
								variant="outlined"
								disableElevation
								className="google-button"
								onClick={() => {
									isRecruiter
										? navigate("/account/signup")
										: navigate("/account/recruiter-signup");
								}}
							>
								Create an Account as a{" "}
								{isRecruiter ? "Candidate" : "Recruiter"}
							</Button>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
}

export default SignUp;
