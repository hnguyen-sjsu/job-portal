import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import Avatar from "@mui/material/Avatar";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import ApplicationServices from "../../services/ApplicationServices";
import ApplicationListItem from "./ApplicationListItem";

function ApplicationList(props) {
    const pageSize = 5;
    const [jobs, setJobs] = useState([]);
    const [statuses, setStatuses] = useState([
        { title: "Processing", selected: true },
        { title: "Pending", selected: true },
        { title: "Accepted", selected: true },
        { title: "Rejected", selected: false },
    ]);
    const [displayedJobs, setDisplayedJobs] = useState([]);
    const [pages, setPages] = useState(1);
    const [currPageIndex, setCurrPageIndex] = useState(1);

    useEffect(() => {
        ApplicationServices.getApplications().then((res) => {
            setJobs(res);
            setDisplayedJobs(res);
            renderList(res);
        });
    }, []);

    useEffect(() => {
        renderList(jobs);
    }, [statuses, currPageIndex]);

    const handleStatusFilterClick = (status) => {
        const updatedItems = statuses.map((item) => {
            return status.title === item.title
                ? { ...status, selected: !status.selected }
                : item;
        });
        setStatuses(updatedItems);
    };

    const handlePageIndexChange = (event, value) => {
        setCurrPageIndex(value);
    };

    const renderList = (items) => {
        const selectedStatuses = statuses
            .filter((status) => status.selected)
            .map((status) => status.title);
        const filteredItems = items.filter((item) =>
            selectedStatuses.includes(item.status)
        );

        setPages(Math.ceil(filteredItems.length / pageSize));

        let fromIndex = (currPageIndex - 1) * pageSize;
        let toIndex = currPageIndex * pageSize;
        setDisplayedJobs(filteredItems.slice(fromIndex, toIndex));
        console.log(filteredItems);
    };

    return (
        <Stack {...props} spacing={1}>
            <Typography variant="h4" fontWeight="bold">
                Your Applied Jobs
            </Typography>
            <Typography variant="subtitle1">
                Select the following chips to filter your list
            </Typography>
            <Grid container spacing={1}>
                {statuses.map((status) => (
                    <Grid item key={status.title}>
                        <FormControlLabel
                            control={<Checkbox checked={status.selected} />}
                            label={status.title}
                            onChange={() => {
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
            {displayedJobs.length !== 0 && (
                <Stack
                    alignItems="center"
                    sx={{
                        paddingTop: "16px",
                        paddingBottom: "16px",
                    }}
                >
                    <Pagination
                        count={pages}
                        color="primary"
                        page={currPageIndex}
                        onChange={handlePageIndexChange}
                    />
                </Stack>
            )}
        </Stack>
    );
}

export default ApplicationList;
