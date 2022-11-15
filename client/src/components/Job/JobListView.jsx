import React, { useState, useEffect } from "react";

import ListItemButton from "@mui/material/ListItemButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import AutoSizer from "react-virtualized-auto-sizer";
import JobListItem from "./JobListItem";

function JobListView(props) {
    const pageSize = 5;
    const { jobs, selectedJob, onJobSelected } = props;
    const [pages, setPages] = useState(1);
    const [currPageIndex, setCurrPageIndex] = useState(1);
    const [displayedJobs, setDisplayedJobs] = useState([]);

    const handlePageIndexChange = (event, value) => {
        setCurrPageIndex(value);
    };

    const paging = (items) => {
        let fromIndex = (currPageIndex - 1) * pageSize;
        let toIndex = currPageIndex * pageSize;
        setDisplayedJobs(items.slice(fromIndex, toIndex));
    };

    useEffect(() => {
        setCurrPageIndex(1);
        setPages(1);
        if (jobs.length / pageSize > 1) {
            setPages(Math.ceil(jobs.length / pageSize));
        }
        paging(jobs);
    }, [jobs]);

    useEffect(() => {
        paging(jobs);
    }, [currPageIndex, pages]);

    return (
        <div className="job-list-container">
            <AutoSizer>
                {({ height, width }) => (
                    <Stack
                        sx={{ height: height, width: width }}
                        justifyContent="space-between"
                    >
                        <Stack justifyContent="flex-start">
                            {displayedJobs.map((job, index) => (
                                <div key={job.id}>
                                    <ListItemButton
                                        onClick={() => {
                                            onJobSelected({
                                                ...job,
                                                jobId: job.id,
                                            });
                                        }}
                                        disableGutters
                                        divider
                                    >
                                        <JobListItem
                                            job={job}
                                            selected={
                                                selectedJob &&
                                                selectedJob.id === job.id
                                            }
                                        />
                                    </ListItemButton>
                                </div>
                            ))}
                        </Stack>
                        <Stack
                            alignItems="center"
                            sx={{ paddingTop: "16px", paddingBottom: "16px" }}
                        >
                            <Pagination
                                count={pages}
                                color="primary"
                                onChange={handlePageIndexChange}
                            />
                        </Stack>
                    </Stack>
                )}
            </AutoSizer>
        </div>
    );
}
export default JobListView;
