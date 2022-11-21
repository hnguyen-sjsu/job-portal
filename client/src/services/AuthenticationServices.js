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

const updateEmail = async (loginInfo) => {
    const url = API_URL + "user/update";
    const params = {
        withCredentials: true,
    };
    const headers = getHeaders();
    const data = {
        email: loginInfo.email,
        current_password: loginInfo.password,
        new_password: "",
    };

    try {
        const response = await axios.put(url, data, params, headers);
        return response;
    } catch (e) {
        return e.response;
    }
};

const updatePassword = async (currentPassword, newPassword) => {
    const url = API_URL + "user/update";
    const params = {
        withCredentials: true,
    };
    const headers = getHeaders();
    const data = {
        email: "",
        current_password: currentPassword,
        new_password: newPassword,
    };

    try {
        const response = await axios.put(url, data, params, headers);
        return response;
    } catch (e) {
        return e.response;
    }
};

const deleteAccount = async (currentPassword) => {
    const url = API_URL + "user/delete";
    const params = {
        withCredentials: true,
    };
    const headers = getHeaders();
    const data = {
        password: currentPassword,
    };

    try {
        const response = await axios.post(url, data, params, headers);
        return response;
    } catch (e) {
        return e.response;
    }
};

const requestRecoverPassword = async (email) => {
    const url = API_URL + "user/send-recovery-url?email=" + email;
    console.log(url);
    const params = {
        withCredentials: true,
    };
    const headers = getHeaders();

    try {
        const response = await axios.get(url, params, headers);
        return response;
    } catch (e) {
        return e.response;
    }
};

const AuthenticationServices = {
    signIn,
    signUp,
    signOut,
    getCurrentUser,
    getProfile,
    updateEmail,
    updatePassword,
    deleteAccount,
    requestRecoverPassword,
};

export default AuthenticationServices;
