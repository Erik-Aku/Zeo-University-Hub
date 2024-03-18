const axios = require('axios');

// Route to get logged in user's info (needs the token)
export const getMe = (token) => {
	return fetch('/api/users/me', {
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`
		}
	});
};

// Function to create a new user
export const createUser = (userData) => {
	return fetch('/api/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userData)
	});
};

// Function to log in a user
export const loginUser = (userData) => {
	return fetch('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userData)
	});
};

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
