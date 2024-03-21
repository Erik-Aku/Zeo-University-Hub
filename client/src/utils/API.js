import { generateHashId } from '../utils/helpers';

// export const getMe = (client, token) => {
// 	const GET_ME = gql`
// 		query GetMe {
// 			me {
// 				id
// 				username
// 				email
// 				savedColleges {
// 					id
// 					name
// 					city
// 					state
// 					size
// 				}
// 			}
// 		}
// 	`;

// 	return client.query({
// 		query: GET_ME,
// 		context: { headers: { authorization: `Bearer ${token}` } }
// 	});
// };

// export const createUser = (client, userData) => {
// 	const LOGIN_USER = gql`
// 		mutation LoginUser($email: String!, $password: String!) {
// 			loginUser(email: $email, password: $password) {
// 				token
// 			}
// 		}
// 	`;

// 	return client.mutate({ mutation: LOGIN_USER, variables: userData });
// };

// export const loginUser = (client, userData) => {
// 	const LOGIN_USER = gql`
// 		mutation LoginUser($email: String!, $password: String!) {
// 			loginUser(email: $email, password: $password) {
// 				token
// 			}
// 		}
// 	`;

// 	return client.mutate({ mutation: LOGIN_USER, variables: userData });
// };

// // save book data for a logged in user
// export const saveCollege = (client, collegeData, token) => {
// 	const SAVE_COLLEGE = gql`
// 		mutation SaveCollege($collegeData: CollegeInput!) {
// 			saveCollege(collegeData: $collegeData) {
// 				id
// 				name
// 				city
// 				state
// 				size
// 			}
// 		}
// 	`;

// 	return client.mutate({
// 		mutation: SAVE_COLLEGE,
// 		variables: { collegeData },
// 		context: { headers: { authorization: `Bearer ${token}` } }
// 	});
// };

// // remove saved book data for a logged in user
// export const deleteCollege = (client, collegeId, token) => {
// 	const DELETE_COLLEGE = gql`
// 		mutation DeleteCollege($collegeId: ID!) {
// 			deleteCollege(collegeId: $collegeId) {
// 				id
// 			}
// 		}
// 	`;

// 	return client.mutate({
// 		mutation: DELETE_COLLEGE,
// 		variables: { collegeId },
// 		context: { headers: { authorization: `Bearer ${token}` } }
// 	});
// };

export const searchColleges = async (query) => {
	console.log(query);
	if (!query) return [];

	const apiKey = 'TsbiBlKfrodbx9jMgXWNJe2jbDBI1iV1KpUhoHXD';
	const fields = 'school.name,school.city,school.state,latest.student.size';
	const endpoint = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${apiKey}&school.name=${encodeURIComponent(
		query
	)}&fields=${fields}&per_page=50`;
	console.log(endpoint);

	try {
		const response = await fetch(endpoint);
		console.log(response);

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		console.log(data);

		return data.results.map((college) => ({
			id: generateHashId(
				college['school.name'],
				college['school.city'],
				college['school.state']
			),
			name: college['school.name'],
			city: college['school.city'],
			state: college['school.state'],
			size: college['latest.student.size']
		}));
	} catch (error) {
		console.error('Error fetching college data:', error);
		return [];
	}
};

// export const searchColleges = async (searchInput) => {
//     console.log(searchInput);
//     try {
//         const url = `https://universities-and-colleges.p.rapidapi.com/universities?page=20&includeUniversityDetails=true&countryCode=US&limit=10&search=${searchInput}`;
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': '259c12961cmshc2c28f256baa3b6p139941jsn5f85db5baba2',
//                 'X-RapidAPI-Host': 'universities-and-colleges.p.rapidapi.com'
//             }
//         };

//         const response = await fetch(url, options);
//         console.log(response);
//         if (!response.ok) {
//             throw new Error('something went wrong!');
//         }

//         const result = await response.json();
//         console.log(result);
//         return result;
//     } catch (error) {
//         console.error(error);
//     }
// };
