import "./App.css";

import { useContext } from "react";

import {
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
} from "@mui/material/styles";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MenuBar from "./components/MenuBar/MenuBar";
import CssBaseline from "@mui/material/CssBaseline";
import SignUp from "./components/UserAccount/SignUp/SignUp";
import SignIn from "./components/UserAccount/SignIn/SignIn";
import ProfileView from "./components/UserAccount/Profile/ProfileView";
import ProfileForm from "./components/UserAccount/Profile/ProfileForm";
import LandingPage from "./components/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import AuthProvider, { UserContext } from "./providers/AuthProvider";
import JobForm from "./components/Job/JobForm";
import JobView from "./components/Job/JobView";

let theme = createTheme({
	palette: {
		primary: {
			main: "#027CFF",
		},
		secondary: {
			main: "#AACBFF",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					borderRadius: "40px",
					padding: "0px",
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: "16px",
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: "16px 16px 0px 16px",
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: "#000",
				},
			},
		},
	},
	typography: {
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
});

theme = responsiveFontSizes(theme);

function App() {
	const { user } = useContext(UserContext);

	return (
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<CssBaseline />
					<Routes>
						<Route path="/" element={<WithMenuBarLayout />}>
							<Route index element={<LandingPage />} />
							<Route path="post-jobs" element={<JobForm />} />
							<Route path="job/:id" element={<JobView />} />
						</Route>
						<Route path="/account" element={<WithMenuBarLayout />}>
							<Route path="profile" element={<ProfileView />} />
						</Route>
						<Route path="/account" element={<NoMenuBarLayout />}>
							<Route path="signup" element={<SignUp />} />
							<Route
								path="recruiter-signup"
								element={<SignUp isRecruiter={true} />}
							/>
							<Route path="login" element={<SignIn />} />
							<Route
								path="recruiter-login"
								element={<SignIn isRecruiter={true} />}
							/>
							<Route
								path="build-profile"
								element={<ProfileForm />}
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</AuthProvider>
	);
}

function NoMenuBarLayout() {
	return (
		<>
			<Outlet />
		</>
	);
}

function WithMenuBarLayout() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<MenuBar showOptions={true} />
			<Container maxWidth="md">
				<Outlet />
			</Container>
			<Footer />
		</Box>
	);
}

export default App;
