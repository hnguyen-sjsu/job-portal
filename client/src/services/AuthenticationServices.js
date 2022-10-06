import axios from "axios";

const API_URL = "http://localhost:5000/";

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
		console.log(response);
		return response;
	} catch (e) {
		console.error(e);
		return null;
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
		console.log(response);
		return response;
	} catch (e) {
		console.error(e);
		return e;
	}
};

const AuthenticationServices = {
	signIn,
	signUp,
	signOut,
	getCurrentUser,
	getProfile,
};

export default AuthenticationServices;
