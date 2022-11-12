import React, { useEffect } from "react";

import Stack from "@mui/material/Stack";
import CandidateListItem from "./CandidateListItem";

function CandidateListView(props) {
    const { candidates, onCandidateSelected } = props;

    return (
        <Stack spacing={1}>
            {candidates.map((candidate) => (
                <CandidateListItem
                    key={candidate.profile.id}
                    candidateProfile={candidate}
                    onCandidateSelected={onCandidateSelected}
                />
            ))}
        </Stack>
    );
}

export default CandidateListView;
