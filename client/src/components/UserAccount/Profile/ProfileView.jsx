import React, { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";

import { UserContext } from "../../../providers/AuthProvider";

import CandidateServices from "../../../services/CandidateServices";
import moment from "moment";

function ProfileView(props) {
    const { user } = useContext(UserContext);

    const { editable } = props;

    const [profile, setProfile] = useState({
        userProfile: {},
        skills: [],
        educations: [],
        experiences: [],
    });

    const loadProfile = async () => {
        const [profileRes, educationRes, skillsRes, expRes] = await Promise.all(
            [
                CandidateServices.getCandidateProfile(),
                CandidateServices.getEducationItems(),
                CandidateServices.getSkills(),
                CandidateServices.getWorkHistoryItems(),
            ]
        );

        if (profileRes && educationRes && skillsRes && expRes) {
            setProfile({
                ...profile,
                userProfile: { ...profileRes },
                skills: [...skillsRes],
                educations: [...educationRes],
                experiences: [...expRes],
            });
        }
    };

    useEffect(() => {
        loadProfile();
    }, [user]);

    return (
        <>
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h4" color="primary" fontWeight="bold">
                        {profile.userProfile.fullName}
                    </Typography>
                    {user && user.role === "candidate" && editable && (
                        <Button
                            variant="contained"
                            disableElevation
                            href="/candidate/build-profile"
                        >
                            Update Profile
                        </Button>
                    )}
                </Stack>
                <Typography>{profile.userProfile.bio}</Typography>
                <ContactInfoSection profile={profile.userProfile} />
                <ResumeSection resumeUrl={profile.userProfile.resumeUrl} />
                <SkillsSection skills={profile.skills} />
                <EducationSection educations={profile.educations} />
                <ExperienceSection experiences={profile.experiences} />
            </Stack>
        </>
    );
}

const ContactInfoSection = (props) => {
    const { profile } = props;

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Contact Information
            </Typography>
            <Card variant="outlined" sx={{ p: 2 }}>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={2}
                        >
                            <LocationOnOutlinedIcon fontSize="small" />
                            <span>{profile.location}</span>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={2}
                        >
                            <PhoneOutlinedIcon fontSize="small" />
                            <span>{profile.phoneNumber}</span>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={2}
                        >
                            <EmailOutlinedIcon fontSize="small" />
                            <span>{profile.email}</span>
                        </Stack>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

const SkillsSection = (props) => {
    const { skills } = props;

    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold">
                    Skills
                </Typography>
                <Button
                    variant="text"
                    startIcon={<AutoFixHighOutlinedIcon />}
                    href="/candidate/build-profile/3"
                >
                    Update
                </Button>
            </Stack>

            <Card variant="outlined" sx={{ p: 2 }}>
                {skills.map((skill) => (
                    <Chip
                        variant="outlined"
                        key={skill.id}
                        label={skill.name}
                        sx={{ mr: 2, mt: 0.5, mb: 0.5 }}
                    />
                ))}
            </Card>
        </>
    );
};

const EducationSection = (props) => {
    const { educations } = props;

    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold">
                    Education History
                </Typography>
                <Button
                    variant="text"
                    startIcon={<AutoFixHighOutlinedIcon />}
                    href="/candidate/build-profile/2"
                >
                    Update
                </Button>
            </Stack>
            <Card variant="outlined" sx={{ p: 2 }}>
                {educations.map((item, index) => (
                    <div key={item.schoolId}>
                        {index > 0 && (
                            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                        )}
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">
                                    {item.schoolName}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right">
                                    {item.startDate &&
                                        moment(item.startDate).format(
                                            "MMM yyyy"
                                        )}
                                    {item.endDate &&
                                        moment(item.endDate).format(
                                            "- MMM yyyy"
                                        )}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    {item.degree + ", " + item.major}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography paragraph={true}>
                                    {item.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                ))}
            </Card>
        </>
    );
};

const ExperienceSection = (props) => {
    const { experiences } = props;

    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold">
                    Work & Experience
                </Typography>
                <Button
                    variant="text"
                    startIcon={<AutoFixHighOutlinedIcon />}
                    href="/candidate/build-profile/3"
                >
                    Update
                </Button>
            </Stack>

            <Card variant="outlined" sx={{ p: 2 }}>
                {experiences.map((item, index) => (
                    <div key={item.id}>
                        {index > 0 && (
                            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                        )}
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography fontWeight="bold">
                                    {item.companyName}
                                    {item.companyLocation}
                                </Typography>
                                <Typography>{item.position}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right">
                                    {item.startDate &&
                                        moment(item.startDate).format(
                                            "MMM yyyy"
                                        )}
                                    {item.currentJob
                                        ? " - Present"
                                        : item.endDate &&
                                          moment(item.endDate).format(
                                              " - MMM yyyy"
                                          )}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>{item.title}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography paragraph={true}>
                                    {item.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                ))}
            </Card>
        </>
    );
};

const ResumeSection = (props) => {
    const { resumeUrl } = props;
    setTimeout(() => {
        if (resumeUrl) {
            console.log(resumeUrl.length);
        }
    }, 1000);

    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold">
                    Resume
                </Typography>
                <Button
                    variant="text"
                    startIcon={<AutoFixHighOutlinedIcon />}
                    href="/candidate/build-profile/4"
                >
                    Update
                </Button>
            </Stack>
            <Card variant="outlined" sx={{ p: 2 }}>
                {resumeUrl && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Stack direction="row" spacing={2}>
                            <InsertDriveFileOutlinedIcon color="primary" />
                            <span>
                                {resumeUrl.split("/").length > 0 &&
                                    resumeUrl.split("/").slice(-1)[0]}
                            </span>
                        </Stack>
                        <Button
                            variant="contained"
                            href={resumeUrl}
                            disableElevation
                            endIcon={<FileDownloadOutlinedIcon />}
                        >
                            Download
                        </Button>
                    </Stack>
                )}
            </Card>
        </>
    );
};

export default ProfileView;
