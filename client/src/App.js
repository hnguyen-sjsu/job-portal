import "./App.css";

import {
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
} from "@mui/material/styles";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Container from "@mui/material/Container";
import MenuBar from "./components/MenuBar/MenuBar";
import CssBaseline from "@mui/material/CssBaseline";
import JobGrid from "./components/JobGrid/JobGrid";
import SignUp from "./components/UserAccount/SignUp/SignUp";
import SignIn from "./components/UserAccount/SignIn/SignIn";
import ProfileForm from "./components/UserAccount/ProfileForm/ProfileForm";

let theme = createTheme({
	palette: {
		primary: {
			main: "#0F6FFF",
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
});

theme = responsiveFontSizes(theme);

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />

				<Routes>
					<Route path="/" element={<WithMenuBarLayout />}>
						<Route index element={<JobGrid />} />
					</Route>
					<Route path="/account" element={<NoMenuBarLayout />}>
						<Route path="signup" element={<SignUp />} />
						<Route path="login" element={<SignIn />} />
						<Route path="build-profile" element={<ProfileForm />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
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
		<>
			<MenuBar />
			<Container>
				<Outlet />
			</Container>
		</>
	);
}

export default App;
