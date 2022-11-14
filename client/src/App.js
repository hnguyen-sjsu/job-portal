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
import JobForm from "./components/Job/JobForm";
import JobView from "./components/Job/JobView";
import CompanyProfileForm from "./components/UserAccount/Profile/CompanyProfileForm";
import Settings from "./components/UserAccount/Settings/Settings";
import ManageJobs from "./components/Job/ManageJobs";
import AuthProvider, { UserContext } from "./providers/AuthProvider";
import JobSearchForm from "./components/Job/JobSearchForm";
import MembershipPricingView from "./components/Recruiter/MembershipPricingView";
import ApplicationList from "./components/Applications/ApplicationList";
import CandidateSearchView from "./components/Recruiter/CandidateSearchView";

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
                    borderRadius: "8px",
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
        MuiAccordion: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    boxShadow: "none",
                    border: "1px solid #dbdbdb",
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
                        <Route path="/" element={<LandingPageLayout />}>
                            <Route index element={<LandingPage />} />
                        </Route>
                        <Route
                            path="/candidate"
                            element={<WithMenuBarLayout />}
                        >
                            <Route
                                path="profile"
                                element={<ProfileView editable={true} />}
                            />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                        <Route path="/recruiter" element={<RecruiterLayout />}>
                            <Route path="post-jobs" element={<JobForm />} />
                            <Route
                                path="edit-job/:jobId"
                                element={<JobForm />}
                            />
                            <Route
                                path="build-profile"
                                element={<CompanyProfileForm />}
                            />
                            <Route
                                path="profile"
                                element={<CompanyProfileForm />}
                            />
                            <Route
                                path="manage-jobs"
                                element={<ManageJobs />}
                            />
                            <Route path="settings" element={<Settings />} />
                            <Route
                                path="pricing"
                                element={<MembershipPricingView />}
                            />
                            <Route
                                path="candidates"
                                element={<CandidateSearchView />}
                            />
                        </Route>
                        <Route path="/job" element={<RecruiterLayout />}>
                            <Route path=":jobId" element={<JobView />} />
                            <Route path="search" element={<JobSearchForm />} />
                            <Route path="saved" element={<JobSearchForm />} />
                        </Route>
                        <Route
                            path="/candidate"
                            element={<WithMenuBarLayout />}
                        >
                            <Route
                                path="build-profile/:step"
                                element={<ProfileForm />}
                            />
                            <Route
                                path="build-profile/"
                                element={<ProfileForm />}
                            />
                            <Route
                                path="applied-jobs"
                                element={<ApplicationList />}
                            />
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
            <Container
                maxWidth="md"
                style={{ paddingTop: "32px", paddingBottom: "32px" }}
            >
                <Outlet />
            </Container>
            <Footer />
        </Box>
    );
}

function LandingPageLayout() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "#ffffff",
            }}
        >
            <MenuBar showOptions={true} />
            <Container
                maxWidth="md"
                style={{
                    paddingTop: "32px",
                    paddingBottom: "32px",
                }}
            >
                <Outlet />
            </Container>
            <Footer />
        </Box>
    );
}

function RecruiterLayout() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <MenuBar showOptions={true} />
            <Container
                maxWidth="xl"
                style={{ paddingTop: "32px", paddingBottom: "32px" }}
            >
                <Outlet />
            </Container>
            <Footer />
        </Box>
    );
}

export default App;
