import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
				email
				savedColleges {
					collegeId
					name
					city
					state
					size
				}
			}
		}
	}
`;


export const SAVE_COLLEGE = gql`
	mutation SaveCollege($newCollege: InputCollege!) {
		saveCollege(newCollege: $newCollege) {
			username
			email
			_id
			password
			savedColleges {
				collegeId
				name
				city
				state
				size
			}
		}
	}
`;

export const REMOVE_COLLEGE = gql`
	mutation RemoveCollege($collegeId: ID!) {
		removeCollege(collegeId: $collegeId) {
			_id
			username
			email
			savedColleges {
				collegeId
				name
				size
				city
				state
			}
		}
	}
`;
