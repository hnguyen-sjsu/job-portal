import axios from "axios";
// import cloudinary from "cloudinary";

const uploadImage = async (imageFile) => {
	const apiURL = "https://api.cloudinary.com/v1_1/dj1ikymq4/image/upload";
	const data = new FormData();
	data.append("file", imageFile);
	data.append("upload_preset", "profile_image");
	data.append("cloud_name", "dj1ikymq4");

	try {
		const response = await axios.post(apiURL, data);
		console.log(response);
		return response.data.secure_url;
	} catch (e) {
		console.error(e);
		return "";
	}
};

const uploadResume = async (resumeFile) => {
	const apiURL = "https://api.cloudinary.com/v1_1/dj1ikymq4/image/upload";
	const data = new FormData();
	data.append("file", resumeFile);
	data.append("upload_preset", "profile_image");
	data.append("cloud_name", "dj1ikymq4");

	try {
		const response = await axios.post(apiURL, data);
		console.log(response);
		return response.data.secure_url;
	} catch (e) {
		console.error(e);
		return "";
	}
};

const FileHandlingServices = {
	uploadImage,
	uploadResume,
};

export default FileHandlingServices;
