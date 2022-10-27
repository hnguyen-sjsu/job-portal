import axios from "axios";

const baseUrl = "http://localhost:5000/candidate/";

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

	console.log(data);

	try {
		const response = await axios.put(url, data, params, headers);
		console.log(response);
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

const CandidateServices = {
	updateCandidateProfile,
	getCandidateProfile,
};

export default CandidateServices;
