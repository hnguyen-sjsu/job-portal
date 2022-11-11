import React, { useState, useEffect } from "react";

import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import JobListItem from "./JobListItem";

function JobListView(props) {
    const { jobs, selectedJob, onJobSelected } = props;

    const Row = ({ index, style }) => (
        <div style={style}>
            {
                <ListItemButton
                    onClick={() => {
                        onJobSelected({
                            ...jobs[index],
                            jobId: jobs[index].id,
                        });
                    }}
                    disableGutters
                >
                    <JobListItem
                        job={jobs[index]}
                        selected={
                            selectedJob && selectedJob.id === jobs[index].id
                        }
                    />
                    {index !== jobs.length - 1 && <Divider />}
                </ListItemButton>
            }
        </div>
    );

    return (
        <div className="job-list-container">
            <AutoSizer>
                {({ height, width }) => (
                    <FixedSizeList
                        height={height}
                        width={width}
                        itemSize={110}
                        itemCount={jobs.length}
                        overscanCount={4}
                    >
                        {Row}
                    </FixedSizeList>
                )}
            </AutoSizer>
        </div>
    );
}

export default JobListView;
