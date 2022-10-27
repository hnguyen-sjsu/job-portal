import axios from "axios";
import moment from "moment";

const baseUrl = "http://localhost:5000/job/";

const DATE_FORMAT = "YYYY-MM-DD";

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

const saveJob = async (jobInfo) => {
	const headers = getHeaders();
	const params = {
		withCredentials: true,
	};

	const data = {
		job_id: jobInfo.id,
		title: jobInfo.title,
		start_date: moment(jobInfo.startDate).format(DATE_FORMAT),
		end_date: moment(jobInfo.endDate).format(DATE_FORMAT),
		location: jobInfo.location,
		category: jobInfo.category,
		experience_level: jobInfo.experienceLevel,
		type: jobInfo.type,
		salary_min: parseInt(jobInfo.salaryMin),
		salary_max: parseInt(jobInfo.salaryMax),
		description: jobInfo.description,
	};

	try {
		if (data.job_id) {
			const url = baseUrl + "update";
			const response = await axios.put(url, data, params, headers);

			if (response.status === 200) {
				return "Job updated successfully!";
			} else {
				return "Error updating job. Please try again.";
			}
		} else {
			const url = baseUrl + "post";
			const response = await axios.post(url, data, params, headers);
			if (response.status === 201) {
				return "Job posted successfully!";
			} else {
				return "Error creating job. Please try again.";
			}
		}
	} catch (e) {
		console.error(e);
		return e;
	}
};

const getPostedJobs = async () => {
	const url = baseUrl + "get-posted-jobs";
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
	};
	const params = {
		withCredentials: true,
	};

	try {
		const response = await axios.get(url, params, headers);

		return response.data.jobs;
	} catch (e) {
		console.error(e);
		return e;
	}
};

const getJob = async (jobId) => {
	const url = baseUrl + `get-one?job_id=${jobId}`;
	const headers = getHeaders();
	const params = {
		withCredentials: true,
	};

	let jobInfo = null;

	try {
		const response = await axios.get(url, params, headers);
		console.log(response);
		if (response.status === 200) {
			jobInfo = response.data.jobs[0];
		}
	} catch (e) {
		console.error(e);
	} finally {
		return jobInfo;
	}
};

const deleteJob = async (jobId) => {
	const url = baseUrl + `delete?job_id=${jobId}`;
	const headers = getHeaders();
	const params = {
		withCredentials: true,
	};

	let message = "";
	try {
		const response = await axios.delete(url, params, headers);
		console.log(response);
		if (response.status === 200) {
			message = response.data.message;
		}
	} catch (e) {
		console.error(e);
		message = "Error";
	} finally {
		return message;
	}
};

const getJobs = async () => {
	const url = baseUrl + "get-all";
	const headers = getHeaders();
	const params = {
		withCredentials: true,
	};

	try {
		const response = await axios.get(url, params, headers);
		console.log(response);
		return response.data.jobs;
	} catch (e) {
		console.error(e);
	}
};

const JobServices = {
	saveJob,
	getJob,
	getJobs,
	getPostedJobs,
	deleteJob,
};

export default JobServices;
