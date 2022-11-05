import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CandidateServices from "../../../services/CandidateServices";

function SkillsExperienceForm(props) {
    const {
        skills,
        setSkills,
        experienceItems,
        setExperienceItems,
        loading,
        setLoading,
    } = props;

    const newItem = {
        id: null,
        position: "",
        companyName: "",
        startDate: null,
        endDate: null,
        currentJob: false,
        description: "",
        location: "",
    };

    const handleAddSkill = (e) => {
        const { value } = e.target;
        if (e.key.toLowerCase() === "enter") {
            setLoading(true);
            CandidateServices.addSkill(value).then((response) => {
                console.log(response);
                setSkills([...skills, response]);
                setLoading(false);
                e.target.value = "";
            });
        }
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedItems = experienceItems.map((item, i) => {
            return index === i ? { ...item, [name]: value } : item;
        });

        setExperienceItems([...updatedItems]);
    };

    const handleDeleteSkill = (skillId) => {
        setLoading(true);
        CandidateServices.deleteSkill(skillId).then((response) => {
            if (response) {
                setLoading(false);
                const updatedSkills = skills.filter(
                    (skill) => skill.id !== skillId
                );
                setSkills(updatedSkills);
            }
        });
    };

    const handleAddNewExperience = () => {
        setExperienceItems([...experienceItems, { ...newItem }]);
    };

    const handleStartDateChange = (index, newValue) => {
        const updatedItems = experienceItems.map((item, i) => {
            return index === i ? { ...item, startDate: newValue } : item;
        });
        setExperienceItems([...updatedItems]);
    };

    const handleEndDateChange = (index, newValue) => {
        const updatedItems = experienceItems.map((item, i) => {
            return index === i ? { ...item, endDate: newValue } : item;
        });
        setExperienceItems([...updatedItems]);
    };

    const loadData = async () => {
        setLoading(true);
        const [skillsRes, expRes] = await Promise.all([
            CandidateServices.getSkills(),
            CandidateServices.getWorkHistoryItems(),
        ]);
        if (skillsRes && expRes) {
            setSkills([...skillsRes]);
            if (expRes.length > 0) {
                setExperienceItems([...expRes]);
            }
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Typography variant="h4" fontWeight="bold">
                Skills & Experience
            </Typography>
            <Box className={["profile-form-container", "container"].join(" ")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            style={{ paddingTop: "16px" }}
                        >
                            Skills
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            {skills.map((skill) => (
                                <Grid item key={skill.id}>
                                    <Chip
                                        label={skill.name}
                                        color="primary"
                                        onDelete={() => {
                                            handleDeleteSkill(skill.id);
                                        }}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <TextField
                                    placeholder="Enter a skill"
                                    size="small"
                                    fullWidth
                                    onKeyDown={handleAddSkill}
                                    InputProps={{
                                        endAdornment: (
                                            <Button onClick={handleAddSkill}>
                                                Add
                                            </Button>
                                        ),
                                    }}
                                    disabled={loading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    style={{ paddingTop: "16px" }}
                >
                    Work Experience
                </Typography>
                {experienceItems.map((item, index) => (
                    <Grid container spacing={2} key={index}>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="position">
                                    Title
                                </InputLabel>
                                <TextField
                                    placeholder="Your position/title"
                                    name="position"
                                    size="small"
                                    value={item.position}
                                    onChange={(e) => {
                                        handleChange(e, index);
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="companyName">
                                    Company Name
                                </InputLabel>
                                <TextField
                                    placeholder="Enter the company name"
                                    name="companyName"
                                    size="small"
                                    value={item.companyName}
                                    onChange={(e) => {
                                        handleChange(e, index);
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="location">
                                    Location
                                </InputLabel>
                                <TextField
                                    placeholder="Company Location"
                                    name="location"
                                    size="small"
                                    value={item.location}
                                    onChange={(e) => {
                                        handleChange(e, index);
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={item.currentJob}
                                        name="currentJob"
                                        onChange={(e) => {
                                            const event = {
                                                target: {
                                                    name: e.target.name,
                                                    value: e.target.checked,
                                                },
                                            };
                                            handleChange(event, index);
                                        }}
                                    />
                                }
                                label="Currently work here"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="startDate">
                                    Start Date
                                </InputLabel>
                                <DatePicker
                                    views={["month", "year"]}
                                    inputFormat="MM/yyyy"
                                    name="startDate"
                                    value={item.startDate}
                                    onChange={(newValue) => {
                                        handleStartDateChange(index, newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="MM/YYYY"
                                            name="startDate"
                                            size="small"
                                            value={item.startDate}
                                            onChange={(e) => {
                                                handleChange(e, index);
                                            }}
                                        />
                                    )}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="endDate">
                                    End Date
                                </InputLabel>
                                <DatePicker
                                    views={["month", "year"]}
                                    inputFormat="MM/yyyy"
                                    name="endDate"
                                    value={item.endDate}
                                    onChange={(newValue) => {
                                        handleEndDateChange(index, newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="MM/YYYY"
                                            name="endDate"
                                            size="small"
                                            value={item.endDate}
                                            onChange={(e) => {
                                                handleChange(e, index);
                                            }}
                                        />
                                    )}
                                    disabled={item.currentJob}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="description">
                                    Description
                                </InputLabel>
                                <TextField
                                    name="description"
                                    multiline
                                    minRows={2}
                                    value={item.description}
                                    onChange={(e) => {
                                        handleChange(e, index);
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} textAlign="right">
                            <Divider />
                            <Button
                                onClick={handleAddNewExperience}
                                startIcon={<AddRoundedIcon fontSize="small" />}
                                disabled={
                                    experienceItems[0].companyName.length ==
                                        0 &&
                                    experienceItems[0].position.length == 0
                                }
                            >
                                Add Another Work Experience
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </LocalizationProvider>
    );
}
export default SkillsExperienceForm;
