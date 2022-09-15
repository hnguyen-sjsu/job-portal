import axios from "axios";

const API_URL = "http://localhost:5000/";

const signIn = async (loginInfo) => {
	return {
		fullName: "Full Name",
		...loginInfo,
	};
};

const signUp = async (userInfo) => {};

const AuthenticationServices = {
	signIn,
	signUp,
};

export default AuthenticationServices;
