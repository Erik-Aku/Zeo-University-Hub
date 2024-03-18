const axios = require('axios');

export const saveCollege = async (collegeData, token) => {
	return axios({
		method: 'PUT',
		url: '/api/users/colleges',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		data: JSON.stringify(collegeData)
	});
};

// Function to delete a saved college from the user's account
export const deleteCollege = async (collegeId, token) => {
	return axios({
		method: 'DELETE',
		url: `/api/users/colleges/${collegeId}`,
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export const searchColleges = async (query) => {
	if (!query) return [];

	try {
		const response = await axios.get(
			`http://universities-and-colleges.p.rapidapi.com/`,
			{
				params: { name: query },
				headers: {
					'X-RapidAPI-Host':
						'universities-and-colleges.p.rapidapi.com',
					'X-RapidAPI-Key':
						'447a932fd1msh0d9dd0f0212fec5p10a804jsna36243841f48'
				}
			}
		);

		return response.data.map((college) => college.name);
	} catch (error) {
		console.error('Error fetching college data:', error);
		return [];
	}
};
