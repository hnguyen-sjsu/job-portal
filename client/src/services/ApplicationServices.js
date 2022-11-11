import axios from "axios";

const baseUrl = "http://localhost:5000/application/";

const getHeaders = () => {
    const token = document.cookie.split("=")[1];
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": token,
    };
    axios.defaults.xsrfCookieName = "csrf_access_token";
    axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";

    return headers;
};

const apply = async (jobId) => {
    const url = baseUrl + "post-one";
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };
    const data = {
        job_id: jobId,
    };

    try {
        const response = await axios.post(url, data, params, headers);
        return response.status === 201;
    } catch (e) {
        console.error(e);
    }
};

const getApplications = async () => {
    const url = baseUrl + "get-all";
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };

    try {
        const response = await axios.get(url, params, headers);
        if (response.status === 200) {
            return response.data.applications;
        } else {
            return [];
        }
    } catch (e) {
        console.error(e);
    }
};

const getApplicationsByJobId = async (jobId) => {
    const url = baseUrl + "get-all-by-job-id?job_id=" + jobId;
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };
    try {
        const response = await axios.get(url, params, headers);
        return response.data.map((item) => {
            return {
                ...item.candidateInfo,
                applicationInfo: { ...item.applicationInfo },
            };
        });
    } catch (e) {
        console.error(e);
    }
};

const ApplicationServices = {
    apply,
    getApplications,
    getApplicationsByJobId,
};

export default ApplicationServices;
