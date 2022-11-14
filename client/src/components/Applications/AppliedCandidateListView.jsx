import React, { useEffect, useState } from "react";

import Skeleton from "@mui/material/Skeleton";

import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

import AutoSizer from "react-virtualized-auto-sizer";

import ApplicationServices from "../../services/ApplicationServices";
import AppliedCandidateListItem from "./AppliedCandidateListItem";
import ProcessApplicationDialog from "./ProcessApplicationDialog";

function AppliedCandidateListView(props) {
    const { job } = props;
    const pageSize = 5;
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [pages, setPages] = useState(1);
    const [currPageIndex, setCurrPageIndex] = useState(1);
    const [displayedApplications, setDisplayedApplications] = useState([]);

    const onListItemSelected = (selectedItem) => {
        setShowDialog(true);
        setSelectedProfile(selectedItem);
    };

    const handlePageIndexChange = (event, value) => {
        setCurrPageIndex(value);
    };

    const paging = () => {
        let fromIndex = (currPageIndex - 1) * pageSize;
        let toIndex = currPageIndex * pageSize;
        setDisplayedApplications(applications.slice(fromIndex, toIndex));
    };

    const closeDialog = () => {
        setShowDialog(false);
        setSelectedProfile(null);
    };

    const loadApplications = () => {
        setLoading(true);
        setApplications([]);
        setDisplayedApplications([]);
        setCurrPageIndex(1);
        setPages(1);

        if (job) {
            const jobId = job.id;
            ApplicationServices.getApplicationsByJobId(jobId).then(
                (response) => {
                    setApplications(response);
                    setTimeout(() => {
                        if (response.length / pageSize > 1) {
                            setPages(Math.ceil(response.length / pageSize));
                        }
                        let fromIndex = (currPageIndex - 1) * pageSize;
                        let toIndex = currPageIndex * pageSize;
                        setDisplayedApplications(
                            response.slice(fromIndex, toIndex)
                        );
                        setLoading(false);
                    }, 1000);
                }
            );
        }
    };

    useEffect(() => {
        loadApplications();
    }, [job]);

    useEffect(() => {
        paging();
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
                            <Typography
                                variant="h6"
                                style={{ padding: "16px" }}
                            >
                                Applications
                            </Typography>
                            {loading ? (
                                <>
                                    {[...Array(3).keys()].map((n) => (
                                        <SkeletonCandidateListItem
                                            key={"skeleton-" + n}
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    {displayedApplications.map(
                                        (application, index) => (
                                            <div
                                                key={
                                                    application.applicationInfo
                                                        .id
                                                }
                                            >
                                                <ListItemButton
                                                    disableGutters
                                                    divider
                                                >
                                                    <AppliedCandidateListItem
                                                        candidateProfile={
                                                            application
                                                        }
                                                        onListItemSelected={
                                                            onListItemSelected
                                                        }
                                                    />
                                                </ListItemButton>
                                            </div>
                                        )
                                    )}
                                </>
                            )}
                        </Stack>
                        <Stack
                            alignItems="center"
                            sx={{
                                paddingTop: "16px",
                                paddingBottom: "16px",
                            }}
                        >
                            {!loading && (
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
            <ProcessApplicationDialog
                showDialog={showDialog}
                candidateProfile={selectedProfile}
                closeDialog={closeDialog}
            />
        </div>
    );
}

// function AppliedCandidateListView(props) {
//     const { job } = props;
//     const [applications, setApplications] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [showDialog, setShowDialog] = useState(false);
//     const [selectedProfile, setSelectedProfile] = useState(null);

//     const onListItemSelected = (selectedItem) => {
//         setShowDialog(true);
//         setSelectedProfile(selectedItem);
//     };

//     const closeDialog = () => {
//         setShowDialog(false);
//         setSelectedProfile(null);
//     };

//     useEffect(() => {
//         setLoading(true);
//         if (job) {
//             const jobId = job.id;
//             ApplicationServices.getApplicationsByJobId(jobId).then(
//                 (response) => {
//                     setTimeout(() => {
//                         setApplications(response);
//                         setLoading(false);
//                     }, 1000);
//                 }
//             );
//         }
//     }, [job]);

//     const Row = ({ index, style }) => (
//         <div style={style}>
//             {
// <ListItemButton disableGutters>
//     <AppliedCandidateListItem
//         candidateProfile={applications[index]}
//         onListItemSelected={onListItemSelected}
//     />
// </ListItemButton>
//             }
//         </div>
//     );

//     return (
//         <div className="job-list-container">
//             {loading ? (
//                 <>
//                     {[...Array(3).keys()].map((n) => (
//                         <SkeletonCandidateListItem key={"skeleton-" + n} />
//                     ))}
//                 </>
//             ) : (
//                 <AutoSizer>
//                     {({ height, width }) => (
//                         <FixedSizeList
//                             height={height}
//                             width={width}
//                             itemSize={80}
//                             itemCount={applications.length}
//                             overscanCount={4}
//                         >
//                             {Row}
//                         </FixedSizeList>
//                     )}
//                 </AutoSizer>
//             )}
//             <ProcessApplicationDialog
//                 showDialog={showDialog}
//                 candidateProfile={selectedProfile}
//                 closeDialog={closeDialog}
//             />
//         </div>
//     );
// }

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
