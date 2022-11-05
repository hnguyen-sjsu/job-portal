import axios from "axios";

const baseUrl = "http://localhost:5000/application/";

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

const ApplicationServices = {
    apply,
};

export default ApplicationServices;