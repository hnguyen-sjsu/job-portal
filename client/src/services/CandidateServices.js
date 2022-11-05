import axios from "axios";
import moment from "moment";

const baseUrl = "http://localhost:5000/candidate/";
const educationBaseUrl = "http://localhost:5000/education/";

const DATE_FORMAT = "YYYY-MM-DD";

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

const updateCandidateProfile = async (profile) => {
    const url = baseUrl + "update";
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };
    const data = {
        full_name: profile.fullName,
        location: profile.location,
        bio: profile.bio,
        phone_number: profile.phoneNumber,
        resume_url: profile.resumeUrl,
    };

    try {
        const response = await axios.put(url, data, params, headers);
        const user = JSON.parse(localStorage.getItem("user"));
        const updatedProfile = {
            ...response.data,
            uid: user.uid,
            role: "candidate",
        };
        localStorage.setItem("user", JSON.stringify(updatedProfile));
    } catch (e) {
        console.error(e);
    }
};

const getCandidateProfile = async () => {
    const url = baseUrl + "get-profile";
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };

    try {
        const response = await axios.get(url, params, headers);
        const { data } = response;
        if (response.status === 200) {
            return data;
        }
    } catch (e) {
        console.error(e);
    }
};

const addSkill = async (skill) => {
    const url = "http://localhost:5000/skill/post-one";
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };

    const data = { skill: skill };

    try {
        const response = await axios.post(url, data, params, headers);
        if (response.status === 201) {
            return response.data.skill;
        }
    } catch (e) {
        console.error(e);
    }
};

const getSkills = async (skill) => {
    const url = "http://localhost:5000/skill/get";
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };
    try {
        const response = await axios.get(url, params, headers);
        if (response.status === 200) {
            return response.data.skills;
        }
    } catch (e) {
        console.error(e);
    }
};

const deleteSkill = async (skillId) => {
    const url = "http://localhost:5000/skill/delete?ids=" + skillId;
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };
    try {
        const response = await axios.delete(url, params, headers);
        return response.status === 200;
    } catch (e) {
        console.error(e);
    }
};

const getEducationItems = async () => {
    const url = educationBaseUrl + "get-all";
    const headers = getHeaders();
    const params = { withCredentials: true };
    try {
        const response = await axios.get(url, params, headers);
        if (response.status === 200) {
            return response.data.educations;
        } else {
            return [];
        }
    } catch (e) {
        console.error(e);
    }
};

const saveEducationHistory = async (educationItems) => {
    try {
        const newItems = educationItems.filter((item) => item.schoolId == null);
        const updateItems = educationItems.filter(
            (item) => item.schoolId != null
        );

        const [res1, res2] = await Promise.all([
            addNewEducationHistory(newItems),
            updateEducationHistory(updateItems),
        ]);
    } catch (e) {
        console.error(e);
    }
};

const addNewEducationHistory = async (educationItems) => {
    const url = educationBaseUrl + "post-batch";
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };

    const data = educationItems.map((item) => {
        return {
            school_name: item.schoolName,
            degree: item.degree,
            major: item.major,
            start_date: moment(item.startDate).format(DATE_FORMAT),
            end_date: moment(item.endDate).format(DATE_FORMAT),
            description: item.description,
        };
    });

    try {
        const response = await axios.post(url, data, params, headers);
        return response;
    } catch (e) {
        console.error(e);
    }
};

const updateEducationHistory = async (educationItems) => {
    const url = educationBaseUrl + "update";
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };

    const data = educationItems.map((item) => {
        return {
            school_id: item.schoolId,
            school_name: item.schoolName,
            degree: item.degree,
            major: item.major,
            start_date: moment(item.startDate).format(DATE_FORMAT),
            end_date: moment(item.endDate).format(DATE_FORMAT),
            description: item.description,
        };
    });

    try {
        const response = await axios.put(url, data, params, headers);
        return response;
    } catch (e) {
        console.error(e);
    }
};

const deleteEducationHistory = async (jobId) => {
    const url = educationBaseUrl + "delete?ids=" + jobId;
    const headers = getHeaders();
    const params = {
        withCredentials: true,
    };

    try {
        const response = await axios.delete(url, params, headers);
        return response.status === 200;
    } catch (e) {
        console.error(e);
    }
};

const CandidateServices = {
    getEducationItems,
    updateCandidateProfile,
    getCandidateProfile,
    getSkills,
    addSkill,
    deleteSkill,
    getEducationItems,
    saveEducationHistory,
    deleteEducationHistory,
};

export default CandidateServices;
