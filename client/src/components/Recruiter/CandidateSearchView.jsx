import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slider from "@mui/material/Slider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SearchServices from "../../services/SearchServices";
import CandidateListView from "./CandidateListView";
import ProfileView from "../UserAccount/Profile/ProfileView";

function CandidateSearchView(props) {
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [candidates, setCandiddates] = useState([]);
    const [skills, setSkills] = useState("");
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleSearch = (skills) => {
        setLoading(true);
        SearchServices.searchCandidates(skills).then((response) => {
            setTimeout(() => {
                setCandiddates(response);
                setLoading(false);
            }, 1000);
        });
    };

    const handleCandidateSelected = (candidate) => {
        setSelectedCandidate(candidate);
        setOpenDialog(true);
    };

    return (
        <Stack spacing={2}>
            <SearchBar
                skills={skills}
                setSkills={setSkills}
                setOpenDialog={setOpenDialog}
                handleSearch={handleSearch}
                loading={loading}
            />
            <CandidateListView
                candidates={candidates}
                onCandidateSelected={handleCandidateSelected}
                loading={loading}
            />
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
