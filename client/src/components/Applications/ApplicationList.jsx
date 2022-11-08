import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import ApplicationServices from "../../services/ApplicationServices";
import ApplicationListItem from "./ApplicationListItem";

function ApplicationList(props) {
    const [jobs, setJobs] = useState([]);
    const [statuses, setStatuses] = useState([
        { title: "Processing", selected: true },
        { title: "Pending", selected: true },
        { title: "Accepted", selected: true },
        { title: "Rejected", selected: false },
    ]);
    const [displayedJobs, setDisplayedJobs] = useState([]);

    useEffect(() => {
        ApplicationServices.getApplications().then((res) => {
            setJobs(res);
            setDisplayedJobs(res);
        });
    }, []);

    useEffect(() => {
        const selectedStatuses = statuses
            .filter((status) => status.selected)
            .map((status) => status.title);
        const filteredItems = jobs.filter((item) =>
            selectedStatuses.includes(item.status)
        );
        setDisplayedJobs(filteredItems);
    }, [statuses]);

    const handleStatusFilterClick = (status) => {
        const updatedItems = statuses.map((item) => {
            return status.title === item.title
                ? { ...status, selected: !status.selected }
                : item;
        });
        setStatuses(updatedItems);
    };

    return (
        <Stack {...props} spacing={2}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography variant="h5" fontWeight="bold">
                    Your Applied Jobs
                </Typography>
            </Stack>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="caption">
                        Select the following chips to filter your list
                    </Typography>
                </Grid>
                {statuses.map((status) => (
                    <Grid item key={status.title}>
                        <Chip
                            label={status.title}
                            color={status.selected ? "primary" : "default"}
                            onClick={() => {
                                handleStatusFilterClick(status);
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            <Stack spacing={2}>
                {displayedJobs.map((job) => (
                    <ApplicationListItem key={job.id} item={job} />
                ))}
                {jobs.length !== 0 && displayedJobs.length === 0 && (
                    <Stack alignItems="center">
                        <Avatar variant="rounded">
                            <SearchOutlinedIcon />
                        </Avatar>
                        <Typography variant="h6">
                            Sorry, we couldn't find any matches your queries.
                        </Typography>
                        <Typography>
                            Please try again with other options.
                        </Typography>
                    </Stack>
                )}
                {jobs.length === 0 && (
                    <Stack alignItems="center">
                        <Avatar variant="rounded">
                            <SearchOutlinedIcon />
                        </Avatar>
                        <Typography variant="h6">
                            You have no applied jobs available.
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
}

export default ApplicationList;
