import axios from "axios";

const API_URL = "http://localhost:5000/";

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

const signIn = async (loginInfo) => {
    const user = { ...loginInfo };
    const params = {
        withCredentials: true,
    };
    const url = API_URL + "user/login";

    try {
        const response = await axios.post(url, user, params);
        console.log(response);
        return response;
    } catch (e) {
        console.error(e);
        return e;
    }
};

const signUp = async (userInfo) => {
    const url = API_URL + "user/register";
    const params = {
        withCredentials: true,
    };
    try {
        const response = await axios.post(url, userInfo, params);
        return response;
    } catch (e) {
        console.error(e);
        return e.response;
    }
};

const signOut = () => {
    localStorage.setItem("user", null);
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const getProfile = async (role) => {
    const url = API_URL + role + "/get-profile";
    const params = {
        withCredentials: true,
    };
    try {
        const response = await axios.get(url, params);
        return response;
    } catch (e) {
        console.error(e);
        return e;
    }
};

const updateEmail = async (newEmail) => {
    const url = API_URL + "user/update";
    const params = {
        withCredentials: true,
    };
    const headers = getHeaders();
    const data = {
        email: newEmail,
        new_password: "",
    };

    try {
        const response = await axios.put(url, data, params, headers);
        console.log(response);
    } catch (e) {
        console.error(e);
    }
};

const AuthenticationServices = {
    signIn,
    signUp,
    signOut,
    getCurrentUser,
    getProfile,
    updateEmail,
};

export default AuthenticationServices;
