import React, { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import googleLogo from "../../../assets/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "../../../assets/app-logo.svg";
import { UserContext } from "../../../providers/AuthProvider";

function SignIn({ isRecruiter }) {
	const { signIn } = useContext(UserContext);

	let navigate = useNavigate();

	const [loginInfo, setLoginInfo] = useState({
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);

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
		signIn(loginInfo).then((response) => {
			console.log("Login successfully", response);
			setTimeout(() => {
				setLoading(false);
				if (response) {
					navigate("/");
				}
			}, 3000);
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
							{isRecruiter ? "Recruiter Login" : "Login"}
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
							autoComplete="false"
							onSubmit={handleSubmit}
						>
							<TextField
								variant="outlined"
								id="email"
								placeholder="Email address"
								type="email"
								size="small"
								name="email"
								value={loginInfo.email}
								onChange={handleChange}
								required
								disabled={loading}
							/>
							<TextField
								variant="outlined"
								id="password"
								name="password"
								type="password"
								placeholder="Password"
								size="small"
								value={loginInfo.password}
								onChange={handleChange}
								required
								disabled={loading}
							/>
							<Link
								to="/account/reset-password"
								className=".uncolored-link"
								style={{ textAlign: "right" }}
							>
								Forgot password?
							</Link>
							<Button
								type="submit"
								variant="contained"
								disableElevation
								disabled={loading}
							>
								Login
							</Button>

							<Stack
								direction="row"
								spacing={1}
								justifyContent="center"
							>
								<Typography>Not registered?</Typography>
								<div className=".uncolored-link">
									<Link to="/account/signup">
										Create an Account
									</Link>
								</div>
							</Stack>
							<Divider />
							<Button
								startIcon={
									<>
										<img
											height={18}
											width={18}
											src={googleLogo}
										/>
									</>
								}
								variant="outlined"
								disableElevation
								className="google-button"
							>
								Login with Google
							</Button>
						</Stack>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
}

export default SignIn;
