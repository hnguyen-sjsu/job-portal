import React, { useEffect, useState } from "react";

import Skeleton from "@mui/material/Skeleton";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";

import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import ApplicationServices from "../../services/ApplicationServices";
import AppliedCandidateListItem from "./AppliedCandidateListItem";
import ProcessApplicationDialog from "./ProcessApplicationDialog";

function AppliedCandidateListView(props) {
    const { job } = props;

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const onListItemSelected = (selectedItem) => {
        setShowDialog(true);
        setSelectedProfile(selectedItem);
    };

    const closeDialog = () => {
        setShowDialog(false);
        setSelectedProfile(null);
    };

    useEffect(() => {
        setLoading(true);
        if (job) {
            const jobId = job.id;
            ApplicationServices.getApplicationsByJobId(jobId).then(
                (response) => {
                    setTimeout(() => {
                        setApplications(response);
                        setLoading(false);
                    }, 1000);
                }
            );
        }
    }, [job]);

    const Row = ({ index, style }) => (
        <div style={style}>
            {
                <ListItemButton disableGutters>
                    <AppliedCandidateListItem
                        candidateProfile={applications[index]}
                        onListItemSelected={onListItemSelected}
                    />
                </ListItemButton>
            }
        </div>
    );

    return (
        <div className="job-list-container">
            {loading ? (
                <>
                    {[...Array(3).keys()].map((n) => (
                        <SkeletonCandidateListItem key={"skeleton-" + n} />
                    ))}
                </>
            ) : (
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={height}
                            width={width}
                            itemSize={80}
                            itemCount={applications.length}
                            overscanCount={4}
                        >
                            {Row}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            )}
            <ProcessApplicationDialog
                showDialog={showDialog}
                candidateProfile={selectedProfile}
                closeDialog={closeDialog}
            />
        </div>
    );
}

const SkeletonCandidateListItem = () => {
    return (
        <ListItem alignItems="center">
            <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <div style={{ width: "100%" }}>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </div>
        </ListItem>
    );
};

export default AppliedCandidateListView;
