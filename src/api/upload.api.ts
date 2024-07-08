import axios from './axios';

export const uploadFile = async (formData: any) => {
	try {
		const uploadResponse = await axios.post('/upload/thumb', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			onUploadProgress: (progressEvent) => {
				if (progressEvent && progressEvent.loaded && progressEvent.total) {
					const percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total,
					);
					console.log(`Upload progress: ${percentCompleted}%`);
				}
			},
		});
		const data = uploadResponse.data;
		return data;
	} catch (error) {}
};
