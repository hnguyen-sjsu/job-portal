import axios from "axios";

const baseUrl = "http://localhost:5000/search/";

const getToken = () => {
    return document.cookie.split("=")[1];
};

const getHeaders = () => {
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getToken(),
    };
    axios.defaults.xsrfCookieName = "csrf_access_token";
    axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";
    return headers;
};

const searchJobs = async (title, location) => {
    const url =
        baseUrl + "title-and-location?title=" + title + "&location=" + location;
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };

    try {
        const response = await axios.get(url, params, headers);
        if (response.status === 200) {
            return response.data.jobs;
        } else {
            return [];
        }
    } catch (e) {
        console.error(e);
    }
};

const SearchServices = {
    searchJobs,
};

export default SearchServices;
