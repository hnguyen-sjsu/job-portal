import React, { useEffect } from "react";

import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import CandidateListItem from "./CandidateListItem";

function CandidateListView(props) {
    const { candidates, onCandidateSelected, loading } = props;

    return (
        <Stack spacing={1}>
            {loading ? (
                <>
                    {[...Array(3).keys()].map((n) => (
                        <SkeletonCandidateListItem key={"skeleton-" + n} />
                    ))}
                </>
            ) : (
                candidates.map((candidate) => (
                    <CandidateListItem
                        key={candidate.profile.id}
                        candidateProfile={candidate}
                        onCandidateSelected={onCandidateSelected}
                    />
                ))
            )}
        </Stack>
    );
}

function SkeletonCandidateListItem() {
    return (
        <ListItem
            alignItems="flex-start"
            className="list-container"
            sx={{ p: 2 }}
        >
            <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Stack spacing={1}>
                        <Skeleton variant="rounded" width={180} height={18} />
                        <Stack direction="row" spacing={1}>
                            <Skeleton
                                variant="circular"
                                width={25}
                                height={25}
                            />
                            <Skeleton
                                variant="circular"
                                width={25}
                                height={25}
                            />
                            <Skeleton
                                variant="circular"
                                width={25}
                                height={25}
                            />
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Stack direction="row" spacing={1}>
                        <Skeleton
                            variant="rounded"
                            width={80}
                            height={25}
                            sx={{ borderRadius: "25px" }}
                        />
                        <Skeleton
                            variant="rounded"
                            width={80}
                            height={25}
                            sx={{ borderRadius: "25px" }}
                        />
                        <Skeleton
                            variant="rounded"
                            width={80}
                            height={25}
                            sx={{ borderRadius: "25px" }}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default CandidateListView;
