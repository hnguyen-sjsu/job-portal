import axios from "axios";

const API_URL = "http://localhost:5000/";

const signIn = async (loginInfo) => {
	const user = { ...loginInfo };
	const params = {
		withCredentials: true,
	};
	const url = API_URL + "login";

	try {
		const response = await axios.post(url, user, params);
		console.log(response);
		localStorage.setItem("user", JSON.stringify(response.data.user_info));
		return response.data.user_info;
	} catch (e) {
		console.error(e);
		return null;
	}
};

const signUp = async (userInfo) => {};

const signOut = () => {
	localStorage.setItem("user", null);
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const AuthenticationServices = {
	signIn,
	signUp,
	signOut,
	getCurrentUser,
};

export default AuthenticationServices;
