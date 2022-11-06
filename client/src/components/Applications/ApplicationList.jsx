import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ApplicationServices from "../../services/ApplicationServices";

function ApplicationList(props) {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        ApplicationServices.getApplications().then((res) => {
            console.log(res);
            setJobs(res);
        });
    }, []);

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Applied Jobs
            </Typography>
            {jobs.map((job) => (
                <ApplicationItem item={job} />
            ))}
        </>
    );
}

const ApplicationItem = (props) => {
    const { item } = props;

    return (
        <>
            {item && (
                <>
                    <Typography>
                        {item.id} - {item.jobId} - {item.status}
                    </Typography>
                </>
            )}
        </>
    );
};

export default ApplicationList;
