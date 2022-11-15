import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Pagination from "@mui/material/Pagination";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AutoSizer from "react-virtualized-auto-sizer";

import SearchServices from "../../services/SearchServices";
import CandidateListView from "./CandidateListView";
import ProfileView from "../UserAccount/Profile/ProfileView";

function CandidateSearchView(props) {
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [candidates, setCandiddates] = useState([]);
    const [displayedCandidates, setDisplayedCandidates] = useState([]);
    const [skills, setSkills] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const pageSize = 5;
    const [pages, setPages] = useState(1);
    const [currPageIndex, setCurrPageIndex] = useState(1);

    const handleSearch = (skills) => {
        setLoading(true);
        SearchServices.searchCandidates(skills).then((response) => {
            setTimeout(() => {
                setCandiddates(response);
                setLoading(false);
                paging(response);
            }, 1000);
        });
    };

    const handleCandidateSelected = (candidate) => {
        setSelectedCandidate(candidate);
        setOpenDialog(true);
    };

    const handlePageIndexChange = (event, value) => {
        setCurrPageIndex(value);
    };

    const paging = (items) => {
        let fromIndex = (currPageIndex - 1) * pageSize;
        let toIndex = currPageIndex * pageSize;
        setPages(Math.ceil(items.length / pageSize));
        setDisplayedCandidates(items.slice(fromIndex, toIndex));
    };

    useEffect(() => {
        paging(candidates);
    }, [currPageIndex]);

    return (
        <Stack spacing={2}>
            <SearchBar
                skills={skills}
                setSkills={setSkills}
                setOpenDialog={setOpenDialog}
                handleSearch={handleSearch}
                loading={loading}
            />
            <div className="job-list-container">
                <AutoSizer>
                    {({ height, width }) => (
                        <Stack
                            sx={{ height: height, width: width }}
                            justifyContent="space-between"
                        >
                            <CandidateListView
                                candidates={displayedCandidates}
                                onCandidateSelected={handleCandidateSelected}
                                loading={loading}
                            />
                            <Stack
                                alignItems="center"
                                sx={{
                                    paddingTop: "16px",
                                    paddingBottom: "16px",
                                }}
                            >
                                {!loading && candidates.length > 0 && (
                                    <Pagination
                                        count={pages}
                                        color="primary"
                                        page={currPageIndex}
                                        onChange={handlePageIndexChange}
                                    />
                                )}
                            </Stack>
                        </Stack>
                    )}
                </AutoSizer>
            </div>
            <CandidateProfilePreviewDialog
                open={openDialog}
                setOpen={setOpenDialog}
                candidateProfile={selectedCandidate}
            />
        </Stack>
    );
}

function SearchBar(props) {
    const { skills, setSkills, setOpenDialog, handleSearch, loading } = props;

    const handleOpenFilters = () => {
        setOpenDialog(true);
    };

    const handleSearchBtnClick = (e) => {
        e.preventDefault();
        handleSearch(skills);
    };

    const handleKeyDown = (e) => {
        if (e.key.toLowerCase() === "enter") {
            handleSearch(skills);
        }
    };

    const handleChange = (e) => {
        setSkills(e.target.value);
    };

    return (
        <Grid
            container
            direction="row"
            className="search-bar-container"
            justifyContent="space-between"
            alignItems="center"
        >
            <Grid item xs={8}>
                <Input
                    name="skills"
                    value={skills}
                    disableUnderline
                    fullWidth
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter skills, separating by comma. Ex: python, java,..."
                    startAdornment={
                        <AutoAwesomeRoundedIcon
                            color="disabled"
                            sx={{ mr: "10px" }}
                        />
                    }
                    disabled={loading}
                />
            </Grid>
            <Grid item xs={4}>
                <Stack direction="row" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleSearchBtnClick}
                        disabled={loading}
                    >
                        Search
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
}

function CandidateProfilePreviewDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const { open, setOpen, candidateProfile } = props;

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <>
            {candidateProfile && (
                <Dialog
                    open={open}
                    fullWidth
                    fullScreen={fullScreen}
                    maxWidth="lg"
                    sx={{ backdropFilter: "blur(5px)" }}
                >
                    <AppBar
                        color="inherit"
                        sx={{ position: "relative" }}
                        className="menu-bar"
                        elevation={0}
                    >
                        <Toolbar>
                            <Typography
                                sx={{ flex: 1 }}
                                variant="h6"
                                component="div"
                            >
                                Candidate Profile Preview
                            </Typography>
                            <IconButton onClick={closeDialog}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <ProfileView
                            editable={false}
                            candidateProfile={candidateProfile}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

export default CandidateSearchView;
