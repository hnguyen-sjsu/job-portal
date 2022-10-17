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
  const url = baseUrl + "post";
  const headers = getHeaders();
  const params = {
    withCredentials: true,
  };

  console.log(jobInfo.endDate.toString());

  const endDate = moment(jobInfo.endDate).format(DATE_FORMAT);
  console.log(endDate);

  const data = {
    job_id: jobInfo.id,
    title: jobInfo.title,
    start_date: moment(jobInfo.startDate).format(DATE_FORMAT),
    end_date: moment(jobInfo.endDate).format(DATE_FORMAT),
    location: jobInfo.location,
    category: jobInfo.category,
    experience_level: jobInfo.experienceLevel,
    type: jobInfo.type,
    salary_min: jobInfo.minSalary,
    salary_max: jobInfo.maxSalary,
    description: jobInfo.description,
  };

  console.log(data);

  try {
    if (data.job_id) {
      const response = await axios.put(url, data, params, headers);
      console.log(response);
      return response;
    } else {
      const response = await axios.post(url, data, params, headers);
      console.log(response);
      return response;
    }
  } catch (e) {
    console.error(e);
    return e;
  }
};

const getPostedJobs = async () => {
  const url = baseUrl + "get-posted-jobs";
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
    return e;
  }
};

const getJob = async (jobId) => {
  // const url = baseUrl + `get-one?job_id=${jobId}`;
  const url = baseUrl + `get-one?job_id=2`; // to be replaced with jobId
  const headers = getHeaders();
  const params = {
    withCredentials: true,
  };

  try {
    console.log(jobId);
    const response = await axios.get(url, params, headers);
    console.log(response);
    return response.data.jobs;
  } catch (e) {
    console.error(e);
    return e;
  }
};

const JobServices = {
  saveJob,
  getJob,
  getPostedJobs,
};

export default JobServices;
